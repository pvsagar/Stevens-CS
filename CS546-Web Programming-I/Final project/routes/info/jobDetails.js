
/* importing required files and packages */
const express = require('express');
const router = express.Router();
const companies = require('../../dao').companies;
//let companydetails = [];

router.get('/:id', async (req, res) => {
    var jobID = req.params.id;
    var projectList = [];
    var projectDetails = [];
    var companyClicked = '';
    const companyList = await companies.getCompanies();
    //console.log("now you clicked on job details \n");
    //console.log(companyList);
    //console.log("clicked job id is "+jobID);

    for(let x in companyList){
        for (let y in companyList[x]["projects"]){
            //console.log(" project is"+ companyList[x]["projects"]);
            projectList.push(companyList[x]["projects"][y])
        }
        
    }
    
    for(let x in projectList) {
        if (jobID === projectList[x]['_id']){
            projectDetails.push(projectList[x])
        }
        
    }
    
    //console.log("clicked project Details is ",projectDetails);
    
    res.render("details/jobDetails", { 
        //Company : companyClicked,
        Project : projectDetails
        
        });
    });

    // exporting routing apis
    module.exports = router;



