const Worker = require('../models/Worker');


async function getStates(service) {

    return await Worker.distinct(
        'state',
        {
            service
        }
    );
}


async function getCities(service, state) {

    return await Worker.distinct(
        'city',
        {
            service,
            state
        }
    );
}


async function getLocalities(
    service,
    state,
    city
) {

    return await Worker.distinct(
        'locality',
        {
            service,
            state,
            city
        }
    );
}


module.exports = {
    getStates,
    getCities,
    getLocalities
};