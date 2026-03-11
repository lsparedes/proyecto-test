import { CAT } from "./cat_script.js";
import { getResultsByPart } from "./storage.js";

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
