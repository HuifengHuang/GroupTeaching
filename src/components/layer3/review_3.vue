<template>
    <div class="overview-container">
        <div class="title">Review</div>
        <div ref="chartContainer" class="chart-container"></div>
    </div>
</template>

<script>
import * as d3 from 'd3';


export default {
    name: 'PieChartsWithLine',
    mounted() {
        this.drawCharts();
        // 监听窗口大小变化以重新绘制图表
        window.addEventListener('resize', this.debounce(this.drawCharts, 200));
    },
    beforeDestroy() {
        // 清除监听器
        window.removeEventListener('resize', this.drawCharts);
    },
    methods: {
        drawCharts() {
            const svgContainer = d3.select(this.$refs.chartContainer);
            const containerWidth = svgContainer.node().getBoundingClientRect().width;
            const containerHeight = svgContainer.node().getBoundingClientRect().height;

            // 清除之前的图表
            svgContainer.selectAll('*').remove();

            const svg = svgContainer.append('svg')
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`)
                .attr('preserveAspectRatio', 'xMidYMid meet');

            const numCols = 3, numRows = 3;
            const colSpacing = containerWidth / (numCols + 1);
            const rowSpacing = containerHeight / (numRows + 1);
            const radius = Math.min(colSpacing, rowSpacing) / 3; // 根据间隔自动调整饼图大小

            // 固定数据集
            // const data = [
            //     [{ value: 30 }, { value: 70 }, { value: 50 }, { value: 50 }],
            //     [{ value: 40 }, { value: 60 }, { value: 40 }, { value: 60 }],
            //     [{ value: 50 }, { value: 50 }, { value: 30 }, { value: 70 }],
            //     [{ value: 60 }, { value: 40 }, { value: 20 }, { value: 80 }],
            //     [{ value: 70 }, { value: 30 }, { value: 10 }, { value: 90 }],
            //     [{ value: 80 }, { value: 20 }, { value: 5 }, { value: 95 }],
            //     [{ value: 90 }, { value: 10 }, { value: 2 }, { value: 98 }],
            //     [{ value: 100 }, { value: 0 }, { value: 0 }, { value: 100 }],
            //     [{ value: 95 }, { value: 5 }, { value: 0 }, { value: 100 }]
            // ];
            //案例2
            const data = [
                [{ value: 30 }, { value: 70 }, { value: 50 }, { value: 60 }],
                [{ value: 40 }, { value: 60 }, { value: 40 }, { value: 70 }],
                [{ value: 50 }, { value: 50 }, { value: 30 }, { value: 75 }],
                [{ value: 60 }, { value: 40 }, { value: 20 }, { value: 80 }],
                [{ value: 70 }, { value: 30 }, { value: 10 }, { value: 10 }],//异常
                [{ value: 30 }, { value: 20 }, { value: 50 }, { value: 0 }],
                [{ value: 20 }, { value: 50 }, { value: 2 }, { value: 10 }],
                [{ value: 60 }, { value: 10 }, { value: 40 }, { value: 0 }],
                [{ value: 75 }, { value: 50 }, { value: 10 }, { value: 5 }]
            ];

            // const customColors = ["#85C1E9", "#A9DFBF", "#F7DC6F", "#F1948A"]; // 示例为自然色调
            const customColors = ['#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFF9C4', '#FFCCBC']  // 柔和马卡龙色
            const pie = d3.pie().value(d => d.value);
            const arc = d3.arc().innerRadius(radius / 2).outerRadius(radius).padAngle(0.1);

            // 动态计算每个饼图的位置
            const positions = [];
            for (let row = 0; row < numRows; row++) {
                for (let col = 0; col < numCols; col++) {
                    positions.push([
                        colSpacing * (1.1 * col + 1),
                        rowSpacing * (1.1 * row + 1)
                    ]);
                }
            }

            // 绘制S形连线
            const lineData = positions.slice(); // 复制positions数组

            const line = d3.line()
                .x(d => d[0])
                .y(d => d[1])
                .curve(d3.curveCatmullRom);

            svg.append("path")
                .datum(lineData)
                .attr("fill", "none")
                .attr("stroke", "#FFCCBC")
                .attr("stroke-width", 4)
                .attr("d", line);

            // 绘制饼图
            positions.forEach((pos, index) => {
                const g = svg.append("g")
                    .attr("transform", `translate(${pos[0]},${pos[1]})`);

                g.selectAll('.arc')
                    .data(pie(data[index]))
                    .enter().append('path')
                    .attr('class', 'arc')
                    .attr('d', arc)
                    .style('fill', (d, i) => customColors[i % customColors.length]);
            });


        },
        debounce(fn, delay) {
            let timer;
            return function () {
                const context = this;
                const args = arguments;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    fn.apply(context, args);
                }, delay);
            };
        }
    }
}
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
    margin-top: -10%;
}

.overview-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
}

.title {
    color: #4cc4d5;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
}
</style>