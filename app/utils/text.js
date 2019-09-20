const shortAddress =  (address) => {
    if (address !== null) {
        return address.slice(0, 8) + '...' + address.slice(address.length - 4, address.length);
    }
};
export {shortAddress}
