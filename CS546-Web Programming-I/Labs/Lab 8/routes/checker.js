

const express = require('express');
const router = express.Router();
const data = require("../data");
const checker = data.checker;
// router for start page
router.get("/", (req, res) => {
  res.render("checker/startpage", {});
});

// router for error page
router.get("/result", (req, res) => {
  res.status(400).render("checker/errorpage", {
    error: "First enter text to check results."
  }); 
});

// router to post results
router.post("/result", async (req, res) => 
{
  let input = req.body;
  let textToCheck =  input.texttest;
  let result;
  if (!textToCheck) {
    res.status(400).render("checker/errorpage", {
      error: "No input provided. Please enter a string to check for Palindrome!"
    }); 
    return;
  }
  try 
  {
    result=checker.Palindrome(textToCheck);
    if(result ==="Palindrome"){
      res.render("checker/result", {
        inputs: textToCheck,
        results: result    
      });
    }else{
      res.render("checker/result", {
        inputs: textToCheck,
        result1: result    
      });
    }
          
  } 
  catch (e) 
  {
    res.status(400).render("checker/errorpage", {
      error: e
    });
  }
});
  
module.exports = router;

