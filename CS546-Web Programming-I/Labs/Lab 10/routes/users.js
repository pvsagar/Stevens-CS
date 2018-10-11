const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const flash = require('connect-flash');


// route for home page
router.get('/', (req, res) => {
    req.flash('flashValue');

    if (req.session.flash["error"] === undefined) {
        res.render('login/form', { error: req.session.flash.error });   
    } else {
        res.render('login/form', { error: req.session.flash.error.slice(-1)[0] });
    }
});


// route for private page
router.get("/private", async (req, res) => 
{
    res.render("login/error",{error: "No user Is logged in, Login to access this page"});
   
});

//rote for login page without submitting form
router.get("/login", async (req, res) => 
{
    res.render("login/error",{error: "No user Is logged in"});
   
});
// routing for login form submit
router.post("/login",async(req,res)=>
{
    let input=req.body;
    let username=input["username"];
    let password=input["password"];
    let checkValid = "Valid Password";
    let checkInvalid = "Invalid Password";
    try{
        const inputValue= await usersData.getUsername(username);
        
        if (username!= undefined){ 
            const resultVal = await usersData.checkPassword(password,inputValue.hashedPassword);
            
            if(resultVal == checkValid){
                req.session.user = inputValue;
                res.render("login/private",{
                    username: inputValue.username,
                    firstName: inputValue.firstName,
                    lastName: inputValue.lastName,
                    profession: inputValue.profession,
                    bio: inputValue.bio
                });
            }else{
            res.render("login/form",{error: checkInvalid});
            }
        }
        else{
            res.render("login/form",{error: "User Not found"});
        }
        }catch(error){
            res.render("login/form",{error: "Invalid Username/Password"});
        }

}, 
// route for logout
router.get("/logout",async(req,res)=>{
    
        res.clearCookie('AuthCookie');
        res.render('login/logout');  
    
     
}));

module.exports = router;