function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    fetch('/posts', 
          {method: 'POST',
          credentials: 'same-origin',
          headers: {
            'X-CSRF-Token': getCsrfToken()},
          body: formData
    }).then(res => {
      if (!res.ok) {
        console.error("エラーレスポンス", res);
      } else {
        return res.json();
      }
    }).then(data => {
      const item = data.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
       <div class="post" data-id=${item.id}>
         <div class="post-date">
           投稿日時：${item.created_at}
         </div>
         <div class="post-content">
         ${item.content}
         </div>
       </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    });
    e.preventDefault();
  });
  const getCsrfToken = () => {
    const metas = document.getElementsByTagName('meta');
    for (let meta of metas) {
        if (meta.getAttribute('name') === 'csrf-token') {
          return meta.getAttribute('content');
        }
    }
    return '';
  }
}
window.addEventListener("load", memo);