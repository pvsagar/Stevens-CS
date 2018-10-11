/* 
 * Info Routers * 
 * Info Data Access Object *
 * Info Items *
*/

/* importing required files and packages */
const express = require('express');
const router = express.Router();

/* global scoped function */
router.get('/', async (req, res) => {
    res.render('static/about-us', {
        mainTitle: "About Us",
        mainDescription: "Welcome to the Free Lancer | A search engine to find a best job and workspace.",
        // user: req.user,
        about: "Lorem ipsum dolor sit amet, ut id, vestibulum nec wisi vel scelerisque ut, et vestibulum risus enim vestibulum, vehicula ante, tortor erat non. Quis luctus, sed vestibulum urna dui eu rerum ac, nonummy commodo.",
        contact: {
            phone: "+1 987-654-3210",
            email: "cs546group@stevens.edu"
        }
    });
});
// exporting routing apis
module.exports = router;