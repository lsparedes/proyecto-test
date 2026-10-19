// js/webm_seekable.js
// Los WebM que genera MediaRecorder no traen duracion (Info > Duration) ni indice (Cues), por eso
// los reproductores no permiten adelantar/retroceder el video descargado. Este modulo reescribe el
// contenedor (sin recodificar audio ni video) agregando Duration, Cues y SeekHead.
// Si el archivo no se puede interpretar, se devuelve el original sin cambios.

const ID = {
  EBML: 0x1A45DFA3,
  Segment: 0x18538067,
  SeekHead: 0x114D9B74,
  Seek: 0x4DBB,
  SeekID: 0x53AB,
  SeekPosition: 0x53AC,
  Info: 0x1549A966,
  TimecodeScale: 0x2AD7B1,
  Duration: 0x4489,
  Tracks: 0x1654AE6B,
  TrackEntry: 0xAE,
  TrackNumber: 0xD7,
  TrackType: 0x83,
  DefaultDuration: 0x23E383,
  Cluster: 0x1F43B675,
  Timecode: 0xE7,
  SimpleBlock: 0xA3,
  BlockGroup: 0xA0,
  Block: 0xA1,
  BlockDuration: 0x9B,
  ReferenceBlock: 0xFB,
  Cues: 0x1C53BB6B,
  CuePoint: 0xBB,
  CueTime: 0xB3,
  CueTrackPositions: 0xB7,
  CueTrack: 0xF7,
  CueClusterPosition: 0xF1,
  Void: 0xEC
};

// Elementos de nivel 1 (hijos directos de Segment): marcan el fin de un Cluster de tamano desconocido.
const SEGMENT_CHILDREN = new Set([
  ID.SeekHead, ID.Info, ID.Tracks, ID.Cluster, ID.Cues,
  0x1043A770, // Chapters
  0x1254C367, // Tags
  0x1941A469  // Attachments
]);

function readId(bytes, pos) {
  const first = bytes[pos];
  if (first === undefined) return null;
  let length = 1;
  let mask = 0x80;
  while (length <= 4 && !(first & mask)) { length++; mask >>= 1; }
  if (length > 4 || pos + length > bytes.length) return null;
  let id = 0;
  for (let i = 0; i < length; i++) id = id * 256 + bytes[pos + i];
  return { id, length };
}

function readSize(bytes, pos) {
  const first = bytes[pos];
  if (first === undefined) return null;
  let length = 1;
  let mask = 0x80;
  while (length <= 8 && !(first & mask)) { length++; mask >>= 1; }
  if (length > 8 || pos + length > bytes.length) return null;
  let value = first & (mask - 1);
  let unknown = value === mask - 1;
  for (let i = 1; i < length; i++) {
    const b = bytes[pos + i];
    value = value * 256 + b;
    if (b !== 0xFF) unknown = false;
  }
  return { value, length, unknown };
}

function readHeader(bytes, pos) {
  const id = readId(bytes, pos);
  if (!id) return null;
  const size = readSize(bytes, pos + id.length);
  if (!size) return null;
  const dataStart = pos + id.length + size.length;
  return { id: id.id, start: pos, dataStart, size: size.value, unknown: size.unknown };
}

function readUint(bytes, start, end) {
  let value = 0;
  for (let i = start; i < end; i++) value = value * 256 + bytes[i];
  return value;
}

// Recorre los hijos de un elemento con tamano conocido.
function children(bytes, start, end) {
  const list = [];
  let pos = start;
  while (pos < end) {
    const h = readHeader(bytes, pos);
    if (!h || h.unknown) break;
    const dataEnd = h.dataStart + h.size;
    if (dataEnd > end) break;
    list.push({ ...h, dataEnd });
    pos = dataEnd;
  }
  return list;
}

/* ===== Escritura EBML ===== */

function idBytes(id) {
  const out = [];
  let v = id;
  while (v > 0) { out.unshift(v & 0xFF); v = Math.floor(v / 256); }
  return Uint8Array.from(out);
}

function sizeBytes(size, forceLength = 0) {
  let length = forceLength || 1;
  // 2^(7*length) - 1 queda reservado para "tamano desconocido".
  while (!forceLength && size >= Math.pow(2, 7 * length) - 1) length++;
  const out = new Uint8Array(length);
  let v = size;
  for (let i = length - 1; i >= 0; i--) { out[i] = v % 256; v = Math.floor(v / 256); }
  out[0] |= 0x80 >> (length - 1);
  return out;
}

function uintBytes(value, fixedLength = 0) {
  const out = [];
  let v = Math.max(0, Math.round(value));
  do { out.unshift(v % 256); v = Math.floor(v / 256); } while (v > 0);
  while (fixedLength && out.length < fixedLength) out.unshift(0);
  return Uint8Array.from(out);
}

function floatBytes(value) {
  const out = new Uint8Array(8);
  new DataView(out.buffer).setFloat64(0, value);
  return out;
}

function concat(parts) {
  const total = parts.reduce((acc, p) => acc + p.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const p of parts) { out.set(p, offset); offset += p.length; }
  return out;
}

function element(id, payload) {
  return concat([idBytes(id), sizeBytes(payload.length), payload]);
}

/* ===== Analisis del archivo ===== */

function parseBlockHeader(bytes, start, end) {
  const track = readSize(bytes, start);
  if (!track || start + track.length + 3 > end) return null;
  const tcPos = start + track.length;
  const relative = (bytes[tcPos] << 8 | bytes[tcPos + 1]) << 16 >> 16; // int16 con signo
  const flags = bytes[tcPos + 2];
  return { track: track.value, relative, flags };
}

// Delimita un Cluster: si su tamano es desconocido termina donde empieza el siguiente elemento de nivel 1.
// Cualquier dato que no se pueda interpretar lanza un error, para conservar el archivo original
// en vez de generar una copia incompleta.
function scanCluster(bytes, header, segmentEnd) {
  const limit = header.unknown ? segmentEnd : Math.min(header.dataStart + header.size, segmentEnd);
  const items = [];
  let pos = header.dataStart;
  while (pos < limit) {
    const h = readHeader(bytes, pos);
    if (h && header.unknown && SEGMENT_CHILDREN.has(h.id)) break;
    if (!h || h.unknown) throw new Error("Bloque WebM no interpretable");
    const dataEnd = h.dataStart + h.size;
    if (dataEnd > limit) throw new Error("Bloque WebM incompleto");
    items.push({ ...h, dataEnd });
    pos = dataEnd;
  }
  // Con tamano declarado, el siguiente elemento empieza al final declarado del Cluster.
  return { end: pos, next: header.unknown ? pos : limit, items };
}

function analyze(bytes) {
  const ebml = readHeader(bytes, 0);
  if (!ebml || ebml.id !== ID.EBML || ebml.unknown) throw new Error("No es un archivo EBML/WebM");
  const ebmlEnd = ebml.dataStart + ebml.size;

  const segment = readHeader(bytes, ebmlEnd);
  if (!segment || segment.id !== ID.Segment) throw new Error("Segment no encontrado");
  const segmentEnd = segment.unknown ? bytes.length : Math.min(segment.dataStart + segment.size, bytes.length);

  const result = {
    ebmlBytes: bytes.subarray(0, ebmlEnd),
    info: null,
    tracks: null,
    clusters: [],
    others: []
  };

  let pos = segment.dataStart;
  while (pos < segmentEnd) {
    const h = readHeader(bytes, pos);
    if (!h) throw new Error("Elemento WebM no interpretable");

    if (h.id === ID.Cluster) {
      const scan = scanCluster(bytes, h, segmentEnd);
      if (!scan.items.length) throw new Error("Cluster WebM vacio");
      result.clusters.push({ dataStart: h.dataStart, end: scan.end, items: scan.items });
      pos = scan.next;
      continue;
    }

    if (h.unknown) throw new Error("Elemento WebM de tamano desconocido");
    const dataEnd = h.dataStart + h.size;
    if (dataEnd > segmentEnd) throw new Error("Elemento WebM incompleto");
    const entry = { ...h, dataEnd };

    if (h.id === ID.Info) result.info = entry;
    else if (h.id === ID.Tracks) result.tracks = entry;
    // SeekHead, Cues y Void previos se regeneran; el resto se conserva tal cual.
    else if (h.id !== ID.SeekHead && h.id !== ID.Cues && h.id !== ID.Void) result.others.push(entry);

    pos = dataEnd;
  }

  if (!result.info || !result.tracks || !result.clusters.length) {
    throw new Error("Estructura WebM incompleta");
  }
  return result;
}

/* ===== Reconstruccion ===== */

function buildSeekable(bytes) {
  const parsed = analyze(bytes);

  // Escala de tiempo (ns por unidad), por defecto 1 ms.
  const infoChildren = children(bytes, parsed.info.dataStart, parsed.info.dataEnd);
  const scaleEl = infoChildren.find((c) => c.id === ID.TimecodeScale);
  const timecodeScale = scaleEl ? readUint(bytes, scaleEl.dataStart, scaleEl.dataEnd) || 1000000 : 1000000;

  // Pistas: se indexa la pista de video (o la primera si no hay video).
  const trackInfo = children(bytes, parsed.tracks.dataStart, parsed.tracks.dataEnd)
    .filter((c) => c.id === ID.TrackEntry)
    .map((entry) => {
      const fields = children(bytes, entry.dataStart, entry.dataEnd);
      const get = (id) => fields.find((f) => f.id === id);
      const number = get(ID.TrackNumber);
      const type = get(ID.TrackType);
      const defaultDuration = get(ID.DefaultDuration);
      return {
        number: number ? readUint(bytes, number.dataStart, number.dataEnd) : 0,
        type: type ? readUint(bytes, type.dataStart, type.dataEnd) : 0,
        defaultDuration: defaultDuration ? readUint(bytes, defaultDuration.dataStart, defaultDuration.dataEnd) / timecodeScale : 0
      };
    });
  const cueTrack = (trackInfo.find((t) => t.type === 1) || trackInfo[0] || { number: 1 }).number;
  const cueTrackDefaultDuration = (trackInfo.find((t) => t.number === cueTrack) || {}).defaultDuration || 0;

  // Recorre bloques: puntos de indice (keyframes) y fin real del contenido.
  let maxEnd = 0;
  const frameTimes = [];
  const clusters = parsed.clusters.map((cluster) => {
    const timecodeEl = cluster.items.find((i) => i.id === ID.Timecode);
    const clusterTime = timecodeEl ? readUint(bytes, timecodeEl.dataStart, timecodeEl.dataEnd) : 0;
    const keyframes = [];

    for (const item of cluster.items) {
      let block = null;
      let isKey = false;
      let blockDuration = 0;

      if (item.id === ID.SimpleBlock) {
        block = parseBlockHeader(bytes, item.dataStart, item.dataEnd);
        isKey = !!(block && (block.flags & 0x80));
      } else if (item.id === ID.BlockGroup) {
        const groupChildren = children(bytes, item.dataStart, item.dataEnd);
        const inner = groupChildren.find((c) => c.id === ID.Block);
        const durationEl = groupChildren.find((c) => c.id === ID.BlockDuration);
        if (inner) block = parseBlockHeader(bytes, inner.dataStart, inner.dataEnd);
        isKey = !groupChildren.some((c) => c.id === ID.ReferenceBlock);
        if (durationEl) blockDuration = readUint(bytes, durationEl.dataStart, durationEl.dataEnd);
      }
      if (!block) continue;

      const time = clusterTime + block.relative;
      maxEnd = Math.max(maxEnd, time + blockDuration);
      if (block.track === cueTrack) {
        frameTimes.push(time);
        if (isKey) keyframes.push(time);
      }
    }

    return { ...cluster, clusterTime, keyframes };
  });

  // Duracion = ultimo instante + duracion estimada del ultimo cuadro.
  let lastFrame = cueTrackDefaultDuration;
  if (!lastFrame && frameTimes.length > 1) {
    const deltas = [];
    for (let i = 1; i < frameTimes.length; i++) {
      const d = frameTimes[i] - frameTimes[i - 1];
      if (d > 0) deltas.push(d);
    }
    deltas.sort((a, b) => a - b);
    lastFrame = deltas.length ? deltas[Math.floor(deltas.length / 2)] : 0;
  }
  const duration = maxEnd + lastFrame;
  if (!(duration > 0)) throw new Error("No se pudo calcular la duracion");

  // Info con Duration (reemplaza una existente).
  const infoPayload = concat([
    ...infoChildren
      .filter((c) => c.id !== ID.Duration)
      .map((c) => bytes.subarray(c.start, c.dataEnd)),
    element(ID.Duration, floatBytes(duration))
  ]);
  const infoBytes = element(ID.Info, infoPayload);
  const tracksBytes = bytes.subarray(parsed.tracks.start, parsed.tracks.dataEnd);

  // Encabezados de Cluster con tamano conocido (el contenido no se modifica).
  const clusterParts = clusters.map((c) => {
    const content = bytes.subarray(c.dataStart, c.end);
    return { header: concat([idBytes(ID.Cluster), sizeBytes(content.length)]), content, cluster: c };
  });

  // Puntos de indice: un CuePoint por keyframe de la pista indexada. Si el archivo no marca
  // keyframes, se indexa el inicio de cada Cluster.
  const hasKeyframes = clusters.some((c) => c.keyframes.length);
  const cueEntries = [];
  clusterParts.forEach((part, index) => {
    const times = hasKeyframes ? part.cluster.keyframes : [part.cluster.clusterTime];
    times.forEach((time) => cueEntries.push({ time, clusterIndex: index }));
  });

  // Con enteros de largo fijo (8 bytes) el tamano de Cues no depende de las posiciones.
  const cuePointBytes = (time, position) => element(ID.CuePoint, concat([
    element(ID.CueTime, uintBytes(time, 8)),
    element(ID.CueTrackPositions, concat([
      element(ID.CueTrack, uintBytes(cueTrack)),
      element(ID.CueClusterPosition, uintBytes(position, 8))
    ]))
  ]));
  const seekBytes = (id, position) => element(ID.Seek, concat([
    element(ID.SeekID, idBytes(id)),
    element(ID.SeekPosition, uintBytes(position, 8))
  ]));

  const seekHeadSize = element(ID.SeekHead, concat([
    seekBytes(ID.Info, 0), seekBytes(ID.Tracks, 0), seekBytes(ID.Cues, 0)
  ])).length;
  const cuesSize = element(ID.Cues, concat(cueEntries.map((e) => cuePointBytes(e.time, 0)))).length;

  // Posiciones relativas al inicio de los datos del Segment.
  const infoPos = seekHeadSize;
  const tracksPos = infoPos + infoBytes.length;
  const cuesPos = tracksPos + tracksBytes.length;
  let clusterPos = cuesPos + cuesSize;
  const clusterPositions = clusterParts.map((part) => {
    const p = clusterPos;
    clusterPos += part.header.length + part.content.length;
    return p;
  });

  const seekHeadBytes = element(ID.SeekHead, concat([
    seekBytes(ID.Info, infoPos), seekBytes(ID.Tracks, tracksPos), seekBytes(ID.Cues, cuesPos)
  ]));
  const cuesBytes = element(ID.Cues, concat(cueEntries.map((e) => cuePointBytes(e.time, clusterPositions[e.clusterIndex]))));
  if (seekHeadBytes.length !== seekHeadSize || cuesBytes.length !== cuesSize) {
    throw new Error("Tamano inesperado de indices");
  }

  const otherParts = parsed.others.map((o) => bytes.subarray(o.start, o.dataEnd));
  const segmentDataLength = clusterPos + otherParts.reduce((acc, p) => acc + p.length, 0);

  return {
    duration,
    timecodeScale,
    cuePoints: cueEntries.length,
    parts: [
      parsed.ebmlBytes,
      idBytes(ID.Segment),
      sizeBytes(segmentDataLength),
      seekHeadBytes,
      infoBytes,
      tracksBytes,
      cuesBytes,
      ...clusterParts.flatMap((p) => [p.header, p.content]),
      ...otherParts
    ]
  };
}

export async function makeWebmSeekable(blob) {
  if (!blob || !blob.size) return blob;
  if (blob.type && !/webm|matroska/i.test(blob.type)) return blob;

  try {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const { parts } = buildSeekable(bytes);
    return new Blob(parts, { type: blob.type || "video/webm" });
  } catch (err) {
    console.warn("No se pudo indexar el video WebM; se conserva el original.", err);
    return blob;
  }
}

// Expuesto para pruebas.
export { buildSeekable as _buildSeekable };
