// Project JavaScript Here
const api = "https://vanillajsacademy.com/api/dragons.json";
const app = document.querySelector("#app");
const error = (error) => {
  let errorHTML = null;
  if (error === "No Posts") {
    errorHTML = `<p>There are no articles at this time something has gone wrong, check back later.</p>`;
  } else {
    errorHTML = `<p>There has been an error of type <strong>${error}</strong></p>`;
  }
  app.classList.remove("loading");
  app.innerHTML = errorHTML;
};
const buildPage = (data) => {
  const articles = data.articles;
  if (!articles || articles.length < 1) {
    throw error("No Posts");
  }
  const listHTML = articles
    .map((article) => {
      return `
    <li>
      <a href="${article.url}">
        <h3>${article.title}</h3>
      </a>
      <p class="description">${article.article}</p>
      <footer>By: <strong>${article.author}</strong> - <time datetime="2018-07-07">${article.pubdate}</time></footer>
    </li>
  `;
    })
    .join("");
  const heading = `<h2>${data.publication}</h2>`;
  app.classList.remove("loading");
  app.innerHTML = `
    ${heading}
    <ol class="articles">${listHTML}</ol>
  `;
};
const posts = async () => {
  const response = await fetch(api);
  if (!response.ok) {
    // if NOT OK throw error for the catch block to handle
    return error(response.status);
  }
  const data = await response.json();
  buildPage(data);
};
posts();
