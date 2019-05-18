let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");
let permissionModel = require('../models/permission.model')


router.post('/permission/save', (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request body is missing')
    }

    if(!req.body.email) {
        // ...
    }
    let model = new permissionModel(req.body)
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


router.get("/user/permision/getOptions", (req, res, next ) => {
    permissionModel.findOne({
        username: "noel"
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router