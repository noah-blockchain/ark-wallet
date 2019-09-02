import NoahApi from "noah-sdk-js/src/api";
import PostTx from 'noah-sdk-js/src/api/post-tx';
import PostSignedTx from 'noah-sdk-js/src/api/post-signed-tx';
import GetNonce from 'noah-sdk-js/src/api/get-nonce';
import EstimateCoinSell from 'noah-sdk-js/src/api/estimate-coin-sell';
import EstimateCoinBuy from 'noah-sdk-js/src/api/estimate-coin-buy';
import {GATE_API_URL, CHAIN_ID} from '~/assets/variables';

const noahApi = new NoahApi({apiType: 'gate', baseURL: GATE_API_URL, chainId: CHAIN_ID});

export const postTx = new PostTx(noahApi);

export const postSignedTx = new PostSignedTx(noahApi);

export const getNonce = new GetNonce(noahApi);

export const estimateCoinSell = new EstimateCoinSell(noahApi);

export const estimateCoinBuy = new EstimateCoinBuy(noahApi);



