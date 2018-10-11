const express = require('express');
const router = express.Router();
const userData = require('../../dao').users;
const xss = require('xss');
const validator = require('validator');
// const express = require('express');
// const router = express.Router();
// const xss = require('xss');
// const validator = require('validator');
const passport = require('../../config/passport-user');
const services = require('../../assets/helpers/services');
// const userData = require('../../dao').users;
// const services = require('../../assets/helpers/services');

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
        // res.redirect('/user/profile');
        res.redirect('/user/profile');
    } else {
        return next();
    }
}

router.get('/', isLoggedIn, async  (req, res) => {  
    
    var email = 'pgarg2@stevens.edu';
    try {
        const userInfo = await userData.getUserById(email);
        res.render('user/profile', {
            user: userInfo
        });
    } catch(err) {
        throw err;
    }
});

router.post('/', isLoggedIn, async (req, res) => {
    let input = req.body;

    let email = 'pgarg2@stevens.edu';
    let name = xss(input.name);
    // let email = xss(input.email);
    let mobile = xss(input.mobile);
    let interest = xss(input.areaofinterest);

    // checking null values
    if(!name && typeof name === 'string') res.status(400).send({ message: "Please provide your username." });
   // else if(!email) res.status(400).send({ message: "Please provide your email." });
    else if (!mobile && mobile.length!= 10 && typeof mobile === 'string') res.status(400).send({ message: "Please provide your account mobile." });
    else if(!interest && typeof interest === 'string') res.status(400).send({message:"Please provide your area of interest"});
    
    try {
        const isUserEdited = await userData.editUserInfo(name, email, mobile, interest);
        if (isUserEdited.success === true) {
            const userInfo = await userData.getUserById(email);
            res.render('user/profile', {
                user: userInfo
            });
        } else {
            res.status(400).send({ message: "Unknow error occurred" });
        }
    } catch(error) {
        res.status(400).send({ message: error });
    }
});

module.exports = router;        
