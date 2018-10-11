/* Workspace Collection
 * Data Access Object *
 * Workspace Controllers for DAO actions *
*/

/* importing required files and packages */
const mongoDbCollection = require('../config/mongodb-collection');
const companies = mongoDbCollection.companies;

/* exporting controllers apis */
module.exports = companiesControllers = {
    /**
     * @returns {Array} List of all companies in the database
     */
    getCompanies: async function () {
        const companiesCollection = await companies();
        let companiesList = await companiesCollection.find({}).toArray();
        if (companiesList.length <= 0) {
            throw "Server issue in fetching companies list with 'companies' collection";
        }
        return companiesList;
    },

    /**
     * @returns {Array} List of top four companies
     */
    getTopFourCompanies: async function () {
        try {
            let companiesList = await this.getCompanies();
            let companiesCount = companiesList.length;
            
            if (companiesCount <= 0) {
                throw "Server issue in fetching companies list with 'companies' collection";
            } else if (companiesCount > 4) {
                companiesList = companiesList.slice(0, 4);
            } 
            return companiesList;
        } catch(err) {
            throw err;
        }
    },

    /**
     * @returns {Object} An object of company
     */
    getCompanyById: async function(id) {
        if (!id) throw "Please provide the company id";
        
        const companiesCollection = await companies();
        const companyInfo = await companiesCollection.findOne({ _id: id });
        if (companyInfo === null) {
            throw "Server issue in fetching company by id";
        }
        return companyInfo;
    }
};