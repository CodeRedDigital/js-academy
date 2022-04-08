// Project JavaScript Here
// add global event listener
document.addEventListener("click", event => {
  // check to see if the element clicked is a show-password checkbox
  if (
    event.target.hasAttribute("name") &&
    event.target.getAttribute("id").includes("show-password")
  ) {
    // set toggle
    const toggle = event.target;
    // find the closest form
    const parentForm = toggle.closest("form");
    // get all the password inputs of the form
    const passwordInputs = parentForm.querySelectorAll("input[id$='password']");
    // loop through all password inputs and set visibility
    for (let input of passwordInputs) {
      // only fire on inputs that are not checkboxes
      if (input.type !== "checkbox") {
        input.type = toggle.checked ? "text" : "password";
      }
    }
  }
});