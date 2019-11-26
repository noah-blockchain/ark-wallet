const divisibility = (i, div = 6) => {

    if (i !== 0 && div !== 0) {
        const mult = Math.pow(10, div);
        return i / mult;
    } else {
        return i;
    }
};
function kFormatter(num) {
    if(num === 0) return  0;
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}
export { divisibility, kFormatter};
