<template>
    <section class="u-section u-container">
        <div class="panel panel__header wallet__info">
            <div class="wallet__address">
                <img class="wallet__address-icon u-hidden-small-down" src="/img/icon-wallet-white.svg" width="40"
                     height="40" alt="" role="presentation">
                <div class="wallet__address-content">
                    <div>{{ $td('Your address:', 'wallet.address') }}</div>
                    <div class="wallet__value u-icon-wrap">
                        <a class="link--default u-icon-text"
                           style="color: #fff"
                           :href="addressUrl" target="_blank" data-test-id="walletAddressLink">{{isDesktop ? address :
                            shortAddress(address) }}</a>
                        <ButtonCopyIcon class="white" :copy-text="address"/>

                        <button class="u-icon u-icon--qr--right  u-semantic-button link--opacity" style="width: 86px"
                                @click="isAddressQrModalVisible = true">
                            <InlineSvg src="/img/icon-qr-white.svg" class="white" width="32" height="32"/>
                        </button>
                    </div>
                </div>
            </div>
            <div class="wallet__balance" v-if="!$store.getters.isOfflineMode">
                <div>{{ $td('Your balance:', 'wallet.balance') }}</div>
                <div class="wallet__value" data-test-id="walletBalanceValue">
                    {{ numberWithCommas(Number(balance).toFixed(2)) }} {{ currency }}
                </div>
            </div>
        </div>
        <CoinSendForm/>
        <CoinList/>

        <TransactionLatestList :tx-list="txList" v-if="txList.length"/>

        <Modal class="qr-modal"
               v-bind:isOpen.sync="isAddressQrModalVisible"
        >
            <QrcodeVue class="qr-modal__layer" :value="address" :size="280" level="L"></QrcodeVue>
        </Modal>

    </section>
</template>


<script>
    import {mapGetters} from 'vuex';
    import {getAddressTransactionList} from "~/api";
    import getTitle from '~/assets/get-title';
    import {pretty} from '~/assets/utils';
    import {NETWORK, TESTNET} from '~/assets/variables';
    import QrcodeVue from 'qrcode.vue';
    import InlineSvg from 'vue-inline-svg';
    import Modal from '~/components/common/Modal';
    import ButtonCopyIcon from '~/components/common/ButtonCopyIcon';
    import CoinSendForm from '~/components/CoinSendForm';
    import CoinList from '~/components/CoinList';
    import TransactionLatestList from '~/components/TransactionLatestList';
    import ChartContainer from '~/components/ChartContainer'
    import {isDesktop} from "../../utils/checker";
    import {shortAddress} from "../../utils/text";
    import {rate} from "../../utils/rates";
    import {numberWithCommas} from "../../utils/number";


    function getAddressLatestTransactionList(address) {
        return getAddressTransactionList(address, {limit: 5});
    }

    export default {

        components: {
            QrcodeVue,
            InlineSvg,
            Modal,
            ButtonCopyIcon,
            CoinSendForm,
            CoinList,
            TransactionLatestList,
            ChartContainer
        },
        filters: {
            pretty,
        },
        fetch({app, store}) {
            store.commit('SET_SECTION_NAME', app.$td('Portfolio', 'common.page-wallet'));
            return Promise.resolve();
        },
        asyncData({store}) {
            if (store.getters.isOfflineMode) {
                return {
                    txList: [],
                };
            }
            return getAddressLatestTransactionList(store.getters.address)
                .then((txListInfo) => {
                    return {
                        txList: txListInfo.data,
                    };
                });
        },
        head() {
            const title = getTitle(this.$store.state.sectionName, this.$i18n.locale);
            const description = this.$td(`Transact NOAH and other coins issued in the NOAH ${this.isTestnet ? 'test ' : ''}network. Almost instantly and fee-free.`, this.isTestnet ? 'wallet.seo-description-testnet' : 'wallet.seo-description');
            const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

            return {
                title: title,
                meta: [
                    {hid: 'og-title', name: 'og:title', content: title},
                    {hid: 'description', name: 'description', content: description},
                    {hid: 'og-description', name: 'og:description', content: description},
                    {hid: 'og-image', name: 'og:image', content: `/img/social-share-wallet${localeSuffix}.png`},
                ],
            };
        },
        data() {
            return {
                isDesktop: isDesktop(),
                shortAddress,
                /** @type Array<Transaction> */
                txList: [],
                isAddressQrModalVisible: false,
                balance: '...',
                currency: '...',
                numberWithCommas
            };
        },
        async mounted() {
            let currency = localStorage.getItem('currency');
            if (currency === null) currency = 'NOAH';
            this.currency = currency;
            const baseCoin = this.$store.state.balance.find((coinItem) => (coinItem.coin === 'NOAH'));
            const rate_result = await rate(baseCoin ? baseCoin.amount : 0 | pretty);
            this.balance = rate_result[currency];

        },
        computed: {
            ...mapGetters([
                'address',
                'addressUrl',
                'baseCoin',
            ]),
            isTestnet() {
                return NETWORK === TESTNET;
            },
        },
        watch: {
            // update tx list on balance updated
            "$store.state.balance": function () {
                getAddressLatestTransactionList(this.address)
                    .then((txListInfo) => {
                        this.txList = txListInfo.data;
                    });
            },
        },
    };
</script>
