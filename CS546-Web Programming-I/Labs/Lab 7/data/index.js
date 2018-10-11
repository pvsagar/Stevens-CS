

const recipeMethods = require('./recipes');
let constructorMethod = (app) => {
    app.use("/recipes", recipeMethods);   
};
module.exports = {
    recipes: require("./recipes")
};

