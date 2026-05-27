function getSelectedOption(text, array) {

    const index =
        parseInt(text) - 1;

    return array[index];
}

function normalizeText(text) {

    return text
        .trim()
        .toLowerCase();
}

module.exports = {
    normalizeText,
    getSelectedOption
};

