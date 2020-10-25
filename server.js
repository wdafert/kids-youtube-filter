const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// express server
const app = express();
const port = process.env.PORT || 5000;  // for deploymnet .. in case 5000 is busy use


// middleware
app.use(express.json({ extended: false }));   //parse json
app.use(cors());            //cross origin fix

// connect to DB

connectDB();

// const uri = process.env.ATLAS_URI;   //gets the info from .env file
// mongoose.connect(process.env.MONGODB_URI || uri, {    // for heroku
//     useNewUserParser: true,
//     useCreateIndex: true
// });

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB connected");
// })

const userRouter = require('./routes/api/users');
const videoRouter = require('./routes/api/videos');
const authRouter = require('./routes/api/auth');
const profileRouter = require('./routes/api/profile')

app.use('/api/videos', videoRouter);
app.use('/api/users', userRouter); //every API request with .../users will load everything in teh exercise router file
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);

// for Heroku Serve static assets if in production

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
