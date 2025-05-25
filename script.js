bookData.forEach(book => {
  const card = document.createElement("div");
  card.className = "card";

  // 判斷是推文還是棄文
  const isAbandoned = book.rating === "★☆☆☆☆";

  // 判斷標籤格式（推文分開、棄文為文字）
  let tagHTML = "";
  if (isAbandoned) {
    tagHTML = `
      <div class="book-tags plain-tags">
        <span>${book.tags.join("／")}</span>
      </div>`;
  } else {
    const tagSpans = book.tags.map(tag =>
      `<span class="tag">${tag}</span>`).join("");
    tagHTML = `<div class="tags">${tagSpans}</div>`;
  }

  // 套入完整 innerHTML
  card.innerHTML = `
    <div class="header">
      <h3 class="title">《<a href="${book.link}" target="_blank">${book.title}</a>》
        <span class="author">作者：${book.author}</span>
      </h3>
      <div class="stars">${book.rating}</div>
      <div class="meta">${book.meta}</div>
    </div>
    ${tagHTML}
    <div class="comment">
      <div class="comment-bar"></div>
      <p>${book.comment}</p>
    </div>
    <img class="watermark-img ${isAbandoned ? "drop" : "push"}" 
         src="${isAbandoned 
          ? "https://blog-imgs-162.fc2.com/p/o/m/pomelo1122/202505091239326a3.png"
          : "https://blog-imgs-162.fc2.com/p/o/m/pomelo1122/202505091239366f3.png"}" 
         alt="浮水印">
  `;

  document.getElementById("book-list").appendChild(card);
});
