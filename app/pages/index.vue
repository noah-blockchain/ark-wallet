<script>
    import {mapGetters} from 'vuex';
    import getTitle from '~/assets/get-title';
    import {NETWORK, TESTNET} from '~/assets/variables';
    import AuthSignInForm from "~/components/AuthSignInForm";
    import AuthRegisterForm from "~/components/AuthRegisterForm";
    import AuthAdvancedForm from "~/components/AuthAdvancedForm";
    import AuthAdvancedGenerate from "~/components/AuthAdvancedGenerate";

    export default {
        layout: 'nonAuth',
        components: {
            AuthAdvancedGenerate,
            AuthRegisterForm,
            AuthSignInForm,
            AuthAdvancedForm,
        },
        directives: {
        },
        fetch({app, store, redirect }) {
            if (store.getters.isAuthorized) {
                //@TODO bug with redirect: render "/wallet" without layout (instead of "/index" with nonAuth layout) and transition it to "/wallet" with layout
                return redirect(app.preferredPath('wallet'));
            } else {
                store.commit('SET_SECTION_NAME', '');
            }
        },
        head() {
            const title = getTitle(null, this.$i18n.locale);
            const description = this.$td(`Noah Console is by far the most advanced part of our project that lets you manage all your activities on our ${this.isTestnet ? 'test ' : ''}network.`, this.isTestnet ? 'index.seo-description-testnet' : 'index.seo-description');
            const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

            return {
                title: title,
                meta: [
                    { hid: 'og-title', name: 'og:title', content: title },
                    { hid: 'description', name: 'description', content: description },
                    { hid: 'og-description', name: 'og:description', content: description },
                    { hid: 'og-image', name: 'og:image', content: `/social-share${localeSuffix}.png` },
                ],
            };
        },
        data() {
            return {

            };
        },
        watch: {
            isAuthorized(newVal) {
                if (newVal) {
                    return this.$router.replace(this.preferredPath('wallet'));
                }
            },
        },
        created() {

        },
        destroyed() {

        },
        computed: {
            ...mapGetters(['isAuthorized']),
            isTestnet() {
                return NETWORK === TESTNET;
            },
        },
        methods: {

        },

    };
</script>

<template>
    <main>
        <div class="auth u-section" data-test-id="authSection">
            <div class="u-container u-container--medium">
                <div class="u-grid u-grid--vertical-margin">
                    <div class="u-cell u-cell--medium--1-2">
                        <div class="panel">
                            <div class="panel__header">
                                <h1 class="panel__header-title">
                                    <img class="panel__header-title-icon" src="/img/icon-auth-sign-in.svg" alt=""
                                         role="presentation" width="32" height="32">
                                    {{ $td('SIGN IN WITH SEED PHRASE', 'index.auth-sign-in-title') }}
                                </h1>
                            </div>
                            <AuthAdvancedForm :isAuthAddress="true"/>
                        </div>
                    </div>

                    <div class="u-cell u-cell--medium--1-2">
                        <div class="panel">
                            <div class="panel__header">
                                <h1 class="panel__header-title">
                                    <img class="panel__header-title-icon" src="/img/icon-auth-register.svg" alt="" role="presentation" width="32" height="32">
                                    {{ $td('Create wallet', 'index.auth-sign-up-seed-title') }}
                                </h1>
                            </div>
                            <AuthAdvancedGenerate/>
                            <div class="panel__section">
                                <a class="link--default" href="https://github.com/noah-blockchain/noah-console-web/releases" target="_blank">{{ $td('Generate locally (Github)', 'index.auth-sign-up-seed-offline') }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
