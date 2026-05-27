const Worker =
    require('../models/Worker');


async function getServices() {

    return await Worker.distinct(
        'service'
    );
}


module.exports = {
    getServices
};