// setup connection of database
const mongoose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/authenticationAPP"
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('connected', () => {
    console.log('connected');
})
db.on('disconnected', () => {
    console.log('disconnected');
})
db.on('error', () => {
    console.log('connection error');
})

module.exports = db;
