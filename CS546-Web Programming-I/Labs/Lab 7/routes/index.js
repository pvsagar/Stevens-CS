

const recipesRoutes = require("./recipes");
const constructorMethod = (app) => {
    app.use("/recipes", recipesRoutes);
    app.use("/$/", (req, res) => {
        res.status(200).send("This is the Main Page of http://localhost:3000");
    })
    app.use("*", (req, res) => {
        res.status(404).send("Error 404. Page Not Found");
    });
};
module.exports = constructorMethod;

