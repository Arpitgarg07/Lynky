const {

    getStates,
    getCities,
    getLocalities

} = require('../utils/locationHelpers');

const {
    getServices
} = require('../utils/serviceHelpers');

const Worker =
    require('../models/Worker');

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
const services =
    await getServices();


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


        // GET STATES FROM DATABASE
        const states =
            await getStates(selectedService);


        let stateMessage =
`🌍 Select State\n\n`;


        states.forEach((state, index) => {

            stateMessage +=
`${index + 1}️⃣ ${state}\n`;
        });


        await sock.sendMessage(sender, {
            text: stateMessage
        });

        return true;
    }



    // STATE SELECTION
    else if (
        currentState?.step === 'awaiting_state'
    ) {

        const states =
            await getStates(
                currentState.service
            );


        const selectedIndex =
            parseInt(text) - 1;

        const selectedState =
            states[selectedIndex];


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


        // GET CITIES FROM DATABASE
        const cities =
            await getCities(
                currentState.service,
                selectedState
            );


        let cityMessage =
`🏙 Select City\n\n`;


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
            await getCities(

                currentState.service,

                currentState.state
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


        // GET LOCALITIES FROM DATABASE
        const localities =
            await getLocalities(

                currentState.service,

                currentState.state,

                selectedCity
            );


        let localityMessage =
`📍 Select Locality\n\n`;


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
            await getLocalities(

                currentState.service,

                currentState.state,

                currentState.city
            );


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

                service:
                    currentState.service,

                state:
                    currentState.state,

                city:
                    currentState.city,

                locality:
                    selectedLocality
            });


        // NO WORKERS
        if (matchedWorkers.length === 0) {

            await sock.sendMessage(sender, {
                text:
`❌ No workers available right now`
            });

            return true;
        }


        // FORMAT RESPONSE
        let response =
`✅ Available Workers\n\n`;


        matchedWorkers.forEach((worker, index) => {

            response +=
`${index + 1}. ${worker.name}

📞 ${worker.phone}

🛠 ${worker.service}

`;
        });


        await sock.sendMessage(sender, {
            text: response
        });


        // RESET STATE
        setUserState(sender, {
            step: null
        });

        return true;
    }


    return false;
}


module.exports =
    handleCustomerFlow;