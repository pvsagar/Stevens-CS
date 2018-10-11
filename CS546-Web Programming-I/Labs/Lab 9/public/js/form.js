

(function () {
    //Palindrome function to check 
    function palindrome(input) {
        if(input===""){
            throw "An empty string!! Please enter text to check."
        }else if(typeof(input)!=="string"){
            throw "Not a string! Please enter a valid input"
        }else {
            let str1 = input.toLowerCase();
            str1 = str1.replace(/[^a-z0-9]/g, "");
            if(str1==""){
                throw "Only Special Characters is not a valid input! Please enter text or number as input"
            }
            let str2 = str1.split('').reverse().join('');
            let op1 = "Palindrome";
            let op2 = "Not a Palindrome";
            return str1 === str2 ? op1: op2;
        }
    }

let staticForm = document.getElementById("static-form");
if (staticForm) {
    // initializing the static form
    let firstNumberElement = document.getElementById("number1");
    let ulist = document.getElementById("attempts");
    let errorContainer = document.getElementById("error-container");
    let errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
    let resultContainer = document.getElementById("result-container");
    let resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];
    // event on hitting Submit
    staticForm.addEventListener("submit", event => {
        event.preventDefault();
        try {
            errorContainer.classList.add("hidden");
            resultContainer.classList.add("hidden");
            let firstNumberValue = firstNumberElement.value;
            let stringlist = firstNumberElement.value;
            let result = palindrome(firstNumberValue);
            let res = "Palindrome";
            if(result==res){
            resultTextElement.textContent =  ""+ result;
            resultContainer.classList.remove("hidden");
            } 
            else {
                errorTextElement.textContent = ""+ result;
                errorContainer.classList.remove("hidden");
            }
            let entry = document.createElement('li');
            if(result==res){
            entry.setAttribute("class", "is-palindrome");
            }
            else {
                entry.setAttribute("class", "not-palindrome");
            }
            entry.appendChild(document.createTextNode(stringlist));
            ulist.appendChild(entry);
        }catch (e) {
            let message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
        }
    });
}
})();

