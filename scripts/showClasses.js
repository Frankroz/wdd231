const classes = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: false,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

const btn_texts = ["All", ...new Set(classes.map((cls) => cls.subject))];
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
  const newClasses = classes.filter((c) => c.subject === b);

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
  let ccount = 0;
  grid.innerHTML = "";

  filteredClasess.forEach((c) => {
    const btn = document.createElement("button");
    btn.innerText = c.subject + c.number;
    if (c.completed) {
      ccount += c.credits;
      btn.classList.add("completed");
    } else {
      btn.classList.add("not-completed");
    }

    grid.appendChild(btn);
  });

  const pCredits = document.getElementById("total-credits");
  pCredits.innerHTML = "Total credits: " + ccount;
};

displayClasses(classes);
displayBtns();
