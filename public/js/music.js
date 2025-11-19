// GLOBAL MUSIC BAR CONTROL

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("globalAudio");
    const toggle = document.getElementById("gmToggle");
    const status = document.getElementById("gmStatusText");
    const bar = document.getElementById("globalMusicBar");

    bar.style.display = "flex"; // Always visible

    toggle.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            toggle.textContent = "⏸";
            status.textContent = "Playing";
        } else {
            audio.pause();
            toggle.textContent = "▶";
            status.textContent = "Paused";
        }
    });

    // Stop if user closes browser
    window.addEventListener("beforeunload", () => audio.pause());
});
