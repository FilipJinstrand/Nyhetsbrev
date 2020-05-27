var express = require('express');
var router = express.Router();
var path = require('path');

// Get admin page
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/../public/admin.html'));
});

router.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname, '/../DB/admin.json'))
})

module.exports = router;