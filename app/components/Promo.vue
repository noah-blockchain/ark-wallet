<template>
    <div>
        <p class="panel__header-description">
            {{$td('Earn 5.18-8.31% per annum from your BTCNEXT balance.', 'promo.one')}}<br/>
            {{$td('Dividends are paid daily, no blocking, and you can withdraw them anytime!', 'promo.two')}}
        </p>
        <br/>
        <div>
            <span
                style="color: #ffbd00; font-weight: bold">{{ $td('Calculate your profit now.', 'promo.calc_now') }}</span>
            <div class="calc">
                <div class="select-title">
                    <span class="select-t">{{ $td('Select the currency', 'promo.select_currency') }}</span>
                    <select v-model="currency" class="form-field__input form-field__input--select is-not-empty">
                        <option :value="currency" v-for="currency in currencies">
                            {{currency}}
                        </option>
                    </select>
                </div>
                <div class="select-title">
                    <span class="select-t">{{ $td('Amount', 'promo.amount') }} {{currency}}</span>
                    <input v-model="amount">
                </div>
                <div class="select-title">
                    <span class="select-t bold">{{ $td('Your income is', 'promo.you_income') }}</span>
                    <div class="bold-yellow">{{ Number((amount * 0.082) / (365 - _cof)).toFixed(6) }} {{currency}} {{ $td('per day', 'promo.per_day') }}
                    </div>
                </div>
            </div>
        </div>
        <div class="promo-footer">
            <a href="https://www.btcnext.io/qdao-defi-faq" class="invest-now">{{ $td('Invest now',
                'promo.invest_now') }}</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Promo",
        data: () => ({
            currency: "BTC",
            amount: 10000,
            currencies: ['XRP', 'ETH', 'BTC']
        }),
        computed: {
            _cof() {
                return this.currencies.findIndex((f) => f === this.currency)

            }
        }
    }
</script>

