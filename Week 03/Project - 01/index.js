// Project JavaScript Here
const ronQuote = document.querySelector("#ronism")
const ronifyBtn = document.querySelector("#get-quote")
const ronify = () => {
  fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
  .then(function (response) {
  	// The API call was successful!
  	if (response.ok) {
      return response.json()
    }
    throw response.status
  }).then(function (data){
    console.log(data)
    ronQuote.textContent = data[0]
  }).catch(function (error) {
  	// There was an error
  	console.warn(error);
    ronQuote.textContent = "Sorry Ron is out of quotes, something went wrong, try again later"
  });
}
ronifyBtn.addEventListener("click", ronify)
ronify()