const express = require('express');
//creating express app
const app = express();
const helmet = require('helmet');

require('dotenv').config();
const predictionsRouts = require('./routes/predictions');
const userRouts = require('./routes/user');
const mongoose = require('mongoose');


//global middleware, func. fires for every req. Next must be run at the end, to go to next middleware !

//handling POST or PATCH req.JSON. any req with body data, it parses it and attach to req. object
app.use(express.json());

// Use Helmet to secure HTTP headers... security-focused middleware that helps protect app by setting various HTTP headers.
app.use(helmet());

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
});


// rout handler, func. inside is actually middleware   // registering the routes
app.get('/',(req, res) => {
    res.json({mssg: "Welcome to the app"}) // to send JSON strings object
});

// mounting rout to main app
app.use('/api/predictions', predictionsRouts);
app.use('/api/user', userRouts);

//connection to mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen to req - port number,  //process is global object in node apps, env is environment variables.
        app.listen(process.env.PORT, ()=>{
        console.log('Listening on port 4000 !!!')
        });
    })
    .catch((err) => {
        console.log(err)
    });



