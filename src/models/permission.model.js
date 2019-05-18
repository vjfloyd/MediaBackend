let mongoose = require('mongoose')
const connectionString = 'mongodb+srv://vjadmin:ExkJy3tww8FvHvky@vjcluster-dx1k5.mongodb.net/test?retryWrites=true\n'
mongoose.connect(connectionString)

let permissionSchema = new mongoose.Schema({
    username : String,
    fullname : String,
    rolDescription : String,
    roleName : String,
    roleCode : String
})

module.exports = mongoose.model('Permission',permissionSchema)




