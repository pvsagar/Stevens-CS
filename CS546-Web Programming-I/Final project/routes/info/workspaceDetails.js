

/* importing required files and packages */
const express = require('express');
const router = express.Router();
const workspaces = require('../../dao').workspaces;
const workspacesReviews = require('../../dao').workspacesReviews;


router.get('/:id', async (req, res) => {
    var workSpaceID = req.params.id;
    var WorkspaceDetails = [];
    var ReviewDetails ;
    var ReviewID = "";
    const workspaceList = await workspaces.getWorkspaces();
    // console.log("now you clicked on work space details \n");
    // console.log(workspaceList);
    // console.log("id is "+workSpaceID);
    workspaceList.forEach((workspace) => {
        if (workSpaceID === workspace._id) {
            WorkspaceDetails.push(workspace);
            ReviewID = workspace.reviewsId;
        }
    })

    const ReviewsList = await workspacesReviews.getAllReviews();
    ReviewsList.forEach((review)=>{
        if(ReviewID === review._id){
            ReviewDetails = review.userReviews;
            //console.log('Review is ', review)
        }
    })

    //console.log("workspace details is ", WorkspaceDetails);
    //console.log("reviews id is ", ReviewID);
    //console.log("reviews are ", ReviewDetails);
    res.render("details/workspaceDetails", { 
        workspace:  WorkspaceDetails,
        reviews : ReviewDetails
    });
});

// exporting routing apis
module.exports = router;



