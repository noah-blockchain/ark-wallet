<template>
    <div class="charts-container">
        <div class="header-charts">
            <div class="charts-selector">
                <div class="select">Неделя</div>
                <div class="select">Месяц</div>
                <div class="select">Год</div>

            </div>
        </div>
        <div class="charts-block">
            <Chart
                :style="{
                    width: 'calc(100%)',
                    height: '140px',
                    position: 'relative',
                }"
                :chart-data="datacollection">
            </Chart>
        </div>
    </div>
</template>

<script>
    import Chart from './common/Chart';
    import moment from 'moment';

    export default {
        name: 'ChartContainer',
        components: {Chart},
        computed: {},
        async mounted() {
        },
        methods: {
            select_currency() {
                localStorage.setItem('currency', this.currency)
            }
        },
        data: function () {
            return {
                currency: "NOAH",
                time: '1d',
                datacollection: {
                    labels: ['10-10-2019', '11-10-2019', '12-10-2019', '13-10-2019', '14-10-2019', '15-10-2019', '16-10-2019'],
                    datasets: [
                        {
                            label: 'Supply',
                            backgroundColor: 'rgba(22, 66, 125,0.1)',
                            borderColor: [
                                '#16427d',
                            ],
                            borderWidth: 1.5,
                            data: [12, 14, 16, 12, 10, 16, 15],
                        }
                    ]
                }
            };
        }
    };
</script>
