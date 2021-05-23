function check() {
  const posts = document.querySelectorAll('.post');
  posts.forEach(function (post) {
    post.addEventListener("click", () => {
      fetch('/post',
              {method: "POST",
              credentials: 'same-origin',
              headers: {
                'X-CSRF-Token': getCsrfToken()},
      }).then(res => {
          if (!res.ok) {
            console.error("エラーレスポンス", res);
          } else {
            return res.json();
          }
        }).then(data => {
          const item = data.post;
          if (item.checked === true) {
            post.setAttribute("data-check", "true");
          } else if (item.checked === false) {
            post.removeAttribute("data-check");
          }
        });
    });
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

window.addEventListener("load", check);