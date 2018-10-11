

let exportedMethods = {
    // function to check for palindrome
    Palindrome(str) 
    {
        if(str===""){
            throw "An empty string!! Please enter text to check."
        }else if(typeof(str)!=="string"){
            throw "Not a string! Please enter a valid input"
        }else {
            let str1 = str.toLowerCase();
            str1 = str1.replace(/[^a-z0-9]/g, "");
            var str2 = str1.split('').reverse().join('');
            let op1 = "Palindrome";
            let op2 = "Not a Palindrome";
            return str1 === str2 ? op1: op2;
           
        }
                   
    }  
}
module.exports = exportedMethods;

