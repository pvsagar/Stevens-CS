/* Users Collection
 * Data Access Object *
 * Users Controllers for DAO actions *
*/

/* importing required files and packages */
const uuid = require('uuid');
const passport = require('passport');
const bcrypt = require('bcrypt');
const mongoDbCollections = require('../config/mongodb-collection');
const user = mongoDbCollections.users;
const credential = require('./credentials');

/* exporting controllers apis */
let userControllers = {
    /**
     * @returns {Object} An object of workspace
     */
    getUserById: async function(email) {
        if (!email) throw "Please provide the email id";
        const userCollection = await user();
        const userInfo = await userCollection.findOne({ _id: email });
        if (userInfo === null) {
            throw "Server issue in fetching user by email id";
        }
        return userInfo;
    },

    /**
     * @param {String} username
     * @param {String} email
     * @param {String} password
     */
    createUser: async function(username, email, password) {
        if(!username || !email || !password) throw "Insufficient data provided";
        
        let userInfo = {
            _id: email, 
            username: username,
            name: '',
            mobile: '',
            areaOfInterest: ''
        };
        

        try {
            const userCollection = await user();
            const isUserExists = await userCollection.findOne({ _id: email });

            if (isUserExists === null) {
                const isUserCreated = await userCollection.insert(userInfo);
    
                if (isUserCreated.insertedCount === 0) throw "Server issue while creating user.";
                else{
                    const isCredentialCreated = await credential.createCredential(email, password);
                    let user = {
                        id: email,
                        password: password
                    }
                    passport.authenticate('user');
                    return { success: true };
                } 

            } else {
                throw "User is already registered.";
            }
        } catch (error) {
            throw error; 
        }
    },

    editUserInfo: async function(name, email, mobile, areaofinterest) {
        if(!name || !mobile || !areaofinterest) throw "Insufficient data provided";
        
        try {
            let userInfo = await this.getUserById(email);
            if(userInfo) {
                userInfo["name"] = name;
                userInfo["mobile"] = mobile;
                userInfo["areaOfInterest"] = areaofinterest;
            }
            const userCollection = await user();
            const isUpdated = await userCollection.updateOne({ _id: email }, { $set: userInfo } );
            return { success: true };
        } catch(err) {
            throw err;
        }
    }
};

for(let key in userControllers) {
    module.exports[key] = userControllers[key];
}