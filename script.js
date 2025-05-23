
const booksPerPage = 20;
let currentPage = 1;
let filteredBooks = window.books;

function renderBooks() {
  const container = document.getElementById("bookcards");
  container.innerHTML = "";
  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;
  const pageBooks = filteredBooks.slice(start, end);
  pageBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "bookcard";
    card.innerHTML = `<h2>《${book.title}》<small>${book.author}</small></h2>
      <div class="rating">${"★".repeat(book.rating)}</div>
      <div class="summary">${book.summary}</div>`;
    container.appendChild(card);
  });
  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const nav = document.getElementById("pagination");
  nav.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderBooks();
    });
    nav.appendChild(btn);
  }
}

document.getElementById("rating-filter").addEventListener("change", e => {
  const value = e.target.value;
  filteredBooks = value ? window.books.filter(b => b.rating == value) : window.books;
  currentPage = 1;
  renderBooks();
});

renderBooks();
