import { MODULO3 } from "./cat_script.js";
import { exportGroupToCSV } from "./export.js";
import { getTestProgress, resetGroupProgress } from "./storage.js";

const url = new URL(window.location.href);
const groupId = Number(url.searchParams.get("group") || "1");
const group = MODULO3.groups.find((item) => item.id === groupId) || MODULO3.groups[0];

const groupTitle = document.getElementById("groupTitle");
const groupSubtitle = document.getElementById("groupSubtitle");
const tbody = document.getElementById("partsTbody");
const summaryText = document.getElementById("summaryText");
const btnResetAll = document.getElementById("btnResetAll");
const btnExport = document.getElementById("btnExport");

function badgeFor(status) {
  if (status === "done") return `<span class="badge-soft badge-done">Completado</span>`;
  if (status === "in_progress") return `<span class="badge-soft badge-progress">En progreso</span>`;
  return `<span class="badge-soft badge-pending">Pendiente</span>`;
}

function goRun(testId, resume) {
  const nextUrl = new URL("run.html", window.location.href);
  nextUrl.searchParams.set("group", group.id);
  nextUrl.searchParams.set("part", testId);
  if (resume) nextUrl.searchParams.set("resume", "1");
  window.location.href = nextUrl.toString();
}

function render() {
  groupTitle.textContent = group.title;
  groupSubtitle.textContent = group.subtitle;
  tbody.innerHTML = "";

  let done = 0;
  let progress = 0;
  let pending = 0;

  group.tests.forEach((test) => {
    const state = getTestProgress(group.id, test.id);
    const status = state.status || "not_started";

    if (status === "done") done++;
    else if (status === "in_progress") progress++;
    else pending++;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="mono fw-semibold">${String(test.id).padStart(2, "0")}</td>
      <td>
        <div class="fw-semibold">${test.name}</div>
        <div class="text-muted small">${test.description}</div>
      </td>
      <td>${badgeFor(status)}</td>
      <td class="text-end">
        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-primary btn-sm" data-action="start" data-id="${test.id}">Iniciar</button>
          <button class="btn btn-warning btn-sm" data-action="resume" data-id="${test.id}">Reanudar</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  summaryText.textContent = `OK ${done} | PROG ${progress} | PEND ${pending}`;
}

tbody.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const testId = Number(button.dataset.id);

  if (action === "start") goRun(testId, false);
  if (action === "resume") goRun(testId, true);
});

btnResetAll.addEventListener("click", () => {
  if (confirm("Reiniciar el progreso de esta parte?")) {
    resetGroupProgress(group.id);
    render();
  }
});

btnExport.addEventListener("click", () => {
  exportGroupToCSV(group.id);
});

render();
