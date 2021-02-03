/* =======================
    LOAD THE DEPENDENCIES
==========================*/
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./api/index');
const jwtMiddleware = require('./lib/jwtMiddleware');
const cookieParser = require('cookie-parser');
const session = require('express-session');

/* =======================
    Connect to MongoDB
==========================*/
const { PORT, MONGO_URI } = process.env;

const port = PORT || 4000;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((e) => {
        console.error(e);
    });

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express();

/* router 적용전에 body-Parser 적용 */
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            Secure: true,
        },
    }),
);

/* =======================
       ROUTE SETTING
==========================*/
app.use('/api', api);
app.use(jwtMiddleware);

//app.use(express.static(path.join(__dirname, '../../client/build')));

/* =======================
        SERVER OPEN
==========================*/
app.listen(port, () => {
    console.log('Listening to port %d', port);
});
