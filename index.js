//[SECTION] Dependencies and Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//[SECTION] Routes
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');


//[SECTION] Environment Setup
const PORT = 4000;

//[SECTION] Server setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    credentials: true,
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));

//[SECTION] Database Setup
mongoose.connect("mongodb+srv://admin123:admin123@b546.9qk9nsf.mongodb.net/BlogAPI?retryWrites=true&w=majority&appName=b546");

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

//[SECTION] Backend Routes
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);


//[SECTION] Server Gateway Response
if(require.main === module) {
    app.listen( PORT || 4000, () => {
        console.log(`API is now online on port ${ PORT || 4000 }`);
    })
}


module.exports = { app, mongoose };
