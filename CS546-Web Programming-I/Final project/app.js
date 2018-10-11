/* importing node module files */
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const handlebars = require('handlebars');
const passport = require('passport');

/* express server configuration */
const app = express();

/* session  configuration */
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

/* passport authenticator initialization */
app.use(passport.initialize());
app.use(passport.session());

/* body parser configuration */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* static pages configuration */
const static = express.static(__dirname + '/assets');
app.use("/assets", static);

/* view or handlebars configuration */
var hbsHelpers = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: require('./assets/helpers/handlebars'),
    defaultLayout: 'main',
    extname: '.handlebars'
});

app.engine('handlebars', hbsHelpers.engine);
app.set('view engine', 'handlebars');

/* routing configuration */
const configRoutes = require("./routes");
configRoutes(app);

/* running server on port 3000 */
app.listen(3000, () => {
    console.log("We've now got a server");
    console.log("Your routes will be running on http://localhost:3000");
});