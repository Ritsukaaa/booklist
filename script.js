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
  "邊想": ["邊想"],
  "龍柒": ["龍柒"],
  "墨竹": ["墨竹", "青篁"],
  "風弄": ["風弄"],
  "童子": ["童子", "折一枚針"],
  "桑沃": ["桑沃"],
  "辜火": ["辜火"],
  "東欄": ["東欄"],
  "桃符": ["桃符"],
  "母之": ["母之"],
  "聞笛": ["聞笛", "聞笛子"],
  "青端": ["青端"],
  "修七": ["修七"],
  "裴羅": ["裴羅"],
  "小謐": ["小謐"],
  "清靜": ["清靜"],
  "時鏡": ["時鏡"],
  "七流": ["七流"],
  "蒙莎": ["蒙莎"],
  "易人北": ["易人北"],
  "花滿篩": ["花滿篩"],
  "嘆舊時": ["嘆舊時"],
  "吳沉水": ["吳沉水"],
  "芥末君": ["芥末君"],
  "酥油餅": ["酥油餅"],
  "甜梅星": ["甜梅星"],
  "夢溪石": ["夢溪石"],
  "張鼎鼎": ["張鼎鼎"],
  "黑皮犬": ["黑皮犬"],
  "眉如黛": ["眉如黛"],
  "靜水邊": ["靜水邊"],
  "金銅錢": ["金銅錢"],
  "姜可是": ["姜可是"],
  "松子茶": ["松子茶"],
  "鶴青水": ["鶴青水"],
  "照夜喜": ["照夜喜"],
  "荀予刃": ["荀予刃"],
  "湖藍閤": ["湖藍閤"],
  "是倆哥": ["是倆哥"],
  "博小酥": ["博小酥"],
  "公子恒": ["公子恒"],
  "捂臉大笑": ["捂臉大笑"],
  "霜枝一水": ["霜枝一水", "一水西來", "霜枝棲月"],
  "焦糖冬瓜": ["焦糖冬瓜", "donggua1986"],
  "狂上加狂": ["狂上加狂"],
  "萬滅之殤": ["萬滅之殤"],
  "天痕壹月": ["天痕壹月"],
  "天籟紙鳶": ["天籟紙鳶"],
  "鏨刀爺們": ["鏨刀爺們"],
  "阿阮有酒": ["阿阮有酒"],
  "睡睡睡鴛": ["睡睡睡鴛"],
  "煙貓與酒": ["煙貓與酒"],
  "空燈流遠": ["空燈流遠"],
  "人體骨架": ["人體骨架"],
  "星火之光": ["星火之光"],
  "薄暮冰輪": ["薄暮冰輪"],
  "貓八先生": ["貓八先生"],
  "深海先生": ["深海先生"],
  "五色龍章": ["五色龍章"],
  "非天夜翔": ["非天夜翔"],
  "跑酷天才": ["跑酷天才"],
  "小叔叔我": ["小叔叔我"],
  "陶瓷扳指": ["陶瓷扳指"],
  "行客不知名": ["行客不知名"],
  "肚皮三層肉": ["肚皮三層肉"],
  "糖醋小魚乾": ["糖醋小魚乾"],
  "承德皂毛藍": ["承德皂毛藍"],
  "一個幌子呀": ["一個幌子呀"],
  "不能發芽的種子": ["不能發芽的種子"],
  "這個六月超現實": ["這個六月超現實"],
  "E伯爵": ["E伯爵"],
  "斯芬克斯MT": ["斯芬克斯MT"],
  "戰鬥吧少女ORZ": ["戰鬥吧少女ORZ"],
  "bvd": ["bvd"],
  "live": ["live"],
  "dnax": ["dnax"],
  "priest": ["priest"],
  "matthia": ["matthia"],
  "WingYing": ["WingYing"],
  "Alessandra Hazard": ["Alessandra Hazard"]
};

const authorTagCategories = ["兩個字", "三個字", "四個字", "五個字", "七個字", "中混英", "英文"];

const booksPerPage = 6;
let currentPage = 1;
let currentFilter = {};
let currentAuthorFilter = {};
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

function renderAuthorTagFilters() {
  const row = document.getElementById("author-tag-row");
  authorTagCategories.forEach(category => {
    const select = document.createElement("select");
    select.setAttribute("data-author-tag", category);
    select.innerHTML = `<option value="">𖤐 ${category}</option>`;
    const authors = Object.keys(authorAliasMap).filter(author =>
      bookData.find(b => b.author === author && b.plainTags?.includes(category))
    );
    authors.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });
    select.addEventListener("change", () => {
      currentAuthorFilter[category] = select.value;
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

    const authorMatch = Object.entries(currentAuthorFilter).every(([category, selectedAuthor]) => {
      if (!selectedAuthor) return true;
      return (
        book.plainTags?.includes(category) &&
        authorAliasMap[selectedAuthor]?.includes(book.author)
      );
    });

    return tagMatch && ratingMatch && authorMatch;
  });

  currentPage = 1;
  renderBooks();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTagFilters();
  renderAuthorTagFilters();

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

  applyFilter();
});
