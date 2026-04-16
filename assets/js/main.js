// Setup instructions page interactions
(() => {
  const setupBody = document.getElementById("setupInstructionBody");
  const setupTitle = document.getElementById("setupInstructionTitle");
  const setupSummary = document.getElementById("setupInstructionSummary");
  const guideButtons = document.querySelectorAll(".setup-guide-link[data-guide-key]");

  if (!setupBody || !setupTitle || !setupSummary || guideButtons.length === 0) {
    return;
  }

  const activateGuide = (guideKey) => {
    const template = document.getElementById(`setup-guide-template-${guideKey}`);
    if (!template) return;

    const contentRoot = template.content.firstElementChild;
    if (!contentRoot) return;

    const guideTitle = contentRoot.dataset.guideTitle || "Setup Instructions";
    const guideSummary =
      contentRoot.dataset.guideSummary ||
      "Select a setup link from the left menu to view the step-by-step instructions.";

    setupTitle.textContent = guideTitle;
    setupSummary.textContent = guideSummary;
    setupBody.innerHTML = contentRoot.innerHTML;

    guideButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.guideKey === guideKey);
    });

    if (window.location.hash !== `#guide-${guideKey}`) {
      window.history.replaceState(null, "", `#guide-${guideKey}`);
    }
  };

  guideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const { guideKey } = button.dataset;
      activateGuide(guideKey);
    });
  });

  const hashMatch = window.location.hash.match(/^#guide-(.+)$/);
  if (hashMatch && hashMatch[1]) {
    activateGuide(hashMatch[1]);
  }
})();
