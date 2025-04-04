var businesses = {};
// Get games from localStorage or "database"
if (localStorage.businesses) {
  businesses = JSON.parse(localStorage.businesses);
} else {
  businesses = await fetch("./data/businesses.json")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });

  localStorage.businesses = JSON.stringify(businesses);
}

const businessCardList = document.getElementById("business-grid");
// Display the cards in the container
function displayCards(businesses) {
  businessCardList.innerHTML = "";
  if (businesses.length > 0) {
    businesses.forEach((businessInfo) => {
      const businessCard = document.createElement("a");
      businessCard.href = `description.html?business=${businessInfo.name.replaceAll(
        " ",
        "_"
      )}`;
      businessCard.className = "business-card";
      businessCard.id = businessInfo.name.replace(" ", "-");
      const businessCardContent = `<img src=${businessInfo.image} alt="${businessInfo.name}" loading="lazy"/>
    <h3>${businessInfo.name}</h3>
    <p>${businessInfo.description}</p>
    <p><strong>Address: </strong>${businessInfo.address}</p>`;

      businessCard.innerHTML = businessCardContent;
      businessCardList.appendChild(businessCard);
    });
  } else {
    businessCardList.innerHTML = "<h3>Nothing found...</h3>";
  }
}

displayCards(businesses);
// Search by name/description
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("searchInput");
const resetBtn = document.getElementById("reset");

searchBtn.addEventListener("click", () => {
  resetBtn.disabled = false;
  resetBtn.style.backgroundColor = "#959e33";
  resetBtn.style.color = "#fff";
  resetBtn.style.cursor = "pointer";
  const newConsoles = businesses.filter((businessInfo) => {
    return (
      businessInfo.name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      businessInfo.description
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    );
  });

  displayCards(newConsoles);
});

// Reset button
resetBtn.addEventListener("click", () => {
  resetBtn.disabled = true;
  resetBtn.style.backgroundColor = "#ddd";
  resetBtn.style.color = "#ccc";
  resetBtn.style.cursor = "auto";
  searchInput.value = "";
  displayCards(businesses);
});
