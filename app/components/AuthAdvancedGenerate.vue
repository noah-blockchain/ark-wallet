<template>
    <div class="panel__section">
        <div class="u-grid u-grid--small u-grid--vertical-margin--small">
            <div class="u-cell" v-if="!mnemonic && keystore_step  === 0">
                <button
                    v-bind:class="{'active-help': $store.state.helper === 'login-generate'}"
                    class="button button--main button--full" data-test-id="authAdvancedRegisterGenerateButton" @click="generate">
                    {{ $td('Click To Generate Seed&nbsp;Phrase', 'index.auth-sign-up-seed-generate') }}
                </button>
                <div class="divider"></div>
                <button
                    v-bind:class="{'active-help': $store.state.helper === 'login-generate-file'}"
                    class="button button--main button--full" data-test-id="authAdvancedRegisterGenerateButton" @click="keystore_step = 1">
                    {{ $td('Click To Generate Keystore file', 'index.auth-sign-up-keystore-generate') }}
                </button>
            </div>
            <div  class="u-cell" v-if="keystore_step === 1">
                 <input type="password"
                     placeholder="Enter a strong password for keystore"
                     class="form-field__input" rows="1" autocapitalize="off" spellcheck="false" v-check-empty v-autosize data-test-id="authAdvancedRegisterGenerateInput"
                           v-model.trim="password"
                 />
                <button class="button button-generate button--main button--full"
                        data-test-id="authAdvancedRegisterGenerateButton" @click="generate_keystore">
                    {{ $td('Generate', 'index.auth-sign-up-keystore-generate') }}
                </button>
            </div>
            <div  class="u-cell" v-if="keystore_step === 2">
                <label class="form-field form-field--with-icon">
                    <textarea class="form-field__input is-not-empty" rows="1" autocapitalize="off" spellcheck="false" readonly v-autosize
                              :value="address_keystore"
                    ></textarea>
                    <ButtonCopy class="form-field__icon form-field__icon--copy u-semantic-button link--opacity" :copy-text="address_keystore">
                        <img src="/img/icon-copy-black.svg" alt="Copy">
                    </ButtonCopy>
                    <span class="form-field__label">{{ $td('Your generated address', 'index.auth-sign-up-seed-address') }}</span>
                </label>
            </div>
            <div class="u-cell" v-if="address">
                <label class="form-field form-field--with-icon">
                    <textarea class="form-field__input is-not-empty" rows="1" autocapitalize="off" spellcheck="false" readonly v-autosize
                              :value="address"
                    ></textarea>
                    <ButtonCopy class="form-field__icon form-field__icon--copy u-semantic-button link--opacity" :copy-text="address">
                        <img src="/img/icon-copy-black.svg" alt="Copy">
                    </ButtonCopy>
                    <span class="form-field__label">{{ $td('Your generated address', 'index.auth-sign-up-seed-address') }}</span>
                </label>
            </div>
            <div class="u-cell" v-if="mnemonic">
                <label class="form-field form-field--with-icon">
                    <textarea class="form-field__input is-not-empty" rows="1" autocapitalize="off" spellcheck="false" readonly v-autosize
                              :value="mnemonic"
                    ></textarea>
                    <ButtonCopy class="form-field__icon form-field__icon--copy u-semantic-button link--opacity" data-test-id="authAdvancedRegisterCopyButton" :copy-text="mnemonic">
                        <img src="/img/icon-copy-black.svg" :alt="$td('Copy Seed Phrase', 'index.auth-sign-up-seed-copy')">
                    </ButtonCopy>
                    <span class="form-field__label">{{ $td('Your generated seed phrase', 'index.auth-sign-up-seed-result') }}</span>
                </label>
            </div>
            <!--<div class="u-cell" v-if="mnemonic">
                <ButtonCopy class="button button&#45;&#45;main button&#45;&#45;full" data-test-id="authAdvancedRegisterCopyButton" :copy-text="mnemonic">
                    {{ $td('Copy Seed Phrase', 'index.auth-sign-up-seed-copy') }}
                </ButtonCopy>
            </div>-->
        </div>
    </div>
</template>

<script>
    // Uni8Array.fill needed for wallet
    // import 'core-js/modules/es6.typed.uint8-array';
    import autosize from 'v-autosize';
    import {generateMnemonic, walletFromMnemonic} from "noahjs-wallet";
    import ButtonCopy from '~/components/common/ButtonCopy';
    import FileSaver from 'file-saver';
    import CryptoJS from "crypto-js";
    import {create_keystore} from "../utils/keystore";

    export default {
        components: {
            ButtonCopy,
        },
        directives: {
            autosize,
        },
        data() {
            return {
                mnemonic: '',
                keystore_step: 0,
                address: '',
                password: ''
            };
        },
        computed: {
            address() {
                try {
                    return walletFromMnemonic(this.mnemonic).getAddressString();
                } catch (e) {
                    return '';
                }
            },
        },
        methods: {
            generate() {
                this.mnemonic = generateMnemonic();
            },
            generate_keystore() {
                if(this.password.length > 3) {
                    const mnemonic = generateMnemonic();
                    create_keystore(this.password, mnemonic)
                    this.keystore_step = 2;
                    try {
                        this.address_keystore = walletFromMnemonic(mnemonic).getAddressString()
                    } catch (e) {}
                }
            }
        },
    };
</script>
<style>
    .divider {
        width: 100%;
        height: 1px;
        background: #eee;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .button-generate {
        margin-top: 15px;
    }
</style>
