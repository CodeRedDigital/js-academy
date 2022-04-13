// Project JavaScript Here
const text = document.querySelector("#text");
const wordCounter = document.querySelector("#word-count");
const counter = document.querySelector("#character-count");
const emojiCounter = document.querySelector("#emoji-count");
text.addEventListener("input", () => {
  const content = text.value
  const rawWordArray = content.split(" ")
  console.log(rawWordArray)
  const filteredWordArray = rawWordArray.filter(item => {return item.length > 0})
  console.log(filteredWordArray)
  wordCounter.innerText = filteredWordArray.length
  counter.innerText = content.length
  let emojiCount = 0
  for (let letter of content) {
    emojiCount ++
  }
  emojiCounter.innerText = emojiCount
});