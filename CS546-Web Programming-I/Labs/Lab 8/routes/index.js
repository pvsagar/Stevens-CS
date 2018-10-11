

const checkerRoutes = require("./checker");
const constructorMethod = (app) => {
    app.use("/", checkerRoutes);
    app.use("/result", checkerRoutes);
    // error page
    app.use("*", (req, res) => {
        res.status(404).json({ error: "Page Not found" });
});
};
module.exports = constructorMethod;

