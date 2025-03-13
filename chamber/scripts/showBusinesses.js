const businesses = document.getElementById("business-cards-container");
const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");

const showBusinesses = async () => {
  try {
    businesses.innerHTML = "";

    const response = await fetch("./data/members.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
      data.forEach((business) => {
        const businessCard = document.createElement("div");
        businessCard.classList.add("business-card");

        const bHeader = document.createElement("div");
        bHeader.classList.add("business-header");
        const h3 = document.createElement("h3");
        h3.textContent = business.name;

        const pTagline = document.createElement("p");
        pTagline.textContent =
          business.other_information.tagline || "No Tagline";

        bHeader.appendChild(h3);
        bHeader.appendChild(pTagline);

        const content = document.createElement("div");
        content.classList.add("business-content");

        const img = document.createElement("img");
        img.src = `./images/${business.image}` || "placeholder-business.png";
        img.alt = business.name;

        const info = document.createElement("div");

        const pEmail = document.createElement("p");
        pEmail.textContent = `Email: ${
          business.phone_number || "No Phone Number"
        }`;

        const pPhone = document.createElement("p");
        pPhone.textContent = `Phone: ${
          business.phone_number || "No Phone Number"
        }`;

        const pURL = document.createElement("p");
        pURL.innerHTML = `Url: <a href="${business.website_url}" target="_blank">${business.website_url}</a>`;

        info.appendChild(pEmail);
        info.appendChild(pPhone);
        info.appendChild(pURL);

        content.appendChild(img);
        content.appendChild(info);

        businessCard.appendChild(bHeader);
        businessCard.appendChild(content);

        businesses.appendChild(businessCard);
      });
    } else {
      throw new Error("Failed to load JSON data.");
    }
  } catch (error) {
    businesses.innerHTML = "<p>Error loading business data.</p>";
    throw new Error("Fetching or parsing JSON failed:", error);
  }
};

gridViewBtn.addEventListener("click", () => {
  const bHeaders = document.querySelectorAll(".business-header");
  for (const bHeader of bHeaders) {
    bHeader.classList.remove("list-view-header");
  }
  businesses.classList.remove("list-view");
  gridViewBtn.classList.add("active");
  listViewBtn.classList.remove("active");
});

listViewBtn.addEventListener("click", () => {
  const bHeaders = document.querySelectorAll(".business-header");
  for (const bHeader of bHeaders) {
    bHeader.classList.add("list-view-header");
  }
  businesses.classList.add("list-view");
  listViewBtn.classList.add("active");
  gridViewBtn.classList.remove("active");
});

showBusinesses();
