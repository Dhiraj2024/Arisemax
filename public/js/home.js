// HOME PAGE "Know Yourself" BUTTON → START GLOBAL MUSIC

document.addEventListener("DOMContentLoaded", () => {
    const knowBtn = document.getElementById("knowBtn");
    const audio = document.getElementById("globalAudio");
    const toggle = document.getElementById("gmToggle");
    const status = document.getElementById("gmStatusText");

    if (knowBtn) {
        knowBtn.addEventListener("click", () => {
            audio.play();
            toggle.textContent = "⏸";
            status.textContent = "Playing";
        });
    }
});
const knowBtn = document.getElementById("knowBtn");
const hoverSound = document.getElementById("hoverSound");

if (knowBtn && hoverSound) {
  knowBtn.addEventListener("mouseenter", () => {
    hoverSound.volume = 0.4;
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
}
