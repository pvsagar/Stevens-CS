

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("checker/static", {});
});
module.exports = router;

