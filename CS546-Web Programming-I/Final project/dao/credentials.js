/* Users Collection
 * Data Access Object *
 * Users Credentials for DAO actions *
*/

/* importing required files and packages */
const uuid = require('uuid');
const passport = require('passport');
const bcrypt = require('bcrypt');
const mongoDbCollections = require('../config/mongodb-collection');
const user = mongoDbCollections.users;
const credentials = mongoDbCollections.credentials;

/* exporting controllers apis */
var userControllers = {
    /**
     * @returns {Object} An object of credentials
     */
    getCredentialByEmail: async function(email) {
        if (!email) throw "Please provide the email id";
        const credentialCollection = await credentials();
        const credentialInfo = await credentialCollection.findOne({ _id: email });
        if (credentialInfo === null) {
            throw "Server issue in fetching user by email id";
        }
        return credentialInfo;
    },

    /**
     * @returns {Object} A success notex
     */
    createCredential: async function(email, password) {
        if(!email || !password) throw "Insufficient data provided";

        let userCredential = {
            _id: email,
            password: bcrypt.hashSync(password, 16)
        }

        const credentialCollection = await credentials();
        const isCredentialCreated = await credentialCollection.insert(userCredential);
        if (isCredentialCreated.insertedCount === 0) {
            throw "Server issue while creating user.";
        }
        return { success: true };
    },

    /**
     * @returns {Object} A success notex
     */
    compareCredentials: async (email, password) => {
        try {
            const credentialInfo = await this.getCredentialByEmail(email);
            if (!bcrypt.compareSync(password, credentialInfo.password)) {
                throw "Incorrect password";
            }      
            return { success: true };
        } catch(error) {
            console.log(error);
        }
    },

    //------------------------ generate new credential (for forget password)
    generateCredential: async (email) => {
        const credentialCollection = await credentials();
        let genPassword = randomString.generate(8);     // generating random string
        
        // update new credential object (empty)
        let credentialChanges = { };
        credentialChanges['password'] = generateHashedPassword(genPassword);
        try {
            // updating credential information into the collection
            credentialsCollection.updateOne( { _id:email }, { $set:credentialChanges });
            return genPassword; 
        } catch (error) {
            throw "Server issue with 'credentials' collection.";
        }        
    }
};

for(var key in userControllers) {
    module.exports[key] = userControllers[key];
}