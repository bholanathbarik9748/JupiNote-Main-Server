// import Library
const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
var cors = require('cors');
require('dotenv').config();
const morgan = require('morgan')
const PORT = process.env.PORT || 4000;

// middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));

// import Routes
const authRoute = require("./routes/authRoute");
const noteRoute = require('./routes/noteRoute');
const HelpRoute = require('./routes/helpRoute');

// Start Server also Connect to Db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => app.listen(PORT, (req, res) => { console.log(`Server Start PORT http://localhost:${PORT}/`); }))
    .catch((err) => console.log(err))

// import Routes
app.use(authRoute);
app.use(noteRoute);
app.use(HelpRoute);