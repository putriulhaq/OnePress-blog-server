const express = require("express")
const router = express.Router()

router.get('/about', (req, res) => {
    res.send('hai guys this is about!');
});

module.exports = router;