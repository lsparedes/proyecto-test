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
  24: ["1_name", "2_letters", "3_words"],
  25: ["WName"],
  26: ["WriDict"],
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
  return lines.join("\n");
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
    "numero de item": row.numero_item,
    "target mostrado": row.target_mostrado,
    "opcion seleccionada": row.opcion_seleccionada,
    "categoria de la opcion seleccionada": row.categoria_opcion_seleccionada,
    "puntaje": row.puntaje,
    "respuesta correcta": row.conteo_respuesta_correcta,
    "distractor semantico cercano": row.conteo_distractor_semantico_cercano,
    "distractor semantico lejano": row.conteo_distractor_semantico_lejano,
    "distractor no relacionado": row.conteo_distractor_no_relacionado
  }));

  sheetRows.push({});
  sheetRows.push({ "numero de item": "mano utilizada", "puntaje": hand });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(sheetRows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "RESULTADOS_PAN");
  const excelArray = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const baseName = platformZipBase(2, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(2, participantId)}.xlsx`, excelArray);

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

  if (!audioEntries.length) {
    console.warn("No hay audios WAV de Fluidez verbal para exportar.");
    return false;
  }

  const zip = new JSZip();
  let addedFiles = 0;

  for (const entry of audioEntries) {
    const blob = await getAudioBlob(entry.key);
    if (!blob) continue;

    const name = platformAudioName(3, addedFiles + 1, entry.label || `audio_${addedFiles + 1}`);
    zip.file(`${name}.wav`, blob);
    addedFiles++;
  }

  if (addedFiles === 0) {
    console.warn("No se encontraron blobs WAV guardados para Fluidez verbal.");
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

  if (!takes.length) {
    console.warn("No hay audios WAV de Repeticion de palabras para exportar.");
    return false;
  }

  const zip = new JSZip();
  let addedFiles = 0;

  for (const take of takes) {
    const blob = await getAudioBlob(take.key);
    if (!blob) continue;

    const ordinal = Number(take.screenIndex || 0) + 1;
    const label = platformAudioName(targetPartId, ordinal, take.label || `pantalla_${ordinal}`);
    const takeSuffix = Number(take.takeNumber || 1) > 1 ? `_${Number(take.takeNumber)}` : "";
    zip.file(`${label}${takeSuffix}.wav`, blob);
    addedFiles++;
  }

  if (addedFiles === 0) {
    console.warn("No se encontraron blobs WAV guardados para Repeticion de palabras.");
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
  const images = Object.values(partData.writingImages || {})
    .filter((entry) => entry && entry.dataUrl)
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

  if (partData.patientImage) {
    zip.file("LineB.png", dataUrlToBlob(partData.patientImage));
  }

  const sourceImages = [
    { path: partData.baseImage, name: "lineas.png" },
    { path: partData.scaleImage, name: "escala.png" }
  ];

  const comparisonBlob = await createLineBisectionComparisonBlob(partData.baseImage, partData.scaleImage);
  if (comparisonBlob) {
    zip.file("comparacion_lineas_escala.png", comparisonBlob);
  }

  for (const image of sourceImages) {
    if (!image.path) continue;
    try {
      const response = await fetch(image.path);
      if (response.ok) {
        zip.file(image.name, await response.blob());
      }
    } catch (err) {
      console.warn("No se pudo agregar imagen fuente al ZIP:", image.path, err);
    }
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
  const rows = (partData.shortTermMemoryResponses || []).map((row) => ({
    "numero de item": row.numero_item,
    "pantalla": row.pantalla,
    "opcion seleccionada": row.opcion_seleccionada,
    "opcion correcta": row.opcion_correcta,
    "es correcta": row.es_correcta ? "si" : "no",
    "puntaje": row.puntaje,
    "es ejemplo": row.es_ejemplo ? "si" : "no"
  }));

  if (!rows.length) {
    console.warn("No hay respuestas de Memoria a corto plazo para exportar.");
    return false;
  }

  rows.push({});
  rows.push({ "numero de item": "mano usada", "puntaje": hand });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "MEMORIA_CORTO_PLAZO");
  const excelArray = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const baseName = platformZipBase(4, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(4, participantId)}.xlsx`, excelArray);

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

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(responseRows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "HOJA_RESPUESTA");
  const excelArray = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const baseName = platformZipBase(5, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(5, participantId)}.xlsx`, excelArray);

  const sortedTakes = Object.entries(takes)
    .sort(([a], [b]) => Number(a) - Number(b));

  for (const [screenIndex, take] of sortedTakes) {
    const answerIndex = Math.max(Number(screenIndex) - 1, 0);
    const answer = sanitizeFilename(correctAnswers[answerIndex] || `pantalla_${screenIndex}`);
    const screenLabel = indexToPantomimeName(Number(screenIndex));

    if (take?.sin_camara) {
      zip.file(
        `videos/${screenLabel}_SIN_CAMARA.txt`,
        "No se genero video porque no habia camara disponible en este equipo."
      );
      continue;
    }

    if (!take?.key) continue;

    const blob = await getBlob(take.key);
    if (!blob) continue;

    zip.file(`videos/${screenLabel}.webm`, blob);
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
  const rows = (partData.calculationResponses || []).map((row) => ({
    "Operacion aritmetica": row.operacion_aritmetica,
    "Opcion elegida": row.opcion_elegida
  }));

  if (!rows.length) {
    console.warn("No hay respuestas de Calculo para exportar.");
    return false;
  }

  rows.push({});
  rows.push({
    "Operacion aritmetica": "Mano seleccionada",
    "Opcion elegida": hand
  });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "CALCULO");
  const excelArray = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const baseName = platformZipBase(6, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(6, participantId)}.xlsx`, excelArray);

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
  const rows = (partData.writtenPhonologicalResponses || []).map((row) => ({
    itemNumber: row.itemNumber,
    targetWord: row.targetWord,
    selectedOption: row.selectedOption,
    selectedCategory: row.selectedCategory,
    responseMode: row.responseMode,
    assignedScore: row.assignedScore,
    phonologicalDistinctiveFeatures: row.phonologicalDistinctiveFeatures,
    phonologicalPosition: row.phonologicalPosition
  }));

  if (!rows.length) {
    console.warn("No hay respuestas del Test Fonologico Parte 8 para exportar.");
    return false;
  }

  rows.push({});
  rows.push({ itemNumber: "mano utilizada", assignedScore: hand });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "RESULTADOS_FONOLOGICO_PART8");
  const excelArray = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const baseName = platformZipBase(8, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(8, participantId)}.xlsx`, excelArray);

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
  const rows = (partData.orationalPart9Responses || []).map((row) => ({
    itemNumber: row.itemNumber,
    screenNumber: row.screenNumber,
    "tipo de oración": row.sentenceType,
    "letra correcta": row.correctLetter,
    "letra seleccionada": row.selectedLetter,
    "respuesta correcta textual": row.correctSentence,
    "correcto/incorrecto": row.isCorrect ? "correcto" : "incorrecto",
    "modo de respuesta": row.responseMode,
    "puntaje obtenido": row.assignedScore
  }));

  if (!rows.length) {
    console.warn("No hay respuestas del Test Oracional Parte 9 para exportar.");
    return false;
  }

  rows.push({});
  rows.push({ itemNumber: "mano utilizada", "puntaje obtenido": hand });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "RESULTADOS_ORACIONAL_PART9");
  const excelArray = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const baseName = platformZipBase(9, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(9, participantId)}.xlsx`, excelArray);

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
  const rows = (partData.orationalPart10Responses || []).map((row) => ({
    itemNumber: row.itemNumber,
    screenNumber: row.screenNumber,
    "tipo de oración": row.sentenceType,
    "letra correcta": row.correctLetter,
    "letra seleccionada": row.selectedLetter,
    "respuesta correcta textual": row.correctSentence,
    "correcto/incorrecto": row.isCorrect ? "correcto" : "incorrecto",
    "modo de respuesta": row.responseMode,
    "puntaje obtenido": row.assignedScore
  }));

  if (!rows.length) {
    console.warn("No hay respuestas del Test Oracional Parte 10 para exportar.");
    return false;
  }

  rows.push({});
  rows.push({ itemNumber: "mano utilizada", "puntaje obtenido": hand });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "RESULTADOS_ORACIONAL_PART10");
  const excelArray = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const baseName = platformZipBase(10, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(10, participantId)}.xlsx`, excelArray);

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
  const hand = usedHand || partData.usedHand || "";
  const rows = (partData.oralParagraphResponses || []).map((row) => ({
    "historia": row.storyNumber,
    "numero de pregunta": row.questionNumber,
    "pregunta": row.questionText,
    "respuesta seleccionada": row.selectedAnswer,
    "respuesta correcta": row.correctAnswer,
    "correcto/incorrecto": row.isCorrect ? "correcto" : "incorrecto",
    "puntua": row.countsForScore ? "si" : "no",
    "puntaje obtenido": row.assignedScore
  }));

  if (!rows.length) {
    console.warn("No hay respuestas de Comprension oral de parrafos para exportar.");
    return false;
  }

  const scoredResponses = partData.oralParagraphResponses || [];
  const story1Score = scoredResponses
    .filter((row) => Number(row.storyNumber) === 1)
    .reduce((total, row) => total + Number(row.assignedScore || 0), 0);
  const story2Score = scoredResponses
    .filter((row) => Number(row.storyNumber) === 2)
    .reduce((total, row) => total + Number(row.assignedScore || 0), 0);
  const totalScore = story1Score + story2Score;

  rows.push({});
  rows.push({ "historia": "puntaje historia 1 sobre 2", "puntaje obtenido": story1Score });
  rows.push({ "historia": "puntaje historia 2 sobre 2", "puntaje obtenido": story2Score });
  rows.push({ "historia": "total correcto sobre 4", "puntaje obtenido": totalScore });
  rows.push({ "historia": "mano utilizada", "puntaje obtenido": hand });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "RESULTADOS_COMP_ORAL_PARRAFOS");
  const excelArray = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const baseName = platformZipBase(11, participantId, userInitials);
  const zip = new JSZip();
  zip.file(`${platformResultFile(11, participantId)}.xlsx`, excelArray);

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
