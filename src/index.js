require('dotenv').config();

const express =
    require('express');

const connectDB =
    require('./database/db');

const connectWhatsApp =
    require('./socket/whatsapp');


const app = express();

app.use(express.json());


const PORT =
    process.env.PORT || 5000;


// ROOT ROUTE
app.get('/', (req, res) => {

    res.send('Bot Running');
});


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