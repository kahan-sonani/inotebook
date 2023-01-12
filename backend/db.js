const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/inotebook?readPreference=primary&appName=MongoDB%20Compass&directConnection=true&ssl=false';

const connectToMongo = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(mongoURI, () => console.log('connection successfull'))
}

module.exports = connectToMongo