let UserModel = require('../models/user.model');
let express = require('express');
let router = express.Router();
// let bcrypt = require("bcrypt");
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
    UserModel.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new UserModel({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});


router.post("/api/authenticate", (req, res, next) => {
    UserModel.find({ email: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed fuck u"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed fk"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    //res.setHeaderValue('Authorization', "Beaer " + token);
                    return res.status(200).json({

                        message: "Auth successful",
                        id_token: token
                    });
                }

                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



// Create a new customer
// POST localhost:3000/customer
router.post('/user/save', (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request body is missing')
    }
    if(!req.body.email) {
        // ...
    }
    let model = new UserModel(req.body)
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// GET
router.get('/user', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }
    UserModel.findOne({
        email: req.query.email
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//GET ALL
router.get('/user/list', (req, res) => {
    UserModel.find().then(doc => {
        res.json(doc)
    }) .catch(error => {
      res.status(500).json(error)
    })
})


// UPDATE
router.put('/user', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }

    UserModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {
        new: true
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// DELETE
router.delete('/user', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }

    CustomerModel.findOneAndRemove({
        email: req.query.email
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})



module.exports = router
