const music = document.getElementById("bgMusic");
const ctrl = document.getElementById("musicControl");

ctrl.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        ctrl.innerHTML = "🔊";
    } else {
        music.pause();
        ctrl.innerHTML = "🔇";
    }
});