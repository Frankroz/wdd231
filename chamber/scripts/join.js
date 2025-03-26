document.getElementById("timestamp").value = new Date().toISOString();

document.querySelectorAll(".membership-card a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(this.getAttribute("href")).style.display = "block";
  });
});

document.querySelectorAll(".close").forEach((close) => {
  close.addEventListener("click", function () {
    this.closest(".modal").style.display = "none";
  });
});

window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};
