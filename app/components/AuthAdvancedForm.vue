<template>
    <form class="panel__section" @submit.prevent="addAddress">
        <div class="u-grid u-grid--small u-grid--vertical-margin--small">
            <div class="u-cell">
                <label v-if="file === null"  class="form-field"
                       :class="{'is-error': $v.mnemonic.$error, 'is-success': !$v.mnemonic.$invalid}">
                    <textarea class="form-field__input" rows="1" autocapitalize="off" spellcheck="false" v-check-empty
                              v-autosize data-test-id="authAdvancedLoginInputMnemonic"
                              v-model.trim="mnemonic"
                              @blur="$v.mnemonic.$touch()"
                    ></textarea>
                    <span class="form-field__label">{{ $td('Your seed phrase or private key', 'index.auth-sign-in-seed-text') }}</span>
                </label>
                <label v-else class="form-field">
                    <textarea class="form-field__input" rows="1" autocapitalize="off" spellcheck="false" v-check-empty
                              v-autosize data-test-id="authAdvancedLoginInputMnemonic"
                              v-model.trim="password"
                    ></textarea>
                    <span class="form-field__label">{{ $td('Your password for keystore', 'index.auth-sign-in-seed-text') }}</span>
                </label>
                <span class="form-field__error"
                      v-if="$v.mnemonic.$dirty && !$v.mnemonic.required && file === null">
                    {{ $td('Enter phrase', 'index.auth-error-seed-required') }}
                </span>
                <span class="form-field__error"
                      v-if="$v.mnemonic.$dirty && $v.mnemonic.required && !$v.mnemonic.validMnemonic">
                    {{ $td('Invalid phrase', 'index.auth-error-seed-invalid') }}
                </span>
            </div>
            <div v-if="file === null" class="u-cell">
                <button class="button button--main button--full" data-test-id="authAdvancedLoginSubmitButton"
                        :class="{'is-disabled': $v.$invalid}">{{ $td('Sign In', 'index.auth-sign-in-seed-button') }}
                </button>
            </div>
            <div class="u-cell" v-if="file === null">
                <input type="file" class="file-picker" ref="file" accept=".noah" v-on:change="handleFileUpload()"/>
                <button class="button button--main button--full" data-test-id="authAdvancedLoginSubmitButton">{{
                    $td('Sign In with keystore', 'index.auth-sign-in-seed-button') }}
                </button>
            </div>
            <div class="u-cell" v-else>
                <button
                    @click="decode"
                    class="button button--main button--full" data-test-id="authAdvancedLoginSubmitButton">{{
                    $td('Sign In', 'index.auth-sign-in-seed-button') }}
                </button>
            </div>
        </div>
    </form>
</template>


<script>
    // Uni8Array.fill needed for wallet
    // import 'core-js/modules/es6.typed.uint8-array';
    import {validationMixin} from 'vuelidate';
    import required from 'vuelidate/lib/validators/required';
    import withParams from 'vuelidate/lib/withParams';
    import autosize from 'v-autosize';
    import {isValidMnemonic} from 'noahjs-wallet';
    import checkEmpty from '~/assets/v-check-empty';
    import {decode_keystore} from "../utils/keystore";

    const mnemonicValidator = withParams({type: 'mnemonic'}, isValidMnemonic);

    export default {
        mixins: [validationMixin],
        directives: {
            checkEmpty,
            autosize,
        },
        props: {
            // address used for sign in
            isAuthAddress: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                mnemonic: '',
                file: null,
                password: ""
            };
        },
        validations: {
            mnemonic: {
                required,
                validMnemonic: mnemonicValidator,
            },
        },
        methods: {
            handleFileUpload() {
                this.file = this.$refs.file.files[0];
            },
            decode() {
                if (this.file !== undefined && this.file !== null) {
                    decode_keystore(this.file, this.password).then((mnemonic) => {
                        if (isValidMnemonic(mnemonic)) {
                            this.$store.commit('SET_AUTH_ADVANCED', mnemonic);
                        }
                    }).catch((err) => {})
                }
            },
            addAddress() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }
                this.$store.commit('SET_AUTH_ADVANCED', this.mnemonic);
                // this.$emit('addressAdded');
            },
        },
    };
</script>
<style>
    .file-picker {
        height: 42px;
        position: absolute;
        width: 100%;
        z-index: 999;
        cursor: pointer;
        opacity: 0;
    }
</style>
