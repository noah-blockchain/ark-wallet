<script>
    import { Line, mixins } from 'vue-chartjs';
    import {kFormatter} from "../../utils/math";

    const { reactiveProp } = mixins;

    export default {
        extends: Line,
        mixins: [reactiveProp],
        props: ['options'],
        mounted() {
            this.renderChart(this.chartData, {
                elements: {
                    point: {
                        radius: 2
                    }
                },
                legend: {
                    display: false
                },

                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    enabled: true,
                },
                scales: {

                    xAxes: [{
                        ticks: {
                            display: false,
                        },
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0.04)',
                            display: false,
                            drawBorder: false,
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            fontColor: '#ccc',
                            callback: function (value) {
                                return kFormatter(value);
                            }
                        }
                    }]
                }
            });
        }
    };
</script>
