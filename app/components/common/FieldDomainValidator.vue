<template>
    <div>
        <v-select
            placeholder="Select validator"
            :clearable="false"
            @input="inputChange"
            label="public_key"
            :value="shrinkString(value, 38)"
            class="form-field__input" type="text" autocapitalize="off" spellcheck="false"
            :options="$store.state.validatorList">
            <template v-slot:option="option">
                <div class="select-validator">
                    <span class="public-name">{{ option.meta.name }}</span>
                    <span class="public-select">{{ shrinkString(option.public_key, 42) }}</span>
                    <span class="public-select-desc">Part: {{option.part}} Uptime: {{option.uptime}}</span>
                </div>
            </template>
        </v-select>
    </div>
</template>

<script>
    import {ResolveDomain, isDomain, checkDomainSignature} from '~/api/mns';
    import FieldQrSelect from '~/components/common/FieldQrSelect';
    import shrinkString from "../../utils/shrinkString";

    export default {
        ideFix: true,
        TYPE_ADDRESS: 'address',
        TYPE_PUBLIC_KEY: 'publicKey',
        inheritAttrs: false,
        components: {
            FieldQrSelect,
        },
        props: {
            // self
            /** @type "address"|"publicKey" */
            valueType: {
                type: String,
                required: true,
            },
            // nested
            value: {
                type: [String, Number],
                required: true,
            },
            $value: {
                type: Object,
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
            // self
            help: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                shrinkString,

                domain: this.value,
                isResolving: 0,
                mnsResolveDomain: ResolveDomain(),
            };
        },
        mounted() {
            this.$store.dispatch('FETCH_STAKE_LIST');
        },
        methods: {
            inputChange(inputValue) {
                this.$emit('input', inputValue.public_key);
                this.$emit('update:domain', '');
                this.domain = '';
            },
        },
    };
</script>
