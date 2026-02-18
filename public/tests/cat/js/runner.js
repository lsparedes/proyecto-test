import { CAT } from "./cat_script.js";
import { getPartProgress, setPartProgress } from "./storage.js";

const miniBar = document.getElementById("miniBar");
const btnBack = document.getElementById("btnBack");

btnBack.addEventListener("click", () => {
  window.location.href = "index.html";
});

const url = new URL(window.location.href);
const partId = Number(url.searchParams.get("part") || "0");
const resume = url.searchParams.get("resume") === "1";

const part = CAT.parts.find(p => p.id === partId);
if (!part) {
  miniBar.textContent = "Parte no encontrada";
  throw new Error("Parte no encontrada");
}

const step = part.steps?.[0];
if (!step) {
  miniBar.textContent = "Parte aún no configurada";
  throw new Error("Parte sin steps");
}

// Layouts
const layoutSemantic = document.getElementById("layoutSemantic");
const layoutCalc = document.getElementById("layoutCalc");

function showLayout(which) {
  layoutSemantic.style.display = (which === "semantic") ? "block" : "none";
  layoutCalc.style.display = (which === "calc") ? "block" : "none";
}

/* =========================
   SEMANTIC MATCH (Parte 2)
========================= */
function runSemanticMatch(step) {
  showLayout("semantic");

  const centerImg = document.getElementById("centerImg");
  const optBoxes = [
    document.getElementById("opt0"),
    document.getElementById("opt1"),
    document.getElementById("opt2"),
    document.getElementById("opt3"),
  ];
  const optImgs = [
    document.getElementById("img0"),
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
  ];

  const trials = step.trials || [];
  if (!trials.length) throw new Error("Sin trials");

  let trialIndex = 0;
  const saved = getPartProgress(partId);
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.trialIndex)) {
    trialIndex = Math.min(Math.max(saved.trialIndex, 0), trials.length - 1);
  }

  setPartProgress(partId, { status:"in_progress", stepIndex:0, totalSteps:1, trialIndex });

  function clearSelection(){ optBoxes.forEach(b=>b.classList.remove("selected")); }

  function renderTrial(){
    clearSelection();
    const t = trials[trialIndex];
    centerImg.src = t.center;
    for(let i=0;i<4;i++) optImgs[i].src = t.options[i];
    miniBar.textContent = `Parte 02 · Ensayo ${trialIndex+1}/${trials.length}`;
    setPartProgress(partId, { trialIndex });
  }

  optBoxes.forEach(box=>{
    box.onclick = () => {
      const idx = Number(box.dataset.opt);
      clearSelection();
      box.classList.add("selected");

      // básico: seleccionar => siguiente
      trialIndex++;
      if (trialIndex >= trials.length) {
        setPartProgress(partId, { status:"done", trialIndex: trials.length-1 });
        window.location.href = "index.html";
        return;
      }
      setPartProgress(partId, { status:"in_progress", trialIndex });
      renderTrial();
    };
  });

  renderTrial();
}

/* =========================
   MCQ IMAGE (Parte 6)
========================= */
function runCalcMCQ(step) {
  showLayout("calc");

  const promptImg = document.getElementById("calcPromptImg");
  const optBoxes = Array.from(document.querySelectorAll("#calcOptions .opt5"));
  const optImgs = [
    document.getElementById("cimg0"),
    document.getElementById("cimg1"),
    document.getElementById("cimg2"),
    document.getElementById("cimg3"),
    document.getElementById("cimg4"),
  ];

  const trials = step.trials || [];
  if (!trials.length) throw new Error("Sin trials");

  let trialIndex = 0;
  const saved = getPartProgress(partId);
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.trialIndex)) {
    trialIndex = Math.min(Math.max(saved.trialIndex, 0), trials.length - 1);
  }

  setPartProgress(partId, { status:"in_progress", stepIndex:0, totalSteps:1, trialIndex });

  function clearSelection(){ optBoxes.forEach(b=>b.classList.remove("selected")); }

  function renderTrial(){
    clearSelection();
    const t = trials[trialIndex];
    promptImg.src = t.promptImg;
    for(let i=0;i<5;i++) optImgs[i].src = t.options[i];
    miniBar.textContent = `Parte 06 · Ejercicio ${trialIndex+1}/${trials.length}`;
    setPartProgress(partId, { trialIndex });
  }

  optBoxes.forEach(box=>{
    box.onclick = () => {
      const idx = Number(box.dataset.opt);
      clearSelection();
      box.classList.add("selected");

      // básico: seleccionar => siguiente
      trialIndex++;
      if (trialIndex >= trials.length) {
        setPartProgress(partId, { status:"done", trialIndex: trials.length-1 });
        window.location.href = "index.html";
        return;
      }
      setPartProgress(partId, { status:"in_progress", trialIndex });
      renderTrial();
    };
  });

  renderTrial();
}

// Router por tipo de step
if (step.type === "semantic_match") runSemanticMatch(step);
else if (step.type === "mcq_image") runCalcMCQ(step);
else {
  miniBar.textContent = `Tipo no soportado: ${step.type}`;
  throw new Error("Tipo no soportado");
}
