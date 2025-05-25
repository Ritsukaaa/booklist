const container = document.getElementById("book-list");

books.forEach(book => {
  const card = document.createElement("div");
  card.className = "book-card";

  card.innerHTML = `
  <div calss="card">
  <h3 class="title"><a href="${book.link}" target="_blank">${book.title}</a><span class="author">作者：${book.author}</span>
</h3>
    <div class="stars">${"★".repeat(book.rating)}${"☆".repeat(5 - book.rating)}</div>
    <div class="tags">${book.tags.map(tag => `<span class="label label-a">${tag}</span>`).join("")}</div>
    <div class="comment"><div class="comment-bar"></div><p>${book.comment}</p></div>
    <img class="watermark" src="images/${book.watermark}"></div>
  `;

  container.appendChild(card);
});
