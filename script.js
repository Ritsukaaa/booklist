// === 書卡系統：乾淨整合版 ===

const tagDisplayNames = {
  tagA: "時間",
  tagB: "設定",
  tagC: "題材",
  tagD: "視角",
  tagE: "攻受關係",
  tagF: "攻的屬性",
  tagG: "受的屬性",
  tagH: "其他",
  tagI: "結局"
};

const authorAliasMap = {
  "明蒿": ["明蒿", "留蘅"],
  "童子": ["童子", "折一枚針"],
  // ... 其餘略（已填妥）
};

const authorGroups = ["兩個字", "三個字", "四個字", "五個字", "七個字", "中混英", "英文"];

const booksPerPage = 6;
let currentPage = 1;
let currentFilter = {};
let currentAuthorGroup = "";
let filteredBooks = [...bookData];

const tagGroups = [
  ["tagA", "tagB", "tagC", "tagD"],
  ["tagE", "tagF", "tagG"],
  ["tagH", "tagI"]
];
const tagCategories = tagGroups.flat();

function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";

  const title = `<h3 class="title"><a href="${book.link}" target="_blank">${book.title}</a><span class="author">作者：${book.author}</span></h3>`;
  const stars = `<div class="stars">${book.stars}</div>`;
  const meta = `<div class="meta">${book.meta || ""}</div>`;
  const tags = (book.tags || []).map(t => `<span class="tag">${t}</span>`).join("");
  const plainTags = (book.plainTags || []).map(t => `<span class="plain-tags">${t}</span>`).join("");
  const tagSection = `<div class="book-tags">${tags}${plainTags}</div>`;
  const comment = `<div class="comment"><div class="comment-bar"></div><p>${book.comment}</p></div>`;
  const watermark = `<img class="watermark" src="${book.watermark}" style="width:${book.watermarkWidth};" />`;

  card.innerHTML = `${title}${stars}${meta}${tagSection}${comment}${watermark}`;
  return card;
}

function renderBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";
  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;
  const currentBooks = filteredBooks.slice(start, end);
  currentBooks.forEach(book => list.appendChild(createBookCard(book)));
  updatePageInfo();
}

function updatePageInfo() {
  const info = document.getElementById("pageInfo");
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  info.textContent = `第 ${currentPage} 頁，共 ${totalPages} 頁`;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.getElementById("jumpBtn").addEventListener("click", () => {
  const input = parseInt(document.getElementById("jumpInput").value);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  if (!isNaN(input) && input >= 1 && input <= totalPages) {
    currentPage = input;
    renderBooks();
  } else {
    alert("請輸入有效頁碼！");
  }
});

function renderTagFilters() {
  tagGroups.forEach((group, index) => {
    const row = document.getElementById(`tag-row-${index + 1}`);
    group.forEach(tag => {
      const select = document.createElement("select");
      select.setAttribute("data-tag", tag);
      select.innerHTML = `<option value="">𖤐 ${tagDisplayNames[tag]}</option>`;
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
      row.appendChild(select);
    });
  });
}

function renderAuthorGroupFilters() {
  const row = document.getElementById("author-filter-row");
  authorGroups.forEach(group => {
    const select = document.createElement("select");
    select.setAttribute("data-author-group", group);
    select.innerHTML = `<option value="">𖤐 ${group}</option>`;

    const groupAuthors = Object.keys(authorAliasMap).filter(author => {
      return bookData.some(b =>
        b.author === author && (b.plainTags || []).includes(group)
      );
    });

    groupAuthors.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    select.addEventListener("change", () => {
      currentAuthorGroup = select.value;
      applyFilter();
    });

    row.appendChild(select);
  });
}

function applyFilter() {
  filteredBooks = bookData.filter(book => {
    const tagMatch = tagCategories.every(tag =>
      !currentFilter[tag] || (book[tag] || []).includes(currentFilter[tag])
    );

    const ratingFilter = document.getElementById("rating-filter")?.value || "";
    const ratingMatch = !ratingFilter || book.stars.startsWith("★".repeat(ratingFilter));

    const authorMatch = !currentAuthorGroup ||
      (authorAliasMap[currentAuthorGroup] || []).includes(book.author);

    return tagMatch && ratingMatch && authorMatch;
  });

  currentPage = 1;
  renderBooks();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTagFilters();
  renderAuthorGroupFilters();

  document.getElementById("rating-filter")?.addEventListener("change", applyFilter);
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderBooks();
    }
  });
  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderBooks();
    }
  });

  applyFilter();
});
