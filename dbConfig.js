const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');

const db = mongoose.connection;

db.on('connected', function(){
    console.log('Database Connected')
});

module.exports = db;