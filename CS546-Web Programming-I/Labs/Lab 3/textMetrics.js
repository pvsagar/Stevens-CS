

//  Check for String
function checkIsProperString(val, variableName) {
        if (val === undefined || typeof val !== "string") {
        throw `${variableName || 'provided variable'} is not a string, it is ${typeof(val)}`;
    }
}

module.exports = {
    description: "This is Text Metrics module of lab 3  ",
    // Simplify the text 
    simplify: (text) =>{
        return new Promise((resolve, reject) => {   
            checkIsProperString(text,'Text in file');
                let lowerCase = text.toLowerCase();
                let noWhiteSpace = lowerCase.replace(/\s\s+/g, " ");
                let simpleText = noWhiteSpace.replace(/[^a-z ]/g, "").trim();
                console.log("\nsimple text is :",simpleText);
            resolve(simpleText) ;
    });
    },
    createMetrics : (text)=>{
        return new Promise((resolve, reject) => {
            // total number of letters in the document
            let text1 = text;
            text1 = text1.replace(/[^a-z]/g, '');
            let totalLetters = text1.length;
            // total number of words in the document
            let text2 = [];
            text2 = text.split(" ");
            let totalWords = text2.length;
            // total number of unique words in the document and word occurences
            let text3 = text;
            let charMap = {};
            text3 = text3.split(' ');
            text3.forEach(function(s) {
                charMap[s] ? charMap[s]++ : charMap[s] = 1;
            });
            let wordOccurrences = charMap;
            let uniqueWords;
            let tuples = [];
            for( let freq in charMap){
                tuples.push([charMap[freq],freq]);
            }
            uniqueWords = tuples.length;
            // total number of long words in the document
            let longWords = 0;
            for (let i = 0;i< totalWords; i++){
                if(text2[i].length > 5){
                    longWords = longWords + 1;
                }
            }
            // Average word length
            let averageWordLength = totalLetters / totalWords;
            // returing metrics to file
            resolve({
                totalLetters: totalLetters,
                totalWords: totalWords,
                uniqueWords: uniqueWords,
                longWords: longWords,
                averageWordLength: averageWordLength,
                wordOccurrences: wordOccurrences
            });
        });
    }
}