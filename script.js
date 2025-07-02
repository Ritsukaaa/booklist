const tagDisplayNames = {
  tagA: "時間",
  tagB: "設定",
  tagC: "題材",
  tagD: "視角",
  tagE: "攻受關係",
  tagF: "攻的屬性",
  tagG: "受的屬性",
  tagH: "其他",
  tagI: "結局",
  tag2: "兩個字",
  tag3: "三個字",
  tag4: "四個字",
  tag5: "五個字",
  tag7: "七個字",
  tagMix: "中混英",
  tagEng: "英文"
};

const booksPerPage = 6;
let currentPage = 1;
let currentFilter = {};
let filteredBooks = [...bookData];

// 🧩 標籤分類三行 + 作者分類三行
const tagGroups = [
  ["tagA", "tagB", "tagC", "tagD"],
  ["tagE", "tagF", "tagG"],
  ["tagH", "tagI"],
  ["tag2", "tag3", "tag4"],
  ["tag5", "tag7", "tagMix"],
  ["tagEng"]
];
const tagCategories = tagGroups.flat();

function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";

  const title = `<h3 class="title"><a href="${book.link}" target="_blank">${book.title}</a><span class="author">作者：${book.author}</span></h3>`;
  const stars = `<div class="stars">${book.stars}</div>`;
  const meta = `<div class="meta">${book.meta || ""}</div>`;

// 顯示 tagA ~ tagI 的分類標籤
const tagKeys = ["tagA", "tagB", "tagC", "tagD", "tagE", "tagF", "tagG", "tagH", "tagI"];
const categoryTags = tagKeys
  .flatMap(key => Array.isArray(book[key]) ? book[key] : [])
  .map(tag => `<span class="tag">${tag}</span>`)
  .join("");

// ✅ 修正：支援 tagDrop 是字串或陣列
const dropTags = Array.isArray(book.tagDrop)
  ? book.tagDrop
  : typeof book.tagDrop === "string"
    ? book.tagDrop.split(",").map(t => t.trim())
    : [];

const dropTagHTML = dropTags
  .map(tag => `<span class="plain-tags">${tag}</span>`)
  .join("");

// 過濾掉空白內容（plainTags）
const plainTags = Array.isArray(book.plainTags)
  ? book.plainTags
      .filter(tag => tag && tag.trim() !== "") // ✅ 移除空字串
      .map(tag => `<span class="plain-tags">${tag}</span>`)
      .join("")
  : "";

// 組合標籤區塊
const tagSection = `<div class="book-tags">${categoryTags}${dropTagHTML}${plainTags}</div>`;

  const comment = `
    <div class="comment">
      <div class="comment-bar"></div>
      <p>${book.comment}</p>
    </div>`;

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
  const input = document.getElementById("jumpInput").value;
  const targetPage = parseInt(input);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
    currentPage = targetPage;
    renderBooks();
  } else {
    alert("請輸入有效頁碼！");
  }
});

function renderTagFilters() {
  tagGroups.forEach((group, index) => {
    const rowId = `tag-row-${index + 1}`;
    let row = document.getElementById(rowId);

    // 若沒有預設 row，則動態建立（以支援新增分類）
    if (!row) {
      row = document.createElement("div");
      row.className = "tag-row";
      row.id = rowId;
      document.querySelector(".tag-filters").appendChild(row);
    }

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

function applyFilter() {
  filteredBooks = bookData.filter(book => {
    const tagMatch = tagCategories.every(tag =>
      !currentFilter[tag] || (book[tag] || []).includes(currentFilter[tag])
    );

    const ratingFilter = document.getElementById("rating-filter")?.value || "";
    const ratingMatch = !ratingFilter || book.stars.startsWith("★".repeat(ratingFilter));

    return tagMatch && ratingMatch;
  });

  currentPage = 1;
  renderBooks();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTagFilters();

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
