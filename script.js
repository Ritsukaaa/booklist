const booksPerPage = 6;
let currentPage = 1;
let currentFilter = {};
let filteredBooks = [...bookData];

const tagCategories = ["tagA", "tagB", "tagC", "tagD", "tagE", "tagF", "tagG", "tagH", "tagI"];

function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";

  const title = `<div class="title"><a href="${book.link}" target="_blank">《${book.title}》</a></div>`;
  const author = `<div class="author">（作者：${book.author}）</div>`;
  const stars = `<div class="stars">${book.stars}</div>`;
  const meta = `<div class="meta">${book.meta || ""}</div>`;

  const tags = book.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join("");
  const plainTags = book.plainTags
    .map(tag => `<span class="plain-tags">${tag}</span>`)
    .join("");
  const tagSection = `<div class="book-tags">${tags}${plainTags}</div>`;

  const comment = `<div class="comment">${book.comment}</div>`;

  const watermark = `<img class="watermark" src="${book.watermark}" style="width:${book.watermarkWidth};" />`;

  card.innerHTML = `${title}${author}${stars}${meta}${tagSection}${comment}${watermark}`;
  return card;
}

function renderBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;
  const currentBooks = filteredBooks.slice(start, end);

  currentBooks.forEach(book => list.appendChild(createBookCard(book)));
  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "page-btn";
    if (i === currentPage) btn.classList.add("active");
    btn.textContent = i;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderBooks();
    });
    pagination.appendChild(btn);
  }
}

function renderTagFilters() {
  const filterArea = document.querySelector(".tag-filters");
  tagCategories.forEach(tag => {
    const select = document.createElement("select");
    select.setAttribute("data-tag", tag);
    select.innerHTML = `<option value="">✦ ${tag}</option>`;
    const tagSet = new Set(bookData.flatMap(b => b[tag] || []));
    [...tagSet].forEach(val => {
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = val;
      select.appendChild(opt);
    });
    select.addEventListener("change", () => {
      currentFilter[tag] = select.value;
      applyFilter();
    });
    filterArea.appendChild(select);
  });
}

function applyFilter() {
  filteredBooks = bookData.filter(book => {
    return tagCategories.every(tag => {
      return !currentFilter[tag] || (book[tag] || []).includes(currentFilter[tag]);
    });
  });
  const keyword = document.getElementById("authorSearch").value.trim();
  if (keyword) {
    filteredBooks = filteredBooks.filter(book => book.author.includes(keyword));
  }
  currentPage = 1;
  renderBooks();
}

document.getElementById("authorSearch").addEventListener("input", applyFilter);
renderTagFilters();
renderBooks();

document.getElementById("authorSearch").addEventListener("input", applyFilter);
document.getElementById("rating-filter").addEventListener("change", applyFilter);

document.addEventListener("DOMContentLoaded", () => {
  renderTagFilters();
  applyFilter(); // 初次載入會自動渲染所有書卡與分頁
});
