var attractions = {};
// Get games from localStorage or "database"
if (localStorage.attractions) {
  attractions = JSON.parse(localStorage.attractions);
} else {
  attractions = await fetch("./data/attractions.json")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });

  localStorage.attractions = JSON.stringify(attractions);
}

const categories = [
  ...new Set(attractions.map((attraction) => attraction.category)),
];

const categoryFilter = document.getElementById("category");
const resetBtn = document.getElementById("reset");

// Create the options for the filters
function createTypeOptions(types) {
  categoryFilter.innerHTML =
    '<option value="def" selected="">Category...</option>';
  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.innerHTML = type;
    categoryFilter.appendChild(option);
  });
}

createTypeOptions(categories);

// Depending on the value of the filter, sort the games
function filterAttracctions() {
  const selectedCategory = categoryFilter.value;
  if (!resetBtn.classList.contains("enabled"))
    resetBtn.classList.toggle("enabled");

  if (selectedCategory === "def") {
    displayCards(attractions);
    return;
  }

  const newAttractions = attractions.filter(
    (attractionInfo) => attractionInfo.category === selectedCategory
  );

  displayCards(newAttractions);
}

categoryFilter.addEventListener("change", filterAttracctions);
// Reset button
resetBtn.addEventListener("click", () => {
  categoryFilter.value = "def";
  searchInput.value = "";
  resetBtn.disabled = true;
  resetBtn.classList.toggle("enabled");
  displayCards(attractions);
});

const cardList = document.getElementById("container");

// Display the cards in the container
function displayCards(attractions) {
  cardList.innerHTML = "";

  if (attractions.length === 0) {
    cardList.innerHTML = "<h3>Nothing found...</h3>";
    return;
  }

  attractions.forEach((attractionInfo) => {
    const card = document.createElement("a");
    card.href = `description.html?attraction=${attractionInfo.name.replaceAll(
      " ",
      "_"
    )}`;
    card.className = "card";
    card.id = attractionInfo.name.replaceAll(" ", "_");
    const cardContent = `<img src=${attractionInfo.image} alt="${attractionInfo.name}" loading="lazy"/>
             <h3>${attractionInfo.name}</h3>
             <p>${attractionInfo.description}</p>
             <p><strong>Category: </strong>${attractionInfo.category}</p>
             `;

    card.innerHTML = cardContent;
    cardList.appendChild(card);
  });
}

displayCards(attractions);
// Search by name/description
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("searchInput");
searchBtn.addEventListener("click", () => {
  resetBtn.disabled = false;
  if (!resetBtn.classList.contains("enabled"))
    resetBtn.classList.toggle("enabled");

  const newAttractions = attractions.filter((attractionInfo) => {
    return attractionInfo.name
      .toLowerCase()
      .includes(searchInput.value.toLowerCase());
  });

  displayCards(newAttractions);
});
