const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

require('dotenv').config();

// express server
const app = express();
const port = process.env.PORT || 5000;  // for deploymnet .. in case 5000 is busy use


// middleware
app.use(express.json());   //parse json
app.use(cors());            //cross origin fix

// connect to DB

const uri = process.env.ATLAS_URI;   //gets the info from .env file
mongoose.connect(process.env.MONGODB_URI || uri, {    // for heroku
    useNewUserParser: true,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected");
})

const userRouter = require('./routes/users');
const videoRouter = require('./routes/videos');

app.use('/videos', videoRouter);
app.use('/users', userRouter); //every API request with .../users will load everything in teh exercise router file

//for Heroku Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
