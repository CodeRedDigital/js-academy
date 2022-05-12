// Project JavaScript Here
const main = document.querySelector("main")
const inputs = document.querySelectorAll("input")
const textarea = document.querySelector("textarea")
main.addEventListener("input", (event) => {
  window.localStorage.setItem(event.target.id, event.target.value)
})
main.addEventListener("submit", () => {
  inputs.forEach((inp) => {
    window.localStorage.removeItem(inp.id)
  })
  window.localStorage.removeItem("more")
})
const fillInputs = () => {
  inputs.forEach((inp) => {
    inp.value = window.localStorage.getItem(inp.id)
  })
  textarea.value = window.localStorage.getItem("more")
}
fillInputs()