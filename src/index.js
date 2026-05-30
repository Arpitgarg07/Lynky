require('dotenv').config();

const express =
    require('express');

const path =
    require('path');

const connectDB =
    require('./database/db');

const connectWhatsApp =
    require('./socket/whatsapp');


const app = express();

const publicDir =
    path.join(__dirname, '..', 'public');

app.use(express.json());
app.use(express.static(publicDir, { extensions: ['html'] }));


const PORT =
    process.env.PORT || 5000;




async function startServer() {

    try {

        // CONNECT DATABASE
        await connectDB();

        console.log(
            'Database Connected'
        );


        // START EXPRESS SERVER FIRST
        app.listen(PORT, () => {

            console.log(
                `Server running on port ${PORT}`
            );
        });


        // START WHATSAPP
        connectWhatsApp();

    }

    catch (error) {

        console.log(error);
    }
}


startServer();