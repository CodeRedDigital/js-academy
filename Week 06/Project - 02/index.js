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


const form = document.querySelector("#save-me")
form.addEventListener("input", (event) => {
  const data = new FormData(form)
  localStorage.setItem("formData", JSON.stringify(serialize(data)))
  console.log(JSON.stringify(serialize(data)))
})
form.addEventListener("submit", () => {
  localStorage.removeItem("formData")
})
const fillInputs = () => {
  const data = JSON.parse(localStorage.getItem("formData"))
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