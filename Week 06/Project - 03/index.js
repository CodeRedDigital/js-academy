// Project JavaScript Here
/*!
 * Serialize all form data into an object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {FormData} data The FormData object to serialize
 * @return {String}        The serialized form data
 */
function serialize (data) {
	let obj = {};
	for (let [key, value] of data) {
		if (obj[key] !== undefined) {
			if (!Array.isArray(obj[key])) {
				obj[key] = [obj[key]];
			}
			obj[key].push(value);
		} else {
			obj[key] = value;
		}
	}
	return obj;
}
let typingDelay
const form = document.querySelector("#save-me")
const formButton = form.querySelector("[type='submit']")
const showStatus = () => {
  const statusUpdate = document.createElement('div')
  statusUpdate.setAttribute('aria-live', 'polite')
  statusUpdate.classList.add('status')
  form.append(statusUpdate)
  setTimeout(() => {
    statusUpdate.classList.add('temporary-status')
    statusUpdate.textContent = "Your data has been submitted"
    formButton.setAttribute('disabled', true)
  }, 1)
  setTimeout(() => {
    statusUpdate.textContent = "Your data has been submitted"
    statusUpdate.classList.remove('temporary-status')
    formButton.removeAttribute('disabled')
    setTimeout(() => {
      statusUpdate.remove()
    }, 750)
  }, 4000)
}

form.addEventListener("input", (event) => {
  clearTimeout(typingDelay)
	typingDelay = setTimeout(function () {
    const data = new FormData(form)
    localStorage.setItem("formData", JSON.stringify(serialize(data)))
    console.log(JSON.stringify(serialize(data)))
	}, 700);
})
form.addEventListener("submit", (event) => {
  event.preventDefault()
  showStatus()
  clearInputs()
  localStorage.removeItem("formData")
})
const clearInputs = () => {
  const elements = form.elements
  for (i = 0; i < elements.length; i++) {
    elements[i].value = ""
  }
}
const fillInputs = () => {
  const data = JSON.parse(localStorage.getItem("formData"))
  if (!data) {return}
  const elements = form.elements
  for (i = 0; i < elements.length; i++) {
    if (elements[i].name) {
      const key = elements[i].name
      if (data[key]) {
        elements[i].value = data[key]
      }
    }
  }
}
fillInputs()