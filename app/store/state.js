export default function() {
    return {
        sectionName: '',
        helper: 'close', // login-first
        auth: {
            /** @type string|null - mnemonic */
            advanced: null,
            /** @type string|null - stored password */
            password: null,
        },
        /** @type User */
        user: {
            /** @type Address */
            mainAddress: {},
        },
        userTimeStamp: 0,
        /** @type Array<CoinItem> */
        balance: [],
        // transactionListInfo: {
        //     data: [],
        //     meta: {},
        // },
        // history: [],
        onLine: false,
        isSnackbarActive: false,
    };
}
/**
 * vuex-persistedstate enabled in nuxt.config.js
 */





/**
 * @typedef {Object} TokenData
 * @property {string} tokenType
 * @property {number} expiresIn
 * @property {string} accessToken
 * @property {string} refreshToken
 */

/**
 * @typedef {Object} User
 * @property {string} username
 * @property {string} name
 * @property {string} email
 * @property {string} phone}
 * @property {string} language
 * @property {UserAvatar} avatar
 * @property {Address} mainAddress
 */

/**
 * @typedef {Object} UserAvatar
 * @property {string} src
 * @property {string} description
 */
