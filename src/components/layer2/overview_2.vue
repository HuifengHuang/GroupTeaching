<template>
    <div ref="container" class="overview-container">
        <div class="title">Overview</div>
        <svg ref="chart"></svg>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'Overview1',
    data() {
        return {
            // horizontalData: [
            //     { label: 'A', values: [30, 20, 50, 40] },
            //     { label: 'B', values: [40, 10, 50, 30] },
            //     { label: 'C', values: [20, 30, 50, 20] },
            //     { label: 'D', values: [10, 40, 50, 10] },
            //     { label: 'E', values: [10, 40, 50, 10] }
            // ],
            // verticalData: [
            //     { label: 'X', values: [20, 20, 50, 40, 10] }
            // ],
            // pieData: [
            //     { label: 'A', values: [60, 15, 75, 45] },
            //     { label: 'B', values: [80, 20, 90, 50] },
            //     { label: 'C', values: [50, 35, 85, 30] },
            //     { label: 'D', values: [30, 60, 180, 20] },
            //     { label: 'E', values: [25, 65, 85, 15] }
            // ],
            // colorsHor: ['#5E4FA2', '#3288BD', '#66C2A5', '#ABDDA4', '#E6F598'],  // 紫色到绿色的渐变
            // colors: ['#2A4C7D', '#3B6AA0', '#4C8AC3', '#5DA9E6', '#6EC8FF'],    // 蓝色系渐变
            // colorPie: ['#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFF9C4', '#FFCCBC']   // 柔和马卡龙色

            horizontalData: [
                //总结，反对，支持，提问
                { label: 'A', values: [105, 60, 105, 60] },
                { label: 'B', values: [20, 20, 10, 10] },//小组异常
                { label: 'C', values: [100, 10, 60, 30] },
                { label: 'D', values: [60, 25, 70, 15] },
                { label: 'E', values: [50, 50, 80, 60] }
            ],
            verticalData: [
                { label: 'X', values: [33, 6, 20, 17, 24] }//100
            ],
            pieData: [
                { label: 'A', values: [20, 75, 10, 25] },//组内异常
                { label: 'B', values: [62, 40, 80, 50] },
                { label: 'C', values: [80, 50, 86, 57] },
                { label: 'D', values: [51, 49, 12, 18] },
                { label: 'E', values: [42, 60, 30, 51] }
            ],

            colorsHor: ['#6495ED', '#7FFFD4', '#FFD700', '#FFB6C1', '#E6F598'],  // 紫色到绿色的渐变
            colors: ['#479DEC', '#E3EBF2', '#4C8AC3', '#ACD7FF', '#6DACE6'],    // 蓝色系渐变
            colorPie: ['#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFF9C4', '#FFCCBC'],   // 柔和马卡龙色
        };
    },
    mounted() {
        this.initChart();
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        initChart() {
            const container = this.$refs.container;
            const width = container.clientWidth;
            const height = container.clientHeight * 0.95;

            // 创建基础SVG
            const svg = d3.select(this.$refs.chart)
                .attr('width', width)
                .attr('height', height);

            // 分区比例
            const verticalWidth = width * 0.2;
            const horizontalWidth = width * 0.5;

            // 绘制垂直堆叠柱状图
            const verticalChart = this.createVerticalChart(svg, verticalWidth, height);

            // // 绘制水平堆叠柱状图
            const horizontalChart = this.createHorizontalChart(svg, horizontalWidth, verticalWidth, height);

            // console.log(horizontalChart.horizontalPoints);
            // console.log(this.verticalData.values);
            // this.drawCurveBetweenPoints(svg, horizontalChart.horizontalPoints[0].bottom, verticalChart.points[0].bottom)
            // this.drawCurveBetweenPoints(svg, verticalChart.points[0].top, horizontalChart.horizontalPoints[0].top)



            // // 绘制连接线
            // this.drawConnectionLines(svg, verticalChart.points, horizontalChart.points);

            // // 绘制右侧刻度
            // this.drawVerticalScale(svg, verticalChart.labelPositions, verticalWidth + horizontalWidth + 30, height);

            // console.log(horizontalChart.horizontalPoints);


            // // 绘制饼图
            let pieRes = this.drawPieCharts(svg, horizontalChart.points, verticalWidth + horizontalWidth, width - verticalWidth - horizontalWidth);
            for (let i = 0; i < this.verticalData[0].values.length * 4; i++) {
                this.drawIner(svg, horizontalChart.horizontalPoints[i].bottom, verticalChart.points[i].bottom, verticalChart.points[i].top, horizontalChart.horizontalPoints[i].top, this.colorsHor[i % 4])
                // this.drawLine(svg, { x: (horizontalChart.horizontalPoints[i].bottom.x + horizontalChart.horizontalPoints[i].top.x) / 2 + 10, y: (horizontalChart.horizontalPoints[i].bottom.y + horizontalChart.horizontalPoints[i].top.y) / 2 }, pieRes[i])
            }




        },
        drawLine(svg, start, end) {
            // 添加直线
            svg.append("line")
                .attr("x1", start.x)
                .attr("y1", start.y)
                .attr("x2", end.x)
                .attr("y2", end.y)
                .attr("stroke", this.colorsHor[3])
                .attr("stroke-width", 2);

        },
        drawIner(svg2, topLeft, topRight, bottomRight, bottomLeft, color) {
            topLeft.x -= 5
            bottomLeft.x -= 5
            const topCurve = this.drawCurveBetweenPoints(svg2, topLeft, topRight, { color: 'transparent' }).attr('d');
            const bottomCurve = this.drawCurveBetweenPoints(svg2, bottomRight, bottomLeft, { color: 'transparent' }).attr('d');
            // 生成填充区域的路径数据
            const fillPathData = (() => {


                return `M${topLeft.x},${topLeft.y} ` +
                    topCurve.slice(1) +
                    `L${bottomRight.x},${bottomRight.y} ` +
                    bottomCurve.slice(1) +
                    'Z';
            })();

            // 填充区域
            svg2.append('path')
                .attr('d', fillPathData)
                .attr('fill', color)
                .attr('stroke', 'none');

        },
        /**
 * 在两点之间绘制贝塞尔曲线
 * @param {Object} svg - SVG容器
 * @param {Object} start - 起点坐标 {x, y}
 * @param {Object} end - 终点坐标 {x, y}
 * @param {Object} [options] - 配置项
 * @param {number} [options.curvature=0.2] - 曲率系数（0-1）
 * @param {string} [options.color='#666'] - 线条颜色
 * @param {number} [options.strokeWidth=2] - 线宽
 * @param {string} [options.curveType='basis'] - 曲线类型
 */
        drawCurveBetweenPoints(svg, start, end, options = {}) {
            // 合并默认配置
            const config = {
                curvature: 0.2,
                color: '#666',
                strokeWidth: 0,
                curveType: 'basis',
                ...options
            };

            // 优化后的控制点计算（智能方向判断）
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const angle = Math.atan2(dy, dx); // 获取线段方向角度
            const curvatureOffset = Math.hypot(dx, dy) * config.curvature; // 根据线段长度计算偏移量

            // 智能方向判断（0-2π弧度）
            const direction = (angle + Math.PI) % (Math.PI * 2); // 转换为0-2π范围

            // 计算水平/垂直偏移比例
            const horizontalFactor = Math.cos(direction) * 0.5;
            const verticalFactor = Math.sin(direction) * 0.8;

            // 生成两个控制点（贝塞尔曲线需要两个控制点）
            const cp1 = {
                x: start.x + dx * 0.4 + horizontalFactor * curvatureOffset,
                y: start.y + dy * 0.4 + verticalFactor * curvatureOffset,
            };

            const cp2 = {
                x: end.x - dx * 0.4 - horizontalFactor * curvatureOffset,
                y: end.y - dy * 0.4 - verticalFactor * curvatureOffset,
            };

            // const cp2 = {
            //     x: end.x + curvatureOffset,
            //     y: end.y + (deltaY > 0 ? -curvatureOffset : curvatureOffset)
            // };

            // 创建曲线生成器
            const lineGenerator = d3.line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(d3[`curve${config.curveType.charAt(0).toUpperCase() + config.curveType.slice(1)}`]);

            // 生成路径数据
            const pathData = lineGenerator([start, cp1, cp2, end]);

            // 绘制路径
            return svg.append('path')
                .attr('d', pathData)
                .attr('fill', 'none')
                .attr('stroke', config.color)
                .attr('stroke-width', config.strokeWidth)
                .attr('class', 'connection-curve')
                .style('stroke-linecap', 'round');
        },

        createVerticalChart(svg, width, height) {
            // 配置间隔参数
            const LAYER_GAP = 2; // 层间间隔2px

            // 比例尺配置
            const xScale = d3.scaleBand()
                .domain(this.verticalData.map(d => d.label))
                .range([0, width])
                .padding(0.1);

            // 计算总高度（包含间隔）
            const totalHeight = d3.max(this.verticalData, d => d3.sum(d.values));
            const subLayerCount = 4; // 每层细分为4个子层
            const totalHeightWithGap = totalHeight + (this.verticalData[0].values.length - 1) * LAYER_GAP;

            const yScale = d3.scaleLinear()
                .domain([0, totalHeightWithGap])
                .range([height, 0]);

            // 生成分层数据并进一步细分子层
            const layerData = this.verticalData[0].values.map((_, i) =>
                this.verticalData.map(d => ({
                    label: d.label,
                    value: d.values[i] / subLayerCount // 将值均分到每个子层
                }))
            );
            // console.log(layerData);

            let dataFl = this.horizontalData

            // // 根据 horizontalData 构建 layerData
            const layerData2 = this.verticalData[0].values.map((_, i) =>
                this.verticalData.map(d => {
                    const valuesPerSubLayer = [];
                    const sum = dataFl[i].values.reduce((sum, value) => sum + value, 0)

                    for (let j = 0; j < subLayerCount; j++) {
                        // 计算每一层应该分配的值，这里简单地平均分配
                        // 更复杂的分配策略可以根据需要在此处实现

                        let valueForSubLayer = d.values[i] / sum * dataFl[i].values[j];
                        valuesPerSubLayer.push(valueForSubLayer);
                    }
                    return { label: d.label, value: valuesPerSubLayer };
                })
            );
            // console.log(layerData2);


            // 绘制分层柱状图
            const chartGroup = svg.append('g');
            const rightPoints = []; // 存储右侧端点坐标

            layerData.forEach((layer, layerIndex) => {
                for (let subLayerIndex = 0; subLayerIndex < subLayerCount; subLayerIndex++) {
                    // console.log(layerData2[layerIndex][0].value);

                    const bars = chartGroup.selectAll(`.layer-${layerIndex}-subLayer-${subLayerIndex}`)
                        .data(layer)
                        .enter().append('rect')
                        .attr('class', `layer-${layerIndex}-subLayer-${subLayerIndex}`)
                        .attr('x', d => xScale(d.label))
                        .attr('width', xScale.bandwidth())
                        .attr('fill', this.colorsHor[subLayerIndex]); // 可以根据需要自定义颜色

                    // 计算Y位置（累加下方各层及子层高度及间隔）
                    let baseHeight = 0;
                    for (let i = 0; i < layerIndex; i++) {
                        baseHeight += this.verticalData[0].values[i] + LAYER_GAP;
                    }
                    for (let i = 0; i < subLayerIndex; i++) {
                        baseHeight += layerData2[layerIndex][0].value[i];
                    }

                    bars
                        .attr('y', d => yScale(baseHeight + layerData2[layerIndex][0].value[subLayerIndex] + LAYER_GAP))
                        .attr('height', d => yScale(baseHeight) - yScale(baseHeight + layerData2[layerIndex][0].value[subLayerIndex]));

                    // 记录右侧端点
                    rightPoints.push(...layer.map(d => ({
                        top: {
                            x: xScale(d.label) + xScale.bandwidth(),
                            y: yScale(baseHeight + layerData2[layerIndex][0].value[subLayerIndex] + LAYER_GAP)
                        },
                        bottom: {
                            x: xScale(d.label) + xScale.bandwidth(),
                            y: yScale(baseHeight + LAYER_GAP)
                        }
                    })));
                }
            });

            return {
                points: rightPoints,
                labelPositions: this.verticalData.map(d => ({
                    y: yScale(d.values.reduce((a, b) => a + b, 0))
                }))
            };
        },

        createHorizontalChart(svg, width, verticalWidth, height, offsetX) {
            // 水平柱状图配置
            const xScale = d3.scaleLinear()
                .domain([0, d3.max(this.horizontalData, d => d3.sum(d.values))])
                .range([verticalWidth * 2, width]);

            const yScale = d3.scaleBand()
                .domain(this.horizontalData.map(d => d.label))
                .range([height, 0])
                .padding(0.5);

            // 生成堆叠数据
            const stack = d3.stack()
                .keys(d3.range(this.horizontalData[0].values.length));

            const stackedData = stack(this.horizontalData.map(d => d.values));

            // 绘制水平柱状图
            const chartGroup = svg.append('g')
            // .attr('transform', `translate(${offsetX + 20}, 20)`);

            // 存储所有左侧端点
            const leftPoints = [];

            chartGroup.selectAll('.horizontal-bar')
                .data(stackedData)
                .enter().append('g')
                .attr('fill', "transparent")
                .selectAll('rect')
                .data(d => d)
                .enter().append('rect')
                .attr('x', d => xScale(d[0]))
                .attr('y', (d, i) => {


                    const yPos = yScale(this.horizontalData[i].label);
                    if (d[0] == 0) {
                        let segmentLength = yScale.bandwidth() / 4;
                        let startX = xScale(d[0]) + width / 4;

                        // 计算每个分割点的位置
                        for (let i = 4 - 1; i >= 0; i--) {
                            let startY = yPos + i * segmentLength;
                            let endY = startY + segmentLength;

                            // 添加每段的两个端点到leftPoints
                            leftPoints.push({
                                layer: d.data,      // 所属数据层
                                top: {              // 当前段的左上端点
                                    x: startX,
                                    y: startY
                                },
                                bottom: {           // 当前段的左下端点
                                    x: startX,
                                    y: endY

                                }
                            });
                        }

                    }

                    return yPos;
                })
                .attr('width', d => xScale(d[1]) - xScale(d[0]))
                .attr('height', yScale.bandwidth());

            return {
                horizontalPoints: leftPoints, // 返回所有左侧端点
                points: this.horizontalData.map((d, i) => ({
                    x: xScale(d3.sum(d.values)),
                    y: yScale(d.label) + yScale.bandwidth() / 2
                }))
            };
        },

        drawConnectionLines(svg, verticalPoints, horizontalPoints) {
            // 创建曲线生成器
            const lineGenerator = d3.line()
                .curve(d3.curveBasis)
                .x(d => d.x)
                .y(d => d.y);

            verticalPoints.forEach((vPoint, i) => {
                const hPoint = horizontalPoints[i];

                // 生成曲线路径
                const pathData = [
                    vPoint,
                    { x: (vPoint.x + hPoint.x) / 2, y: vPoint.y - 30 },
                    hPoint
                ];

                svg.append('path')
                    .attr('d', lineGenerator(pathData))
                    .attr('stroke', this.colorsHor[i])
                    .attr('fill', 'none')
                    .attr('stroke-width', 2);
            });
        },

        // drawVerticalScale(svg, labelPositions, x, height) {
        //     // 创建刻度组
        //     const scaleGroup = svg.append('g')
        //         .attr('class', 'vertical-scale')
        //         .attr('transform', `translate(${x}, 20)`);

        //     // 绘制主轴线
        //     scaleGroup.append('line')
        //         .attr('x1', 0)
        //         .attr('x2', 0)
        //         .attr('y1', 0)
        //         .attr('y2', height - 40)
        //         .attr('stroke', '#999');

        //     // 添加刻度标签
        //     labelPositions.forEach((pos, i) => {
        //         scaleGroup.append('text')
        //             .attr('x', 10)
        //             .attr('y', pos.y)
        //             .text(this.verticalData[i].label)
        //             .attr('fill', '#666')
        //             .attr('font-size', '12px');
        //     });
        // },

        drawPieCharts(svg, labelPositions, startX, piewidth) {
            // 创建饼图布局
            const pie = d3.pie()
                .value(d => d);

            // 创建弧生成器
            const arc = d3.arc()
                .innerRadius(piewidth / 4)  // 增加内半径创建环形效果
                .outerRadius(piewidth / 2)
                .padAngle(0.1);  // 添加扇形间隔


            let points = []

            this.pieData.forEach((d, i) => {

                const pieGroup = svg.append('g')
                    .attr('transform', `translate(${startX + piewidth / 4}, ${labelPositions[i].y})`);

                points.push({ x: startX - piewidth / 4, y: labelPositions[i].y })

                const arcs = pie(d.values);

                pieGroup.selectAll('.pie-slice')
                    .data(arcs)
                    .enter().append('path')
                    .attr('d', arc)
                    .attr('stroke', (d) => {
                        // 计算当前扇形的中心角（以度为单位）
                        const centralAngle = (d.endAngle - d.startAngle) * 180 / Math.PI;
                        // 如果中心角超过180度，返回红色，否则返回透明
                        return centralAngle > 180 ? 'red' : 'none';
                    })
                    .attr('fill', (d, i) => this.colorPie[i]);
            });

            return points
        },

        handleResize() {
            d3.select(this.$refs.chart).selectAll('*').remove();
            this.initChart();
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