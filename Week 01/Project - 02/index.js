// Project JavaScript Here
// get all the inputs
const passwordInputs = document.querySelectorAll("input[type='password']")
// log all pwd inputs
console.log(passwordInputs)
// get checkbox
const showPasswords = document.querySelector("#show-passwords")
// log checkbox
console.log(showPasswords)
// add eventlistener to showPasswords
showPasswords.addEventListener("click", (event) => {
  console.log("Show Passwords checked")
//   check checked state
  if (event.target.checked) {
    console.log("checked")
    toggleInputs("text")
  } else {
    console.log("unchecked")
    toggleInputs("password")
  }
})
// create function to loop over the inputs to update them
const toggleInputs = (value) => {
  for (let input of passwordInputs) {
  	input.type = value
  }
}