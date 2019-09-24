const axios = require('axios');
import ExpiredStorage from 'expired-storage';

const rate = async (amount) => {
    const expiredStorage = new ExpiredStorage();
    let result_prepare =expiredStorage.getItem("rate");
    if (result_prepare === null || result_prepare === undefined) {
        const result = await axios.get(`https://api.coingecko.com/api/v3/coins/noah-coin`);
        result_prepare = result.data.market_data.current_price;
        expiredStorage.setItem("rate", JSON.stringify(result_prepare), 60);
    } else {
        result_prepare = JSON.parse(result_prepare)
    }
    return {
        BTC: (result_prepare.btc * amount).toFixed(12),
        JPY: (result_prepare.jpy * amount).toFixed(6),
        USD: (result_prepare.usd * amount).toFixed(6),
        NOAH: amount,
    }
};

export {rate};
