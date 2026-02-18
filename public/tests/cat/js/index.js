import { CAT } from "./cat_script.js";
import {
    getAllProgress,
    getPartProgress,
    resetPartProgress,
    resetAllProgress
} from "./storage.js";
import { exportPartToCSV } from "./export.js";


const tbody = document.getElementById("partsTbody");
const summaryText = document.getElementById("summaryText");
const btnResetAll = document.getElementById("btnResetAll");
const btnExport = document.getElementById("btnExport");

function badgeFor(status) {
    if (status === "done") return `<span class="badge-soft badge-done">Completado</span>`;
    if (status === "in_progress") return `<span class="badge-soft badge-progress">En progreso</span>`;
    return `<span class="badge-soft badge-pending">Pendiente</span>`;
}

function goRun(partId, resume) {
    const url = new URL("run.html", window.location.href);
    url.searchParams.set("part", partId);
    if (resume) url.searchParams.set("resume", "1");
    window.location.href = url.toString();
}

function render() {
    tbody.innerHTML = "";

    let done = 0, progress = 0, pending = 0;

    CAT.parts.forEach(part => {
        const p = getPartProgress(part.id);
        const status = p?.status || "not_started";

        if (status === "done") done++;
        else if (status === "in_progress") progress++;
        else pending++;

        const tr = document.createElement("tr");

        tr.innerHTML = `
      <td class="mono fw-semibold">${String(part.id).padStart(2, "0")}</td>
      <td>
        <div class="fw-semibold">${part.name}</div>
        <div class="text-muted small">${part.group || ""}</div>
      </td>
      <td>${badgeFor(status)}</td>
      <td class="text-end">
        <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-primary btn-sm" data-action="start" data-id="${part.id}">Iniciar</button>
            <button class="btn btn-warning btn-sm" data-action="resume" data-id="${part.id}">Reanudar</button>
            <button class="btn btn-outline-danger btn-sm" data-action="restart" data-id="${part.id}">Reiniciar</button>
            <button class="btn btn-outline-secondary btn-sm" data-action="export" data-id="${part.id}">Exportar</button>
        </div>
        </td>
    `;

        tbody.appendChild(tr);
    });

    summaryText.textContent = `✔ ${done}  •  ⏳ ${progress}  •  🟦 ${pending}`;
}

tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const action = btn.dataset.action;
    const partId = Number(btn.dataset.id);

    if (action === "start") {
        resetPartProgress(partId);
        goRun(partId, false);
    }

    if (action === "resume") {
        goRun(partId, true);
    }

    if (action === "restart") {
        if (confirm("¿Reiniciar esta parte?")) {
            resetPartProgress(partId);
            render();
        }
    }

    if (action === "export") {
        exportPartToCSV(partId);
    }

});

btnResetAll.addEventListener("click", () => {
    if (confirm("¿Reiniciar TODO el CAT?")) {
        resetAllProgress();
        render();
    }
});

btnExport.addEventListener("click", () => {
    alert("Cuando conectemos export.js, aquí exportaremos el CSV.");
});

render();
