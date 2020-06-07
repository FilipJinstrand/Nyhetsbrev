var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '/../DB/users.json'));
});

router.post('/login', (req, res) => {
    fs.readFile(path.join(__dirname, '/../DB/users.json'), (err, data) => {
        if (err) throw err;

        var json = JSON.parse(data);
        json.forEach(element => {
            if (element.userName === req.body.userName && element.password === req.body.password) {
                res.send(element.id.toString());
            }
        });

    });
})


router.post('/', function (req, res) {
    console.log(req.body);
    var user = req.body;
    console.log(user);
    fs.readFile(path.join(__dirname, '/../DB/users.json'), (err, data) => {
        if (err) throw err;

        var json = JSON.parse(data);
        json.push(user);

        fs.writeFile(path.join(__dirname, '/../DB/users.json'), JSON.stringify(json), (err) => {
            if (err) throw err;
        });
    });
    res.status(200).send(req.body);
});


router.put('/:id', (req, res) => {
    var id = parseInt(req.params.id);
    var updatedUser = req.body.subscribed;

    fs.readFile(path.join(__dirname, '/../DB/users.json'), (err, data) => {
        if (err) throw err;

        var json = JSON.parse(data);

        json.forEach(element => {
            if (element.id === id) {
                element.subscribed = updatedUser
            }
        });

        fs.writeFile(path.join(__dirname, '/../DB/users.json'), JSON.stringify(json), (err) => {
            if (err) throw err;
        });
    });
    res.status(200).send(req.body);
})

module.exports = router;
