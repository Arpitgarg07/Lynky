require('dotenv').config();

const express = require('express');

const connectDB =
    require('./database/db');

const connectWhatsApp =
    require('./socket/whatsapp');


const app = express();

app.use(express.json());


const PORT =
    process.env.PORT || 5000;


async function startServer() {

    try {

        // CONNECT DATABASE FIRST
        await connectDB();

        console.log('Database Connected');


        // START WHATSAPP
        await connectWhatsApp();

        console.log('WhatsApp Started');


        // START SERVER
        app.listen(PORT, () => {

            console.log(
                `Server running on port ${PORT}`
            );
        });

    } catch (error) {

        console.log(error);
    }
}


startServer();