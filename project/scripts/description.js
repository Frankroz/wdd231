const url = window.location.href;
const item = url.split("=").pop();

let info;
let content = `<h1>404</h1>
                <h2>Content not found</h2>`;

// Search by attraction
if (url.includes("attraction")) {
  var attractions = {};

  // Get attractions from localStorage or "database"
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

  // Search the info we need
  info = attractions
    .filter((attraction) => {
      return attraction.name === item.replaceAll("_", " ");
    })
    .pop();

  // Create content for the website
  if (info) {
    content = `
    <h2>${info.name}</h2>
    <div class="img-map">
        <img src=${info.image} alt="${info.name}" loading="lazy"/>
        <div class="map-container">
            <h2>Location</h2>
            <div class="placeholder-map">
                <gmp-map
                center="5.0444902,-73.7978966"
                zoom="13"
                map-id="MAP"
                style="height: 400px;"
                >
                    <gmp-advanced-marker
                    position="${info.coordinates.latitude},${info.coordinates.longitude}"
                    title="${info.name}"
                    ></gmp-advanced-marker>
                </gmp-map>
            </div>
        </div>
    </div>
    <p><strong>Category: </strong>${info.category}</p>
    <p class="description">${info.longer_description}</p>`;
  }
  // Search by business
} else if (url.includes("business")) {
  var businesses = {};

  // Get businesses from localStorage or "database"
  if (localStorage.businesses) {
    businesses = JSON.parse(localStorage.businesses);
  } else {
    businesses = await fetch("./data/businesses.json")
      .then((response) => response.json())
      .catch((error) => {
        business.error("Error loading JSON:", error);
      });

    localStorage.businesss = JSON.stringify(businesses);
  }
  // Search the info we need
  info = businesses
    .filter((business) => {
      return business.name === item.replaceAll("_", " ");
    })
    .pop();

  // Create content for the website
  if (info) {
    content = `
    <h2>${info.name}</h2>
    <div class="img-map">
        <img src=${info.image} alt="${info.name}" loading="lazy"/>
        <div class="map-container">
            <h2>Location</h2>
            <div class="placeholder-map">
                <gmp-map
                center="5.0444902,-73.7978966"
                zoom="13"
                map-id="MAP"
                style="height: 400px;"
                >
                    <gmp-advanced-marker
                    position="${info.coordinates.latitude},${info.coordinates.longitude}"
                    title="${info.name}"
                    ></gmp-advanced-marker>
                </gmp-map>
            </div>
        </div>
    </div>
    <p><strong>Address: </strong>${info.address}</p>
    <p class="description">${info.longer_description}</p>`;
  }
  // Search by console
} else if (url.includes("news")) {
  var news = {};
  // Get consoles from localStorage or "database"
  if (localStorage.news) {
    news = JSON.parse(localStorage.news);
  } else {
    news = await fetch("./data/news.json")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error loading JSON:", error);
      });

    localStorage.news = JSON.stringify(news);
  }
  // Search the info we need
  info = news
    .filter((newInfo) => {
      return newInfo.title === item.replaceAll("_", " ");
    })
    .pop();
  // Create content for the website
  if (info) {
    content = `<img src=${info.image} alt="${info.name}" loading="lazy"/>
        <h2>${info.title}</h2>
        <p class="cardDate"><strong>${new Date(
          Date.parse(info.date)
        ).toDateString()}</strong></p>
        <p class="description">${info.longer_description}</p>`;
  }
}

const container = document.getElementById("content");
if (content.includes("404")) {
  document.querySelector("main").style.minHeight = "80vh";
}
container.innerHTML = content;
