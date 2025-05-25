const container = document.getElementById("book-list");

books.forEach(book => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
  <h3 class="title"><a href="${book.link}" target="_blank">${book.title}</a><span class="author">作者：${book.author}</span>
</h3>
    <div class="stars">${"★".repeat(book.rating)}${"☆".repeat(5 - book.rating)}</div>

const meta = document.createElement("div");
meta.className = "meta";
meta.innerText = book.meta;
card.appendChild(meta);
 
 const tagKeys = ["tagA", "tagB", "tagC", "tagD", "tagE", "tagF", "tagG", "tagH", "tagI"];
const tagsContainer = document.createElement("div");
tagsContainer.className = "tags";

tagKeys.forEach(key => {
  if (book[key]) {
    // 以「／」切開同一欄內的多個標籤
    book[key].split("／").forEach(rawTag => {
      const tagText = rawTag.trim();
      if (tagText) {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = tagText;
        tagsContainer.appendChild(tag);
      }
    });
  }
});

card.appendChild(tagsContainer);
    <div class="comment"><div class="comment-bar"></div><p>${book.comment}</p></div>
    <img class="watermark" src="images/${book.watermark}">
  `;

  container.appendChild(card);
});
