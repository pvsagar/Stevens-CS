const geometry = require("./geometry");
const utilities = require("./utilities");
// check zero values for geometry

// volume of rectangular prism
let rectangularPrismVolume = function(length, width, height){
    try{
        let test1 = geometry.volumeOfRectangularPrism(length, width, height);
        console.log('Volume of Rectangular Prism is '+ test1);
        console.log("Volume of Rectangular Prism works given all dimensions are numbers");
    }catch(e){
        console.log("Invalid values in Dimensions of prism, " +e);
    }
}
// Surface area of rectangular prism
let rectangularPrismSurfaceArea = function(length, width, height){
    try{
        let test1 = geometry.surfaceAreaOfRectangularPrism(length, width, height);
        console.log('Surface Area of Rectangular Prism is '+ test1);
        console.log("Surface area of Rectangular Prism works given all dimensions are numbers");
    }catch(e){
        console.log("Invalid values in Dimensions of prism, " +e);
    }
}
// Volume of sphere
let sphereVolume = function(radius){
    try{
        let test1 = geometry.volumeOfSphere(radius);
        console.log('Volume of Sphere is '+ test1);
        console.log("Volume of Sphere works given radius is a number");
    }catch(e){
        console.log("Invalid values in Dimensions of Sphere, " +e);
    }
}
// Surface area of sphere
let sphereSurfaceArea = function(radius){
    try{
        let test1 = geometry.surfaceAreaOfSphere(radius);
        console.log('Surface area of Sphere is '+ test1);
        console.log("Surface area of Sphere works given given radius is a number");
    }catch(e){
        console.log("Invalid values in Dimensions of Sphere, " +e);
    }
}

// Deep Equality
let checkEquality = function(first,second){
    if (!first || !second){
        console.log("Error: Invalid input");
    }else{
        try{
            let test1 = utilities.deepEquality(first,second);
            console.log(test1);
        }catch(e){
            console.log("Invalid Input, " +e);
        }
    }
  
}
//unique elements in array
let numberOfUniqueElements = function(arr){
    try{
        if(arr === null){
            return console.log('Invalid Input, Input is Null');
        }
        let test1 = utilities.uniqueElements(arr);
        console.log('Number of unique elements in the input array is '+ test1);
        console.log("Number of unique elements works given input is an Array");
    }catch(e){
        console.log("Invalid Input, " +e);
    }
}
//Number of characters in a string
let numberOfCharacters = function(str){
    try{
        let test1 = utilities.countOfEachCharacterInString(str);
        console.log('Frequency of characters in given string');
        console.log(test1);
        console.log("Number of characters works given input is a string");
    }catch(e){
        console.log("invalid input, " +e);
    }
}

// volume of rectangular prism
rectangularPrismVolume(10,10,10);
rectangularPrismVolume(10,null,10);
rectangularPrismVolume(10,10,undefined);
rectangularPrismVolume(10,10,'a');
rectangularPrismVolume(10,5,0);
console.log("");

// Surface area of rectangular prism
rectangularPrismSurfaceArea(10,10,10);
rectangularPrismSurfaceArea(10,null,10);
rectangularPrismSurfaceArea(10,10,undefined);
rectangularPrismSurfaceArea(10,10,'a');
rectangularPrismSurfaceArea(5,4,-2);
rectangularPrismSurfaceArea(5);
console.log("");

// Volume of sphere
sphereVolume(10);
sphereVolume(null);
sphereVolume(undefined);
sphereVolume('a');
sphereVolume(-7);
console.log("");

// Surface area of sphere
sphereSurfaceArea(10);
sphereSurfaceArea(null);
sphereSurfaceArea(undefined);
sphereSurfaceArea('a');
sphereSurfaceArea(-11);
console.log("");

// Deep Equality
checkEquality({a: '2', b: 3},{a: 2, b: 3});
checkEquality({a: 2, b: 3},{a: 2, b: 3});
checkEquality();
checkEquality(123,123);
checkEquality('hello','world');
checkEquality(['a','b','c','d'],['a','b','e','d']);
/*try{
    checkEquality(,);
    } catch(e){
    console.log(e.message);
    }*/

console.log("");

//unique elements in array
numberOfUniqueElements(["a", "a", "b", "a", "b", "c",1,2,3,null,undefined,0,-0,+0,-1]);
numberOfUniqueElements(undefined);
numberOfUniqueElements(null);
numberOfUniqueElements(12345);
numberOfUniqueElements('test');
console.log("");

//Number of characters in a string
numberOfCharacters("Hello, the pie is in the oven");
numberOfCharacters(undefined);
numberOfCharacters(null);
numberOfCharacters(123456789);
numberOfCharacters("Hello, the program ends here");
