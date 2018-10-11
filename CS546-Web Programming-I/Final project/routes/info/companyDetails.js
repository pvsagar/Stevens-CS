

/* importing required files and packages */
const express = require('express');
const router = express.Router();
const companies = require('../../dao').companies;
//let companydetails = [];

router.get('/:id', async (req, res) => {
    var CompID = req.params.id;
    var projectList = [];
    var companyClicked = '';
    const companyList = await companies.getCompanies();
    //console.log("now you clicked on company name \n");
    // console.log(companyList);
    // console.log("id is "+CompID);
    for(let x in companyList){
        // for(let y in companyList[x]) {
            if(CompID == companyList[x]["_id"]){
                //console.log("Fetched data --> ", companyList[x]["projects"]);
                projectList = companyList[x]["projects"];
                companyClicked = companyList[x]["name"];
            }
        // }
    }
    //console.log("projectList is ",projectList);
    //console.log("company name is ",companyClicked);
        
      res.render("details/companyDetails", { 
        Company : companyClicked,
        Project : projectList
        
        });
    });

    // exporting routing apis
    module.exports = router;



