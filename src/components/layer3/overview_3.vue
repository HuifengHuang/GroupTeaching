<template>

    <!-- <div id="chart" style="position: absolute; 
    top: 50%; 
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%) rotate(90deg);"></div> -->


    <div ref="container" class="overview-container">
        <div class="title">Overview</div>
        <div id="chart" style="width: 100%; height: 100%;
   "></div>
    </div>


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
            var data = [
                {
                    name: 'Group 1',
                    children: [
                        { name: 'Member A1', value: 85 },
                        { name: 'Member B1', value: 70 },
                        { name: 'Member C1', value: 90 },
                        { name: 'Member D1', value: 60 }
                    ]
                },
                {
                    name: 'Group 2',
                    children: [
                        { name: 'Member A2', value: 80 },
                        { name: 'Member B2', value: 65 },
                        { name: 'Member C2', value: 95 },
                        { name: 'Member D2', value: 55 }
                    ]
                },
                {
                    name: 'Group 3',
                    children: [
                        { name: 'Member A3', value: 75 },
                        { name: 'Member B3', value: 60 },
                        { name: 'Member C3', value: 85 },
                        { name: 'Member D3', value: 50 }
                    ]
                },
                {
                    name: 'Group 4',
                    children: [
                        { name: 'Member A4', value: 90 },
                        { name: 'Member B4', value: 75 },
                        { name: 'Member C4', value: 80 },
                        { name: 'Member D4', value: 65 }
                    ]
                },
                {
                    name: 'Group 5',
                    children: [
                        { name: 'Member A5', value: 95 },
                        { name: 'Member B5', value: 80 },
                        { name: 'Member C5', value: 70 },
                        { name: 'Member D5', value: 55 }
                    ]
                }
            ];
            let option = {
                series: {
                    type: 'sunburst',
                    data: data,
                    radius: ['20%', '90%'],
                    itemStyle: {
                        borderRadius: 7,
                        borderWidth: 2
                    },
                    label: {
                        show: false
                    }
                }
            };
            // 使用刚指定的配置项和数据显示图表
            chart.setOption(option);


        }
    }


};


</script>

<style scoped>
.overview-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
}

.svg {
    width: 100%;
    height: 100%;
}

.title {
    color: #4cc4d5;
    font-size: 20px;
    font-weight: bold;
    text-align: left;

}
</style>