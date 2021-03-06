// Project JavaScript Here
const monsterGrid =  document.querySelector("#monsterGrid")
const shuffleButton = document.querySelector("#shuffleButton")
const app = document.querySelector("#app")
const highest = document.querySelector("#highest")
const current = document.querySelector("#current")
let highScore = 0
let currentScore = 0
// The monsters and socks
let monsters = [
  {
    "title":"Larry the monster",
    "id":"monster1",
    "svg":"monster1.svg",
    "alt":"A yellow monster with a curly nose"
  },
  {
    "title":"Sarah the monster",
    "id":"monster2",
    "svg":"monster2.svg",
    "alt":"A yellow monster with a wide head, one eye, and an underbite"
  },
	{
    "title":"Fred the monster",
    "id":"monster3",
    "svg":"monster3.svg",
    "alt":"A green monster with eyes on stalks and a mouth at the top of its head"
  },
	{
    "title":"Claire the monster",
    "id":"monster4",
    "svg":"monster4.svg",
    "alt":"A red monster with horns, four eyes, and no legs"
  },
	{
    "title":"Clive the monster",
    "id":"monster5",
    "svg":"monster5.svg",
    "alt":"A green monster with three horns on each side of its head, one eye, and a sad look on its face"
  },
	{
    "title":"Susan the monster",
    "id":"monster6",
    "svg":"monster6.svg",
    "alt":"A green, triangle-shaped monster with sharp teeth, walking upside-down on its hands"
  },
	{
    "title":"Dave the monster",
    "id":"monster7",
    "svg":"monster7.svg",
    "alt":"A purple monster with a single, sad looking eye and tentacles for arms"
  },
	{
    "title":"Christina the monster",
    "id":"monster8",
    "svg":"monster8.svg",
    "alt":"A purple, oval-shaped monster with one eye and no arms or legs"
  },
	{
    "title":"Chocky the monster",
    "id":"monster9",
    "svg":"monster9.svg",
    "alt":"A blue, insect-like monster, with bug eyes, three body sections, and a pair of wings"
  },
	{
    "title":"Jane the monster",
    "id":"monster10",
    "svg":"monster10.svg",
    "alt":"A blue monster with lopsided eyes on stalks and long, sharp teeth"
  },
	{
    "title":"Fred the monster",
    "id":"monster11",
    "svg":"monster11.svg",
    "alt":"A furry gray monster with long arms and a happy face"
  },
	{
    "title":"A pair of socks",
    "id":"sock",
    "svg":"sock.svg",
    "alt":"A pair of athletic socks"
  }
];
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle (array) {

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

}
const openDoor = (event) => {
  const element = event.target
  if (!element.matches('button')) {
    return
  }
  const currentDoor = element.closest('figure')
  const monsterData = {
    "id": currentDoor.dataset.id,
    "title": currentDoor.dataset.title,
    "svg": currentDoor.dataset.svg,
    "alt": currentDoor.dataset.alt,
  }
  const monster = `
  <img src="https://assets.codepen.io/5342839/${monsterData.svg}" alt="${monsterData.alt}" />
  <figcaption>${monsterData.title}</figcaption>
  `
  currentDoor.classList.remove("door")
  currentDoor.innerHTML = monster
  if (monsterData.id !== "sock"){
    currentScore++
    current.textContent = currentScore
    if (currentScore > highScore) {
      highScore = currentScore
      highest.textContent = highScore
    }
  } else {
    console.log("Sock")
    const allButtons = app.querySelectorAll("button")
    console.log(allButtons)
    allButtons.forEach((button) => {
      button.setAttribute('disabled', "");
    });
  }
}

const monsterShuffle = () => {
  currentScore = 0
  current.textContent = currentScore
  shuffleButton.disabled = true
  app.innerHTML = `<div class="lds-dual-ring"></div>`
  app.classList.add("loading")
  const shuffledMonsters =  shuffle(Array.from(monsters))
  const monsterHTML = shuffledMonsters.map((monster) => {
    return `<figure class="grid door" data-id="${monster.id}" data-svg="${monster.svg}" data-alt="${monster.alt}" data-title="${monster.title}"   >
      <img src="./door.svg" alt="click door to open" />
      <button class="small" >Open Door</button>
    </figure>`
  }).join('')
  app.classList.remove("loading")
  app.innerHTML = `<div class="row">${monsterHTML}</div>`
  shuffleButton.disabled = false
  app.addEventListener("click", openDoor)
}
shuffleButton.addEventListener("click", monsterShuffle) 
monsterShuffle()