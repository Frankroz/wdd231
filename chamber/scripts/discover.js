document.addEventListener("DOMContentLoaded", () => {
  fetch("./data/discover.json")
    .then((response) => response.json())
    .then((data) => {
      const cardsContainer = document.getElementById("discover-cards");
      data.items.forEach((item) => {
        const card = document.createElement("div");
        card.className = "discover-card";
        card.innerHTML = `
                    <h2 class="card-title">${item.name}</h2>
                    <figure class="card-image">
                        <img src="${item.image}" alt="${item.name}">
                    </figure>
                    <address class="card-address">${item.address}</address>
                    <p class="card-description">${item.description}</p>
                    <button class="card-button">Learn More</button>
                `;
        cardsContainer.appendChild(card);
      });
    });

  // Last Visit Logic
  const lastVisitDate = localStorage.getItem("lastVisit");
  const currentDate = Date.now();
  let message = "";

  if (!lastVisitDate) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDiff = currentDate - parseInt(lastVisitDate);
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 1) {
      message = "Back so soon! Awesome!";
    } else {
      message = `You last visited ${daysDiff} ${
        daysDiff === 1 ? "day" : "days"
      } ago.`;
    }
  }

  document.getElementById("visit-message").textContent = message;
  localStorage.setItem("lastVisit", currentDate);
});
