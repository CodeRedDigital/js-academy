// Project JavaScript Here
const monsterGrid =  document.querySelector("#monsterGrid")
const shuffleButton = document.querySelector("#shuffleButton")
const app = document.querySelector("#app")
// The monsters and socks
let monsters = [
  {
    "title":"Larry the monster",
    "svg":"monster1.svg",
    "alt":"A yellow monster with a curly nose"
  },
  {
    "title":"Sarah the monster",
    "svg":"monster2.svg",
    "alt":"A yellow monster with a wide head, one eye, and an underbite"
  },
	{
    "title":"Fred the monster",
    "svg":"monster3.svg",
    "alt":"A green monster with eyes on stalks and a mouth at the top of its head"
  },
	{
    "title":"Claire the monster",
    "svg":"monster4.svg",
    "alt":"A red monster with horns, four eyes, and no legs"
  },
	{
    "title":"Clive the monster",
    "svg":"monster5.svg",
    "alt":"A green monster with three horns on each side of its head, one eye, and a sad look on its face"
  },
	{
    "title":"Susan the monster",
    "svg":"monster6.svg",
    "alt":"A green, triangle-shaped monster with sharp teeth, walking upside-down on its hands"
  },
	{
    "title":"Dave the monster",
    "svg":"monster7.svg",
    "alt":"A purple monster with a single, sad looking eye and tentacles for arms"
  },
	{
    "title":"Christina the monster",
    "svg":"monster8.svg",
    "alt":"A purple, oval-shaped monster with one eye and no arms or legs"
  },
	{
    "title":"Chocky the monster",
    "svg":"monster9.svg",
    "alt":"A blue, insect-like monster, with bug eyes, three body sections, and a pair of wings"
  },
	{
    "title":"Jane the monster",
    "svg":"monster10.svg",
    "alt":"A blue monster with lopsided eyes on stalks and long, sharp teeth"
  },
	{
    "title":"Fred the monster",
    "svg":"monster11.svg",
    "alt":"A furry gray monster with long arms and a happy face"
  },
	{
    "title":"A pair of socks",
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

const monsterShuffle = () => {
  shuffleButton.disabled = true
  app.innerHTML = `<div class="lds-dual-ring"></div>`
  app.classList.add("loading")
  const shuffledMonsters =  shuffle(Array.from(monsters))
  const monsterHTML = shuffledMonsters.map((monster) => {
    return `<figure class="grid">
      <img src="https://assets.codepen.io/5342839/${monster.svg}" alt="${monster.alt}" />
      <figcaption>${monster.title}</figcaption>
    </figure>`
  }).join('')
  app.classList.remove("loading")
  app.innerHTML = `<div class="row">${monsterHTML}</div>`
  shuffleButton.disabled = false
}
shuffleButton.addEventListener("click", monsterShuffle) 
monsterShuffle()