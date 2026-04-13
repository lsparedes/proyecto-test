import { MODULO3 } from "./cat_script.js";
import { addResult, setTestProgress } from "./storage.js";

const url = new URL(window.location.href);
const partId = Number(url.searchParams.get("part") || "1");
const stepIndex = Number(url.searchParams.get("step") || "1");

const group = MODULO3.groups.find((item) => item.id === partId) || MODULO3.groups[0];
const test = group.tests.find((item) => item.id === stepIndex) || group.tests[0];
const nextTest = group.tests.find((item) => item.id === test.id + 1) || null;

const runGroupTitle = document.getElementById("runGroupTitle");
const runPartName = document.getElementById("runPartName");
const runCode = document.getElementById("runCode");
const runTitle = document.getElementById("runTitle");
const runDescription = document.getElementById("runDescription");
const runNote = document.getElementById("runNote");
const runInstructions = document.getElementById("runInstructions");
const backLink = document.getElementById("backLink");
const btnMarkDone = document.getElementById("btnMarkDone");
const btnNext = document.getElementById("btnNext");
const activeBlock = document.getElementById(`part-${group.id}-test-${test.id}`);

runGroupTitle.textContent = group.title;
runPartName.textContent = `Parte ${group.id}`;
runCode.textContent = `Parte ${group.id} | Test ${String(test.id).padStart(2, "0")}`;
runTitle.textContent = test.name;
runDescription.textContent = test.description;
runNote.textContent = ` ${test.note}`;
runInstructions.textContent = test.instructions;

if (activeBlock) {
  activeBlock.classList.add("is-active");
}

setTestProgress(group.id, test.id, {
  status: "in_progress",
  updatedAt: new Date().toISOString()
});

backLink.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  window.close();
});

btnMarkDone.addEventListener("click", () => {
  setTestProgress(group.id, test.id, {
    status: "done",
    updatedAt: new Date().toISOString()
  });

  addResult(group.id, {
    group_id: group.id,
    group_title: group.title,
    test_id: test.id,
    test_name: test.name,
    status: "done",
    completed_at: new Date().toISOString()
  });

  alert("Test marcado como completado.");
});

btnNext.addEventListener("click", () => {
  if (!nextTest) {
    alert("Parte completada.");
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.close();
    return;
  }

  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("part", String(group.id));
  nextUrl.searchParams.set("step", String(nextTest.id));
  window.location.href = nextUrl.toString();
});
