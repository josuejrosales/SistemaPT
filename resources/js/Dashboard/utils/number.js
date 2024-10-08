

function convertToDecimal(value) {
    let decimal = parseFloat(value);
    return isNaN(decimal) ? 0 : Math.round(decimal * 100) / 100;
}

export { convertToDecimal }