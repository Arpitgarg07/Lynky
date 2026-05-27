const userStates = {};


function setUserState(user, data) {
    userStates[user] = data;
}


function getUserState(user) {
    return userStates[user];
}


module.exports = {
    setUserState,
    getUserState
};