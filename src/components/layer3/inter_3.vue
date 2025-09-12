<template>

    <div id="chart" style="
    width:100%;height: 100%;
   "></div>


</template>


<script>


import * as echarts from 'echarts';

export default {
    name: 'MyChart',
    props: {
    },


    mounted() {
        this.initChart();

    },


    methods: {
        initChart() {
            // 基于准备好的dom，初始化echarts实例
            const chart = echarts.init(document.getElementById('chart'));
            let option = {
                xAxis: {
                    type: 'category',
                    data: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07'],
                    axisLabel: { show: false },
                    boundaryGap: false
                },
                yAxis: {
                    show: false,

                },
                visualMap: [
                    // // 用户1（蓝色）：填充区间 [1,3) 和 [4,6)
                    {
                        seriesIndex: 0,
                        show: false, // 不显示视觉映射组件
                        dimension: 0,
                        pieces: [
                            { gt: 1, lt: 3, color: 'rgba(84, 112, 198, 0.6)' },
                            { gt: 4, lt: 6, color: 'transparent' }
                        ]
                    },
                    // 用户2（绿色）：填充区间 [1,3)
                    {
                        seriesIndex: 1,
                        show: false, // 不显示视觉映射组件
                        dimension: 0,
                        pieces: [
                            { gt: 1, lt: 3, color: 'rgba(145, 204, 117, 0.6)' }
                        ]
                    },
                    // 用户3（红色）：填充区间 [4,6)
                    {
                        seriesIndex: 2,
                        show: false, // 不显示视觉映射组件
                        dimension: 0,
                        pieces: [
                            { gt: 4, lt: 5, color: 'rgba(255, 85, 85, 0.6)' }
                        ]
                    },
                    // 用户4（橙色）：填充区间 [4,6)
                    {
                        seriesIndex: 3,
                        show: false, // 不显示视觉映射组2
                        dimension: 0,
                        pieces: [
                            { gt: 4, lt: 6, color: 'transparent' }
                        ]
                    }
                ],
                series: [
                    // 用户1（蓝色）：双填充区间
                    {
                        type: 'line',
                        symbol: 'circle',
                        smooth: 0.6,
                        symbolSize: 8,
                        lineStyle: { color: '#5470C6', width: 3 },
                        areaStyle: {},
                        data: [10, 120, 150, 20, 80, 120, 100, 10]
                    },
                    // 用户2（绿色）：单填充区间
                    {
                        type: 'line',
                        smooth: 0.6,
                        symbol: 'triangle',
                        symbolSize: 10,
                        lineStyle: { color: '#91cc75', width: 3 },
                        areaStyle: {},
                        data: [10, 100, 80, 10, 10, 10, 10, 10]
                    },
                    // 用户3（红色）：单填充区间
                    {
                        type: 'line',
                        symbol: 'rect',
                        smooth: 0.6,
                        symbolSize: 8,
                        lineStyle: { color: '#ff5555', width: 3 },
                        areaStyle: {},
                        data: [10, 10, 10, 10, 220, 180, 50, 10]
                    },
                    // 用户4（橙色）：单填充区间
                    {
                        type: 'line',
                        symbol: 'diamond',
                        smooth: 0.6,
                        symbolSize: 10,
                        lineStyle: { color: '#ffa500', width: 3 },
                        areaStyle: {},
                        data: [10, 10, 10, 10, 90, 110, 30, 10]
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表
            chart.setOption(option);


        }
    }


};


</script>