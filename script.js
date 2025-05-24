
const bookcards = [
  {
    title: "《書名一》",
    author: "作者：張三",
    info: "15萬字・溫柔攻 x 傲嬌受・HE",
    tags: ["現代", "年下", "慢熱"],
    review: "這篇文節奏舒服，人物互動也自然。",
    type: "推文",
    watermark: "https://i.imgur.com/uXHiA2J.png"
  },
  {
    title: "《書名二》",
    author: "作者：李四",
    info: "5萬字・病嬌攻 x 治癒受・BE",
    tags: ["古風", "虐", "棄"],
    review: "看到中段覺得有些套路，棄文了。",
    type: "棄文",
    watermark: "https://i.imgur.com/oNYXzYw.png"
  }
];

function renderCards(type = "全部") {
  const container = document.getElementById("bookcards-container");
  container.innerHTML = "";
  bookcards.filter(card => type === "全部" || card.type === type)
    .forEach(card => {
      const div = document.createElement("div");
      div.className = "bookcard";
      div.innerHTML = `
        <h2>${card.title}</h2>
        <div class="author">${card.author}</div>
        <div class="info">${card.info}</div>
        <div class="tags">${
          card.tags.map(t => card.type === "棄文" ? `<span class="tag-text">${t}</span>` : `<span class="tag-a">${t}</span>`).join("")
        }</div>
        <div class="short-review">${card.review}</div>
        <img src="${card.watermark}" class="watermark ${card.type === "棄文" ? "abandoned" : ""}" />
      `;
      container.appendChild(div);
    });
}

document.querySelectorAll("#filter-bar button").forEach(btn => {
  btn.addEventListener("click", () => renderCards(btn.textContent));
});

renderCards();
