const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require('@whiskeysockets/baileys');

const qrcode = require('qrcode-terminal');

const {
    setUserState,
    getUserState
} = require('../utils/userState');

const locations = require('../utils/locations');
const services = require('../utils/services');
const Worker = require('../models/Worker');
const handleWorkerFlow =
    require('../handlers/workerHandler');
const handleCustomerFlow =
    require('../handlers/customerHandler');


async function connectWhatsApp() {

    const { state, saveCreds } = await useMultiFileAuthState('auth');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });


    // CONNECTION EVENTS
    sock.ev.on('connection.update', async (update) => {

        const { connection, lastDisconnect, qr } = update;


        // QR CODE
        if (qr) {
            console.log('\nScan this QR Code:\n');

            qrcode.generate(qr, {
                small: true
            });
        }


        // CONNECTED
        if (connection === 'open') {
            console.log('WhatsApp Connected Successfully');
        }


        // DISCONNECTED
        if (connection === 'close') {

            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log('Connection closed');

            if (shouldReconnect) {
                console.log('Reconnecting...\n');

                connectWhatsApp();
            }
        }
    });


    // SAVE SESSION
    sock.ev.on('creds.update', saveCreds);
    // MESSAGE LISTENER
sock.ev.on('messages.upsert', async ({ messages }) => {

    const message = messages[0];

    // Ignore empty messages
    if (!message.message) return;

    // Ignore bot's own messages
    if (message.key.fromMe) return;

    // User number
    const sender = message.key.remoteJid;

    // Extract text
    const text =
        message.message.conversation ||
        message.message.extendedTextMessage?.text;

    console.log('\nNew Message');
    console.log('Sender:', sender);
    console.log('Message:', text);

    // WORKER JOIN FLOW
if (text?.toLowerCase() === 'join') {

    setUserState(sender, {
        role: 'worker',
        step: 'awaiting_worker_name'
    });

    await sock.sendMessage(sender, {
        text:
`👷 Worker Registration

Please enter your full name.`
    });

    return;
}
// START FLOW
if (
    text?.toLowerCase() === 'hi' ||
    text?.toLowerCase() === 'hello' ||
    text?.toLowerCase() === 'start'
) {

    setUserState(sender, {
        role: 'customer',
        step: 'awaiting_service'
    });

    await sock.sendMessage(sender, {
        text:
`👋 Welcome to WorkerBot

Choose a service:

1️⃣ Electrician
2️⃣ Plumber
3️⃣ Cleaner

👇 Want to join as worker?
Type: join`
    });

    return;
}


    // CURRENT STATE
    const currentState = getUserState(sender);
    // HANDLE WORKER FLOW
const workerHandled =
    await handleWorkerFlow({

        sock,
        sender,
        text,
        currentState
    });


if (workerHandled) {
    return;
}
// HANDLE CUSTOMER FLOW
const customerHandled =
    await handleCustomerFlow({

        sock,
        sender,
        text,
        currentState
    });


if (customerHandled) {
    return;
}



});

}


module.exports = connectWhatsApp;