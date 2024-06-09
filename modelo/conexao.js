const mongoose = require('mongoose');

const options = {
    dbName: 'livraria',
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

mongoose.connect('mongodb://localhost:27017/livraria', options);

module.exports = mongoose;