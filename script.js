const cardsPerPage = 10;
let currentPage = 1;
let filteredBooks = [];

function renderCards() {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const pageItems = filteredBooks.slice(startIndex, endIndex);

  for (const book of pageItems) {
    const card = document.createElement("div");
    card.className = "card";

    const title = `<h2>《<a href="${book.書籍連結}" target="_blank">${book.書名}</a>》<span class="author">${book.作者}</span></h2>`;
    const info = `<div class="rating">${book.星星符號}</div>`;
    const summary = `<div class="summary">${book.短評}</div>`;
    
    let tagsHtml = '<div class="tags">';
    ["標籤A", "標籤B", "標籤C", "標籤D", "標籤E", "標籤F", "標籤G", "標籤H", "標籤I"].forEach((tagKey) => {
      if (book[tagKey]) {
        const className = (tagKey === "標籤B" || tagKey === "標籤D" || tagKey === "標籤F" || tagKey === "標籤H") ? "tag b" : "tag";
        tagsHtml += `<span class="${className}">${book[tagKey]}</span>`;
      }
    });
    tagsHtml += "</div>";

    card.innerHTML = title + info + summary + tagsHtml;
    container.appendChild(card);
  }

  updatePageInfo();
}

function applyFilters() {
  const rating = document.getElementById("ratingFilter").value;
  const tagA = document.getElementById("tagAFilter").value;
  const tagB = document.getElementById("tagBFilter").value;
  const abandon = document.getElementById("abandonFilter").value;

  filteredBooks = books.filter((book) => {
    return (
      (rating === "" || book.星數 == rating) &&
      (tagA === "" || book.標籤A === tagA) &&
      (tagB === "" || book.標籤B === tagB) &&
      (abandon === "" || book.是否棄文 === abandon)
    );
  });

  currentPage = 1;
  renderCards();
}

function updatePageInfo() {
  const info = document.getElementById("pageInfo");
  const totalPages = Math.ceil(filteredBooks.length / cardsPerPage);
  info.textContent = `第 ${currentPage} 頁，共 ${totalPages} 頁`;

  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.getElementById("ratingFilter").addEventListener("change", applyFilters);
document.getElementById("tagAFilter").addEventListener("change", applyFilters);
document.getElementById("tagBFilter").addEventListener("change", applyFilters);
document.getElementById("abandonFilter").addEventListener("change", applyFilters);

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderCards();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(filteredBooks.length / cardsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderCards();
  }
});

function populateTagOptions() {
  const tagASet = new Set();
  const tagBSet = new Set();
  books.forEach((book) => {
    if (book.標籤A) tagASet.add(book.標籤A);
    if (book.標籤B) tagBSet.add(book.標籤B);
  });

  const tagAFilter = document.getElementById("tagAFilter");
  const tagBFilter = document.getElementById("tagBFilter");
  tagASet.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    tagAFilter.appendChild(option);
  });
  tagBSet.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    tagBFilter.appendChild(option);
  });
}

populateTagOptions();
filteredBooks = books;
renderCards();
