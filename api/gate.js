import NoahApi from "noah-js-sdk/src/api";
import PostTx from 'noah-js-sdk/src/api/post-tx';
import PostSignedTx from 'noah-js-sdk/src/api/post-signed-tx';
import GetNonce from 'noah-js-sdk/src/api/get-nonce';
import EstimateCoinSell from 'noah-js-sdk/src/api/estimate-coin-sell';
import EstimateCoinBuy from 'noah-js-sdk/src/api/estimate-coin-buy';
import {GATE_API_URL, CHAIN_ID} from '~/assets/variables';

const noahApi = new NoahApi({apiType: 'gate', baseURL: GATE_API_URL, chainId: CHAIN_ID});

export const postTx = new PostTx(noahApi);

export const postSignedTx = new PostSignedTx(noahApi);

export const getNonce = new GetNonce(noahApi);

export const estimateCoinSell = new EstimateCoinSell(noahApi);

export const estimateCoinBuy = new EstimateCoinBuy(noahApi);



