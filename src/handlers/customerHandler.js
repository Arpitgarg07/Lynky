const locations = require('../utils/locations');

const services = require('../utils/services');

const Worker = require('../models/Worker');

const {
    setUserState
} = require('../utils/userState');


async function handleCustomerFlow({

    sock,
    sender,
    text,
    currentState

}) {


    // SERVICE SELECTION
    if (
        currentState?.step === 'awaiting_service'
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
            step: 'awaiting_state',
            service: selectedService
        });

        await sock.sendMessage(sender, {
            text:
`✅ Selected Service: ${selectedService}

🌍 Select State:

1️⃣ Rajasthan
2️⃣ Delhi`
        });

        return true;
    }



    // STATE SELECTION
    else if (
        currentState?.step === 'awaiting_state'
    ) {

        let selectedState = '';

        if (text === '1') {
            selectedState = 'Rajasthan';
        }

        else if (text === '2') {
            selectedState = 'Delhi';
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
            step: 'awaiting_city',
            state: selectedState
        });


        const cities =
            Object.keys(locations[selectedState]);

        let cityMessage =
`🏙 Select City:\n\n`;

        cities.forEach((city, index) => {

            cityMessage +=
`${index + 1}️⃣ ${city}\n`;
        });


        await sock.sendMessage(sender, {
            text: cityMessage
        });

        return true;
    }



    // CITY SELECTION
    else if (
        currentState?.step === 'awaiting_city'
    ) {

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
            step: 'awaiting_locality',
            city: selectedCity
        });


        const localities =
            locations[currentState.state][selectedCity];

        let localityMessage =
`📍 Select Locality:\n\n`;

        localities.forEach((locality, index) => {

            localityMessage +=
`${index + 1}️⃣ ${locality}\n`;
        });


        await sock.sendMessage(sender, {
            text: localityMessage
        });

        return true;
    }



    // LOCALITY SELECTION
    else if (
        currentState?.step === 'awaiting_locality'
    ) {

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


        // FIND WORKERS
        const matchedWorkers =
            await Worker.find({

                service: currentState.service,

                state: currentState.state,

                city: currentState.city,

                locality: selectedLocality
            });


        if (matchedWorkers.length === 0) {

            await sock.sendMessage(sender, {
                text:
`❌ Service not available in this area right now.`
            });

            return true;
        }


        let response =
`✅ Available Workers:\n\n`;

        matchedWorkers.forEach((worker, index) => {

            response +=
`${index + 1}. ${worker.name}
📞 ${worker.phone}

`;
        });


        await sock.sendMessage(sender, {
            text: response
        });


        setUserState(sender, {
            step: null
        });

        return true;
    }


    return false;
}


module.exports = handleCustomerFlow;