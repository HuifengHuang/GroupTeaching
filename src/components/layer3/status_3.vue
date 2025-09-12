<template>
    <div ref="container" class="radar-chart-container">
        <!-- <div class="title">Status</div> -->
        <svg ref="svg" style=""></svg>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    props: {

    },
    data() {
        return {
            // data: [
            //     [
            //         // Person
            //         { axis: "Part", value: 85 },
            //         { axis: "Co", value: 70 },
            //         { axis: "Rel", value: 90 },
            //         { axis: "Res", value: 65 },
            //         { axis: "Kn", value: 80 },
            //     ],
            //     [
            //         // group
            //         { axis: "Part", value: 62 },
            //         { axis: "Co", value: 65 },
            //         { axis: "Rel", value: 61 },
            //         { axis: "Res", value: 68 },
            //         { axis: "Kn", value: 75 },
            //     ],

            // ],

            // //案例2_2
            // data: [
            //     [
            //         // Person
            //         { axis: "Part", value: 65 },
            //         { axis: "Co", value: 40 },
            //         { axis: "Rel", value: 72 },
            //         { axis: "Res", value: 63 },
            //         { axis: "Kn", value: 85 },
            //     ],
            //     [
            //         // group
            //         { axis: "Part", value: 54 },
            //         { axis: "Co", value: 77 },
            //         { axis: "Rel", value: 43 },
            //         { axis: "Res", value: 54 },
            //         { axis: "Kn", value: 67 },
            //     ],

            // ],

            //案例1_1
            data: [
                [
                    // Person
                    { axis: "Part", value: 55 },
                    { axis: "Co", value: 50 },
                    { axis: "Rel", value: 55 },
                    { axis: "Res", value: 58 },
                    { axis: "Kn", value: 60 },
                ],
                [
                    // group
                    { axis: "Part", value: 55 },
                    { axis: "Co", value: 57 },
                    { axis: "Rel", value: 53 },
                    { axis: "Res", value: 52 },
                    { axis: "Kn", value: 57 },
                ],

            ],

            //案例1_2


            data: [

                [
                    // Person
                    { axis: "Part", value: 45 },
                    { axis: "Co", value: 50 },
                    { axis: "Rel", value: 44 },
                    { axis: "Res", value: 46 },
                    { axis: "Kn", value: 49 },
                ],
                [
                    // group
                    { axis: "Part", value: 15 },
                    { axis: "Co", value: 30 },
                    { axis: "Rel", value: 25 },
                    { axis: "Res", value: 58 },
                    { axis: "Kn", value: 21 },
                ],

            ],
            options: {
                maxValue: 100,  // 匹配数据中的最大值
                levels: 5,      // 增加层级显示细节
                color: ['#EDC951', '#CC333F', '#00A0B0']
            },
            svgRef: null,
            container: null,
            cfg: {
                w: 600,
                h: 600,
                margin: { top: 40, right: 20, bottom: 20, left: 20 },
                levels: 3,
                maxValue: 0,
                labelFactor: 1.25,
                wrapWidth: 60,
                opacityArea: 0.35,
                dotRadius: 2,
                opacityCircles: 0.1,
                strokeWidth: 2,
                roundStrokes: true,
                color: ['#EDC951', '#4cc4d5', '#00A0B0']
            }
        };
    },
    computed: {
        total() {
            return this.data[0].length;
        },
        maxValue() {
            return Math.max(
                this.cfg.maxValue,
                ...this.data.map(group =>
                    Math.max(...group.map(item => item.value))
                )
            );
        },
        radius() {
            return Math.min(this.cfg.w / 2, this.cfg.h / 2);
        },
        angleSlice() {
            return (Math.PI * 2) / this.total;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.updateChartSize();
            window.addEventListener('resize', this.updateChartSize);
            this.drawChart();
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateChartSize);
    },
    watch: {
        data() {
            this.drawChart();
        },
        options() {
            this.drawChart();
        }
    },
    methods: {
        updateChartSize() {
            const containerRect = this.$refs.container.getBoundingClientRect();
            this.cfg.w = containerRect.width - this.cfg.margin.left - this.cfg.margin.right;
            this.cfg.h = containerRect.height - this.cfg.margin.top - this.cfg.margin.bottom;
        },
        drawChart() {
            this.updateChartSize();
            const svg = d3.select(this.$refs.svg);
            svg.selectAll('*').remove();
            svg.attr('width', this.cfg.w + this.cfg.margin.left + this.cfg.margin.right)
                .attr('height', this.cfg.h + this.cfg.margin.top + this.cfg.margin.bottom);

            const g = svg.append('g')
                .attr('transform', `translate(${this.cfg.w / 2 + this.cfg.margin.left}, ${this.cfg.h / 2 + this.cfg.margin.top})`);

            this.drawGrid(g);
            this.drawAxes(g);
            this.drawBlobs(g);
            this.drawTooltips(g);
        },

        drawGrid(g) {
            g.selectAll('.gridCircle')
                .data(d3.range(1, this.cfg.levels + 1).reverse())
                .enter()
                .append('circle')
                .attr('class', 'gridCircle')
                .attr('r', d => (this.radius / this.cfg.levels) * d)
                .style('fill', '#CDCDCD')
                .style('stroke', '#CDCDCD')
                .style('stroke-width', 5)
                .style('fill-opacity', this.cfg.opacityCircles);

            g.selectAll('.axisLabel')
                .data(d3.range(1, this.cfg.levels + 1).reverse())
                .enter()
                .append('text')
                .attr('class', 'axisLabel')
                .attr('x', 4)
                .attr('y', d => (-d * this.radius) / this.cfg.levels)
                .attr('dy', '0.4em')
                .style('font-size', '10px')
                .attr('fill', '#737373')
                .text(d => `${(this.maxValue * d / this.cfg.levels).toFixed(1)}`);
        },

        drawAxes(g) {
            const allAxis = this.data[0].map(item => item.axis);

            g.selectAll('.axis')
                .data(allAxis)
                .enter()
                .append('g')
                .attr('class', 'axis')
                .append('line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', (d, i) => this.radius * 1.1 * Math.cos(this.angleSlice * i - Math.PI / 2))
                .attr('y2', (d, i) => this.radius * 1.1 * Math.sin(this.angleSlice * i - Math.PI / 2))
                .style('stroke', 'white')
                .style('stroke-width', '2px');

            g.selectAll('.legend')
                .data(allAxis)
                .enter()
                .append('text')
                .attr('class', 'legend')
                .style('font-size', '11px')
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .attr('x', (d, i) => this.radius * this.cfg.labelFactor * Math.cos(this.angleSlice * i - Math.PI / 2))
                .attr('y', (d, i) => this.radius * this.cfg.labelFactor * Math.sin(this.angleSlice * i - Math.PI / 2))
                .text(d => d)
                .call(this.wrap, this.cfg.wrapWidth);
        },

        drawBlobs(g) {
            const radarLine = d3.lineRadial()
                .curve(this.cfg.roundStrokes ? d3.curveCardinalClosed : d3.curveBasisClosed)
                .radius(d => (this.radius / this.maxValue) * d.value)
                // 使用数据项的索引而非全局索引
                .angle((d, i) => this.angleSlice * i);

            g.selectAll('.radarWrapper')
                .data(this.data)
                .enter()
                .append('g')
                .attr('class', 'radarWrapper')
                .append('path')
                .attr('class', 'radarArea')
                .attr('d', d => radarLine(d))
                .style('fill', (d, i) => this.cfg.color[i])
                .style('fill-opacity', this.cfg.opacityArea)
                .on('mouseover', (event, d, i) => this.handleMouseOver(event, i))
                .on('mouseout', () => this.handleMouseOut());

            g.selectAll('.radarStroke')
                .data(this.data)
                .enter()
                .append('path')
                .attr('class', 'radarStroke')
                .attr('d', d => radarLine(d))
                .style('stroke-width', this.cfg.strokeWidth)
                .style('stroke', (d, i) => this.cfg.color[i])
                .style('fill', 'none');

            g.selectAll('.radarCircle')
                .data(this.data.flat())
                .enter()
                .append('circle')
                .attr('class', 'radarCircle')
                .attr('r', this.cfg.dotRadius)
                .attr('cx', (d, i) => {
                    const groupIndex = Math.floor(i / this.total);
                    const itemIndex = i % this.total;
                    return (this.radius / this.maxValue) * d.value * Math.cos(this.angleSlice * itemIndex - Math.PI / 2);
                })
                .attr('cy', (d, i) => {
                    const groupIndex = Math.floor(i / this.total);
                    const itemIndex = i % this.total;
                    return (this.radius / this.maxValue) * d.value * Math.sin(this.angleSlice * itemIndex - Math.PI / 2);
                })
                .style('fill', '#737373')
                .style('fill-opacity', 0.8);
        },

        drawTooltips(g) {
            const tooltip = g.append('text')
                .attr('class', 'tooltip')
                .style('opacity', 0);

            g.selectAll('.radarInvisibleCircle')
                .data(this.data.flat())
                .enter()
                .append('circle')
                .attr('class', 'radarInvisibleCircle')
                .attr('r', this.cfg.dotRadius * 1.5)
                .attr('cx', (d, i) => {
                    const groupIndex = Math.floor(i / this.total);
                    const itemIndex = i % this.total;
                    return (this.radius / this.maxValue) * d.value * Math.cos(this.angleSlice * itemIndex - Math.PI / 2);
                })
                .attr('cy', (d, i) => {
                    const groupIndex = Math.floor(i / this.total);
                    const itemIndex = i % this.total;
                    return (this.radius / this.maxValue) * d.value * Math.sin(this.angleSlice * itemIndex - Math.PI / 2);
                })
                .style('fill', 'none')
                .style('pointer-events', 'all')
                .on('mouseover', (event, d) => {
                    const newX = parseFloat(d3.select(event.target).attr('cx')) - 10;
                    const newY = parseFloat(d3.select(event.target).attr('cy')) - 10;

                    tooltip
                        .attr('x', newX)
                        .attr('y', newY)
                        .text(`${(d.value * 100).toFixed(1)}%`)
                        .transition()
                        .duration(200)
                        .style('opacity', 1);
                })
                .on('mouseout', () => {
                    tooltip
                        .transition()
                        .duration(200)
                        .style('opacity', 0);
                });
        },

        wrap(text, width) {
            text.each(function () {
                // 使用解构赋值简化变量声明
                const [self, words, y, x, dy] = [
                    d3.select(this),
                    this.textContent.split(/\s+/).reverse(),
                    +this.getAttribute('y'),
                    +this.getAttribute('x'),
                    parseFloat(this.getAttribute('dy'))
                ];

                let line = [],
                    lineNumber = 0,
                    lineHeight = 1.4,
                    tspan = self
                        .text(null)
                        .append('tspan')
                        .attr('x', x)
                        .attr('y', y)
                        .attr('dy', `${dy}em`);

                while (true) {
                    const word = words.pop();
                    if (!word) break;

                    line.push(word);
                    tspan.text(line.join(' '));

                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(' '));
                        line = [word];
                        tspan = self
                            .append('tspan')
                            .attr('x', x)
                            .attr('y', y)
                            .attr('dy', `${++lineNumber * lineHeight + dy}em`)
                            .text(word);
                    }
                }
            });
        },

        handleMouseOver(event, index) {
            d3.selectAll('.radarArea')
                .transition()
                .duration(200)
                .style('fill-opacity', 0.1);

            d3.select(event.target)
                .transition()
                .duration(200)
                .style('fill-opacity', 0.7);
        },

        handleMouseOut() {
            d3.selectAll('.radarArea')
                .transition()
                .duration(200)
                .style('fill-opacity', this.cfg.opacityArea);
        }
    }
};
</script>

<style scoped>
.radar-chart-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
}

.tooltip {
    font-size: 12px;
    fill: #333;
    pointer-events: none;
}

.radarArea:hover {
    cursor: pointer;
}

.title {
    color: #4cc4d5;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    width: 10%;

}
</style>