import { CAT } from "./cat_script.js";
import { getPartData, getResultsByPart } from "./storage.js";
import { getAudioBlob } from "./audio_store_idb.js";
import { getBlob } from "./blob_store_idb.js";

function sanitizeFilename(name) {
  return (name || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "_");
}

function currentPlatformDate() {
  const date = new Date();
  return [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getFullYear()).slice(-2)
  ].join("");
}

const PLATFORM_PART_NAMES = {
  1: { zip: "LineB", file: "LineB" },
  2: { zip: "SemMem", file: "SemMem" },
  3: { zip: "VF", file: "VF" },
  4: { zip: "RecogMem", file: "RecogMem" },
  5: { zip: "GOU", file: "GOU" },
  6: { zip: "Arith", file: "Arith" },
  7: { zip: "CompSpkW", file: "CompSpkW" },
  8: { zip: "CompWriW", file: "CompWriW" },
  9: { zip: "CompSpkS", file: "CompSpkS" },
  10: { zip: "CompWriS", file: "CompWriS" },
  11: { zip: "CompSpkP", file: "CompSpkP" },
  12: { zip: "WRep" },
  13: { zip: "ComplxWRep" },
  14: { zip: "NWRep" },
  15: { zip: "DSpan" },
  16: { zip: "SentSpan", naa: false },
  17: { zip: "OName" },
  18: { zip: "AName", naa: false },
  19: { zip: "SpkPDesc_CAT" },
  20: { zip: "WRead" },
  21: { zip: "ComplxWRead" },
  22: { zip: "FuncWRead" },
  23: { zip: "NWRead" },
  24: { zip: "WriCopy" },
  25: { zip: "WName" },
  26: { zip: "WriDict" },
  27: { zip: "WriPDesc_CAT" }
};

const PLATFORM_AUDIO_NAMES = {
  3: ["SemF", "PhonF"],
  12: ["P_arbol", "1_patin", "2_presidente", "3_desden", "4_radio", "5_pesar", "6_ministerio", "7_servilleta", "8_planta", "9_rectangulo", "10_personaje", "11_quietud", "12_marinero", "13_evidencia", "14_sacacorchos", "15_cara", "16_castor"],
  13: ["1_impensable", "2_descongelado", "3_conformista"],
  14: ["1_roga", "2_cler", "3_espen", "4_trimpo", "5_prastodo"],
  15: ["2_1", "2_2", "3_1", "3_2", "4_1", "4_2", "5_1", "5_2", "6_1", "6_2", "7_1", "7_2"],
  16: ["3_1", "3_2", "4_1", "4_2", "5_1", "5_2", "6_1", "6_2"],
  17: ["P_casa", "1_telefono", "2_reloj", "3_submarino", "4_semaforo", "5_pulpo", "6_microscopio", "7_lupa", "8_pera", "9_dinosaurio", "10_timon", "11_bicicleta", "12_ostra", "13_elefante", "14_raiz", "15_cisne", "16_calendario", "17_espatula", "18_barril", "19_escalera", "20_buho", "21_llama", "22_murcielago", "23_termometro", "24_tunel"],
  18: ["P_comer", "1_leer", "2_barrer", "3_pintar", "4_nadar", "5_recortar"],
  19: ["SpkPDesc_CAT"],
  20: ["P_silla", "1_contenedor", "2_goce", "3_microfono", "4_pierna", "5_trecho", "6_pasaporte", "7_sonajero", "8_zorro", "9_tomar", "10_estropajo", "11_causa", "12_dormitorio", "13_culpa", "14_educacion", "15_pasar", "16_bailarina", "17_hurgar", "18_siglo", "19_television", "20_diccionario", "21_brillar", "22_porcelana", "23_pecar", "24_chocolate"],
  21: ["1_informativo", "2_recalentado", "3_preconcebido"],
  22: ["1_pero", "2_de", "3_y"],
  23: ["1_polma", "2_tarco", "3_fugamo", "4_vitero", "5_espisto"]
};

const PLATFORM_IMAGE_NAMES = {
  24: ["1_name", "2_letters_copy", "3_letters_upper", "4_words"],
  25: ["P_1", "E_1", "E_2", "E_3", "E_4", "E_5"],
  26: ["P_1", "E_1", "E_2", "E_3", "E_4", "E_5"],
  27: ["WriPDesc_CAT"]
};

function platformZipBase(partId, participantId, initials) {
  const spec = PLATFORM_PART_NAMES[Number(partId)] || { zip: `Parte${partId}` };
  return `${sanitizeFilename(participantId)}_${spec.zip}_${currentPlatformDate()}_${sanitizeFilename(initials)}`;
}

function platformResultFile(partId, participantId) {
  const spec = PLATFORM_PART_NAMES[Number(partId)] || { file: `Parte${partId}` };
  const code = spec.file || spec.zip;
  return `${sanitizeFilename(participantId)}_${code}`;
}

function platformAudioName(partId, ordinal, fallback) {
  const names = PLATFORM_AUDIO_NAMES[Number(partId)] || [];
  return sanitizeFilename(names[ordinal - 1] || fallback || `audio_${ordinal}`);
}

function platformImageName(partId, ordinal, fallback) {
  const names = PLATFORM_IMAGE_NAMES[Number(partId)] || [];
  return sanitizeFilename(names[ordinal - 1] || fallback || `imagen_${ordinal}`);
}

function indexToPantomimeName(index) {
  return index <= 1 ? "P1" : `E${index - 1}`;
}

function toCSV(rows) {
  if (!rows || rows.length === 0) return "";

  // headers = unión de todas las keys para no perder columnas
  const headersSet = new Set();
  rows.forEach(r => Object.keys(r || {}).forEach(k => headersSet.add(k)));
  const headers = Array.from(headersSet);

  const esc = (v) => {
    const s = String(v ?? "");
    // CSV seguro con comillas
    return `"${s.replace(/"/g, '""')}"`;
  };

  const lines = [];
  lines.push(headers.map(esc).join(","));
  for (const r of rows) {
    lines.push(headers.map(h => esc(r[h])).join(","));
  }
  // Excel usa el BOM para detectar UTF-8 y conservar tildes, ñ y símbolos.
  return `\uFEFF${lines.join("\r\n")}`;
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function getAuthenticatedUserNameFallback(fallback) {
  try {
    const response = await fetch("/api/user-info");
    if (!response.ok) return fallback;

    const user = await response.json();
    const fullName = `${user?.name || ""} ${user?.last_name || ""}`.trim();
    return fullName || fallback;
  } catch (_) {
    return fallback;
  }
}

async function getAuthenticatedUserInitialsFallback(fallback) {
  try {
    const response = await fetch("/api/user-info");
    if (!response.ok) return fallback;

    const user = await response.json();
    const initials = user?.initials || `${user?.name || ""} ${user?.last_name || ""}`
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");

    return initials || fallback;
  } catch (_) {
    return fallback;
  }
}

export function exportPartToCSV(partId) {
  const part = CAT.parts.find(p => p.id === Number(partId));
  const rows = getResultsByPart(partId);

  if (!rows.length) {
    alert("Esta parte aún no tiene resultados para exportar.");
    return;
  }

  const partNum = String(partId).padStart(2, "0");
  const fname = `CAT_P${partNum}_${sanitizeFilename(part?.name || "Parte")}.csv`;

  const csv = toCSV(rows);
  downloadText(fname, csv);
}

export async function exportSemanticPanZip(usedHand = "") {
  if (typeof XLSX === "undefined" || typeof JSZip === "undefined") {
    console.error("XLSX o JSZip no estan disponibles para exportar Memoria semantica.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(2);
  const rows = (partData.semanticPanResponses || []).filter((row) => row.numero_item !== "Ej.");
  const hand = usedHand || partData.usedHand || "";

  const sheetRows = rows.map((row) => ({
    "N° Ítem": row.numero_item,
    "Respuesta correcta": row.respuesta_correcta,
    "Respuesta del participante": row.respuesta_participante,
    "RT": row.RT,
    "Puntaje": row.puntaje,
    "Mano seleccionada": hand
  }));

  const csvContent = toCSV(sheetRows);

  const baseName = platformZipBase(2, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(2, participantId)}.csv`, csvContent);

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

export async function exportVerbalFluencyAudioZip() {
  if (typeof JSZip === "undefined") {
    console.error("JSZip no esta disponible para exportar Fluidez verbal.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(3);
  const audioEntries = Object.values(partData.verbalFluencyAudios || {})
    .filter((entry) => entry && entry.key)
    .sort((a, b) => Number(a.screenIndex || 0) - Number(b.screenIndex || 0));
  const videoEntries = Object.values(partData.verbalFluencyVideos || {})
    .filter((entry) => entry && entry.key)
    .sort((a, b) => Number(a.screenIndex || 0) - Number(b.screenIndex || 0));
  const stimulusIndexes = Array.from(new Set(
    [...audioEntries, ...videoEntries].map((entry) => Number(entry.screenIndex || 0))
  )).sort((a, b) => a - b);

  if (!stimulusIndexes.length) {
    console.warn("No hay grabaciones de Fluidez verbal para exportar.");
    return false;
  }

  const zip = new JSZip();
  let addedFiles = 0;
  const officialName = (entry) => {
    const ordinal = stimulusIndexes.indexOf(Number(entry.screenIndex || 0)) + 1;
    return platformAudioName(3, ordinal, entry.label || `estimulo_${ordinal}`);
  };

  for (const entry of audioEntries) {
    const blob = await getAudioBlob(entry.key);
    if (!blob) continue;

    zip.file(`${officialName(entry)}.wav`, blob);
    addedFiles++;
  }

  for (const entry of videoEntries) {
    const blob = await getBlob(entry.key);
    if (!blob) continue;

    zip.file(`${officialName(entry)}.webm`, blob);
    addedFiles++;
  }

  if (addedFiles === 0) {
    console.warn("No se encontraron grabaciones guardadas para Fluidez verbal.");
    return false;
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const baseName = platformZipBase(3, participantId, userInitials);
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

export async function exportRepeatAudioZip(usedHand = "", targetPartId = 12, testNumber = 30, testLabel = "Repeticion_de_palabras") {
  if (typeof JSZip === "undefined") {
    console.error("JSZip no esta disponible para exportar Repeticion de palabras.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(targetPartId);
  const takes = Object.values(partData.takes || {})
    .filter((entry) => entry && entry.key)
    .sort((a, b) => {
      const screenDiff = Number(a.screenIndex || 0) - Number(b.screenIndex || 0);
      if (screenDiff !== 0) return screenDiff;
      return Number(a.takeNumber || 1) - Number(b.takeNumber || 1);
    });
  const videos = Object.values(partData.videos || {})
    .filter((entry) => entry && entry.key)
    .sort((a, b) => {
      const screenDiff = Number(a.screenIndex || 0) - Number(b.screenIndex || 0);
      if (screenDiff !== 0) return screenDiff;
      return Number(a.takeNumber || 1) - Number(b.takeNumber || 1);
    });

  if (!takes.length && !videos.length) {
    console.warn("No hay grabaciones de Repeticion de palabras para exportar.");
    return false;
  }

  const zip = new JSZip();
  let addedFiles = 0;

  for (const take of takes) {
    const blob = await getAudioBlob(take.key);
    if (!blob) continue;

    const screenIndex = Number(take.screenIndex || 0);
    const screenAlignedParts = new Set([12, 14, 15, 16]);
    const storedOrdinal = Number(take.exportOrdinal);
    const ordinal = Number.isFinite(storedOrdinal) && storedOrdinal > 0
      ? storedOrdinal
      : (screenAlignedParts.has(Number(targetPartId)) ? screenIndex : screenIndex + 1);
    const label = platformAudioName(targetPartId, ordinal, take.label || `pantalla_${ordinal}`);
    const takeSuffix = Number(take.takeNumber || 1) > 1 ? `_${Number(take.takeNumber)}` : "";
    zip.file(`${label}${takeSuffix}.wav`, blob);
    addedFiles++;
  }

  for (const video of videos) {
    const blob = await getBlob(video.key);
    if (!blob) continue;

    const screenIndex = Number(video.screenIndex || 0);
    const screenAlignedParts = new Set([12, 14, 15, 16]);
    const storedOrdinal = Number(video.exportOrdinal);
    const ordinal = Number.isFinite(storedOrdinal) && storedOrdinal > 0
      ? storedOrdinal
      : (screenAlignedParts.has(Number(targetPartId)) ? screenIndex : screenIndex + 1);
    const label = platformAudioName(targetPartId, ordinal, video.label || `pantalla_${ordinal}`);
    const takeSuffix = Number(video.takeNumber || 1) > 1 ? `_${Number(video.takeNumber)}` : "";
    zip.file(`${label}${takeSuffix}.webm`, blob);
    addedFiles++;
  }

  if (addedFiles === 0) {
    console.warn("No se encontraron grabaciones guardadas para Repeticion de palabras.");
    return false;
  }

  const baseName = platformZipBase(targetPartId, participantId, userInitials);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

function dataUrlToBlob(dataUrl) {
  const [header, base64] = String(dataUrl || "").split(",");
  const mimeMatch = header.match(/data:(.*?);base64/);
  const mime = mimeMatch ? mimeMatch[1] : "image/png";
  const binary = atob(base64 || "");
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mime });
}

async function createLineBisectionComparisonBlob(baseImagePath, scaleImagePath) {
  if (!baseImagePath || !scaleImagePath) return null;

  try {
    const [baseResponse, scaleResponse] = await Promise.all([
      fetch(baseImagePath),
      fetch(scaleImagePath)
    ]);

    if (!baseResponse.ok || !scaleResponse.ok) return null;

    const [baseBitmap, scaleBitmap] = await Promise.all([
      createImageBitmap(await baseResponse.blob()),
      createImageBitmap(await scaleResponse.blob())
    ]);

    const canvas = document.createElement("canvas");
    canvas.width = baseBitmap.width;
    canvas.height = baseBitmap.height;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseBitmap, 0, 0);

    // escala.png comparte eje X con lineas.png; el desfase vertical alinea sus 3 lineas.
    ctx.globalAlpha = 0.72;
    ctx.drawImage(scaleBitmap, 0, 202);
    ctx.globalAlpha = 1;

    return await new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
  } catch (err) {
    console.warn("No se pudo crear PNG comparativo de Diseccion de lineas:", err);
    return null;
  }
}

export async function exportWritingImagesZip(targetPartId, testNumber, testLabel) {
  if (typeof JSZip === "undefined") {
    console.error("JSZip no esta disponible para exportar imagenes de escritura.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(targetPartId);
  const expectedImageCounts = { 24: 4, 25: 6, 26: 6, 27: 1 };
  const expectedCount = expectedImageCounts[Number(targetPartId)] || Infinity;
  const images = Object.values(partData.writingImages || {})
    .filter((entry) => entry
      && entry.dataUrl
      && Number(entry.screenIndex) >= 0
      && Number(entry.screenIndex) < expectedCount)
    .sort((a, b) => Number(a.screenIndex || 0) - Number(b.screenIndex || 0));

  if (!images.length) {
    console.warn("No hay imagenes de escritura para exportar.");
    return false;
  }

  const zip = new JSZip();
  let addedFiles = 0;

  for (const image of images) {
    const ordinal = Number(image.screenIndex || 0) + 1;
    const label = platformImageName(targetPartId, ordinal, image.label || `pantalla_${ordinal}`);
    zip.file(`${label}.png`, dataUrlToBlob(image.dataUrl));
    addedFiles++;
  }

  if (addedFiles === 0) {
    console.warn("No se encontraron imagenes validas para exportar.");
    return false;
  }

  const baseName = platformZipBase(targetPartId, participantId, userInitials);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

export async function exportImageAssetsZip(imagePaths = [], testNumber, testLabel) {
  if (typeof JSZip === "undefined") {
    console.error("JSZip no esta disponible para exportar imagenes.");
    return false;
  }

  const validPaths = imagePaths.filter(Boolean);
  if (!validPaths.length) return false;

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const zip = new JSZip();
  let addedFiles = 0;

  for (let index = 0; index < validPaths.length; index++) {
    const path = validPaths[index];
    try {
      const response = await fetch(path);
      if (!response.ok) continue;

      const blob = await response.blob();
      const filename = sanitizeFilename(String(path).split(/[\\/]/).pop()?.replace(/\.[^.]+$/, "") || `imagen_${index + 1}`);
      const extension = String(path).split(".").pop()?.split(/[?#]/)[0] || "png";
      const label = platformImageName(testNumber, index + 1, filename);
      zip.file(`${label}.${extension}`, blob);
      addedFiles++;
    } catch (err) {
      console.warn("No se pudo agregar imagen al ZIP:", path, err);
    }
  }

  if (addedFiles === 0) return false;

  const baseName = platformZipBase(testNumber, participantId, userInitials);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

export async function exportLineBisectionZip(usedHand = "") {
  if (typeof XLSX === "undefined" || typeof JSZip === "undefined") {
    console.error("XLSX o JSZip no estan disponibles para exportar Diseccion de lineas.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(1);
  const rows = partData.lineBisectionResults || [];
  const hand = usedHand || partData.usedHand || "";

  if (!rows.length) {
    console.warn("No hay resultados de Diseccion de lineas para exportar.");
    return false;
  }

  const totalExact = rows.filter((row) => row.isExact).length;
  const sheetRows = rows.map((row) => ({
    "Linea": row.lineNumber,
    "Centro esperado X": row.expectedCenterX,
    "Corte X": row.cutX ?? "",
    "Desviacion px": row.deviationPx ?? "",
    "Desviacion escala": row.deviationUnits ?? "",
    "Puntuacion escala": row.scaleScore ?? "",
    "Exacto": row.isExact ? "Si" : "No",
    "Puntaje": row.assignedScore ?? ""
  }));

  sheetRows.push({});
  sheetRows.push({ "Linea": "Total exactas", "Puntaje": totalExact });
  sheetRows.push({ "Linea": "SelectHand", "Puntaje": hand });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(sheetRows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "RESULTADOS_LINEAS");
  const excelArray = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const baseName = platformZipBase(1, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(1, participantId)}.xlsx`, excelArray);

  if (partData.practiceImage) {
    zip.file("LineB_practice.png", dataUrlToBlob(partData.practiceImage));
  }

  if (partData.patientImage) {
    zip.file("LineB.png", dataUrlToBlob(partData.patientImage));
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

export async function exportShortTermMemoryZip(usedHand = "") {
  if (typeof XLSX === "undefined" || typeof JSZip === "undefined") {
    console.error("XLSX o JSZip no estan disponibles para exportar Memoria a corto plazo.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(4);
  const hand = usedHand || partData.usedHand || "";
  // Feedback: dejar solo N item, respuesta correcta, respuesta participante, RT, puntaje
  // (eliminar el resto de columnas).
  const rows = (partData.shortTermMemoryResponses || []).map((row) => ({
    "N° Ítem": row.numero_item,
    "Respuesta correcta": row.opcion_correcta,
    "Respuesta participante": row.opcion_seleccionada,
    "RT": row.RT,
    "Puntaje": row.puntaje
  }));

  if (!rows.length) {
    console.warn("No hay respuestas de Memoria a corto plazo para exportar.");
    return false;
  }

  const csvContent = toCSV(rows);

  const baseName = platformZipBase(4, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(4, participantId)}.csv`, csvContent);

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

export async function exportPantomimeZip() {
  if (typeof XLSX === "undefined" || typeof JSZip === "undefined") {
    console.error("XLSX o JSZip no estan disponibles para exportar Pantomima.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(5);
  const takes = partData.takes || {};
  const correctAnswers = ["pluma", "pinza", "peine", "taza", "tijeras", "cepillo", "brocha"];

  const responseRows = correctAnswers.map((answer, index) => {
    const take = takes[String(index + 1)] || {};

    return {
      "Respuesta correcta": answer,
      "Puntuacion": "",
      "Modo de Respuesta": take.sin_camara ? "Sin camara" : "Video",
      "Comentarios": ""
    };
  });

  const csvContent = toCSV(responseRows);

  const baseName = platformZipBase(5, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(5, participantId)}.csv`, csvContent);

  const sortedTakes = Object.entries(takes)
    .sort(([a], [b]) => Number(a) - Number(b));

  for (const [screenIndex, take] of sortedTakes) {
    const answerIndex = Math.max(Number(screenIndex) - 1, 0);
    const answer = sanitizeFilename(correctAnswers[answerIndex] || `pantalla_${screenIndex}`);
    const screenLabel = indexToPantomimeName(Number(screenIndex));

    if (take?.sin_camara) {
      // Sin subcarpetas dentro del ZIP (nomenclatura): archivos en la raiz
      zip.file(
        `${screenLabel}_SIN_CAMARA.txt`,
        "No se genero video porque no habia camara disponible en este equipo."
      );
      continue;
    }

    if (!take?.key) continue;

    const blob = await getBlob(take.key);
    if (!blob) continue;

    // Sin subcarpetas dentro del ZIP (nomenclatura): video en la raiz
    zip.file(`${screenLabel}.webm`, blob);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

export async function exportCalculationZip(usedHand = "") {
  if (typeof XLSX === "undefined" || typeof JSZip === "undefined") {
    console.error("XLSX o JSZip no estan disponibles para exportar Calculo.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(6);
  const hand = usedHand || partData.usedHand || "";
  // Feedback: CSV con N item (1-6), respuesta correcta, respuesta participante, RT, puntaje, mano
  const rows = (partData.calculationResponses || []).map((row) => ({
    "N° Ítem": row.ejercicio,
    "Respuesta correcta": row.respuesta_correcta,
    "Respuesta del participante": row.opcion_elegida,
    "RT": row.RT,
    "Puntaje": row.puntaje,
    "Mano seleccionada": row.mano_seleccionada || hand
  }));

  if (!rows.length) {
    console.warn("No hay respuestas de Calculo para exportar.");
    return false;
  }

  const csvContent = toCSV(rows);

  const baseName = platformZipBase(6, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(6, participantId)}.csv`, csvContent);

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

export async function exportComprehensionSpokenWordsZip(usedHand = "") {
  if (typeof JSZip === "undefined") {
    console.error("JSZip no esta disponible para exportar Comprension oral de palabras (Parte 7).");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(7);
  const hand = usedHand || partData.usedHand || "";
  const responses = partData.responses || {};

  const orderedKeys = Object.keys(responses)
    .map(Number)
    .filter((k) => Number.isFinite(k) && k > 1)
    .sort((a, b) => a - b);

  const rows = orderedKeys.map((key) => {
    const r = responses[String(key)] || {};
    return {
      "N° Ítem": r.item ?? key - 1,
      "Respuesta correcta": r.correctLetter || "",
      "Respuesta del participante": r.selectedLetter || "",
      "RT": r.RT ?? "",
      "Modo de respuesta": r.responseMode || "",
      "Puntaje": r.score ?? "",
      "Mano seleccionada": hand
    };
  });

  if (!rows.length) {
    console.warn("No hay respuestas de Comprension oral de palabras (Parte 7) para exportar.");
    return false;
  }

  const csvContent = toCSV(rows);

  const baseName = platformZipBase(7, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(7, participantId)}.csv`, csvContent);

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

export async function exportWrittenPhonologicalZip(usedHand = "") {
  if (typeof XLSX === "undefined" || typeof JSZip === "undefined") {
    console.error("XLSX o JSZip no estan disponibles para exportar Fonologico Parte 8.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(8);
  const hand = usedHand || partData.usedHand || "";
  const rows = (partData.writtenPhonologicalResponses || [])
    .filter((row) => row.itemNumber !== "Ej.")
    .map((row) => ({
      "N° Ítem": row.itemNumber,
      "Respuesta correcta": row.correctOption || "",
      "Respuesta del participante": row.selectedOption || "",
      "RT": row.RT ?? "",
      "Modo de respuesta": row.responseMode || "",
      "Puntaje": row.assignedScore ?? "",
      "Mano seleccionada": row.usedHand || hand
    }));

  if (!rows.length) {
    console.warn("No hay respuestas del Test Fonologico Parte 8 para exportar.");
    return false;
  }

  const csvContent = toCSV(rows);

  const baseName = platformZipBase(8, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(8, participantId)}.csv`, csvContent);

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

export async function exportOrationalPart9Zip(usedHand = "") {
  if (typeof XLSX === "undefined" || typeof JSZip === "undefined") {
    console.error("XLSX o JSZip no estan disponibles para exportar Oracional Parte 9.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(9);
  const hand = usedHand || partData.usedHand || "";
  const rows = (partData.orationalPart9Responses || [])
    .filter((row) => row.itemNumber !== "Ej.")
    .map((row) => ({
      "N° Ítem": row.itemNumber,
      "Respuesta correcta": row.correctLetter || "",
      "Respuesta del participante": row.selectedLetter || "",
      "RT": row.RT ?? "",
      "Modo de respuesta": row.responseMode || "",
      "Puntaje": row.assignedScore ?? "",
      "Mano seleccionada": row.usedHand || hand
    }));

  if (!rows.length) {
    console.warn("No hay respuestas del Test Oracional Parte 9 para exportar.");
    return false;
  }

  const csvContent = toCSV(rows);

  const baseName = platformZipBase(9, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(9, participantId)}.csv`, csvContent);

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

export async function exportOrationalPart10Zip(usedHand = "") {
  if (typeof XLSX === "undefined" || typeof JSZip === "undefined") {
    console.error("XLSX o JSZip no estan disponibles para exportar Oracional Parte 10.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(10);
  const hand = usedHand || partData.usedHand || "";
  const rows = (partData.orationalPart10Responses || [])
    .filter((row) => row.itemNumber !== "Ej.")
    .map((row) => ({
      "N° Ítem": row.itemNumber,
      "Respuesta correcta": row.correctLetter || "",
      "Respuesta del participante": row.selectedLetter || "",
      "RT": row.RT ?? "",
      "Modo de respuesta": row.responseMode || "",
      "Puntaje": row.assignedScore ?? "",
      "Mano seleccionada": row.usedHand || hand
    }));

  if (!rows.length) {
    console.warn("No hay respuestas del Test Oracional Parte 10 para exportar.");
    return false;
  }

  const csvContent = toCSV(rows);

  const baseName = platformZipBase(10, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(10, participantId)}.csv`, csvContent);

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

export async function exportOralParagraphsZip(usedHand = "") {
  if (typeof XLSX === "undefined" || typeof JSZip === "undefined") {
    console.error("XLSX o JSZip no estan disponibles para exportar Comprension oral de parrafos.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const partData = getPartData(11);
  const rows = (partData.oralParagraphResponses || []).map((row) => ({
    "N° párrafo": row.storyNumber,
    "N° ítem": row.questionNumber,
    "Respuesta correcta": row.correctAnswer,
    "Respuesta del participante": row.selectedAnswer
  }));

  if (!rows.length) {
    console.warn("No hay respuestas de Comprension oral de parrafos para exportar.");
    return false;
  }

  const csvContent = toCSV(rows);

  const baseName = platformZipBase(11, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(11, participantId)}.csv`, csvContent);

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(zipBlob);
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}
