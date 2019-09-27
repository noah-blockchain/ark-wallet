<template>
    <div class="main-wrap">
        <header class="header">
            <div class="header__container u-container u-container--large">
                <nuxt-link class="header__logo no-link" :to="preferredPath('index')">
                    <img class="header__logo-image" src="/img/noah-logo-circle.svg" alt="Noah" width="42" height="42">
                    <div class="header__logo-text">{{ $store.state.sectionName || `ARK web wallet` }}</div>
                </nuxt-link>

                <div class="header__controls">
                    <div class="header__user u-hidden-medium-down">
                        <nuxt-link class="button button--ghost-white" :to="preferredPath('account')" v-if="username">{{
                            shortAddress(username) }}
                        </nuxt-link>
                        <button class="header__user-logout u-semantic-button" data-test-id="headerLogoutButton"
                                @click="logout">
                            <img class="" src="/img/icon-auth-logout.svg" width="32" height="32" alt="Logout">
                        </button>
                        <Language/>
                    </div>
                    <button class="header__offcanvas-button u-semantic-button u-hidden-medium-up"
                            :class="{'is-active': isMenuActive}" @click="toggleMenu">
                        <span class="header__offcanvas-icon-wrap">
                            <span class="header__offcanvas-icon">Menu</span>
                        </span>
                    </button>
                </div>
            </div>
        </header>


        <div class="main-content main-content--grid u-container-margin u-container--large">
            <transition name="v-transition-fade">
                <aside class="main-content__aside" v-show="isMenuActive || isDesktop">
                    <div class="u-container main-content__aside-section">
                        <menu class="menu no-list u-grid u-grid--vertical-margin--small">
                            <li class="menu__item u-cell">
                                <nuxt-link class="menu__link link--hover text-uppercase" :to="preferredPath('portfolio')"
                                           @click.native="linkClick">
                                    <img class="menu__icon" src="/img/wallet.svg" alt="" role="presentation">
                                    {{ $td('Portfolio', 'common.page-wallet') }}
                                </nuxt-link>
                            </li>
                            <li class="menu__item u-cell">
                                <nuxt-link class="menu__link link--hover text-uppercase" :to="preferredPath('exchange')"
                                           @click.native="linkClick">
                                    <img class="menu__icon" src="/img/transfer.svg" alt="" role="presentation">
                                    {{ $td('Exchange', 'common.page-convert') }}
                                </nuxt-link>
                            </li>
                            <li class="menu__item u-cell">
                                <nuxt-link class="menu__link link--hover text-uppercase" :to="preferredPath('delegation')"
                                           @click.native="linkClick">
                                    <img class="menu__icon" src="/img/court.svg" alt="" role="presentation">
                                    {{ $td('Delegation', 'common.page-delegation') }}
                                </nuxt-link>
                            </li>

                            <li class="menu__item u-cell">
                                <nuxt-link class="menu__link link--hover text-uppercase" :to="preferredPath('masternode')"
                                           @click.native="linkClick">
                                    <img class="menu__icon" src="/img/blockchain.svg" alt="" role="presentation">
                                    {{ $td('Masternode', 'common.page-masternode') }}
                                </nuxt-link>
                            </li>
                            <li class="menu__item u-cell">
                                <nuxt-link class="menu__link link--hover text-uppercase" :to="preferredPath('coiner')"
                                           @click.native="linkClick">
                                    <img class="menu__icon" src="/img/coins.svg" alt="" role="presentation">
                                    {{ $td('Coiner', 'common.page-coiner') }}
                                </nuxt-link>
                            </li>
                            <li class="menu__item menu__user u-cell">
                                <a
                                    target="_blank"
                                    href="https://www.btcnext.io/" class="menu__link menu__user-link link--hover text-uppercase"
                                    :to="preferredPath('account')" @click.native="linkClick">
                                    <img class="menu__icon" src="/img/buy.svg" alt="" role="presentation">
                                    <span class="menu__user-name">{{$td('Buy coin', 'common.page-buy') }}</span>
                                </a>
                            </li>
                            <li class="menu__item menu__user u-cell">
                                <nuxt-link class="menu__link menu__user-link link--hover text-uppercase" :to="preferredPath('account')"
                                           @click.native="linkClick">
                                    <img class="menu__icon" src="/img/user.svg" alt="" role="presentation">
                                    <span class="menu__user-name">{{ $store.state.user.username || $td('Account', 'common.page-account') }}</span>
                                </nuxt-link>

                                <button class="menu__user-logout u-semantic-button u-hidden-medium-up"
                                        data-test-id="headerLogoutButton" @click="logout">
                                    <img class="" src="/img/icon-auth-logout-menu.svg" width="28" height="28"
                                         alt="Logout">
                                </button>
                            </li>
                        </menu>
                    </div>
                    <hr>
                    <div class="u-container main-content__aside-section">
                        <menu class="menu no-list u-grid u-grid--vertical-margin--small" style="margin-top: 36px">
<!--                            <li class="u-cell services__item&#45;&#45;next-row">-->
<!--                                <a class="services__link link&#45;&#45;hover"-->
<!--                                   :href="`https://explorer.tesntet.noah-blockchain.com`" target="_blank">Explorer</a>-->
<!--                            </li>-->
<!--                            <li class="u-cell">-->
<!--                                <a class="services__link link&#45;&#45;hover"-->
<!--                                   href=" https://github.com/noah-blockchain/api/releases" target="_blank">API</a>-->
<!--                            </li>-->
<!--                            <li class="u-cell services__item&#45;&#45;next-row">-->
<!--                                <a class="services__link link&#45;&#45;hover" href="https://help.noah-blockchain.com"-->
<!--                                   target="_blank">Help/FAQ</a>-->
<!--                            </li>-->
                            <li class="menu__item u-cell">
                                <nuxt-link class="menu__link link--hover" :to="preferredPath('delegation')"
                                           @click.native="linkClick">
                                    <img class="menu__icon" src="/img/api.svg" alt="" role="presentation">
                                    {{ $td('API', 'common.page-api') }}
                                </nuxt-link>
                            </li>

                            <li class="menu__item u-cell">
                                <nuxt-link class="menu__link link--hover" :to="preferredPath('masternode')"
                                           @click.native="linkClick">
                                    <img class="menu__icon" src="/img/explorer.svg" alt="" role="presentation">
                                    {{ $td('Explorer', 'common.page-explorer') }}
                                </nuxt-link>
                            </li>
                            <li class="menu__item u-cell">
                                <nuxt-link class="menu__link link--hover" :to="preferredPath('coiner')"
                                           @click.native="linkClick">
                                    <img class="menu__icon" src="/img/faq.svg" alt="" role="presentation">
                                    {{ $td('Help/Faq', 'common.page-faq') }}
                                </nuxt-link>
                            </li>
                        </menu>
                    </div>
                </aside>
            </transition>
            <main class="main-content__main">
                <nuxt/>
            </main>
        </div>

        <Footer/>

        <Snackbar/>
    </div>
</template>

<script>
    import {shortHashFilter, support} from "~/assets/utils";
    import {NETWORK, TESTNET} from '~/assets/variables';
    import Snackbar from '~/components/common/Snackbar';
    import Language from '~/layouts/_language';
    import Footer from '~/layouts/_footer';
    import {shortAddress} from "../utils/text";
    import {isDesktop} from "../utils/checker";

    export default {
        components: {
            Snackbar,
            Language,
            Footer,
        },
        data() {
            return {
                isMenuActive: false,
                isDesktop: isDesktop(),
                shortAddress
            };
        },
        computed: {
            username() {
                const username = this.$store.getters.username;
                return username.substr(0, 2) === 'Mx' ? shortHashFilter(username, 4) : username;
            },
            isTestnet() {
                return NETWORK === TESTNET;
            },
        },
        watch: {
            '$route'(to, from) {
                this.isMenuActive = false;
            },
        },
        mounted() {
            window.addEventListener('resize', checkDesktop.bind(this), support.passiveListener ? {passive: true} : false);
        },
        destroyed() {
            window.removeEventListener('resize', checkDesktop);
        },
        methods: {
            logout() {
                this.$store.commit('LOGOUT');
                this.$router.push(this.preferredPath('index'));
            },
            toggleMenu() {
                this.isMenuActive = !this.isMenuActive;
            },
            linkClick($event) {
                if (this.$route.path === $event.target.getAttribute('href')) {
                    this.isMenuActive = false;
                }
            },
        },
    };

    function checkDesktop() {
        this.isDesktop = isDesktop();
        if (this.isDesktop) {
            this.isMenuActive = false;
        }
    }
</script>
