<script>
    import {NETWORK, MAINNET, TESTNET} from '~/assets/variables';

    export default {
        // first key not handled by webstorm intelliSense
        ideFix: 1,
        footerLinkList: [
            {
                slug: 'intro',
                title: {
                    en: 'Intro',
                    jp: "プロジェクト情報"
                },
                url: 'https://noahcoin.org/',
            },
            {
                slug: 'network',
                title: {
                    en: 'Network',
                    jp: "ネットワーク"
                },
                url: 'http://testnet.noah-blockchain.com/',
            },
            {
                slug: 'console',
                title: {
                    en: 'Ark wallet ',
                    jp: "ARKウォレット"
                },
                url: 'http://ark-wallet.testnet.noah-blockchain.com/',
                urlTestnet: 'http://ark-wallet.testnet.noah-blockchain.com/',
            },
            {
                slug: 'explorer',
                title: {
                    en: 'Explorer',
                    jp: "エクスプローラー"
                },
                url: 'http://explorer.testnet.noah-blockchain.com',
                urlTestnet: 'http://explorer.testnet.noah-blockchain.com',
            },
            {
                slug: 'docs',
                title: {
                    en: 'Docs',
                    jp: "ドキュメント"
                },
                url: 'http://docs.noah-blockchain.com',
            },
        ],
        props: {
            containerClass: {
                type: String,
                default: 'u-container--large',
            },
        },
        computed: {
            locale() {
                return (this.$i18n && this.$i18n.locale) || 'en';
            },
        },
        methods: {
            getUrl(link) {
                if (NETWORK === MAINNET) {
                    return link.url;
                } else {
                    return link.urlTestnet || link.url;
                }
            },
        },
    };
</script>

<template>
    <footer class="footer">
        <div class="footer__container u-container" :class="containerClass">
            <img class="footer__logo" src="/img/noah-logo-white.svg" alt="Noah" width="76" height="24">
            <div class="footer__menu">
                <div class="footer__menu-item" v-for="link in $options.footerLinkList" :key="link.slug">
                    <a class="footer__link link--hover" :href="getUrl(link)" target="_blank" rel="nofollow noopener">{{ link.title[locale] }}</a>
                </div>
            </div>
        </div>
    </footer>
</template>
