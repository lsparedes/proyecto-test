import { MODULO3 } from "./cat_script.js";
import { getResultsByGroup } from "./storage.js";

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

function toCSV(rows) {
  if (!rows.length) return "";

  const headers = Object.keys(rows[0]);
  const esc = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.map(esc).join(",")];

  rows.forEach((row) => {
    lines.push(headers.map((header) => esc(row[header])).join(","));
  });

  return lines.join("\n");
}

export function exportGroupToCSV(groupId) {
  const group = MODULO3.groups.find((item) => item.id === Number(groupId));
  const rows = getResultsByGroup(groupId);

  if (!rows.length) {
    alert("Esta parte aun no tiene resultados para exportar.");
    return;
  }

  const csv = toCSV(rows);
  const filename = `MODULO3_P${groupId}_${(group?.title || "Parte").replace(/\s+/g, "_")}.csv`;
  downloadText(filename, csv);
}
