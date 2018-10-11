// check for string type
function checkIsProperString(val, variableName) {
    if (val === undefined || typeof val !== "string") {
        throw `${variableName || 'provided variable'} is not a String, it is ${typeof(val)}`;
    }
}
// check for Array type
function checkIsProperArray(val, variableName) {
    if (val === undefined || typeof val !== "object") {
        throw `${variableName || 'provided variable'} is not an Array, it is ${typeof(val)}`;
    }
}
// check for Object type
function checkIsProperObject(val, variableName) {
    if (val === undefined || typeof val !== "object") {
        throw `${variableName || 'provided variable'} is not an Object, it is ${typeof(val)}`;
    }
}


// Export the modules
module.exports = {
    description: "This is Utilities module of lab 2",
// Deep equality
deepEquality : (obj1,obj2)=>{
    checkIsProperObject(obj1);
    checkIsProperObject(obj2);
    if (typeof(obj1) == typeof(obj2)){
        if (typeof(obj1)=='undefined') return true;
        else if (typeof(obj1)=='number'){
            return (obj1 === obj2) ? true : false 
        }
        else if (typeof(obj1)=='string'){
            return (obj1 === obj2) ? true : false
        }
        else if (typeof(obj1)== 'object'){
            if (obj1 ==='null'&& obj2==='null'){
                return true 
            }
            else{
                let a1 = Object.keys(obj1).map(function(k)
                {return[k,obj1[k]];
                });
                let a2 = Object.keys(obj2).map(function(k)
                {return[k,obj2[k]];
                });
                let buffer =0;
                if (a1.length ===a2.length){
                    for(let i=0;i<a1.length;i++){
                        if(a1[i][0]===a2[i][0]&&a1[i][1]===a2[i][1])
                        buffer = buffer + 1;
                    }
                    return (buffer === a1.length) ? true : false;
                }
                return false;
                
        }
        
        }
    }
},
// Unique elements
uniqueElements : (arr) =>{
    checkIsProperArray(arr,"Input");
    let charMap = {};
    let tuples = [];
    arr.forEach(function(s) {
        charMap[s] ? charMap[s]++ : charMap[s] = 1;
    });
    for( let freq in charMap){
        tuples.push([charMap[freq],freq]);
    }
    return tuples.length;
},
// Counting each character in string
countOfEachCharacterInString : (str)=>{
    checkIsProperString(str, "Input");
    let charMap = {};
    str = str.split('').sort().join('');
    str.split('').forEach(function(s) {
        charMap[s] ? charMap[s]++ : charMap[s] = 1;
    });
    return charMap;
}
}
