/* importing required files and packages */
const homeRoutes = require('./home');
const infoRoutes = require('./info');
const userRoutes = require('./user');

const mainRoutes = (app) => {

    /* home page routes */
    app.use("/$/", homeRoutes);

    /* customized routes */
    app.use("/info", infoRoutes);
    app.use("/user", userRoutes);
    /* non existing page configuration */
    app.use("*", (req, res) => {
        res.render('components/errors', {
            mainTitle: "Page Not Found •",
            code: 404,
            message: `Page Not Found`,
            //user: req.user
        });
    });
};

module.exports = mainRoutes;