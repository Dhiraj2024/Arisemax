window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    document.getElementById("loader").style.transition = "0.5s";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 500);
  }, 500);
});
