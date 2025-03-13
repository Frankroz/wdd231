const menu = document.querySelector("nav");
const menu_icon = document.getElementById("menu_icon");
const header = document.querySelector("header");

// Create a function for the menu icon
menu_icon.addEventListener("click", () => {
  if (menu_icon.src.toLowerCase().includes("menu")) {
    menu_icon.setAttribute("src", "./images/close_icon.png");
    menu.classList.add("show");
    menu.style.display = "flex";
  } else {
    menu_icon.setAttribute("src", "./images/menu_icon.png");
    menu.classList.remove("show");
    menu.style.display = "none";
  }
});

// Function to handle resize event
const handleResize = () => {
  if (window.innerWidth >= 900) {
    menu.style.display = "flex";
    menu.classList.remove("show");
    menu_icon.style.display = "none";
  } else {
    menu.style.display = "none";
    menu_icon.style.display = "block";
  }
};

// Initial check and event listener for resize
handleResize();
window.addEventListener("resize", handleResize);
