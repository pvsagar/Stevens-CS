/* importing required files and packages */
const express = require('express');
const router = express.Router();
const userData = require('../../dao').users;
const historyData = require('../../dao').history;
const workspaceData = require('../../dao').workspaces;

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
    } else {
		res.redirect('/user/login');
    }
}

router.get('/workspaces', /*isLoggedIn,*/ async (req, res) => {
	let email = 'pgarg2@stevens.edu' //req.user.email;
	try {
        const wHisList = await historyData.getWorkspaceHistoryByEmail(email);
        let wList = [];

        for (let i in wHisList) {
            wList.push(await workspaceData.findWorkspaceId(wHisList[i].name, wHisList[i].email, wHisList[i].phone, wHisList[i].address));
        }
		res.render('history/workspace-history', {
            workspacesList: wList
        });
	} catch(err) {
		throw err;
	}
});

router.post('/workspaces', /*isLoggedIn,*/ async (req, res) => {
	let email = 'pgarg2@stevens.edu' //req.user.email;
    
    let wName = req.body.name;
    let wEmail = req.body.email;
    let wPhone = req.body.phone;
    let wAddress = req.body.address;

    try {
        const workspaceHistoryList = await historyData.addNewWorkspaceHistory(email, wName, wEmail, wPhone, wAddress);
        res.redirect('/user/history/workspaces');
    } catch(err) {
        throw err;
    }
});

router.get('/jobs', /*isLoggedIn,*/ async (req, res) => {
	let email = 'pgarg2@stevens.edu' //req.user.email;
	try {
        const jobHistoryList = await historyData.getJobHistoryByEmail(email);
		res.render('history/job-history', {
            jobsList: jobHistoryList
        });
	} catch(err) {
		throw err;
	}
});

router.post('/jobs', /*isLoggedIn,*/ async (req, res) => {
	let email = 'pgarg2@stevens.edu' //req.user.email;
    
    let project = req.body.project;
    let position = req.body.position;
    let start = req.body.start;
    let end = req.body.end;

    try {
        const jobHistoryList = await historyData.addNewJobHistory(email, project, position, start, end);
        res.redirect('/user/history/jobs');
    } catch(err) {
        throw err;
    }
});

// exporting routing apis
module.exports = router;