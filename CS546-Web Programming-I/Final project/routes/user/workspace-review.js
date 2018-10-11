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
const workData = require('../../dao').workspaces;
const reviewsData = require('../../dao').workspacesReviews;

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
        res.redirect('/user/profile');
    } else {
        return next();
    }
}

/* global scoped function */
router.get('/:id', isLoggedIn, async (req, res) => {
    try {
        const workspace = await workData.getWorkspaceById(req.params.id);
        res.render('user/workspace-review', {
            mainTitle: "Add a review •",
            mainDescription: "Welcome to the Free Lancer | A search engine to find a best job and workspace.",
            workspacesList: workspace
        });
    } catch(err) {
        throw err;
    }
});

router.post('/:id', async (req, res) => {
    let userComments = req.body;
    let comment = xss(userComments.comment);
    let rating = xss(userComments.rating);
    let workspaceId = req.params.id

    if(!comment) {
        res.status(400).send({ message: "Please provide a comment." });
    } else if (!rating) {
        res.status(400).send({ message: "Please provide a rating." });
    }

    const user = {
        email: 'pgarg2@stevens.edu',
        name: 'Paras Garg'
    }

    // searching for an existing user
    try {
        const isReviewCreated = await reviewsData.addNewReview(user.name, user.email, workspaceId, comment, rating);
        
    if (isReviewCreated.success === true) {
            res.status(200).send({ message: "Review created successfully" });
        } else {
            res.status(400).send({ message: "Unknow error occurred" });
        }
    } catch(error) {
        res.status(400).send({ message: error });
    }
});

// exporting routing apis
module.exports = router;