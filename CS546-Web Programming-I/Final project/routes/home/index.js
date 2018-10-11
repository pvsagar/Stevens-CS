/* 
 * Home Routers * 
 * Home Data Access Object *
 * Home Items *
*/

/* importing required files and packages */
const express = require('express');
const router = express.Router();
const workspaces = require('../../dao').workspaces;
const companies = require('../../dao').companies;

/* global scoped function */
router.get('/', async (req, res) => {
    try {
        let workspacesList = await workspaces.getTopFourWorkspaces();
        let companiesList = await companies.getTopFourCompanies();
      
        res.render('index', {
            mainTitle: "Welcome to",
            mainDescription: "Welcome to the Free Lancer | A search engine to find a best job and workspace.",
            // user: req.user,
            companies: companiesList,
            workspaces: workspacesList
        });
    } catch (err) {
        res.status(404).json({ error: err });
    }
});

// exporting routing apis
module.exports = router;