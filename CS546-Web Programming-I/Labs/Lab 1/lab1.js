const questionOne = function questionOne(arr) {
    let sum = 0;
    let  length = arr.length;
    for (let i = 0; i<length; i++){
        sum = sum + (arr[i]*arr[i]);
    }
    return sum;
}

const questionTwo = function questionTwo(num) { 
    if (num < 1) return 0;
    else return (num != 1) ? questionTwo(num - 1) + questionTwo(num -2) : 1; 
}
//count vowels in string
const questionThree = function questionThree(text) {
    let count = text.match(/[aeiou]/gi)
    console.log(count);
    return count === null ? 0 :count.length;
}

const questionFour = function questionFour(num) {
    if (num< 0)
    return NaN;
    else 
    return (num != 1) ? num * questionFour(num - 1) : 1; 
}

module.exports = {
    firstName: "Vidya Sagar", 
    lastName: "Polaki", 
    studentId: "10430970",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};