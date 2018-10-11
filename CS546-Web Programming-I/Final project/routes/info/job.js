/* 
 * Info Routers * 
 * Info Data Access Object *
 * Info Items *
*/

/* importing required files and packages */
const express = require('express');
const router = express.Router();
const companies = require('../../dao').companies;

router.get('/', async (req, res) => {
    const companyList = await companies.getCompanies();
    res.render("static/job", { 
        title: "Job Page",
        company:companyList
    });
});

router.post("/:type", async (req, res) => {  
    let type = req.params.type;
    let toSearchList = req.body.inp;

    try {
        const companyList = await companies.getCompanies();
        let resultData = [];

        if (type === 'searchbar') {
           if (toSearchList !== '') {
                for (let i in companyList) {
                    var projects = companyList[i].projects;
                    for (let p in projects) {
                        var project = projects[p];
                        if (project.technologies.indexOf(toSearchList) >= 0) {
                            let compData = {
                                _id: companyList[i]._id,
                                name: companyList[i].name,
                                projects: [{
                                    projectId: project._id,
                                    position: project.title
                                }]
                            }
                            resultData.push(compData);
                        }
                    }
                }
            } else {
                for (let i in companyList) {
                    var projects = companyList[i].projects;
                    for (let p in projects) {
                        var project = projects[p];
                        let compData = {
                            _id: companyList[i]._id,
                            name: companyList[i].name,
                            projects: [{
                                projectId: project._id,
                                position: project.title
                            }]
                        }
                        resultData.push(compData);
                    }
                }
            }
        } else if (type === 'filter') {
            if (toSearchList.length > 0) {
                for (let i in companyList) {
                    var projects = companyList[i].projects;
                    for (let p in projects) {
                        var project = projects[p];
                        for (let el in toSearchList) {
                            var technologies = project.technologies;
                            var element = toSearchList[el];
                            if (technologies.indexOf(element) >= 0) {
                                let compData = {
                                    _id: companyList[i]._id,
                                    name: companyList[i].name,
                                    projects: [{
                                        projectId: project._id,
                                        position: project.title
                                    }]
                                }
                                resultData.push(compData);
                            }
                        }
                    }
                }
            } else {
                for (let i in companyList) {
                    var projects = companyList[i].projects;
                    for (let p in projects) {
                        var project = projects[p];
                        let compData = {
                            _id: companyList[i]._id,
                            name: companyList[i].name,
                            projects: [{
                                projectId: project._id,
                                position: project.title
                            }]
                        }
                        resultData.push(compData);
                    }
                }

            }
        }
        res.status(200).send({ data: resultData });
    } catch(err) {
        throw err;
    }
});

// exporting routing apis
module.exports = router;