//server.js
require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('./config/passport')
const authRoutes = require('./routes/authRoutes')


app.use(express.json())

// MongoDB Connection
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log(err);
});


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Server running on port 3000'))




