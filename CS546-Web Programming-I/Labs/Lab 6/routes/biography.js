

const express = require('express');
const router = express.Router();

router.get("/about", (req, res) => {

    let aboutJSON = {
        "name": "Vidya Sagar Polaki",
        "cwid": "10430970",
        "biography": "I (Vidya Sagar) was born in Vizianagaram, Andhra Pradesh, in a telugu-speaking family, earned an undergraduate degree in Electronics and Communication Engineering from Andhra University, and worked for two years and nine months in Capgemini India, where I worked as a Devops engineer. My daily work involved in monitoring the daily batch runs, generating and reporting the batch run results, updating the log book. Apart from this iam involved in calculating project metrics, creating and modifying the monthly status reports and similar related records.\nFrom the begining Iam facinated by the way computers can ease our lives. That interest led me to Stevens Institute of Technology for Master of Science in Computer Science program.",
        "favoriteShows": ["Dragon Ball Series", "Game of Thrones", "Death Note", "Erased","Dexter"],
        "hobbies": ["Cooking", "Traveling", "Writing"]
    } 

    res.json(aboutJSON);
});

router.get("/story", (req, res) => {

    let storyJSON = {
        storyTitle: "My First day in College",
        story: "My First day In college was full of surprises. Its the day I met my Best Friend and my Soulmate.\nOn the first day, our Head of Department addressed the students (freshmen) with brief intro about college and our department. what we do and how we contribute to the college and society, after that there was student introductions where I saw her, the first impression is like I know this girl, I saw her somewhere. So I reached out to her introduced myself and started talking about each other. In the first meeting itself I realised that we have somany things in common and we can be a great team. From that day our relationship strengthend and we became best friends eventually.\nWhile talking to my friend, I saw a girl laughing out loud and screaming in joy, for a silent guy like me she is an absolute headache. What a painful girl  I murmured to myself. Unfortunately she saw me doing so and started a heated argument with me. I could do nothing and as I dont like saying sorry, I ignored her. That fight prolonged fueled by numerous reasons and somewhere inbetween those arguments I fell for her without even realising. She even shouted that she is in love with me and blamed me for being like that. Really what a painful girl. A pain I love to carry the rest of my life."
    }

    res.json(storyJSON);
});

router.get("/education", (req, res) => {
    
    let educationJSON = [
        {
            schoolName: "Stevens Institute of Technology",
            degree: "Master in Science in Computer Science (MSCS)",
            favoriteClass: "Introduction to E-commerce",
            favoriteMemory: "When I danced in a festival event."
        },
        {
            schoolName: "Andhra University",
            degree: "Bachelor of Engineering(BE)",
            favoriteClass: "Switching Logic Circuits",
            favoriteMemory: "One day in the SLC lecture, one student was asked to design a simple circuit. He came up with a complex circuit and asked one of the girls to switch it ON, to the surprise of entire class, A question poped up as output asking the girl for a date, and she further coninued providing inputs as NO then the loop continued till she entered YES as an answer, his brillliance was cherished by other students but not so by the one girl he wanted. we laughed out so loud that our stomachs started paining. Oe hell of a guy but the girl is real devil."
        },
        {
            schoolName: "St Josephs High School",
            degree: "Senior Secondary Certificate",
            favoriteClass: "Mathmatics",
            favoriteMemory: "Class tour to Vizag."
        }
    ]

    res.json(educationJSON);    
});

router.get("/", (req, res) => {
    // Not implemented
    res.sendStatus(501);
});
module.exports = router;