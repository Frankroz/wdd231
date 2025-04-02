const toggleButton = document.getElementById("menu_icon");
const close_btn = document.getElementById("close_icon");
const nav = document.querySelector("nav");

toggleButton.addEventListener("click", () => {
  nav.classList.toggle("show-nav");
  close_btn.style.display = "block";
  toggleButton.style.display = "none";
});

close_btn.addEventListener("click", () => {
  nav.classList.toggle("show-nav");
  close_btn.style.display = "none";
  toggleButton.style.display = "block";
});
