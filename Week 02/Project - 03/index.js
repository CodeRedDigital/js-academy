// Project JavaScript Here
const text = document.querySelector("#text");
const wordCounter = document.querySelector("#word-count");
const counter = document.querySelector("#character-count");
const emojiCounter = document.querySelector("#emoji-count");
const trueWordCounter = document.querySelector("#true-word-count");
text.addEventListener("input", () => {
  const content = text.value
  const rawWordArray = content.split(" ")
  const trueRawWordArray = content.split(/[\s]+/g)
  const filteredWordArray = rawWordArray.filter(item => {return item.length > 0})
  const filteredTrueWordArray = trueRawWordArray.filter(item => {return item.length > 0})
  wordCounter.innerText = filteredWordArray.length
  trueWordCounter.innerText = filteredTrueWordArray.length
  counter.innerText = content.length
  let emojiCount = 0
  for (let letter of content) {
    emojiCount ++
  }
  emojiCounter.innerText = emojiCount
});