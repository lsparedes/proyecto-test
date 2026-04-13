const KEY = "MODULO3_PROGRESS_V1";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { groups: {}, resultsByGroup: {} };
  } catch {
    return { groups: {}, resultsByGroup: {} };
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getGroupProgress(groupId) {
  const data = load();
  return data.groups?.[groupId] || {};
}

export function getTestProgress(groupId, testId) {
  const group = getGroupProgress(groupId);
  return group[testId] || { status: "not_started" };
}

export function setTestProgress(groupId, testId, patch) {
  const data = load();
  data.groups = data.groups || {};
  data.groups[groupId] = data.groups[groupId] || {};
  const current = data.groups[groupId][testId] || { status: "not_started" };
  data.groups[groupId][testId] = { ...current, ...patch };
  save(data);
}

export function resetGroupProgress(groupId) {
  const data = load();
  if (data.groups) delete data.groups[groupId];
  if (data.resultsByGroup) delete data.resultsByGroup[groupId];
  save(data);
}

export function addResult(groupId, row) {
  const data = load();
  data.resultsByGroup = data.resultsByGroup || {};
  data.resultsByGroup[groupId] = data.resultsByGroup[groupId] || [];
  data.resultsByGroup[groupId].push(row);
  save(data);
}

export function getResultsByGroup(groupId) {
  const data = load();
  return data.resultsByGroup?.[groupId] || [];
}
