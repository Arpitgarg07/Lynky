const mongoose = require('mongoose');

require('dotenv').config();

const Worker = require('../models/Worker');


async function seedWorkers() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB Connected');


        await Worker.deleteMany();

        console.log('Old workers deleted');


        await Worker.insertMany([

            {
                name: 'Ramesh Electrician',
                phone: '9876543210',
                service: 'Electrician',
                state: 'Rajasthan',
                city: 'Jaipur',
                locality: 'mansarovar'
            },

            {
                name: 'Suresh Plumber',
                phone: '9999999999',
                service: 'Plumber',
                state: 'Rajasthan',
                city: 'Jaipur',
                locality: 'vaishali nagar'
            },

            {
                name: 'Amit Cleaner',
                phone: '8888888888',
                service: 'Cleaner',
                state: 'Rajasthan',
                city: 'Jaipur',
                locality: 'mansarovar'
            }

        ]);


        console.log('Workers Seeded');

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);
    }
}


seedWorkers();
