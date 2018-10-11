/* Workspaces Reviews Collection
 * Data Access Object *
 * Workspaces Reviews Controllers for DAO actions *
*/

/* importing required files and packages */
const uuid = require('uuid');
const mongoDbCollections = require('../config/mongodb-collection');
const workspaces = mongoDbCollections.workspaces;
const workspaceReviews = mongoDbCollections.workspaceReviews;
const workspaceData = require('./workspaces');

/* exporting controllers apis */
let reviewsControllers = {
    /**
     * @returns {Array} List of all reviews on workspace in the database
     */
    getAllReviews: async function () {
        const reviewsCollection = await workspaceReviews();
        const reviewInfo = await reviewsCollection.find({}).toArray();
        if (reviewInfo === null) {
            throw "Server issue in fetching workspace reviews";
        }
        return reviewInfo;
    },

    /**
     * @returns {String} A top review comment
     */
    getReviewById: async function(id) {
        if (!id) throw "Please provide the reviews id";
        const reviewsCollection = await workspaceReviews();
        const reviewInfo = await reviewsCollection.findOne({ _id: id });
        if (reviewInfo === null) {
            throw "Server issue in fetching workspace reviews by id";
        }
        return reviewInfo.userReviews[0].comment;
    },

    /**
     * @returns {String} A top review comment
     */
    getAllReviewById: async function(id) {
        if (!id) throw "Please provide the reviews id";
        const reviewsCollection = await workspaceReviews();
        const reviewInfo = await reviewsCollection.findOne({ _id: id });
        if (reviewInfo === null) {
            throw "Server issue in fetching workspace reviews by id";
        }
        return reviewInfo;
    },

    /**
     * 
     */
    createReview: async function(newReview) {
        let workspaceReview = {
            _id: uuid.v4(),
            totalReviews: 1,
            userReviews: [
                newReview
            ]
        };

        try {
            const reviewsCollection = await workspaceReviews();
            const isReviewCreated = await reviewsCollection.insertOne(workspaceReview);
            if (isReviewCreated.insertedCount === 0) throw "Issue in creating workspace review";
            return { success: true, reviewId: workspaceReview._id };
        } catch (err) {
            throw err;
        }
    },

    /**
     * 
     */
    updateReview: async function(reviewsId, totalReviews, reviews) {
        let workspaceChanges = {
            totalReviews: totalReviews,
            userReviews: reviews
        }
        try {
            const reviewsCollection = await workspaceReviews();
            const isReviewCreated = await reviewsCollection.updateOne({ _id: reviewsId }, { $set: workspaceChanges });
            return { success: true };
        } catch (err) {
            throw err;
        }
    },

    /**
     * 
     */
    addNewReview: async function(userName, userEmail, workspaceId, comment, rating) {
        if (!userName) throw "Please provide user name";
        if (!userEmail) throw "Please provide user email address";
        if (!workspaceId) throw "Please provide workspace id";
        if (!comment) throw "Please provide comment";
        if (!rating) throw "Please provide rating";

        try {
            const workspaceInfo = await workspaceData.getWorkspaceById(workspaceId);
            let newReview = {
                _id: uuid.v4(),
                name: userName,
                email: userEmail,
                comment: comment,
                rating: rating
            };

            let totalReviews = 1;
            if (workspaceInfo.reviewsId === undefined || workspaceInfo.reviewsId === '') {
                const reviewCreatedInfo = await this.createReview(newReview);
                const isReviewIdUpdated = await workspaceData.updateWorkspaceReviewId(workspaceId, reviewCreatedInfo.reviewId);
                if (isReviewIdUpdated.success !== true) throw "Error in updating workspace reviews id";
            } else {
                const reviewInfo = await this.getAllReviewById(workspaceInfo.reviewsId);
                totalReviews = parseInt(reviewInfo.totalReviews) + 1;
                let reviews = reviewInfo.userReviews;
                reviews.push(newReview);

                const isRatingUpdated = await this.updateReview(workspaceInfo.reviewsId, totalReviews, reviews);
                if (isRatingUpdated.success !== true) throw "Error in updating review";
            }
        console.log('e1');
            
            const isRatingUpdated = await workspaceData.updateWorkspaceRating(workspaceId, rating, totalReviews);
            if (isRatingUpdated.success !== true) throw "Error in updating workspace review rating";

        console.log('h');
        
            return { success: true };
        } catch(err) {
            throw err;
        }
    }
};

for(let key in reviewsControllers) {
    module.exports[key] = reviewsControllers[key];
}