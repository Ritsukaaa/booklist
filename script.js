import { books } from './deta.js';

function createTag(label, colorA, colorB) {
  const tag = document.createElement('span');
  tag.className = 'inline-block px-2 py-1 rounded-full text-xs font-semibold mr-1 mb-1';
  tag.style.backgroundColor = colorA;
  tag.style.color = colorB;
  tag.textContent = label;
  return tag;
}

function renderBooks(bookList) {
  const container = document.getElementById('book-container');
  container.innerHTML = '';

  bookList.forEach(book => {
    const card = document.createElement('div');
    card.className = 'relative bg-white rounded-2xl shadow-md p-4';

    // 書名與作者
    const title = document.createElement('div');
    title.innerHTML = `<a href="${book.連結}" target="_blank" class="text-xl font-bold no-underline hover:underline">《${book.書名}》</a><span class="ml-2 text-sm">${book.作者}</span>`;
    card.appendChild(title);

    // 星星評分
    const rating = document.createElement('div');
    rating.className = 'my-1';
    rating.innerHTML = book.評分符號 || '';
    card.appendChild(rating);

    // 書籍資訊列
    const info = document.createElement('div');
    info.className = 'text-sm text-gray-600';
    info.innerHTML = `${book.字數}｜${book.人物}｜${book.口味}`;
    card.appendChild(info);

    // 馬卡龍標籤 or 純文字標籤
    const tagWrap = document.createElement('div');
    tagWrap.className = 'mt-2 flex flex-wrap';

    const pink = '#f7c5cc', green = '#083A33';
    const tagFields = ['標籤A', '標籤B', '標籤C', '標籤D', '標籤E', '標籤F', '標籤G', '標籤H', '標籤I'];

    if (book.是否棄文 === 'Y') {
      const drop = document.createElement('span');
      drop.className = 'text-sm';
      drop.textContent = book.棄文備註 || '（棄）';
      tagWrap.appendChild(drop);
    } else {
      tagFields.forEach((key, i) => {
        const val = book[key];
        if (val) tagWrap.appendChild(createTag(val, i % 2 === 0 ? pink : green, i % 2 === 0 ? green : pink));
      });
    }

    card.appendChild(tagWrap);

    // 短評
    if (book.短評) {
      const comment = document.createElement('div');
      comment.className = 'mt-3 pl-2 border-l-4';
      comment.style.borderColor = '#D0BFFF';
      comment.innerHTML = `<div class="text-sm whitespace-pre-line">${book.短評}</div>`;
      card.appendChild(comment);
    }

    // 浮水印圖片
    if (book.浮水印圖片連結) {
      const img = document.createElement('img');
      img.src = book.浮水印圖片連結;
      img.style.position = 'absolute';
      img.style.bottom = '8px';
      img.style.right = '8px';
      img.style.opacity = '0.8';
      img.style.width = '120px';
      card.appendChild(img);
    }

    container.appendChild(card);
  });
}

// 初始渲染
renderBooks(books);
