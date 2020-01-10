<template>
    <div v-if="$store.state.validatorList !== undefined">
        <v-select
            placeholder="Select validator"
            :clearable="false"
            @input="inputChange"
            label="public_key"
            :value="shrinkString(value, 38)"
            class="form-field__input" type="text" autocapitalize="off" spellcheck="false"
            :options="filter($store.state.validatorList)">
            <template v-slot:option="option">
                <div class="select-validator">
                    <div class="validator-desc">
                        <span class="public-name">{{ option.meta.name }}</span>
                        <span class="public-select">{{ shrinkString(option.public_key, 40) }}</span>
                        <span class="public-select-desc">
                        Fee for Delegation: {{Number(option.commission).toFixed(2)}}
                        | Share of Stake: {{Number(option.stake).toFixed(2)}}
                    </span>
                    </div>
                    <div class="validator-link">
                        <a :href="EXPLORER_HOST +  '/validators/' + option.public_key" v-tooltip.top-center="'go to explorer'">
                            <img  src="/img/information.svg">
                        </a>
                    </div>
                </div>
            </template>
        </v-select>
    </div>
</template>

<script>
    import {ResolveDomain, isDomain, checkDomainSignature} from '~/api/mns';
    import FieldQrSelect from '~/components/common/FieldQrSelect';
    import shrinkString from "../../utils/shrinkString";
    import {EXPLORER_HOST} from "../../assets/variables";

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
            max: {
                type: Number,
                default: 80.1
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
                EXPLORER_HOST,
                domain: this.value,
                isResolving: 0,
                mnsResolveDomain: ResolveDomain(),
            };
        },
        mounted() {
            this.$store.dispatch('FETCH_STAKE_LIST');
        },
        computed: {
        },
        methods: {
            filter(validators) {
                try {
                    if(this.max === 100) return  validators;
                    const result = []
                    validators.forEach((val) => {
                        if (val.commission < this.max) {
                            result.push(val)
                        }
                    });
                    console.log(result, 'RESULT')
                    return result
                } catch (e) {
                    return []
                }
            },
            inputChange(inputValue) {
                console.log(inputValue)
                this.$emit('input', inputValue.public_key);
                this.$emit('update:domain', '');
                this.domain = '';
            },
        },
    };
</script>
