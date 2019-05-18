let mongoose = require('mongoose')

const connectionString = 'mongodb+srv://vjadmin:ExkJy3tww8FvHvky@vjcluster-dx1k5.mongodb.net/test?retryWrites=true\n'

mongoose.connect(connectionString)

let CustomerSchema = new mongoose.Schema({
    name: String,
    username : String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Customer', CustomerSchema)