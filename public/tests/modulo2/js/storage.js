// js/storage.js

const KEY = "CAT_PROGRESS_V1";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { parts: {}, results: [] };
  } catch {
    return { parts: {}, results: [] };
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

/* ============================
   EXPORTS
============================ */

export function getAllProgress() {
  return load();
}

export function getPartProgress(partId) {
  const data = load();
  return data.parts?.[partId] || {
    status: "not_started",
    stepIndex: 0,
    totalSteps: 0
  };
}

export function setPartProgress(partId, patch) {
  const data = load();
  data.parts = data.parts || {};

  const current = data.parts[partId] || {
    status: "not_started",
    stepIndex: 0,
    totalSteps: 0
  };

  data.parts[partId] = { ...current, ...patch };
  save(data);
}

export function resetPartProgress(partId) {
  const data = load();
  if (data.parts) delete data.parts[partId];
  save(data);
}

export function resetAllProgress() {
  localStorage.removeItem(KEY);
}

// ===== Resultados por parte =====

export function addResult(partId, row) {
  const data = load();
  data.resultsByPart = data.resultsByPart || {};
  data.resultsByPart[partId] = data.resultsByPart[partId] || [];
  data.resultsByPart[partId].push(row);
  save(data);
}

export function getResultsByPart(partId) {
  const data = load();
  return (data.resultsByPart && data.resultsByPart[partId]) ? data.resultsByPart[partId] : [];
}

export function clearResultsByPart(partId) {
  const data = load();
  if (data.resultsByPart) delete data.resultsByPart[partId];
  save(data);
}

export function setPartData(partId, dataPatch) {
  const data = load();
  data.partData = data.partData || {};
  const current = data.partData[partId] || {};
  data.partData[partId] = { ...current, ...dataPatch };
  save(data);
}

export function getPartData(partId) {
  const data = load();
  return (data.partData && data.partData[partId]) ? data.partData[partId] : {};
}
