const geometry = require("./geometry");
const utilities = require("./utilities");

// volume of rectangular prism
let volumeOfRectangularPrism = geometry.volumeOfRectangularPrism(10, 5, 6);
    console.log('Volume of Rectangular Prism is is '+ volumeOfRectangularPrism);
    try {
        let volumeOfRectangularPrism = geometry.volumeOfRectangularPrism(10, 12, undefined);
    } catch (e) {
        console.log("Non numeric values in Dimensions of prism, " +e);
}

// Surface area of rectangular prism
let surfaceAreaOfRectangularPrism = geometry.surfaceAreaOfRectangularPrism(10, 12, 6);
    console.log(`the result is ${surfaceAreaOfRectangularPrism}`);
    if (surfaceAreaOfRectangularPrism !== 504) {
        console.log("SURFACE AREA OF RECTANGULAR PRISM IS PROBABLY BROKEN");
    } else {
        console.log("Surface area of Rectangular Prism works given all dimensions are numbers");
    }

    try {
        let surfaceAreaOfRectangularPrism = geometry.surfaceAreaOfRectangularPrism(10, 12, null);
    } catch (e) {
        console.log("Non numeric values in Dimensions of prism " +e);
}

// Volume of sphere
let volumeOfSphere = geometry.volumeOfSphere(10);
    console.log(`the result is ${volumeOfSphere}`);
    if (volumeOfSphere !== 4188.790204786391) {
        console.log("VOLUME OF SPHERE IS PROBABLY BROKEN");
    } else {
        console.log("Volume of sphere works given given radius is a number");
    }

    try {
        let volumeOfSphere = geometry.volumeOfSphere(undefined);
    } catch (e) {
        console.log("non numeric values in dimensions of Sphere");
}

// Surface area of sphere
let surfaceAreaOfSphere = geometry.surfaceAreaOfSphere(10);
    console.log(`the result is ${surfaceAreaOfSphere}`);
    if (surfaceAreaOfSphere !== 1256.6370614359173) {
        console.log("SURFACE AREA OF SPHERE IS PROBABLY BROKEN");
    } else {
        console.log("Surface area of sphere works given radius is a number");
    }

    try {
        let surfaceAreaOfSphere = geometry.surfaceAreaOfSphere(undefined);
    } catch (e) {
        console.log("non numeric values in dimensions of Sphere");
}


// Deep Equality
const first = {a: '2', b: 3};
const second = {a: 2, b: 3};
const third = [1,2,3];
console.log(utilities.deepEquality(first, second)); // false
console.log(utilities.deepEquality(first, third)); // true

//unique elements in array
const testArr = ["a", "a", "b", "a", "b", "c",1,2,3,null,undefined,0,-0,+0,-1];
    let numberOfUniqueElements = utilities.uniqueElements(testArr);
    console.log("Number of unique elements "+numberOfUniqueElements);

//Number of characters in a string
const test = "Hello, the pie is in the oven";
    let numberOfCharacters = utilities.countOfEachCharacterInString(test);
    console.log('Frequency of characters in given string');
    console.log(numberOfCharacters);

