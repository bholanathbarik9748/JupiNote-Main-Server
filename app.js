// import Library
const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
var cors = require('cors');
require('dotenv').config();
app.use(express.json())
const PORT = process.env.PORT || 4000;

// middleware
app.use(cookieParser());
app.use(cors());


// import Routes
const authRoute = require("./routes/authRoute");
const noteRoute = require('./routes/noteRoute')

// Start Server also Connect to Db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => app.listen(PORT, (req, res) => { console.log(`Server Start PORT http://localhost:${PORT}/`); }))
    .catch((err) => console.log(err))

// import Routes
app.use(authRoute);
app.use(noteRoute);