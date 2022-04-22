// Project JavaScript Here
const ronQuote = document.querySelector("#ronism")
const ronifyBtn = document.querySelector("#get-quote")
const ronisms = []
const ronify = async () => {
  try {
    const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    if (!response.ok) {
      console.log("There is an error")
      throw response.status
    }
    const quote = await response.json()
    if (ronisms.includes(quote[0])) {
      throw "Duplication"
    } else if (ronisms.length === 50) {
      ronisms.shift()
    }
    ronisms.push(quote[0])
    ronQuote.textContent = quote[0]
  } 
  catch (error) {
    if (error === "Duplication") {
      console.warn("This quote has been seen before")
      ronify()
    }
    console.warn(error)
  }
}
ronifyBtn.addEventListener("click", ronify)
ronify()