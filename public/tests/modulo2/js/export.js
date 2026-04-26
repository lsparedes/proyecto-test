import { CAT } from "./cat_script.js";
import { getPartData, getResultsByPart } from "./storage.js";

function sanitizeFilename(name) {
  return (name || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "_");
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
    const response = await fetch("/get-authenticated-user");
    if (!response.ok) return fallback;

    const user = await response.json();
    const fullName = `${user?.name || ""} ${user?.last_name || ""}`.trim();
    return fullName || fallback;
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
  const userName = sanitizeFilename(await getAuthenticatedUserNameFallback(participantId));
  const partData = getPartData(2);
  const rows = (partData.semanticPanResponses || []).filter((row) => row.numero_item !== "Ej.");
  const hand = usedHand || partData.usedHand || "";

  const totals = rows.reduce((acc, row) => {
    acc.correctas += Number(row.conteo_respuesta_correcta || 0);
    acc.cercanos += Number(row.conteo_distractor_semantico_cercano || 0);
    acc.lejanos += Number(row.conteo_distractor_semantico_lejano || 0);
    acc.noRelacionados += Number(row.conteo_distractor_no_relacionado || 0);
    return acc;
  }, {
    correctas: 0,
    cercanos: 0,
    lejanos: 0,
    noRelacionados: 0
  });

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
  sheetRows.push({ "numero de item": "TOTALES" });
  sheetRows.push({ "numero de item": "total de respuestas correctas", "puntaje": totals.correctas });
  sheetRows.push({ "numero de item": "total de distractores semanticos cercanos", "puntaje": totals.cercanos });
  sheetRows.push({ "numero de item": "total de distractores semanticos lejanos", "puntaje": totals.lejanos });
  sheetRows.push({ "numero de item": "total de distractores no relacionados", "puntaje": totals.noRelacionados });
  sheetRows.push({});
  sheetRows.push({ "numero de item": "mano utilizada", "puntaje": hand });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(sheetRows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "RESULTADOS_PAN");
  const excelArray = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const baseName = `${participantId}_${userName}_20_Memoria_semantica`;
  const zip = new JSZip();
  zip.file(`${baseName}.xlsx`, excelArray);

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
