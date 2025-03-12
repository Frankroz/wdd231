const classes = [
  { id: 231, class_name: "WDD231", type: "WDD", semester: 3 },
  { id: 111, class_name: "ITM111", type: "ITM", semester: 2 },
  { id: 131, class_name: "WDD131", type: "WDD", semester: 2 },
  { id: 130, class_name: "WDD130", type: "WDD", semester: 1 },
];

const btn_texts = ["All", ...new Set(classes.map((cls) => cls.type))];
const grid = document.getElementById("course-grid");
const certificate_btns = document.getElementById("certificate-btns");
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
  if (window.innerWidth >= 874) {
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

// Filter the classes depending on the button pressed
const filterClasses = (b) => {
  const newClasses = classes.filter((c) => c.type === b);

  displayClasses(newClasses);
};

// Display the class filters
const displayBtns = () => {
  certificate_btns.innerHTML = "";

  btn_texts.forEach((b) => {
    const btn = document.createElement("button");
    btn.innerText = b;

    btn.addEventListener("click", () => {
      const btns = certificate_btns.querySelectorAll("button");
      btns.forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      if (b === "All") {
        displayClasses(classes);
      } else {
        filterClasses(b);
      }
    });

    certificate_btns.appendChild(btn);
  });

  const allButton = certificate_btns.querySelector("button");
  if (allButton) {
    allButton.classList.add("active");
  }
};

// Display the classes from the list
const displayClasses = (filteredClasess) => {
  grid.innerHTML = "";

  filteredClasess.forEach((c) => {
    const btn = document.createElement("button");
    btn.innerText = c.class_name;
    btn.classList.add("semester" + c.semester);

    grid.appendChild(btn);
  });
};

displayClasses(classes);
displayBtns();
