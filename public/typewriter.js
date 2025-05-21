document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("typewriter");
  if (!(container instanceof HTMLElement)) return;

  const caret = container.querySelector(".caret");
  if (!(caret instanceof HTMLElement)) return;

  const lineElements = Array.from(container.querySelectorAll(".line")).filter(
    (el) => el instanceof HTMLElement
  );

  let lineIndex = 0;
  let charIndex = 0;

  function typeLine() {
    if (lineIndex >= lineElements.length) {
      caret.style.display = "none"; // Skjul caret når færdig
      return;
    }

    const lineEl = lineElements[lineIndex];
    const text = lineEl.getAttribute("data-content") || "";
    const className = lineEl.getAttribute("data-class");

    if (className) lineEl.classList.add(className);

    lineEl.textContent = text.slice(0, charIndex);

    caret.style.top = `${lineEl.offsetTop}px`;
    caret.style.left = `${lineEl.offsetLeft + lineEl.offsetWidth}px`;

    if (charIndex < text.length) {
      charIndex++;
      setTimeout(typeLine, 80);
    } else {
      charIndex = 0;
      lineIndex++;
      setTimeout(typeLine, 400);
    }
  }

  typeLine();
});
