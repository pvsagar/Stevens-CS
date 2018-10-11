/* 
 * Info Routers * 
 * Info Data Access Object *
 * Info Items *
*/

/* importing required files and packages */
const express = require('express');
const router = express.Router();
const workspaces = require('../../dao').workspaces;


router.get('/', async (req, res) => {

    const workspaceList = await workspaces.getWorkspaces();
    console.log(workspaceList);
    
    
      res.render("static/workspace", { 
        title: "Workspace Page!!",
        workspace:workspaceList
        });
    });
    // exporting routing apis
    module.exports = router;



