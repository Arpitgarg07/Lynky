const mongoose = require('mongoose');


async function connectDB() {
    console.log(process.env.MONGO_URI);

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB Connected');

    } catch (error) {

        console.log('MongoDB Connection Error');

        console.log(error);

        process.exit(1);
    }
}


module.exports = connectDB;