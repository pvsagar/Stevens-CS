/* importing required files and packages */
const express = require('express');
const userRoutes = express.Router();

/* payment route */
userRoutes.use("/sign-up", require('./sign-up')); // url: ~/user/sign-up
userRoutes.use("/login", require('./login')); // url: ~/user/login
userRoutes.use("/forget-password", require('./forget-password')); // url: ~/user//forget-password
userRoutes.use("/profile", require('./profile'));
userRoutes.use("/history", require('./history'));
userRoutes.use("/workspace-review", require('./workspace-review'));

// userRoutes.use("/profile", require('./profile'));
/* non existing page configuration */
userRoutes.use("*", (req, res) => {
	res.render('components/errors', {
		mainTitle: "Page Not Found •",
		code: 404,
		message: `Page Not Found`,
//		user: req.user
	});
});

module.exports = userRoutes;