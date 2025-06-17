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

const booksPerPage = 6;
let currentPage = 1;
let currentFilter = {};
let filteredBooks = []; // ✅ 等 DOMContentLoaded 後再指定 bookData

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

  const tags = (book.tags || [])
    .map(tag => `<span class="tag">${tag}</span>`)
    .join("");
  const plainTags = (book.plainTags || [])
    .map(tag => `<span class="plain-tags">${tag}</span>`)
    .join("");
  const tagSection = `<div class="book-tags">${tags}${plainTags}</div>`;

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

function applyFilter() {
  const keyword = document.getElementById("authorSearch")?.value.trim().toLowerCase() || "";

  filteredBooks = bookData.filter(book => {
    const title = book.title || "";
    const author = book.author || "";
    const titleMatch = title.toLowerCase().includes(keyword);
    const authorMatch = author.toLowerCase().includes(keyword);
    const textMatch = keyword === "" || titleMatch || authorMatch;

    const tagMatch = tagCategories.every(tag =>
      !currentFilter[tag] || (book[tag] || []).includes(currentFilter[tag])
    );

    const ratingFilter = document.getElementById("rating-filter")?.value || "";
    const ratingMatch = !ratingFilter || book.stars.startsWith("★".repeat(ratingFilter));

    return tagMatch && textMatch && ratingMatch;
  });

  currentPage = 1;
  renderBooks();
}

document.addEventListener("DOMContentLoaded", () => {
  filteredBooks = [...bookData];     // ✅ 確保 bookData 已經準備好
  renderTagFilters();                // ✅ 接著建立下拉式標籤
  applyFilter();                     // ✅ 一開始就渲染符合資料

  const authorInput = document.getElementById("authorSearch");
  if (authorInput) {
    authorInput.addEventListener("input", applyFilter);
  }

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
});
