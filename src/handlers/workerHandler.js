const Worker =
    require('../models/Worker');

const locations =
    require('../utils/locations');

const services =
    require('../utils/services');

const {
    setUserState
} = require('../utils/userState');


function normalizeText(text) {

    return text
        .trim()
        .toLowerCase();
}


async function handleWorkerFlow({

    sock,
    sender,
    text,
    currentState

}) {


    // WORKER NAME STEP
    if (
        currentState?.step === 'awaiting_worker_name'
    ) {

        setUserState(sender, {
            ...currentState,
            name: text,
            step: 'awaiting_worker_phone'
        });

        await sock.sendMessage(sender, {
            text:
`📞 Enter your phone number`
        });

        return true;
    }



    // WORKER PHONE STEP
    if (
        currentState?.step === 'awaiting_worker_phone'
    ) {

        const existingWorker =
            await Worker.findOne({
                phone: text
            });


        if (existingWorker) {

            await sock.sendMessage(sender, {
                text:
`❌ This phone number is already registered`
            });

            return true;
        }


        setUserState(sender, {
            ...currentState,
            phone: text,
            step: 'awaiting_worker_service'
        });


        let serviceMessage =
`🛠 Select Service\n\n`;

        services.forEach((service, index) => {

            serviceMessage +=
`${index + 1}️⃣ ${service}\n`;
        });


        await sock.sendMessage(sender, {
            text: serviceMessage
        });

        return true;
    }



    // WORKER SERVICE STEP
    if (
        currentState?.step === 'awaiting_worker_service'
    ) {

        const selectedIndex =
            parseInt(text) - 1;

        const selectedService =
            services[selectedIndex];


        if (!selectedService) {

            await sock.sendMessage(sender, {
                text:
`❌ Invalid service selection`
            });

            return true;
        }


        setUserState(sender, {
            ...currentState,
            service: selectedService,
            step: 'awaiting_worker_state'
        });


        await sock.sendMessage(sender, {
            text:
`🌍 Select State

1️⃣ Rajasthan
2️⃣ Delhi

0️⃣ Other`
        });

        return true;
    }



    // CUSTOM STATE INPUT
    if (
        currentState?.step === 'awaiting_custom_state'
    ) {

        const customState =
            normalizeText(text);


        setUserState(sender, {
            ...currentState,
            state: customState,
            step: 'awaiting_custom_city'
        });


        await sock.sendMessage(sender, {
            text:
`✍️ Please type your city name`
        });

        return true;
    }



    // CUSTOM CITY INPUT
    if (
        currentState?.step === 'awaiting_custom_city'
    ) {

        const customCity =
            normalizeText(text);


        setUserState(sender, {
            ...currentState,
            city: customCity,
            step: 'awaiting_custom_locality'
        });


        await sock.sendMessage(sender, {
            text:
`✍️ Please type your locality name`
        });

        return true;
    }



    // CUSTOM LOCALITY INPUT
    if (
        currentState?.step === 'awaiting_custom_locality'
    ) {

        const customLocality =
            normalizeText(text);


        await Worker.create({

            name: currentState.name,

            phone: currentState.phone,

            service: currentState.service,

            state: currentState.state,

            city: currentState.city,

            locality: customLocality
        });


        await sock.sendMessage(sender, {
            text:
`✅ Registration Successful`
        });


        setUserState(sender, {
            step: null
        });

        return true;
    }



    // WORKER STATE STEP
    if (
        currentState?.step === 'awaiting_worker_state'
    ) {

        // OTHER OPTION
        if (text === '0') {

            setUserState(sender, {
                ...currentState,
                step: 'awaiting_custom_state'
            });

            await sock.sendMessage(sender, {
                text:
`✍️ Please type your state name`
            });

            return true;
        }


        let selectedState = '';

        if (text === '1') {
            selectedState = 'rajasthan';
        }

        else if (text === '2') {
            selectedState = 'delhi';
        }


        if (!selectedState) {

            await sock.sendMessage(sender, {
                text:
`❌ Invalid state selection`
            });

            return true;
        }


        setUserState(sender, {
            ...currentState,
            state: selectedState,
            step: 'awaiting_worker_city'
        });


        const cities =
            Object.keys(
                locations[selectedState]
            );


        let cityMessage =
`🏙 Select City\n\n`;


        cities.forEach((city, index) => {

            cityMessage +=
`${index + 1}️⃣ ${city}\n`;
        });


        cityMessage +=
`\n0️⃣ Other`;


        await sock.sendMessage(sender, {
            text: cityMessage
        });

        return true;
    }



    // WORKER CITY STEP
    if (
        currentState?.step === 'awaiting_worker_city'
    ) {

        // OTHER OPTION
        if (text === '0') {

            setUserState(sender, {
                ...currentState,
                step: 'awaiting_custom_city'
            });

            await sock.sendMessage(sender, {
                text:
`✍️ Please type your city name`
            });

            return true;
        }


        const cities =
            Object.keys(
                locations[currentState.state]
            );


        const selectedIndex =
            parseInt(text) - 1;

        const selectedCity =
            cities[selectedIndex];


        if (!selectedCity) {

            await sock.sendMessage(sender, {
                text:
`❌ Invalid city selection`
            });

            return true;
        }


        setUserState(sender, {
            ...currentState,
            city: selectedCity,
            step: 'awaiting_worker_locality'
        });


        const localities =
            locations[currentState.state][selectedCity];


        let localityMessage =
`📍 Select Locality\n\n`;


        localities.forEach((locality, index) => {

            localityMessage +=
`${index + 1}️⃣ ${locality}\n`;
        });


        localityMessage +=
`\n0️⃣ Other`;


        await sock.sendMessage(sender, {
            text: localityMessage
        });

        return true;
    }



    // WORKER LOCALITY STEP
    if (
        currentState?.step === 'awaiting_worker_locality'
    ) {

        // OTHER OPTION
        if (text === '0') {

            setUserState(sender, {
                ...currentState,
                step: 'awaiting_custom_locality'
            });

            await sock.sendMessage(sender, {
                text:
`✍️ Please type your locality name`
            });

            return true;
        }


        const localities =
            locations[currentState.state][currentState.city];


        const selectedIndex =
            parseInt(text) - 1;

        const selectedLocality =
            localities[selectedIndex];


        if (!selectedLocality) {

            await sock.sendMessage(sender, {
                text:
`❌ Invalid locality selection`
            });

            return true;
        }


        await Worker.create({

            name: currentState.name,

            phone: currentState.phone,

            service: currentState.service,

            state: currentState.state,

            city: currentState.city,

            locality: selectedLocality
        });


        await sock.sendMessage(sender, {
            text:
`✅ Registration Successful`
        });


        setUserState(sender, {
            step: null
        });

        return true;
    }


    return false;
}


module.exports =
    handleWorkerFlow;