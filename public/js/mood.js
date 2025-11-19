const moodIcons = document.querySelectorAll(".mood-icon");
const moodChart = document.getElementById("moodChart");

// Load saved moods
let moodData = JSON.parse(localStorage.getItem("moodData")) || [];

function renderChart() {
  moodChart.innerHTML = "";

  moodData.slice(-30).forEach(mood => {
    let bar = document.createElement("div");
    bar.classList.add("mood-bar", `mood-${mood.type}`);

    bar.style.height = mood.type === "happy" ? "100px" :
                       mood.type === "neutral" ? "60px" : "30px";

    moodChart.appendChild(bar);
  });
}

moodIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    const selectedMood = icon.dataset.mood;

    moodData.push({
      type: selectedMood,
      date: new Date().toLocaleDateString()
    });

    localStorage.setItem("moodData", JSON.stringify(moodData));

    renderChart();
  });
});

// Initial chart render
renderChart();
