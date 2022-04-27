// Project JavaScript Here
const postApi = "https://vanillajsacademy.com/api/dragons.json";
const userApi = "https://vanillajsacademy.com/api/dragons-authors.json"
const app = document.querySelector("#app");
const error = (error) => {
  let errorHTML = null;
  if (error === "No Articles") {
    errorHTML = `<p>There are no articles at this time something has gone wrong, check back later.</p>`;
  } else {
    errorHTML = `<p>There has been an error of type <strong>${error}</strong></p>`;
  }
  app.classList.remove("loading");
  app.innerHTML = errorHTML;
};
const buildPage = (data) => {
  const articles = data[0].articles;
  const authors = data[1].authors
  if (!articles || articles.length < 1) {
    throw error("No Articles");
  }
  const listHTML = articles
    .map((article) => {
      let bio = authors.find(author => {
        return author.author === article.author
      })
      return `
    <li>
      <a href="${article.url}">
        <h3>${article.title}</h3>
      </a>
      <time datetime="${article.pubdate}">${article.pubdate}</time>
      <p class="description">${article.article}</p>
      <footer><h4>By:  ${article.author}</h4>
      ${bio ? `<p>${bio.bio}</p>` : ""}
      </footer>
    </li>
  `;
    })
    .join("");
  const heading = `<h2>${data[0].publication}</h2>`;
  app.classList.remove("loading");
  app.innerHTML = `
    ${heading}
    <ol class="articles">${listHTML}</ol>
  `;
};
const data = () => {
  Promise.all([
    fetch(postApi),
    fetch(userApi)
  ]).then(responses => {
    return Promise.all(responses.map(response => {
      return response.json()
    }))
  }).then(data => {
    buildPage(data)
  }).catch(() => {
    error("Data not fetched")
  })
};
data();
