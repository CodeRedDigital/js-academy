// Project JavaScript Here
const text = document.querySelector("#text");
const counter = document.querySelector("#character-count");
const emojiCounter = document.querySelector("#emoji-count");
text.addEventListener("input", () => {
  counter.innerText = text.value.length
  let emojiCount = 0
  const textArray = text.value
  for (let letter of textArray) {
    emojiCount ++
  }
  emojiCounter.innerText = emojiCount
});