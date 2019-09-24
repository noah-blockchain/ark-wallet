const axios = require('axios');
import ExpiredStorage from 'expired-storage';

const rate = async (amount) => {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/noah-coin`);
    const result_prepare = result.data.market_data.current_price;
    return {
        BTC: result_prepare.btc * amount,
        JPY: result_prepare.jpy * amount,
        USD: result_prepare.usd * amount,
        NOAH: amount
        // return result[0].price_jpy * amount;
    }
};

export {rate};
