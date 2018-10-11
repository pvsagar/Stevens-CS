
const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

app.use("/public", static);
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

app.use(require('express-session')({
    key:"AuthCookie",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(flash());
app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const exphbs = require("express-handlebars");
app.engine('handlebars', exphbs({ defaultLayout:'main' }));
app.set('view engine', 'handlebars');

const configRoutes = require("./routes");
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server");
    console.log("Your routes will be running on http://localhost:3000");
    if (process && process.send) process.send({done: true});
});