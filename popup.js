const dialog = document.createElement("dialog");
dialog.className = "philosophy-dialog";
dialog.setAttribute("aria-labelledby", "philosophy-dialog-title");
dialog.innerHTML = `
  <div class="philosophy-dialog-content">
    <p class="eyebrow">A question from Descartes</p>
    <h2 id="philosophy-dialog-title">A brief interruption</h2>
    <img src="images/Chudcartes.jpg" alt="Chudcartes, a humorous image of Descartes reimagined in the world of Westworld">
    <img src="images/Chudcartes.jpg" alt="" aria-hidden="true">
    <img src="images/Chudcartes.jpg" alt="" aria-hidden="true">
    <form>
      <label for="philosophy-answer">STOP AND THINK! Are you thinking? Are you sure? Think about thinking! If you know you are thinking, can you prove that the thought is yours? Write it down! Really think about it!</label>
      <textarea id="philosophy-answer" name="answer" rows="3" required></textarea>
      <p class="dialog-status" aria-live="polite"></p>
      <button type="submit">Answer &amp; continue</button>
    </form>
  </div>
`;
document.body.append(dialog);

const form = dialog.querySelector("form");
const answer = dialog.querySelector("textarea");
const submitButton = dialog.querySelector("button");
const status = dialog.querySelector(".dialog-status");
let answered = false;
let timer;

function schedulePopup() {
  const minimumDelay = 30 * 1000;
  const maximumDelay = 90 * 1000;
  const delay = minimumDelay + Math.random() * (maximumDelay - minimumDelay);
  timer = window.setTimeout(() => {
    answered = false;
    answer.disabled = false;
    answer.value = "";
    submitButton.textContent = "Answer & continue";
    status.textContent = "";
    dialog.showModal();
    answer.focus();
  }, delay);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!answered) {
    if (!form.reportValidity()) return;
    answered = true;
    answer.disabled = true;
    submitButton.textContent = "Close";
    status.textContent = "Thank you for considering the question. You may now close this window.";
    submitButton.focus();
    return;
  }
  dialog.close();
});

dialog.addEventListener("cancel", () => {
  answered = true;
});

dialog.addEventListener("close", schedulePopup);

schedulePopup();
