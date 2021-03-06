<script>
    import getTitle from '~/assets/get-title';
    import StakeListTable from '~/components/StakeListTable';
    import ValidatorDelegateForm from '~/components/ValidatorDelegateForm';
    import ValidatorUnbondForm from '~/components/ValidatorUnbondForm';
    import ValidatorReinvestForm from '~/components/ValidatorReinvestForm';
    import ValidatorReinvestPostForm from '~/components/ValidatorReinvestStartForm';
    import Promo from "../../components/Promo";

    let stakeInterval;

    export default {
        components: {
            Promo,
            StakeListTable,
            ValidatorDelegateForm,
            ValidatorUnbondForm,
            ValidatorReinvestForm,
            ValidatorReinvestPostForm,
        },
        fetch({ app, store }) {
            store.commit('SET_SECTION_NAME', app.$td('Delegation', 'common.page-delegation'));
            if (store.getters.isOfflineMode) {
                return;
            }
            store.dispatch('FETCH_VALIDATOR_LIST');
            return store.dispatch('FETCH_STAKE_LIST');
        },
        head() {
            const title = getTitle(this.$store.state.sectionName, this.$i18n.locale);
            const description = this.$td('Delegate your coins to start receiving payouts. Here you can also submit the request for unbonding.', 'delegation.seo-description');
            const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

            return {
                title: title,
                meta: [
                    { hid: 'og-title', name: 'og:title', content: title },
                    { hid: 'description', name: 'description', content: description },
                    { hid: 'og-description', name: 'og:description', content: description },
                    { hid: 'og-image', name: 'og:image', content: `/img/social-share-delegation${localeSuffix}.png` },
                ],
            };
        },
        mounted() {
            //@TODO move to websocket https://minterteam.atlassian.net/browse/EX-205
            stakeInterval = setInterval(() => {
                this.$store.dispatch('FETCH_STAKE_LIST');
            }, 10 * 1000);
        },
        destroyed() {
            clearInterval(stakeInterval);
        },
    };
</script>

<template>
    <section class="u-section u-container">
        <div class="panel panel-warning" style="overflow: unset">
            <div class="panel__header">
                <h1 class="panel__header-title">
                    {{ $td('Get more benefits from holding cryptocurrency', 'promo.title') }}
                </h1>
                <Promo/>
            </div>
        </div>
        <div class="panel" style="overflow: unset">
            <div class="panel__header">
                <h1 class="panel__header-title">
                    {{ $td('Delegate', 'delegation.delegate-title') }}
                </h1>
                <p class="panel__header-description">
                    {{ $td('You can delegate your tokens to validators and receive related payments in accordance with the terms of participation.', 'delegation.delegate-description') }}
                </p>
            </div>
            <ValidatorDelegateForm/>
        </div>
        <div class="panel" style="overflow: unset">
            <div class="panel__header">
                <h1 class="panel__header-title">
                    {{ $td('Unbond', 'delegation.unbond-title') }}
                </h1>
                <p class="panel__header-description">
                    {{ $td('In case you don’t want the validator to handle your holdings anymore, all you need to do is submit the request for unbonding. The process will be finalized within approximately 90 days (1 555 200 blocks) after the request has been sent.', 'delegation.unbond-description') }}
                </p>
            </div>
            <ValidatorUnbondForm/>
        </div>
        <div class="panel" style="overflow: unset">
            <div class="panel__header">
                <h1 class="panel__header-title">
                    {{ $td('Generate Delegation Transactions', 'delegation.reinvest-generate-title') }}
                </h1>
                <p class="panel__header-description">
                    {{ $td('In order to enable automatic delegation, you will first need to generate a batch of transactions. You may do it either on-line or locally (we recommend that you use the second option as it is more secure). If you do it off-line, download the resulting file and proceed to the next step. If you do it on-line, generated transactions will be sent to auto-delegation server automatically.', 'delegation.reinvest-generate-description') }}
                </p>
            </div>
            <ValidatorReinvestForm/>
        </div>
        <div class="panel">
            <div class="panel__header">
                <h1 class="panel__header-title">
                    {{ $td('Start auto-delegation', 'delegation.reinvest-start-title') }}
                </h1>
                <p class="panel__header-description">
                    {{ $td('Here you need to upload and submit the file that contains the list of generated transactions. They will be sent to auto-delegation server that will check your account balance and try to send a delegation transaction. To stop auto-delegation, you have to send any other transaction to break nonce order in the auto-delegator queue.', 'delegation.reinvest-start-description') }}
                </p>
            </div>
            <ValidatorReinvestPostForm/>
        </div>
        <section class="panel"  v-if="$store.state.stakeList.length && !$store.getters.isOfflineMode">
            <div class="panel__header">
                <h1 class="panel__header-title">
                    {{ $td('Delegated Stakes', 'delegation.stake-list-title') }}
                </h1>
            </div>
            <StakeListTable :stake-list="$store.state.stakeList" stake-item-type="validator"/>
        </section>

    </section>
</template>

<style>
    .panel-warning {
        background: #000;
        color: #ffffff;
    }

    .panel-warning .panel__header-title {
        color: #ffbd00;
    }
    .invest-now {
        width: 320px; height: 54px; border-radius: 27px; display: flex; align-items: center;
        justify-content: center; background:#ffbd00; color: #000; font-weight: bold; margin-top: 32px;
        cursor: pointer;
    }
    .promo-footer {
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 16px;
    }
    .calc {
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .select-title {
        margin-right: 24px;
    }
    .select-title input {
        display: flex;
        border: none;
        background: #000000;
        height: 36px;
        padding-right: 6px;
        border-bottom: 1px solid #eeeeee;
        color: #ffffff;
    }

    .select-title .form-field__input {
        border-bottom: 1px solid #eeeeee;
        margin-top: 12px;
    }
    .select-t {
        display: block;
        margin-top: 4px;
        margin-bottom: 8px;
    }
    .bold {
        font-weight: bold;
    }
    .bold-yellow {
        color: #ffbd00;
        font-weight: bold;
        font-size: 22px;

    }
    .panel-warning {
         background: #000;
         color: #ffffff;
    }
    .panel-warning .panel__header-title {
        color: #ffbd00;
    }
    .invest-now {
        width: 320px; height: 54px; border-radius: 27px; display: flex; align-items: center;
        justify-content: center; background:#ffbd00; color: #000; font-weight: bold; margin-top: 32px;
        cursor: pointer;
    }
    .promo-footer {
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 16px;
    }
    .calc {
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .select-title {
        margin-right: 24px;
    }
    .select-title input {
        display: flex;
        border: none;
        background: #000000;
        height: 36px;
        padding-right: 6px;
        border-bottom: 1px solid #eeeeee;
        color: #ffffff;
    }

    .select-title .form-field__input {
        border-bottom: 1px solid #eeeeee;
        margin-top: 12px;
    }
    .select-t {
        display: block;
        margin-top: 4px;
        margin-bottom: 8px;
    }
    .bold {
        font-weight: bold;
    }
    .bold-yellow {
        color: #ffbd00;
        font-weight: bold;
        font-size: 22px;

    }
    .panel-warning option {
        color: #000000;
    }
</style>
