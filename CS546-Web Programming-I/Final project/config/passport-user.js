/* imporing useful files and libraries */
// authentication using passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const xss = require('xss');
// data modules
const dao = require('../dao');
const user = dao.user;
const credential = dao.credentials;

// passport configuration
passport.use('user', new LocalStrategy({ usernameField:"email", passwordField:"password" }, async (email, password, done) => {
    email = xss(email);
    password = xss(password);

    const credentialInfo = await credential.getCredentialByEmail(email);
    if (credentialInfo !== null ) {
        try {
            const isAuthorize = await credential.compareCredentials(email, password);
            if (isAuthorize.success === true) {
                done(null, credentialInfo);
            }
        } catch(error) {
            done(null, false, { message: error });
        }
    }
    done(null, false, { message: "Invalid email id or password" });
}));

// user serializer or deserializer for maintaining cookies and sessions
passport.serializeUser(async (user, done) => {               // user is receiving all user credentials from above
    done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {           // getting user id from above
    try {
        const userInfo = await user.getUserById(userId);
        if (userInfo !== null) {
            done(null, userInfo);
        }
    } catch(error) {
        done(null, false, { message: error });
    }
    done(null, false, { message: "User information is unavailable" });
});

// exporting passport
module.exports = passport;