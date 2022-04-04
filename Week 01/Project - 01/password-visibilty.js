// grab password field
const pwdField = document.querySelector("#password")
// grab show password checkbox
const pwdShow = document.querySelector("#show-password")
// log the two elements
console.log(pwdField)
console.log(pwdShow)
// add eventListener to checkbox
pwdShow.addEventListener("click", event => {
  if (event.target.checked) { // check to see if the show-password element is checked
    console.log("pwdShow is checked")
    // changed show-password element to type text
    pwdField.type = "text"
  } else { // check to see if the show-password element is NOT checked
    console.log("pwdShow is not checked")
    // changed show-password element to type password
    pwdField.type = "password"
  }
})