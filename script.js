const container = document.getElementById("book-list");

books.forEach(book => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="title">${book.title}<span class="author">${book.author}</span></div>
    <div class="stars">${"★".repeat(book.rating)}${"☆".repeat(5 - book.rating)}</div>
    <div class="tags">${book.tags.map(tag => `<span class="label label-a">${tag}</span>`).join("")}</div>
    <div class="comment"><span class="comment-bar"></span>${book.comment}</div>
    <img class="watermark" src="images/${book.watermark}">
  `;

  container.appendChild(card);
});
