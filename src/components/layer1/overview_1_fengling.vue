<template>
  <div ref="container2" class="overview-container">
    <div class="title">Overview</div>
    <div style="height: 25%">
      <timeline />
    </div>
    <div style="height: 75%"><svg ref="chart"></svg></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import timeline from "./timeline.vue";
import { mapState } from "vuex";

export default {
  name: "Overview1",
  components: {
    timeline,
  },
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

      // colorsHor: ['#6495ED', '#7FFFD4', '#FFD700', '#FFB6C1', '#E6F598'],  // 紫色到绿色的渐变
      // colors: ['#2A4C7D', '#3B6AA0', '#4C8AC3', '#5DA9E6', '#6EC8FF'],    // 蓝色系渐变
      // colorPie: ['#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFF9C4', '#FFCCBC'],   // 柔和马卡龙色

      // 案例2_1 讨论开始，都正常
      // horizontalData: [
      //     //总结，反对，支持，提问
      //     { label: 'A', values: [0, 4, 9, 7] },
      //     { label: 'B', values: [3, 1, 15, 11] },
      //     { label: 'C', values: [1, 1, 9, 9] },
      //     { label: 'D', values: [1, 5, 9, 5] },
      //     { label: 'E', values: [0, 2, 8, 5] }
      // ],
      // verticalData: [
      //     { label: 'X', values: [20, 30, 20, 25, 15] }
      // ],
      // pieData: [
      //     { label: 'A', values: [85, 50, 52, 58] },
      //     { label: 'B', values: [82, 58, 60, 60] },
      //     { label: 'C', values: [54, 86, 57, 53] },
      //     { label: 'D', values: [51, 49, 82, 48] },
      //     { label: 'E', values: [47, 56, 48, 49] }
      // ],
      // // pieData: [
      // //     { label: 'A', values: [75, 15, 60, 45] },
      // //     { label: 'B', values: [20, 80, 40, 90] },
      // //     { label: 'C', values: [50, 35, 85, 35] },
      // //     { label: 'D', values: [30, 20, 90, 60] },
      // //     { label: 'E', values: [15, 85, 65, 25] }
      // // ],

      // colorsHor: ['#6495ED', '#7FFFD4', '#FFD700', '#FFB6C1', '#E6F598'],  // 紫色到绿色的渐变
      // colors: ['#88BCEC', '#63A2DB', '#6DACE6', '#4C8AC3', '#4C8AC3'],    // 蓝色系渐变
      // colorPie: ['#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFF9C4', '#FFCCBC'],   // 柔和马卡龙色

      // // 案例2-2，小组2讨论异常
      // horizontalData: [
      //     //总结，反对，支持，提问
      //     { label: 'A', values: [30, 15, 60, 15] },
      //     { label: 'B', values: [35, 20, 70, 10] },
      //     { label: 'C', values: [25, 10, 55, 30] },
      //     { label: 'D', values: [1, 15, 4, 15] },//异常
      //     { label: 'E', values: [10, 10, 80, 10] }
      // ],
      // verticalData: [
      //     { label: 'X', values: [23, 26, 23, 7, 21] }
      // ],
      // pieData: [
      //     { label: 'A', values: [75, 52, 42, 58] },
      //     { label: 'B', values: [82, 40, 60, 50] },
      //     { label: 'C', values: [86, 54, 80, 53] },
      //     { label: 'D', values: [51, 49, 12, 18] },//异常
      //     { label: 'E', values: [47, 58, 32, 49] }
      // ],

      // colorsHor: ['#6495ED', '#7FFFD4', '#FFD700', '#FFB6C1', '#E6F598'],  // 紫色到绿色的渐变
      // colors: ['#479DEC', '#5AA9F2', '#4C8AC3', '#ACD7FF', '#6DACE6'],    // 蓝色系渐变
      // colorPie: ['#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFF9C4', '#FFCCBC'],   // 柔和马卡龙色

      // 案例2-3， 全组干预
      // horizontalData: [
      //     //总结，反对，支持，提问
      //     { label: 'A', values: [105, 60, 105, 60] },
      //     { label: 'B', values: [20, 20, 10, 10] },//小组异常
      //     { label: 'C', values: [100, 10, 60, 30] },
      //     { label: 'D', values: [60, 25, 70, 15] },
      //     { label: 'E', values: [50, 50, 80, 60] }
      // ],
      // verticalData: [
      //     { label: 'X', values: [33, 6, 20, 17, 24] }//100
      // ],
      // pieData: [
      //     { label: 'A', values: [20, 75, 10, 25] },//组内异常
      //     { label: 'B', values: [62, 40, 80, 50] },
      //     { label: 'C', values: [80, 50, 86, 57] },
      //     { label: 'D', values: [51, 49, 12, 18] },
      //     { label: 'E', values: [42, 60, 30, 51] }
      // ],

      // colorsHor: ['#6495ED', '#7FFFD4', '#FFD700', '#FFB6C1', '#E6F598'],  // 紫色到绿色的渐变
      // colors: ['#479DEC', '#E3EBF2', '#4C8AC3', '#ACD7FF', '#6DACE6'],    // 蓝色系渐变
      // colorPie: ['#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFF9C4', '#FFCCBC'],   // 柔和马卡龙色

      // // 案例1_1 讨论开始，都正常,1,3贴近主题,5偏离
      // horizontalData: [
      //     //总结，反对，支持，提问
      //     { label: 'A', values: [0, 14, 9, 17] },
      //     { label: 'B', values: [3, 1, 10, 6] },
      //     { label: 'C', values: [10, 1, 19, 10] },
      //     { label: 'D', values: [1, 5, 14, 5] },
      //     { label: 'E', values: [2, 0, 8, 5] }
      // ],
      // verticalData: [
      //     { label: 'X', values: [40, 20, 40, 25, 15] }
      // ],
      // pieData: [
      //     { label: 'A', values: [50, 85, 52, 58] },
      //     { label: 'B', values: [82, 60, 60, 40] },
      //     { label: 'C', values: [54, 56, 57, 53] },
      //     { label: 'D', values: [51, 49, 22, 48] },
      //     { label: 'E', values: [47, 36, 48, 49] }
      // ],
      // // pieData: [
      // //     { label: 'A', values: [75, 15, 60, 45] },
      // //     { label: 'B', values: [20, 80, 40, 90] },
      // //     { label: 'C', values: [50, 35, 85, 35] },
      // //     { label: 'D', values: [30, 20, 90, 60] },
      // //     { label: 'E', values: [15, 85, 65, 25] }
      // // ],

      // colorsHor: ['#6495ED', '#7FFFD4', '#FFD700', '#FFB6C1', '#E6F598'],  // 紫色到绿色的渐变
      // colors: ['#E3EBF2', '#ACD7FF', '#4C8AC3', '#6DACE6', '#4C8AC3'],    // 蓝色系渐变
      // colorPie: ['#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFF9C4', '#FFCCBC'],   // 柔和马卡龙色

      // 案例1_2 讨论中期，4偏离,2不均,3变坏,5好一点
      horizontalData: [
        //5-1
        //总结，反对，支持，提问
        { label: "A", values: [15, 3, 2, 0] },
        { label: "B", values: [3, 10, 1, 7] },
        { label: "C", values: [1, 10, 10, 0] },
        { label: "D", values: [3, 10, 1, 16] },
        { label: "E", values: [5, 5, 9, 16] },
        // { label: 'w', values: [5, 5, 9, 16] },
      ], //讨论互动模式

      verticalData: [
        { label: "X", values: [20, 25, 30, 30, 35] }, //5-1
      ], //讨论时间

      groupTheme: [10, 2, 9, 3, 6],

      // pieData: [
      //     //5-1
      //     { label: "A", values: [50, 85, 52, 58] },
      //     { label: "B", values: [51, 49, 22, 48] },
      //     { label: "C", values: [54, 56, 57, 53] },
      //     { label: "D", values: [102, 20, 60, 20] },
      //     { label: "E", values: [47, 36, 48, 49] }
      // ], //每个人的讨论时间

      memberData: [
        //5-1
        { label: "A", values: [50, 80, 52, 29, 29] },
        { label: "B", values: [50, 80, 52, 58] },
        { label: "C", values: [50, 80, 52, 58] },
        { label: "D", values: [50, 80, 52, 58] },
        { label: "E", values: [50, 80, 110] },
      ], //每个人的讨论时间
      colorMember: ["#4e757e", "#578e9b", "#5da7ba", "#62bed9", "#b2dfeb"],
      colorDis: ["#557174", "#9dad7f", "#5b8c5a", "#c7cfb7"],

      // pieData: [
      //     { label: 'A', values: [75, 15, 60, 45] },
      //     { label: 'B', values: [20, 80, 40, 90] },
      //     { label: 'C', values: [50, 35, 85, 35] },
      //     { label: 'D', values: [30, 20, 90, 60] },
      //     { label: 'E', values: [15, 85, 65, 25] }
      // ],

      colorsHor: ["#f1ddbf", "#525e75", "#78938a", "#92ba92"], // 互动模式
      colors: ["#6DACE6", "#B8DDFF", "#4C8AC3", "#B8DDFF", "#4C8AC3"], // 讨论主题5-1
      // colorPie: ["#E1BEE7", "#BBDEFB", "#C8E6C9", "#FFF9C4", "#FFCCBC"] // 柔和马卡龙色
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    initChart() {
      const container = this.$refs.container2;
      // 清空容器内的所有子元素（每次绘制前调用）
      d3.select(this.$refs.chart).selectAll("*").remove();

      // 或更精确地只删除 SVG 元素（推荐）
      // d3.select(this.$refs.chart).select("svg").remove();
      const width = container.clientWidth;
      const height = container.clientHeight * 0.85;

      // 创建基础SVG
      const svg = d3
        .select(this.$refs.chart)
        .attr("width", width)
        .attr("height", height);

      // 分区比例
      const headHeight = height * 0.1;
      const bodyHeight = height * 0.7;
      const tailHeight = height * 0.9;
      const rectWidth = width * 0.1;

      const heightZhexian = height * 0.2;

      // 绘制头部圆球
      const headChart = this.createVerticalCircleChart(svg, width, headHeight);

      // // // 绘制
      const horizontalChart = this.createHorizontalChart(
        svg,
        width,
        headHeight,
        bodyHeight
      );

      // this.drawRectanglesBasedOnData(svg, horizontalWidth + verticalWidth, rectWidth, height)
    },
    drawLine(svg, start, end) {
      // 添加直线
      svg
        .append("line")
        .attr("x1", start.x)
        .attr("y1", start.y)
        .attr("x2", end.x)
        .attr("y2", end.y)
        .attr("stroke", this.colorsHor[3])
        .attr("stroke-width", 2);
    },
    drawIner(svg2, topLeft, topRight, bottomRight, bottomLeft, color) {
      topLeft.x -= 5;
      bottomLeft.x -= 5;
      const topCurve = this.drawCurveBetweenPoints(svg2, topLeft, topRight, {
        color: "transparent",
      }).attr("d");
      const bottomCurve = this.drawCurveBetweenPoints(
        svg2,
        bottomRight,
        bottomLeft,
        { color: "transparent" }
      ).attr("d");
      // 生成填充区域的路径数据
      const fillPathData = (() => {
        return (
          `M${topLeft.x},${topLeft.y} ` +
          topCurve.slice(1) +
          `L${bottomRight.x},${bottomRight.y} ` +
          bottomCurve.slice(1) +
          "Z"
        );
      })();

      // 填充区域
      svg2
        .append("path")
        .attr("d", fillPathData)
        .attr("fill", color)
        .attr("stroke", "none");
    },
    drawCurveBetweenPoints(svg, start, end, options = {}) {
      // 合并默认配置
      const config = {
        curvature: 0.2,
        color: "#666",
        strokeWidth: 0,
        curveType: "basis",
        ...options,
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
      const lineGenerator = d3
        .line()
        .x((d) => d.x)
        .y((d) => d.y)
        .curve(
          d3[
            `curve${
              config.curveType.charAt(0).toUpperCase() +
              config.curveType.slice(1)
            }`
          ]
        );

      // 生成路径数据
      const pathData = lineGenerator([start, cp1, cp2, end]);

      // 绘制路径
      return svg
        .append("path")
        .attr("d", pathData)
        .attr("fill", "none")
        .attr("stroke", config.color)
        .attr("stroke-width", config.strokeWidth)
        .attr("class", "connection-curve")
        .style("stroke-linecap", "round");
    },

    createVerticalChart(svg, width, height) {
      // 配置间隔参数
      const LAYER_GAP = 2; // 层间间隔2px

      // 比例尺配置
      const xScale = d3
        .scaleBand()
        .domain(this.verticalData.map((d) => d.label))
        .range([0, width]);

      // 计算总高度（包含间隔）
      const totalHeight = d3.max(this.verticalData, (d) => d3.sum(d.values));
      const totalHeightWithGap =
        totalHeight + (this.verticalData[0].values.length - 1) * LAYER_GAP;

      const yScale = d3
        .scaleLinear()
        .domain([0, totalHeightWithGap])
        .range([height, 0]);

      // 生成分层数据
      const layerData = this.verticalData[0].values.map((_, i) =>
        this.verticalData.map((d) => ({
          label: d.label,
          value: d.values[i],
        }))
      );

      // 绘制分层柱状图
      const chartGroup = svg.append("g");
      const rightPoints = []; // 存储右侧端点坐标

      layerData.forEach((layer, layerIndex) => {
        const bars = chartGroup
          .selectAll(`.layer-${layerIndex}`)
          .data(layer)
          .enter()
          .append("rect")
          .attr("class", `layer-${layerIndex}`)
          .attr("x", (d) => xScale(d.label))
          .attr("width", xScale.bandwidth())
          .attr("fill", this.colors[layerIndex]);

        // 计算Y位置（累加下方各层高度及间隔）
        let baseHeight = 0;
        for (let i = 0; i < layerIndex; i++) {
          baseHeight += this.verticalData[0].values[i] + LAYER_GAP;
        }

        bars
          .attr("y", (d) => yScale(baseHeight + d.value + LAYER_GAP))
          .attr(
            "height",
            (d) => yScale(baseHeight) - yScale(baseHeight + d.value)
          );

        // 记录右侧端点
        rightPoints.push(
          ...layer.map((d) => ({
            top: {
              x: xScale(d.label) + xScale.bandwidth(),
              y: yScale(baseHeight + d.value + LAYER_GAP),
            },
            bottom: {
              x: xScale(d.label) + xScale.bandwidth(),
              y: yScale(baseHeight + LAYER_GAP),
            },
          }))
        );
      });

      return {
        points: rightPoints,
        labelPositions: this.verticalData.map((d) => ({
          y: yScale(d.values.reduce((a, b) => a + b, 0)),
        })),
      };
    },
    //画圆圈
    createVerticalCircleChart(svg, width, height) {
      function colorGradient(value) {
        if (value < 1 || value > 10) {
          throw new Error("数值必须在 1 到 10 的范围内。");
        }

        const endColor = [146, 186, 146];
        const startColor = [215, 215, 215];

        // 计算渐变比例
        const ratio = (value - 1) / 9;

        // 计算每个通道的颜色值
        const r = Math.round(
          startColor[0] + ratio * (endColor[0] - startColor[0])
        );
        const g = Math.round(
          startColor[1] + ratio * (endColor[1] - startColor[1])
        );
        const b = Math.round(
          startColor[2] + ratio * (endColor[2] - startColor[2])
        );

        return `rgb(${r}, ${g}, ${b})`;
      }

      const [thememax, thememin] = d3.extent(this.groupTheme);

      // 配置间隔参数
      const LAYER_GAP = 2; // 层间间隔2px

      // 比例尺配置
      const yScale = d3
        .scaleBand()
        .domain(this.verticalData.map((d) => d.label))
        .range([0, height])
        .padding(0.5);

      // 计算总宽度（包含间隔）
      const totalWidth = d3.max(this.verticalData, (d) => d3.sum(d.values));
      const totalWidthWithGap =
        totalWidth + (this.verticalData[0].values.length - 1) * LAYER_GAP;

      const xScale = d3
        .scaleBand()
        .domain(this.horizontalData.map((d) => d.label))
        .range([0, width]);
      // .padding(0.5);

      // 生成分层数据
      const layerData = this.verticalData[0].values.map((_, i) =>
        this.verticalData.map((d) => ({
          label: d.label,
          value: d.values[i],
        }))
      );

      // 绘制分层圆形图
      const chartGroup = svg.append("g");
      const rightPoints = []; // 存储右侧端点坐标

      // 提取values数组
      const values = this.verticalData[0].values;

      // 动态计算最小值和最大值
      const [min, max] = d3.extent(values);

      const rscale = d3
        .scaleLinear()
        .domain([min, max]) // 输入域为数据的最小值到最大值
        .range([0.3 * height, 0.4 * height]); // 输出范围固定在[0, 1]

      let previousLines = null;
      layerData.forEach((layer, layerIndex) => {
        const circles = chartGroup
          .selectAll(`.layer-${layerIndex}`)
          .data(layer)
          .enter()
          .append("circle")
          .attr("class", `layer-${layerIndex}`)
          .attr("fill", colorGradient(this.groupTheme[layerIndex]));

        // 计算X位置（累加左侧各层宽度及间隔）
        let baseWidth = 0;
        for (let i = 0; i < layerIndex; i++) {
          baseWidth += this.verticalData[0].values[i] + LAYER_GAP;
        }

        // 创建外圆（新增逻辑）
        const outerCircles = chartGroup
          .selectAll(`.outer-layer-${layerIndex}`)
          .data(layer)
          .enter()
          .append("circle")
          .attr("class", `outer-layer-${layerIndex}`)
          .attr("fill", "none")
          .attr("stroke", colorGradient(thememin)) // 外圆边框颜色
          .attr("stroke-width", 2);

        outerCircles
          .attr("cy", (d) => yScale(d.label) + yScale.bandwidth() / 2)
          .attr(
            "cx",
            (d) =>
              xScale(this.horizontalData[layerIndex].label) +
              0.5 * xScale.bandwidth()
          )
          .attr("r", rscale(max))
          .on("click", function (event, d) {
            console.log(layerIndex);

            // // 直接从数据中获取索引
            // const memberIndex = d.memberIndex;
            // const layerIndex = d.layerIndex;

            // // console.log(memberIndex, layerIndex);

            // // // 获取成员标签和值
            // // const memberLabel = this.memberData[memberIndex].label;
            // // const originalValue = this.memberData[memberIndex].values[layerIndex];

            // console.log(`Member: ${memberIndex}, Value: ${layerIndex}`);
          });

        // ... [保持原有代码不变，直到点击事件处理部分] ...

        circles
          .attr("cy", (d) => yScale(d.label) + yScale.bandwidth() / 2)
          .attr(
            "cx",
            (d) =>
              xScale(this.horizontalData[layerIndex].label) +
              0.5 * xScale.bandwidth()
          )
          .attr("r", rscale(this.verticalData[0].values[layerIndex]))
          .on("click", (event, d) => {
            this.$store.state.overviewLayer = 0; // 第0号图
            // console.log(this.$store.state.count);
            this.$store.state.count = 8; // 第8个布局
            // // 改为箭头函数保持this指向
            // // 移除之前所有连接线
            // if (previousLines) {
            //   previousLines.remove();
            // }

            // // 获取圆心坐标
            // const circleX = parseFloat(event.target.getAttribute("cx"));
            // const circleY = parseFloat(event.target.getAttribute("cy"));

            // //新的连接线组
            // const connectionGroup = svg
            //   .append("g")
            //   .attr("class", "connection-lines");

            // // 绘制两条对角线
            // connectionGroup
            //   .append("line")
            //   .attr("x1", circleX)
            //   .attr("y1", circleY)
            //   .attr("x2", 0) // 左下角坐标
            //   .attr("y2", height * 10)
            //   .attr("stroke", "#ff7875")
            //   .attr("stroke-width", 2);

            // connectionGroup
            //   .append("line")
            //   .attr("x1", circleX)
            //   .attr("y1", circleY)
            //   .attr("x2", width) // 右下角坐标
            //   .attr("y2", height * 10)
            //   .attr("stroke", "#ff7875")
            //   .attr("stroke-width", 2);

            // // 保存当前线条引用
            // previousLines = connectionGroup;

            // // 添加动画效果（可选）
            // connectionGroup
            //   .selectAll("line")
            //   .attr("stroke-dasharray", function () {
            //     const length = this.getTotalLength();
            //     return length + " " + length;
            //   })
            //   .attr("stroke-dashoffset", function () {
            //     return this.getTotalLength();
            //   })
            //   .transition()
            //   .duration(500)
            //   .ease(d3.easeCubicInOut)
            //   .attr("stroke-dashoffset", 0);
          });
        // .attr('r', d => Math.sqrt(d.value / Math.PI));

        // 根据条件设置外圈颜色
        if (this.groupTheme[layerIndex] < 5) {
          outerCircles.attr("stroke", "red").attr("stroke-width", 2);
        }

        // 记录右侧端点
        rightPoints.push(
          ...layer.map((d) => ({
            top: {
              x:
                xScale(this.horizontalData[layerIndex].label) +
                xScale.bandwidth() / 2 +
                Math.sqrt(d.value / Math.PI),
              y:
                yScale(d.label) +
                yScale.bandwidth() / 2 -
                Math.sqrt(d.value / Math.PI),
            },
            bottom: {
              x:
                xScale(this.horizontalData[layerIndex].label) +
                xScale.bandwidth() / 2 +
                Math.sqrt(d.value / Math.PI),
              y:
                yScale(d.label) +
                yScale.bandwidth() / 2 +
                Math.sqrt(d.value / Math.PI),
            },
          }))
        );
      });

      return {
        points: rightPoints,
        labelPositions: this.verticalData.map((d) => ({
          x: xScale(d.values.reduce((a, b) => a + b, 0)),
        })),
      };
    },
    //画柱状图
    createHorizontalChart(svg, width, headHeight, bodyHeight) {
      // 垂直柱状图配置
      // 定义 y 比例尺，将数值映射到高度范围，起点在上方
      const yScale = d3
        .scaleLinear()
        .domain([0, 240])
        .range([headHeight, bodyHeight]);

      // 定义 x 比例尺，将标签映射到宽度范围
      const xScale = d3
        .scaleBand()
        .domain(this.horizontalData.map((d) => d.label))
        .range([0, width]);

      // 假设之前圆形的半径计算方式，这里复用
      const circleRadius = 0.3 * xScale.bandwidth();
      const barWidth = 2 * circleRadius; // 柱状图宽度等于圆的直径

      // 预处理数据：填充缺失值为 0
      const maxValuesLength = Math.max(
        ...this.memberData.map((d) => d.values.length)
      );
      this.memberData.forEach((member) => {
        while (member.values.length < maxValuesLength) {
          member.values.push(0);
        }
      });

      // 生成堆叠数据
      const stack = d3.stack().keys(d3.range(maxValuesLength));
      const stackedData = stack(this.memberData.map((d) => d.values));

      // 绘制柱状图
      const chartGroup = svg.append("g");
      const vm = this;

      // 生成堆叠数据后，绘制矩形
      chartGroup
        .selectAll(".vertical-bar")
        .data(stackedData)
        .enter()
        .append("g")
        .attr("fill", (d, layerIndex) => this.colorMember[layerIndex])
        .each(function (d, layerIndex) {
          d.layerIndex = layerIndex; // 记录层级索引
        })
        .selectAll("rect")
        .data((d) =>
          d.map((value, memberIndex) => ({
            value,
            memberIndex, // 记录成员索引
            layerIndex: d.layerIndex, // 记录层级索引
          }))
        )
        .enter()
        .append("rect")
        .attr(
          "x",
          (d, i) =>
            xScale(this.horizontalData[i].label) +
            0.5 * xScale.bandwidth() -
            circleRadius
        )
        .attr("y", (d) => yScale(d.value[0]))
        .attr("width", barWidth)
        .attr("height", (d) => yScale(d.value[1]) - yScale(d.value[0]))
        .on("click", (event, d) => {
          // 直接从数据中获取索引
          const memberIndex = d.memberIndex;
          const layerIndex = d.layerIndex;
          this.$store.state.overviewLayer = 1; //第1号图
          this.$store.state.count = 8; // 第8个布局

          // console.log(memberIndex, layerIndex);

          // // 获取成员标签和值
          // const memberLabel = this.memberData[memberIndex].label;
          // const originalValue = this.memberData[memberIndex].values[layerIndex];

          // console.log(`Member: ${memberIndex}, Value: ${layerIndex}`);
        });
      // 在每条垂直堆叠柱状图下方绘制竖着的柱状图
      const additionalBarGroup = svg.append("g");
      const additionalYScale = d3
        .scaleLinear()
        .domain([0, d3.max(this.horizontalData, (d) => d3.max(d.values))])
        .range([0, headHeight]);

      const barGap = 2; // 柱状图之间的间隔

      this.horizontalData.forEach((dataItem, index) => {
        const sumValue = d3.sum(dataItem.values);
        const barStartY = bodyHeight + 10; // 当前堆叠柱状图的最下端 y 坐标

        const numValues = dataItem.values.length;
        const totalGapWidth = (numValues - 1) * barGap;
        const availableWidth = barWidth - totalGapWidth;
        const itemWidth = availableWidth / numValues; // 每个小柱状图的宽度

        dataItem.values.forEach((value, subIndex) => {
          const barHeight = additionalYScale(value);
          const barX =
            xScale(dataItem.label) +
            0.5 * xScale.bandwidth() -
            circleRadius +
            subIndex * (itemWidth + barGap);
          additionalBarGroup
            .append("rect")
            .attr("x", barX)
            .attr("y", barStartY)
            .attr("width", itemWidth)
            .attr("height", barHeight)
            .attr("fill", this.colorDis[subIndex])
            .on("click", (event, d) => {
              // 直接从数据中获取索引
              // const memberIndex = d.memberIndex;
              // const layerIndex = d.layerIndex;
              this.$store.state.overviewLayer = 2; //第2号图
              this.$store.state.count = 8; // 第8个布局

              // console.log(memberIndex, layerIndex);

              // // 获取成员标签和值
              // const memberLabel = this.memberData[memberIndex].label;
              // const originalValue = this.memberData[memberIndex].values[layerIndex];

              // console.log(`Member: ${memberIndex}, Value: ${layerIndex}`);
            });
        });
      });
    },
    drawRectanglesBasedOnData(svg, width, verticalWidth, height, offsetX) {
      // 定义 x 比例尺
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(this.horizontalData, (d) => d3.sum(d.values))])
        .range([0, verticalWidth]);

      // 定义 y 比例尺
      const yScale = d3
        .scaleBand()
        .domain(this.horizontalData.map((d) => d.label))
        .range([height, 0])
        .padding(0.5);

      // 创建一个分组元素来容纳所有长方形
      const chartGroup = svg
        .append("g")
        .attr("transform", `translate(${offsetX + 20}, 20)`);

      // 每个长方形之间的间隔
      const rectangleGap = 5;

      // 找出所有列数据中的最大值
      const allValues = [];
      this.horizontalData.forEach((data) => {
        allValues.push(...data.values);
      });
      const maxValue = d3.max(allValues);
      const maxColumnWidth = xScale(maxValue) - xScale(0);

      // 计算每个长方形的起始 x 坐标
      const startXPositions = [];
      let currentX = width;
      const numColumns = this.horizontalData[0].values.length;
      for (let i = 0; i < numColumns; i++) {
        startXPositions.push(currentX);
        currentX += maxColumnWidth + rectangleGap;
      }

      // 遍历每一组数据
      this.horizontalData.forEach((data, index) => {
        // 遍历每个值，绘制对应的长方形
        data.values.forEach((value, valueIndex) => {
          chartGroup
            .append("rect")
            .attr("x", startXPositions[valueIndex])
            .attr("y", yScale(data.label))
            .attr("width", xScale(value) - xScale(0))
            .attr("height", yScale.bandwidth())
            .attr("fill", `hsl(${valueIndex * 90}, 80%, 50%)`);
        });
      });
    },

    drawConnectionLines(svg, verticalPoints, horizontalPoints) {
      // 创建曲线生成器
      const lineGenerator = d3
        .line()
        .curve(d3.curveBasis)
        .x((d) => d.x)
        .y((d) => d.y);

      verticalPoints.forEach((vPoint, i) => {
        const hPoint = horizontalPoints[i];

        // 生成曲线路径
        const pathData = [
          vPoint,
          { x: (vPoint.x + hPoint.x) / 2, y: vPoint.y - 30 },
          hPoint,
        ];

        svg
          .append("path")
          .attr("d", lineGenerator(pathData))
          .attr("stroke", this.colorsHor[i])
          .attr("fill", "none")
          .attr("stroke-width", 2);
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
      const pie = d3.pie().value((d) => d);

      // 创建弧生成器
      const arc = d3
        .arc()
        .innerRadius(piewidth / 4) // 增加内半径创建环形效果
        .outerRadius(piewidth / 2)
        .padAngle(0.1); // 添加扇形间隔

      let points = [];

      this.pieData.forEach((d, i) => {
        const pieGroup = svg
          .append("g")
          .attr(
            "transform",
            `translate(${startX + piewidth / 4}, ${labelPositions[i].y})`
          );

        points.push({ x: startX - piewidth / 4, y: labelPositions[i].y });

        const arcs = pie(d.values);

        pieGroup
          .selectAll(".pie-slice")
          .data(arcs)
          .enter()
          .append("path")
          .attr("d", arc)
          .attr("stroke", (d) => {
            // 计算当前扇形的中心角（以度为单位）
            const centralAngle = ((d.endAngle - d.startAngle) * 180) / Math.PI;
            // 如果中心角超过180度，返回红色，否则返回透明
            return centralAngle > 180
              ? "red"
              : this.colorsHor[this.colorsHor.length - 1];
          })
          .attr("stroke-width", 2)
          .attr("fill", "none");
      });

      return points;
    },

    handleResize() {
      d3.select(this.$refs.chart).selectAll("*").remove();
      this.initChart();
    },
  },
  computed: {
    ...mapState(["count"]), // 映射 count 到计算属性
  },
  watch: {
    // 监听 count 变化
    count(newVal, oldVal) {
      d3.select(this.$refs.chart).select("svg").remove();
      this.initChart();

      console.log("count 变化:", oldVal, "→", newVal);
    },
  },
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
