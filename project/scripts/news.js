var news = {};
// Get news from localStorage or "database"
if (localStorage.news) {
  news = JSON.parse(localStorage.news);
} else {
  news = await fetch("./data/news.json")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });

  localStorage.news = JSON.stringify(news);
}

const newNews_container = document.getElementById("new_news");
const newNews = news.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

// Show the lastest news on the page
function displayLatestNews() {
  newNews_container.innerHTML = "";

  newNews.forEach((newsInfo) => {
    const card = document.createElement("a");
    card.href = `description.html?news=${newsInfo.title.replaceAll(" ", "_")}`;
    card.className = "news-item";
    card.id = newsInfo.title.replace(" ", "-");
    const cardContent = `<img src="${
      newsInfo.image
    }" alt="${newsInfo.title.replaceAll(
      " ",
      "_"
    )}" loading="lazy" class="placeholder-news" />
    <h3>${newsInfo.title}</h3>
    <p>${newsInfo.summary}</p>
    <p><strong>${new Date(Date.parse(newsInfo.date)).toDateString()}</strong></p>`;

    card.innerHTML = cardContent;
    newNews_container.appendChild(card);
  });
}

displayLatestNews();

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("searchInput");
// Search by name/description

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const newNews = news.filter((card) => {
      return (
        card.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        card.content.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    });

    displayCards(newNews);
  });
}

const dateSort = document.getElementById("sort-date");
const resetBtn = document.getElementById("reset");
// Depending on the value of the filter, sort the News
function sortNews() {
  let newNews = [];

  if (resetBtn.disabled === true) {
    resetBtn.disabled = false;
  }

  if (dateSort.value === "latest") {
    newNews = news.toSorted((a, b) => (a.date < b.date ? 1 : -1));
  } else if (dateSort.value === "oldest") {
    newNews = news.toSorted((a, b) => (a.date > b.date ? 1 : -1));
  }

  displayCards(newNews);
}

// Reset button
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    dateSort.value = "def";

    resetBtn.disabled = true;
    displayCards(news);
  });
}
if (dateSort) {
  dateSort.addEventListener("change", sortNews);
}
