/* 
 * User Routers * 
 * User Data Access Object *
 * User Forget Password *
*/

/* importing required files and packages */
const express = require('express');
const router = express.Router();
const xss = require('xss');
const validator = require('validator');
const passport = require('../../config/passport-user');
const services = require('../../assets/helpers/services');
const users = require('../../dao').user;
const credentials = require('../../dao').credentials;

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
        res.redirect('/user/dashboard');
    } else {
        return next();
    }
}

async function isValid(req, res, next) {
    let email = emailToLowerCase(xss(req.body.email));
    
    if (email.length == 0) {
        res.status(400).send({ error: "No email id provided" });
    } 
    if (!validator.isEmail(email)) {
        res.status(400).send({ error: "Invalid email id format." });
    }

    const userCredentials = await credentialData.getCredentialByEmail(email);
    if (userCredentials == null) {      // no user document found
        res.status(400).send({ error: "This email id is not registered" });
    } else {    // document found and comparing credentials
        try{
            credentialsData.compareCredential(email, password);
            next();
        } catch (error) {
            res.status(400).send({ error: "Incorrect password!" });
        }
    }
}



/* global scoped function */
router.get('/', isLoggedIn, (req, res) => {
    res.render('user/forget-password', {
        mainTitle: "Forget Password •",
        mainDescription: "Welcome to the Free Lancer | A search engine to find a best job and workspace."
    });
});

router.post('/', isValid, async (req, res) => {
    let email = services.emailToLowerCase(xss(req.body.email));
    
    // generating new random password
    const genPass = await credentials.generateCredential(email);
    req.body["password"] = genPass;
    res.json(req.body);
});

// exporting routing apis
module.exports = router;