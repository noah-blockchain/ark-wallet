<template>
    <div v-if="$store.state.validatorList !== undefined">
        <v-select
            placeholder="Select validator"
            :clearable="false"
            @input="inputChange"
            :hasMore="hasMore"
            label="public_key"
            @load-more="infiniteHandler"
            :value="shrinkString(value, 38)"
            class="form-field__input" type="text" autocapitalize="off" spellcheck="false"
            :options="validatorList">
            <template v-slot:option="option">
                <div>
                    <div class="select-validator">
                        <div class="validator-desc">
                            <span class="public-name">{{ option.meta.name }}</span>
                            <span class="public-select">{{ shrinkString(option.public_key, 36) }}</span>
                            <span class="public-select-desc">
                        Fee for Delegation: {{Number(option.commission).toFixed(2)}}
                    </span>
                            <span class="public-select-desc">
                             Share of Stake: {{Number(option.stake).toFixed(2)}}
                        </span>
                            <span class="public-select-desc">
                             Profitability: 20%
                        </span>
                        </div>
                        <div class="validator-link">
                            <a :href="EXPLORER_HOST +  '/validators/' + option.public_key"
                               v-tooltip.top-center="'go to explorer'">
                                <img src="/img/information.svg">
                            </a>
                        </div>
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
    import InfiniteLoading from 'vue-infinite-loading';
    import {getValidatorList} from "../../api";

    export default {
        ideFix: true,
        TYPE_ADDRESS: 'address',
        TYPE_PUBLIC_KEY: 'publicKey',
        inheritAttrs: false,
        components: {
            FieldQrSelect,
            InfiniteLoading
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
                page: 2,
                hasMore: true,
                shrinkString,
                flag: false,
                EXPLORER_HOST,
                domain: this.value,
                isResolving: 0,
                validatorList: this.$store.state.validatorList,
                mnsResolveDomain: ResolveDomain(),
            };
        },
        computed: {},
        methods: {
            loadMore() {
                if(!this.flag) {
                    this.flag = true
                    getValidatorList(this.page)
                        .then((validatorList) => {
                            this.validatorList = [
                                ...this.validatorList,
                                ...validatorList
                            ];
                            this.page += 1;
                            this.flag = false;
                            this.hasMore = validatorList.length === 20
                        });
                }
            },
            infiniteHandler() {
                this.loadMore();
            },
            filter(validators) {

                console.log("VALIDATORS", validators);
                try {
                    if (this.max === 100) return validators;
                    const result = []
                    validators.forEach((val) => {
                        if (val.commission < this.max && val.status === 2) {
                            result.push(val)
                        }
                    });
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
