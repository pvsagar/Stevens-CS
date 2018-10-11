

const checkRoutes = require("./checker");
const checkMethods = (app) => {
    app.use("/", checkRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Page Not found" });
});
};

module.exports = checkMethods;

