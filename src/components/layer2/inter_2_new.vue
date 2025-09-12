<template>
    <div ref="container" class="overview-container">
        <!-- <div class="title">Review</div> -->
        <div ref="plotContainer" style="width: 100%;height: 90%;"></div>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    data() {
        return {
            params: {
                numValues: 16,
                lineWidth: 11,
                jitter: 0.5,
                height: 320,
                customColors: [
                    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFBD33",
                    "#8C33FF", "#33FFF0", "#FF334B", "#33FF9D", "#FF8F33",
                    "#33B2FF", "#FF33E1", "#FFD333", "#A133FF", "#33FFF7",
                    "#FF3374"
                ]
            }
        };
    },
    mounted() {
        this.plot();
    },
    methods: {
        genValues() {
            return d3.shuffle(d3.range(this.params.numValues));
        },
        timsort(values) {
            // const history = new Map([
            //     [1, [[0, 0], [1, 2], [2, 2], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]]],
            //     [2, [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]]],
            //     [3, [[0, 2], [1, 0], [2, 0], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]]],
            //     [4, [[0, 3], [1, 3], [2, 3], [3, 3], [4, 5], [5, 3], [6, 5], [7, 3]]],
            //     [5, [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4]]],
            //     [6, [[0, 5], [1, 5], [2, 5], [3, 5], [4, 3], [5, 5], [6, 3], [7, 5]]],
            //     [7, [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6]]],
            //     [8, [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7]]],
            //     [9, [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8]]],
            //     [10, [[0, 9], [1, 9], [2, 10], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9]]],
            //     [11, [[0, 10], [1, 10], [2, 9], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10]]],
            //     [12, [[0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11]]],
            //     [13, [[0, 12], [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12]]],
            //     [14, [[0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13]]],
            //     [15, [[0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14]]],
            //     [16, [[0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15]]]
            // ]);

            // //案例2
            // const history = new Map([
            //     [1, [[0, 0], [1, 2], [2, 2], [3, 0], [4, 0], [5, 1], [6, 1], [7, 1], [8, 0], [9, 1]]],
            //     [2, [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 0], [6, 0], [7, 0], [8, 1], [9, 0]]],
            //     [3, [[0, 2], [1, 0], [2, 0], [3, 2], [4, 2], [5, 2], [6, 3], [7, 2], [8, 2], [9, 2]]],
            //     [4, [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 2], [7, 3], [8, 3], [9, 3]]],

            //     [5, [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4]]],
            //     [6, [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5]]],
            //     [7, [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6]]],
            //     [8, [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7]]],

            //     [9, [[0, 8], [1, 8], [2, 8], [3, 9], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8]]],
            //     [10, [[0, 9], [1, 11], [2, 9], [3, 8], [4, 9], [5, 10], [6, 9], [7, 10], [8, 9], [9, 10]]],//异常
            //     [11, [[0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 9], [6, 10], [7, 9], [8, 10], [9, 9]]],//异常
            //     [12, [[0, 11], [1, 9], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11]]],//异常

            //     [13, [[0, 12], [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12]]],
            //     [14, [[0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13]]],
            //     [15, [[0, 14], [1, 15], [2, 14], [3, 15], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14]]],
            //     [16, [[0, 15], [1, 14], [2, 15], [3, 14], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15]]]
            // ]);


            //案例_test
            const history = new Map([
                [1, [[0, 0], [1, 0.5], [2, 0], [3, 0], [4, 0.5], [5, 0], [6, 0.5], [7, 0], [8, 0], [9, 0]]],
                [2, [[0, 1], [1, 1.5], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1.5], [7, 1], [8, 1], [9, 1]]],
                [3, [[0, 2], [1, 2.5], [2, 2], [3, 2], [4, 2.5], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2]]],
                [4, [[0, 3], [1, 3.5], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3]]],
                [5, [[0, 4], [1, 4.5], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4]]],
                [6, [[0, 5], [1, 5.5], [2, 5], [3, 5], [4, 5.5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5]]],
                [7, [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6.5], [6, 6], [7, 6], [8, 6], [9, 6]]],
                [8, [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7.5], [6, 7], [7, 7], [8, 7], [9, 7]]],
                [9, [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8.5], [6, 8], [7, 8], [8, 8], [9, 8]]],
                [10, [[0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9]]],
                [11, [[0, 10], [1, 10], [2, 10], [3, 10.5], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10]]],
                [12, [[0, 11], [1, 11], [2, 11], [3, 11.5], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11]]],
                [13, [[0, 12], [1, 12], [2, 12], [3, 12.5], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12]]],
                [14, [[0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13.5], [8, 13], [9, 13]]],
                [15, [[0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14.5], [8, 14], [9, 14]]],
                [16, [[0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15.5], [8, 15], [9, 15]]]
            ]);

            return { time: 10, history };
        },
        makePlotSettings(values, width, height) {
            const maxTime = 10;
            return {
                maxTime,
                scales: {
                    x: d3.scaleLinear().domain([0, maxTime]).range([0, width]),
                    y: d3.scaleLinear().domain([0, values.length]).range([0, height]),
                    color: d3.interpolateYlGnBu
                }
            };
        },
        makePointsData({ history }, maxTime, params) {
            function makePoints(entries) {
                const res = [entries[0]];
                for (let i = 1; i < entries.length; i++) {
                    const a = entries[i - 1], b = entries[i];
                    res.push([b[0] - params.jitter, a[1]]);
                    res.push([b[0] + params.jitter, b[1]]);
                }
                res.push([maxTime, res[res.length - 1][1]]);
                return res;
            }

            return [...history.entries()].map(([k, v]) => [k, makePoints(v)]);
        },
        swapIndexAandIndexB(data, indexA, indexB) {
            const series = [];
            for (let i = 0; i < data.length; i++) {
                if (i === indexA) {
                    series.push(data[indexB]);
                } else if (i === indexB) {
                    series.push(data[indexA]);
                } else {
                    series.push(data[i]);
                }
            }
            return series;
        },
        drawLines(data, settings, svg, xt, tf, a, b) {
            console.log(this.params.lineWidth);


            const { scales } = settings;
            const lines = svg.append('g')
                .attr('transform', `translate(0,${this.params.lineWidth})`);

            let filteredData = data;
            if (tf === 1) {
                filteredData = data.map(series => [
                    series[0],
                    series[1].filter(point => point[0] >= a && point[0] <= b)
                ]);
            }
            // console.log(filteredData);
            const vm = this;
            drawLineCur(filteredData)

            // lines.selectAll('.line')
            //     .data(filteredData)
            //     .join('g')
            //     .each((d, i, nodes) => {
            //         // const points = d[1].map(([t, y]) => `${scales.x(t + xt)},${scales.y(y)}`).join(' ');

            //         // // d3.select(nodes[i])
            //         // //     // 添加边框
            //         // //     .append('polyline')
            //         // //     .classed('line-border', true)
            //         // //     .attr('points', points)
            //         // //     .attr('stroke', 'black') // 边框颜色
            //         // //     .attr('fill', 'none')
            //         // //     .attr('stroke-width', vm.params.lineWidth + 2) // 边框宽度，比原始线条稍粗
            //         // //     .attr('stroke-linecap', 'round');

            //         // d3.select(nodes[i])
            //         //     .append('polyline')
            //         //     .classed('line-fill', true)
            //         //     .attr('points', points)
            //         //     .attr('stroke', scales.color(d[0] / filteredData.length))
            //         //     .attr('fill', 'none')
            //         //     .attr('stroke-width', vm.params.lineWidth) // 这里修改边框线条粗细，单位为像素
            //         //     .attr('stroke-linecap', 'round')

            //         // 1. 创建曲线生成器
            //         const lineGenerator = d3.line()
            //             .curve(d3.curveBasis) // 指定插值方式，如curveBasis、curveCardinal等[6,7](@ref)
            //             .x(([t, y]) => scales.x(t + xt)) // 定义x坐标
            //             .y(([t, y]) => scales.y(y));     // 定义y坐标

            //         // 2. 生成路径字符串
            //         const pathData = lineGenerator(d[1]);

            //         // 3. 绘制曲线路径
            //         d3.select(nodes[i])
            //             .append('path')
            //             .classed('line-fill', true)
            //             .attr('d', pathData) // 直接绑定生成的路径
            //             .attr('stroke', scales.color(d[0] / filteredData.length))
            //             .attr('fill', 'none')
            //             .attr('stroke-width', vm.params.lineWidth)
            //             .attr('stroke-linecap', 'round');


            //     });


            // 在 each 方法外部保存所需的参数

            // console.log(filteredData);
            // let testarr = [
            //     [1, [[0, 0], [1, 0], [2, 0], [3, 1.3], [3.5, 1.3],]],
            //     [2, [[0, 1], [1, 1], [2, 1], [3, 1], [3.5, 1],]],
            //     [3, [[0, 2], [1, 2], [2, 2], [3, 0.7], [3.5, 0.7],]],

            // ]
            // filteredData = testarr
            // console.log(testarr);
            // drawLineCur(filteredData)

            // testarr = [

            //     [2, [[3.5, 1], [4, 1], [5, 1], [6, 1]]],
            //     [3, [[3.5, 0.7], [4, 0.7], [5, 2], [6, 2]]],
            //     [1, [[3.5, 1.3], [4, 1.3], [5, 0], [6, 0]]],

            // ]
            // filteredData = testarr
            // drawLineCur(filteredData)



            let testarr = [
                [1, [[0, 0], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1]]],
                [2, [[0, 1], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0]]],
                [3, [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2]]],
            ]

            // let testarr = [
            //     [1, [[0, 0], [1, 2], [2, 2], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0]]],
            //     [2, [[0, 1], [1, 0], [2, 0], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1]]],
            //     [3, [[0, 2], [1, 0], [2, 0], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2]]],
            // ]


            // let testarr2 = [

            //     [2, [[0, 1], [1, 0.3], [2, 1.7], [3, 0.3], [4, 1.7], [5, 0.3], [6, 1.7], [7, 0.3], [8, 1.7], [9, 1], [10, 1]]],
            //     [3, [[0, 2], [1, 2], [2, 0.3], [3, 2], [4, 0.3], [5, 2], [6, 0.3], [7, 2], [8, 0.3], [9, 2], [10, 2]]],
            //     [1, [[0, 0], [1, 1.7], [2, 0], [3, 1.7], [4, 0], [5, 1.7], [6, 0], [7, 1.7], [8, 0], [9, 0], [10, 0]]],
            // ]

            // console.log(testarr);
            // drawLineCur(testarr, 0, 2)
            // // drawLineCur(filteredData, 2.5, 12.5)
            // testarr = [
            //     [
            //         1,
            //         [
            //             [0.0, 1.91], [0.5, 1.34], [1.0, 0.68],
            //             [1.5, 0.24], [2.0, 0.27], [2.5, 0.65],
            //             [3.0, 1.08], [3.5, 1.52], [4.0, 1.84],
            //             [4.5, 1.46], [5.0, 1.02], [5.5, 0.58],
            //             [6.0, 0.32], [6.5, 0.71], [7.0, 1.15],
            //             [7.5, 1.59], [8.0, 1.91], [8.5, 1.49],
            //             [9.0, 1.05], [9.5, 0.63], [10.0, 0.34]
            //         ]
            //     ],
            //     [
            //         2,
            //         [
            //             [0.0, 1.12], [0.5, 0.68], [1.0, 0.29],
            //             [1.5, 0.64], [2.0, 1.07], [2.5, 1.51],
            //             [3.0, 1.83], [3.5, 1.41], [4.0, 0.97],
            //             [4.5, 0.53], [5.0, 0.25], [5.5, 0.62],
            //             [6.0, 1.06], [6.5, 1.48], [7.0, 1.82],
            //             [7.5, 1.37], [8.0, 0.93], [8.5, 0.49],
            //             [9.0, 0.31], [9.5, 0.74], [10.0, 1.18]
            //         ]
            //     ],
            //     [
            //         3,
            //         [
            //             [0.0, 0.88], [0.5, 1.45], [1.0, 1.79],
            //             [1.5, 1.22], [2.0, 0.75], [2.5, 0.31],
            //             [3.0, 0.24], [3.5, 0.67], [4.0, 1.13],
            //             [4.5, 1.54], [5.0, 1.85], [5.5, 1.42],
            //             [6.0, 0.94], [6.5, 0.49], [7.0, 0.35],
            //             [7.5, 0.78], [8.0, 1.25], [8.5, 1.66],
            //             [9.0, 1.93], [9.5, 1.57], [10.0, 1.09]
            //         ]
            //     ]
            // ]

            // testarr = [
            //     [1, [[0, 0], [0.5, 1], [1, 1], [1.5, 2], [2, 2], [3, 2], [3.5, 2], [4, 2], [5, 2], [5.5, 1], [6, 1], [7, 1], [7.5, 0], [8, 0], [9, 0], [9.5, 0], [10, 0]]],
            //     [2, [[0, 1], [0.5, 0], [1, 0], [1.5, 0], [2, 0], [3, 0], [3.5, 1], [4, 1], [5, 1], [5.5, 2], [6, 2], [7, 2], [7.5, 2], [8, 2], [9, 2], [9.5, 1], [10, 1]]],
            //     [3, [[0, 2], [0.5, 2], [1, 2], [1.5, 1], [2, 1], [3, 1], [3.5, 0], [4, 0], [5, 0], [5.5, 0], [6, 0], [7, 0], [7.5, 1], [8, 1], [9, 1], [9.5, 2], [10, 2]]],
            // ]


            // //三股辫
            // testarr = [
            //     [1, [[0, 0], [0.5, 1], [1, 1], [1.5, 1.3], [2, 1.3], [3, 1.3], [3.5, 1.3], [4, 1.3], [5, 1.3], [5.5, 1], [6, 1], [7, 1], [7.5, 0.7], [8, 0.7], [9, 0.7], [9.5, 0.7], [10, 0]]],
            //     [2, [[0, 1], [0.5, 0.7], [1, 0.7], [1.5, 0.7], [2, 0.7], [3, 0.7], [3.5, 1], [4, 1], [5, 1], [5.5, 1.3], [6, 1.3], [7, 1.3], [7.5, 1.3], [8, 1.3], [9, 1.3], [9.5, 1], [10, 1]]],
            //     [3, [[0, 2], [0.5, 1.3], [1, 1.3], [1.5, 1], [2, 1], [3, 1], [3.5, 0.7], [4, 0.7], [5, 0.7], [5.5, 0.7], [6, 0.7], [7, 0.7], [7.5, 1], [8, 1], [9, 1], [9.5, 1.3], [10, 2]]],
            // ]

            // drawLineCur(processArrays(testarr, 1, 2), 0, 2)
            // drawLineCur(processArrays(testarr, 3, 2), 2, 4)
            // drawLineCur(processArrays(testarr, 1, 2), 4, 6)
            // drawLineCur(testarr, 6, 8)
            // drawLineCur(processArrays(testarr, 3, 2), 8, 10)

            // //四股边

            // testarr = [
            //     [1, [[0, 0], [0.5, 2], [1, 2], [2, 2], [2.5, 3], [3, 3], [4, 3], [4.5, 1], [5, 1], [6, 1], [6.5, 0], [7, 0]]],
            //     [2, [[0, 1], [0.5, 0], [1, 0], [2, 0], [2.5, 2], [3, 2], [4, 2], [4.5, 3], [5, 3], [6, 3], [6.5, 1], [7, 1]]],
            //     [3, [[0, 2], [0.5, 3], [1, 3], [2, 3], [2.5, 1], [3, 1], [4, 1], [4.5, 0], [5, 0], [6, 0], [6.5, 2], [7, 2]]],
            //     [4, [[0, 3], [0.5, 1], [1, 1], [2, 1], [2.5, 0], [3, 0], [4, 0], [4.5, 2], [5, 2], [6, 2], [6.5, 3], [7, 3]]],
            // ]

            // drawLineCur(reorderStrands(testarr, "3412"), 0, 1.5)
            // drawLineCur(reorderStrands(testarr, "1324"), 1.5, 3)
            // drawLineCur(reorderStrands(testarr, "2143"), 3, 4.5)
            // drawLineCur(reorderStrands(testarr, "2143"), 4.5, 5)
            // drawLineCur(reorderStrands(testarr, "4231"), 5, 7.5)
            // // drawLineCur(reorderStrands(testarr, "2413"), 1, 2)
            // // drawLineCur(reorderStrands(testarr, "2413"), 2, 3)
            // // drawLineCur(reorderStrands(testarr, "3214"), 1.5, 11.5)

            function reorderStrands(strands, order) {
                // 创建编号到元素的映射表（使用 Map 提升查找性能）
                const strandMap = new Map(strands.map(s => [s[0], s]));

                // 将输入顺序字符串转换为数字数组，并按顺序提取对应元素
                return order.split('')                     // 拆分为字符数组 ["3","1","2","4"]
                    .map(Number)                   // 转换为数字数组 [3,1,2,4]
                    .map(num => strandMap.get(num)) // 按顺序获取元素
                    .filter(s => s !== undefined);  // 过滤无效输入（可选）
            }








            function drawLineCur(filteredData, xa, ya) {
                lines.selectAll('.line')
                    .data(filteredData)
                    .join('g')
                    .each((d, i, nodes) => {

                        const clipId = `clip-x-range-${xa * 10}-${ya * 10}`; // 唯一标识符



                        // 1. 创建曲线生成器
                        const lineGenerator = d3.line()
                            .curve(d3.curveBasis) // 指定插值方式，如curveBasis、curveCardinal等[6,7](@ref)
                            .x(([t, y]) => scales.x(t + xt)) // 定义x坐标
                            .y(([t, y]) => scales.y(y));     // 定义y坐标

                        // 2. 生成路径字符串
                        const pathData = lineGenerator(d[1]);

                        const svg = d3.select("svg");
                        if (!svg.select(`#${clipId}`).node()) {
                            svg.append("defs")
                                .append("clipPath")
                                .attr("id", clipId)
                                .append("rect")
                                .attr("x", scales.x(xa))
                                .attr("y", -100)
                                .attr("width", scales.x(ya) - scales.x(xa))
                                .attr("height", svg.attr("height"))
                                .attr("stroke", "none")      // 明确禁止边框
                                .attr("fill", "transparent");// 避免任何填充颜色干扰
                            ;
                        }



                        // 3. 绘制曲线路径
                        const path = d3.select(nodes[i])
                            .append('path')
                            .classed('line-fill', true)
                            .attr('d', pathData) // 直接绑定生成的路径
                            .attr('stroke', scales.color(d[0] / filteredData.length))
                            .attr('fill', 'none')
                            .attr('stroke-width', 6)
                            .attr('stroke-linecap', 'round')
                        // .attr('clip-path', `url(#${clipId})`); // 应用裁剪路径


                    });

            }

            function drawStLine(filteredData) {
                lines.selectAll('.line')
                    .data(filteredData)
                    .join('g')
                    .each((d, i, nodes) => {
                        const points = d[1].map(([t, y]) => `${scales.x(t + xt)},${scales.y(y)}`).join(' ');

                        // d3.select(nodes[i])
                        //     // 添加边框
                        //     .append('polyline')
                        //     .classed('line-border', true)
                        //     .attr('points', points)
                        //     .attr('stroke', 'black') // 边框颜色
                        //     .attr('fill', 'none')
                        //     .attr('stroke-width', vm.params.lineWidth + 2) // 边框宽度，比原始线条稍粗
                        //     .attr('stroke-linecap', 'round');

                        d3.select(nodes[i])
                            .append('polyline')
                            .classed('line-fill', true)
                            .attr('points', points)
                            .attr('stroke', scales.color(d[0] / filteredData.length))
                            .attr('fill', 'none')
                            .attr('stroke-width', vm.params.lineWidth) // 这里修改边框线条粗细，单位为像素
                            .attr('stroke-linecap', 'round')

                        // // 1. 创建曲线生成器
                        // const lineGenerator = d3.line()
                        //     .curve(d3.curveBasis) // 指定插值方式，如curveBasis、curveCardinal等[6,7](@ref)
                        //     .x(([t, y]) => scales.x(t + xt)) // 定义x坐标
                        //     .y(([t, y]) => scales.y(y));     // 定义y坐标

                        // // 2. 生成路径字符串
                        // const pathData = lineGenerator(d[1]);

                        // // 3. 绘制曲线路径
                        // d3.select(nodes[i])
                        //     .append('path')
                        //     .classed('line-fill', true)
                        //     .attr('d', pathData) // 直接绑定生成的路径
                        //     .attr('stroke', scales.color(d[0] / filteredData.length))
                        //     .attr('fill', 'none')
                        //     .attr('stroke-width', vm.params.lineWidth)
                        //     .attr('stroke-linecap', 'round');


                    });
            }

            function processArrays(sourceArr, swapIdx1, swapIdx2) {
                let index1, index2
                for (let i = 0; i < sourceArr.length; i++) {
                    if (sourceArr[i][0] == swapIdx1) {
                        index1 = i
                    }
                    if (sourceArr[i][0] == swapIdx2) {
                        index2 = i
                    }
                }

                // 深拷贝原始数组避免污染
                const clonedArr = JSON.parse(JSON.stringify(sourceArr));

                // 步骤2：数组位置交换（直接操作克隆后的数组）
                if (index1 < clonedArr.length && index2 < clonedArr.length) {
                    [clonedArr[index1], clonedArr[index2]] =
                        [clonedArr[index2], clonedArr[index1]];
                }

                return clonedArr;
            }


        },
        drawRect(data, settings, svg, xt, tf, a, b) {
            console.log(this.params.lineWidth);


            const { scales } = settings;
            const lines = svg.append('g')
                .attr('transform', `translate(0,${this.params.lineWidth})`);

            let filteredData = data;
            if (tf === 1) {
                filteredData = data.map(series => [
                    series[0],
                    series[1].filter(point => point[0] >= a && point[0] <= b)
                ]);
            }
            // console.log(filteredData);
            const vm = this;
            drawLineCur(filteredData)



            function drawLineCur(filteredData, xa, ya) {
                lines.selectAll('.line')
                    .data(filteredData)
                    .join('g')
                    .each((d, i, nodes) => {

                        const clipId = `clip-x-range-${xa * 10}-${ya * 10}`; // 唯一标识符



                        // 1. 创建曲线生成器
                        const lineGenerator = d3.line()
                            .curve(d3.curveBasis) // 指定插值方式，如curveBasis、curveCardinal等[6,7](@ref)
                            .x(([t, y]) => scales.x(t + xt)) // 定义x坐标
                            .y(([t, y]) => scales.y(y));     // 定义y坐标

                        // 2. 生成路径字符串
                        const pathData = lineGenerator(d[1]);

                        const svg = d3.select("svg");
                        if (!svg.select(`#${clipId}`).node()) {
                            svg.append("defs")
                                .append("clipPath")
                                .attr("id", clipId)
                                .append("rect")
                                .attr("x", scales.x(xa))
                                .attr("y", -100)
                                .attr("width", scales.x(ya) - scales.x(xa))
                                .attr("height", svg.attr("height"))
                                .attr("stroke", "none")      // 明确禁止边框
                                .attr("fill", "transparent");// 避免任何填充颜色干扰
                            ;
                        }



                        // 3. 绘制曲线路径
                        const path = d3.select(nodes[i])
                            .append('path')
                            .classed('line-fill', true)
                            .attr('d', pathData) // 直接绑定生成的路径
                            .attr('stroke', scales.color(d[0] / filteredData.length))
                            .attr('fill', 'none')
                            .attr('stroke-width', 6)
                            .attr('stroke-linecap', 'round')
                        // .attr('clip-path', `url(#${clipId})`); // 应用裁剪路径


                    });

            }


        },
        plot() {
            const container = this.$refs.plotContainer;
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            this.params.height = height
            this.params.lineWidth = height / 32;

            const values = this.genValues();
            const result = this.timsort(values);
            const settings = this.makePlotSettings(values, width, height);
            const data = this.makePointsData(result, settings.maxTime, this.params);

            const svg = d3.select(container)
                .append('svg')
                .attr('width', '100%')
                .attr('height', this.params.height);

            // this.drawLines(data, settings, svg, 0, 1, 0, 1.5);
            // let test = this.swapIndexAandIndexB(data, 0, 2);
            // this.drawLines(test, settings, svg, 0, 1, 1.5, 2.5);
            // let test_1 = this.swapIndexAandIndexB(test, 10, 9);
            // this.drawLines(test_1, settings, svg, 0, 1, 2.5, 4.5);
            // let test2 = this.swapIndexAandIndexB(data, 3, 5);
            // this.drawLines(test2, settings, svg, 0, 1, 4.5, 5.5);
            // let test3 = this.swapIndexAandIndexB(test2, 3, 5);
            // this.drawLines(test3, settings, svg, 0, 1, 5.5, 6.5);
            // let test4 = this.swapIndexAandIndexB(test3, 3, 5);
            // this.drawLines(test4, settings, svg, 0, 1, 6.5, 10);



            //案例2

            // this.drawLines(data, settings, svg, 0, 1, 0, 1.5);
            // let test = this.swapIndexAandIndexB(data, 0, 2);
            // test = this.swapIndexAandIndexB(test, 9, 11);
            // this.drawLines(test, settings, svg, 0, 1, 1.5, 4.5);
            // let test1 = this.swapIndexAandIndexB(test, 0, 2);
            // test1 = this.swapIndexAandIndexB(test1, 9, 11);
            // // let test_1 = this.swapIndexAandIndexB(test, 10, 9);
            // // this.drawLines(test_1, settings, svg, 0, 1, 2.5, 4.5);
            // let test2 = this.swapIndexAandIndexB(test1, 3, 5);
            // this.drawLines(test2, settings, svg, 0, 1, 4.5, 5.5);
            // let test3 = this.swapIndexAandIndexB(test2, 3, 5);
            // test3 = this.swapIndexAandIndexB(test3, 9, 10);
            // this.drawLines(test3, settings, svg, 0, 1, 5.5, 6.5);
            // let test4 = this.swapIndexAandIndexB(test3, 3, 5);
            // test4 = this.swapIndexAandIndexB(test4, 9, 10);
            // console.log(data);

            // this.drawLines(test4, settings, svg, 0, 1, 6.5, 7.5);
            // let test5 = this.swapIndexAandIndexB(test4, 9, 10);
            // this.drawLines(test5, settings, svg, 0, 1, 7.5, 8.5);
            // let test6 = this.swapIndexAandIndexB(test5, 9, 10);
            // this.drawLines(test6, settings, svg, 0, 1, 8.5, 10);

            // // 使用示例
            // let timeline = [
            //     { startX: 0, endX: 1, startY: 0, endY: 1.5, swaps: [] },
            //     { startX: 0, endX: 1, startY: 1.5, endY: 2.5, swaps: [{ indexA: 0, indexB: 2 }, { indexA: 9, indexB: 11 }, { indexA: 14, indexB: 15 }] },
            //     { startX: 0, endX: 1, startY: 2.5, endY: 3.5, swaps: [{ indexA: 14, indexB: 15 }] },
            //     { startX: 0, endX: 1, startY: 3.5, endY: 4.5, swaps: [{ indexA: 0, indexB: 2 }, { indexA: 9, indexB: 11 }, { indexA: 9, indexB: 8 }, { indexA: 14, indexB: 15 }] },
            //     { startX: 0, endX: 1, startY: 4.5, endY: 5.5, swaps: [{ indexA: 9, indexB: 8 }] },
            //     { startX: 0, endX: 1, startY: 5.5, endY: 6.5, swaps: [{ indexA: 9, indexB: 10 }] },
            //     { startX: 0, endX: 1, startY: 6.5, endY: 7.5, swaps: [{ indexA: 9, indexB: 10 }] },
            //     { startX: 0, endX: 1, startY: 7.5, endY: 8.5, swaps: [{ indexA: 9, indexB: 10 }] },
            //     { startX: 0, endX: 1, startY: 8.5, endY: 10, swaps: [{ indexA: 9, indexB: 10 }] }
            // ];



            // 使用示例
            let timeline = [
                { startX: 0, endX: 1, startY: 0, endY: 10, swaps: [] },
                // { startX: 0, endX: 1, startY: 3.5, endY: 12.5, swaps: [{ indexA: 0, indexB: 2 }, { indexA: 9, indexB: 11 }, { indexA: 14, indexB: 15 }] },
                // { startX: 0, endX: 1, startY: 2.5, endY: 3.5, swaps: [{ indexA: 14, indexB: 15 }] },
                // { startX: 0, endX: 1, startY: 3.5, endY: 4.5, swaps: [{ indexA: 0, indexB: 2 }, { indexA: 9, indexB: 11 }, { indexA: 9, indexB: 8 }, { indexA: 14, indexB: 15 }] },
                // { startX: 0, endX: 1, startY: 4.5, endY: 5.5, swaps: [{ indexA: 9, indexB: 8 }] },
                // { startX: 0, endX: 1, startY: 5.5, endY: 6.5, swaps: [{ indexA: 9, indexB: 10 }] },
                // { startX: 0, endX: 1, startY: 6.5, endY: 7.5, swaps: [{ indexA: 9, indexB: 10 }] },
                // { startX: 0, endX: 1, startY: 7.5, endY: 8.5, swaps: [{ indexA: 9, indexB: 10 }] },
                // { startX: 0, endX: 1, startY: 8.5, endY: 10, swaps: [{ indexA: 9, indexB: 10 }] }
            ];
            // 初始绘制
            this.drawLines(data, settings, svg, timeline[0].startX, timeline[0].endX, timeline[0].startY, timeline[0].endY);

            let currentData = data;
            // 按时间线顺序处理数据并绘制
            for (let i = 1; i < timeline.length; i++) {
                // console.log(123123);


                // 执行交换操作
                for (let swap of timeline[i].swaps) {
                    currentData = this.swapIndexAandIndexB(currentData, swap.indexA, swap.indexB);
                }
                // 绘制线条
                this.drawLines(currentData, settings, svg, timeline[i].startX, timeline[i].endX, timeline[i].startY, timeline[i].endY);
            }

            // svg.on('click', () => {
            //     d3.select(container).html('');
            //     this.plot();
            // });
        }
    }
};
</script>

<style scoped>
.line-border {
    stroke: hsl(0, 0, 10%);
    stroke-width: 12.5px;
    stroke-linecap: round;
    stroke-linejoin: round;
}

/* .line-fill {
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 13px;
} */

svg {
    background: #f8f9fa;
    margin: 20px;
}

h2,
h3 {
    margin: 20px;
}

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