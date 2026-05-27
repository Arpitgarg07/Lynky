function getSelectedOption(text, array) {

    const index =
        parseInt(text) - 1;

    return array[index];
}

module.exports = {
    getSelectedOption
};