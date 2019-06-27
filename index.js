let express = require('express');
let app = express();
let personRoute = require('./src/routes/person');
let customerRoute = require('./src/routes/customer');
let permissionRoute = require('./src/routes/permission');
let userRoute = require('./src/routes/user');
let path = require('path');
let bodyParser = require('body-parser');
const connectionString = 'mongodb+srv://vjadmin:ExkJy3tww8FvHvky@vjcluster-dx1k5.mongodb.net/test?retryWrites=true\n';

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next()
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use(personRoute);
app.use(customerRoute);
app.use(userRoute);
app.use(permissionRoute);
app.use(express.static('public'));


// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!')
});

// Handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
