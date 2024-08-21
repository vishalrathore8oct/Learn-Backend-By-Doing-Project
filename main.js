const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const User = require('./models/user.model.js')


const app = express();
const PORT = 3000;


// set the view engine to ejs
app.set('view engine', 'ejs');
// set the middleware for serve the static files
app.use(express.static(path.join(__dirname, 'public')));
// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));


// HTML form page
app.get('/', (req, res)=>{
    res.status(200);
    res.render('pages/index')
});

// for handle form submission
app.post('/api/submit', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).send(`<h1 style="text-align: center; margin-top: 50vh;">Your Form Submitted Successfully.....</h1>`)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect('mongodb://localhost:27017')
.then(() => {
    console.log("Connected to Database");

    app.listen(PORT, (error) =>{
        if(!error)
            console.log(`Server is Successfully Running, and App is listening on\nport ==>> http://localhost:${PORT}`)
        else 
            console.log("Error occurred, server can't start", error);
        }
    );
})
.catch(() => {
    console.log("Database Connection Failed");
})
