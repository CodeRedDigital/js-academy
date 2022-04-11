// Project JavaScript Here
const text = document.querySelector("#text");
const counter = document.querySelector("#character-count");
text.addEventListener("input", () => {
  counter.innerText = text.value.length
});