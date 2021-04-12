const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth'); //Import routes
const cors = require('cors');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' })
//const dotenv = require('dotenv');



//Connect to db
mongoose.connect('mongodb://localhost:27017/w2w',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("db connect........");
    });


//Middlewares
app.use(express.json());
app.use(cors())

//Route Middlewares
app.use('/user',authRoute);


app.listen(8000, ()=> {
    console.log('Server running port 8000.......')
  })