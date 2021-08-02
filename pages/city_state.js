//checkout superhi - made during their course
const formTag = document.querySelector("form")
const inputTag = formTag.querySelector("input")
const resultsTag = document.querySelector("section.results")

const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query="
 
 const searchUnsplash = function(term) {
   return fetch(apiUrl + term, {
     method: "GET",
     headers: {
       "Authorization": "Client-ID 1ff567feea79565eafd82a37c3e34e5dacdbb411a117a9bec0bc20ffbd1a8612"
     		}
   		})
   	.then(response => response.json())
   		.then(data => {
//      		console.log(data)
     		//format unsplash results to suit our needs 
     		return data.results.map(result => {
          return {
            imageSrc: result.urls.regular, 
            width: result.width,
            height: result.height, 
            title: (result.description || "Untitled"),
            name: result.user.name,
            backgroundColor: (result.color || "#cccccc") + "33"
          }
        })
  	 	})
 	}
 
 //add results to page 
 const addResults = function (results) {
   	//remove all loading tags 
   		resultsTag.innerHTML = ""
   
   //loop over each indiv result and add to resultsTag
   		results.forEach(result => {
        resultsTag.innerHTML = resultsTag.innerHTML + `
					<div class="single-result">
						<div class="image" style="background-color: ${result.backgroundColor}">
							<img src= "${result.imageSrc}">
						</div>	
						<h2>${result.title}</h2>
						<p> by ${result.name} - ${result.width} x ${result.height} </p>
					</div>
				`
      })
 }
 
 		//when we submit the form, get the info from input
 formTag.addEventListener("submit", function(event){
   
   //get info from input
   const searchTerm = inputTag.value
   
   
   searchUnsplash(searchTerm)
     .then(results => {
     		addResults(results)
   		})
   
   // stop the form from going to the usual next page 
   event.preventDefault()
   
 })