//  Check for Numbers
function checkIsProperNumber(val, variableName) {
    if (val <0){
        throw `${variableName} is not a valid Number, it is a negative value`
    }
    if (val === 0){
        throw `${variableName} is not a valid Number, it is Zero`
    }
    if (val === undefined || typeof val !== "number") {
        throw `${variableName || 'provided variable'} is not a Number, it is ${typeof(val)}`;
    }
}
// Export modules
module.exports = {
    description: "This is geometry module of lab 2",
    // Volume of Rectangular Prism
    volumeOfRectangularPrism: (length, width, height) => {
        checkIsProperNumber(length, "Length");
        checkIsProperNumber(width, "Width");
        checkIsProperNumber(height, "Height");
        return length * width * height ;
    },
    // Surface area of Rectangular prism
    surfaceAreaOfRectangularPrism: (length, width, height) => {
        checkIsProperNumber(length, "Length");
        checkIsProperNumber(width, "Width");
        checkIsProperNumber(height, "Height");
        return 2*(length * width + width * height + height * length);
    },
    // Volume of sphere
    volumeOfSphere: (radius) => {
        checkIsProperNumber(radius, "Radius");
        return (4/3) * Math.PI * Math.pow(radius, 3);;
    },
    // Surface area of Sphere
    surfaceAreaOfSphere: (radius) => {
        checkIsProperNumber(radius, "Radius");
        return 4 * Math.PI * Math.pow(radius, 2);;
    }
};

