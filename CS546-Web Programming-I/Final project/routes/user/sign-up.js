/* 
 * User Routers * 
 * User Data Access Object *
 * User Signup *
*/

/* importing required files and packages */
const express = require('express');
const router = express.Router();
const xss = require('xss');
const validator = require('validator');
const passport = require('../../config/passport-user');
const services = require('../../assets/helpers/services');
const userData = require('../../dao').users;

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
        res.redirect('/user/profile');
    } else {
        return next();
    }
}

/* global scoped function */
router.get('/', isLoggedIn, (req, res) => {
    res.render('user/sign-up', {
        mainTitle: "Create an Account •",
        mainDescription: "Welcome to the Free Lancer | A search engine to find a best job and workspace."
    });
});

router.post('/', async (req, res) => {
    let newUser = req.body;

    let username = xss(newUser.username);
    let email = services.emailToLowerCase(xss(newUser.email));
    let password = xss(newUser.password);

    // checking null values
    if(!username) {
        res.status(400).send({ message: "Please provide your username." });
    } else if (!email) {
        res.status(400).send({ message: "Please provide your email id." });
    } else if (!password) {
        res.status(400).send({ message: "Please provide your account password." });
    }

    // validating email syntax
    if (!validator.isEmail(email)) {
        res.status(400).send({ message: "Invalid email id format." });
    }
    
    // searching for an existing user
    try {
        const isUserCreated = await userData.createUser(username, email, password);
        if (isUserCreated.success === true) {
            res.status(200).send({ message: "Account created successfully" });
        } else {
            res.status(400).send({ message: "Unknow error occurred" });
        }    
    } catch(error) {
        res.status(400).send({ message: error });
    }
});

// exporting routing apis
module.exports = router;