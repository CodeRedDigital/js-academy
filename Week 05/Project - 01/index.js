// Project JavaScript Here
const monsterGrid =  document.querySelector("#monsterGrid")
const shuffleButton = document.querySelector("#shuffleButton")
const app = document.querySelector("#app")
// The monsters and socks
let monsters = [
	'monster1',
	'monster2',
	'monster3',
	'monster4',
	'monster5',
	'monster6',
	'monster7',
	'monster8',
	'monster9',
	'monster10',
	'monster11',
	'sock'
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
    return `<div class="grid"><img src="https://assets.codepen.io/5342839/${monster}.svg" alt="${monster}" /></div>`
  }).join('')
  app.classList.remove("loading")
  app.innerHTML = `<div class="row">${monsterHTML}</div>`
  shuffleButton.disabled = false
}
shuffleButton.addEventListener("click", monsterShuffle) 
monsterShuffle()