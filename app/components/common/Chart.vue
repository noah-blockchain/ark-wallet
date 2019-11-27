<script>
    import { Line, mixins } from 'vue-chartjs';

    const { reactiveProp } = mixins;

    export default {
        extends: Line,
        mixins: [reactiveProp],
        props: ['options'],
        mounted() {
            this.renderChart(this.chartData, {
                maintainAspectRatio: false,
                tooltips: {
                    enabled: true,
                },
                elements: {
                    point: {
                        radius: 2
                    }
                },
                legend: {
                    display: false
                },
                responsive: true,

                scales: {
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            fontColor: '#ccc'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            display: false,
                        },
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0.04)',
                            display: false,
                            drawBorder: false,
                        },
                    }]
                }
            });
        }
    };
</script>
