// Project JavaScript Here
/*!
 * Sanitize an HTML string
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String}          str   The HTML string to sanitize
 * @param  {Boolean}         nodes If true, returns HTML nodes instead of a string
 * @return {String|NodeList}       The sanitized string or nodes
 */
function cleanHTML (str, nodes) {

	/**
	 * Convert the string to an HTML document
	 * @return {Node} An HTML document
	 */
	function stringToHTML () {
		let parser = new DOMParser();
		let doc = parser.parseFromString(str, 'text/html');
		return doc.body || document.createElement('body');
	}

	/**
	 * Remove <script> elements
	 * @param  {Node} html The HTML
	 */
	function removeScripts (html) {
		let scripts = html.querySelectorAll('script');
		for (let script of scripts) {
			script.remove();
		}
	}

	/**
	 * Check if the attribute is potentially dangerous
	 * @param  {String}  name  The attribute name
	 * @param  {String}  value The attribute value
	 * @return {Boolean}       If true, the attribute is potentially dangerous
	 */
	function isPossiblyDangerous (name, value) {
		let val = value.replace(/\s+/g, '').toLowerCase();
		if (['src', 'href', 'xlink:href'].includes(name)) {
			if (val.includes('javascript:') || val.includes('data:')) return true;
		}
		if (name.startsWith('on')) return true;
	}

	/**
	 * Remove potentially dangerous attributes from an element
	 * @param  {Node} elem The element
	 */
	function removeAttributes (elem) {

		// Loop through each attribute
		// If it's dangerous, remove it
		let atts = elem.attributes;
		for (let {name, value} of atts) {
			if (!isPossiblyDangerous(name, value)) continue;
			elem.removeAttribute(name);
		}

	}

	/**
	 * Remove dangerous stuff from the HTML document's nodes
	 * @param  {Node} html The HTML document
	 */
	function clean (html) {
		let nodes = html.children;
		for (let node of nodes) {
			removeAttributes(node);
			clean(node);
		}
	}

	// Convert the string to HTML
	let html = stringToHTML();

	// Sanitize it
	removeScripts(html);
	clean(html);

	// If the user wants HTML nodes back, return them
	// Otherwise, pass a sanitized string back
	return nodes ? html.childNodes : html.innerHTML;

}

const postApi = "https://vanillajsacademy.com/api/dragons.json";
const userApi = "https://vanillajsacademy.com/api/dragons-authors.json"
const dirtyPost = {
	"title": "Dirty Dragon",
	"author": "Spitelout Jorgenson",
	"article": "This is a dirty Dragon post for testing purposes and you should try clicking on the link to see if it works",
	"url": "javascript:alert('Another XSS Attack')",
	"pubdate": "December 17, 1011"
}
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
  const authors = data[1].authors;
  articles.push(dirtyPost);
  console.log(articles[articles.length-1]);
  if (!articles || articles.length < 1) {
    throw error("No Articles");
  }
  const listHTML = articles
    .map((article) => {
      let bio = authors.find(author => {
        return author.author === article.author
      })
      htmlStr = `
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
      return cleanHTML(htmlStr);
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
