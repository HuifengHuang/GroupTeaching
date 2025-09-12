<template>
  <div ref="container2" class="overview-container">
    <div class="title">Contribution</div>
    <div ref="matrixContainer" class="matrix-wrapper"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      customColors: [
        "#FBB885",
        "#FCDCDB",
        "#D9D8ED",
        "#7CB6E4",
        "#727FBD",
        "#254BA0",
      ],
      // datasets: [
      //   [
      //     1, 1, 1.8, 1, 0, 1, 1.1, 1, 2.1, 1.2, 0.8, 1, 2, 1, 0.9, 1, 1, 1.2,
      //     0.8, 1, 2.1, 1, 0.9, 1, 1, 1.2, 0, 1, 1, 1,
      //   ],
      //   [
      //     1.7, 1, 0.6, 1, 2.0, 1, 0.5, 1, 1.9, 1, 0.7, 1, 1.5, 1, 0.9, 1, 2.3,
      //     1, 0.8, 1, 1.6, 1, 0.6, 1, 1.8, 1, 0.7, 1, 2.1, 1,
      //   ],
      //   [
      //     0.6, 1, 1.8, 1, 0.7, 1, 1.3, 1, 0.5, 1, 2.1, 1, 0.8, 1, 1.6, 1, 0.9,
      //     1, 2.2, 1, 0.6, 1, 1.4, 1, 0.5, 1, 1.7, 1, 0.8, 1,
      //   ],

      //   [
      //     2.2, 1, 0.5, 1, 1.8, 1, 0.7, 1, 2.1, 1, 0.6, 1, 1.9, 1, 0.8, 1, 2.0,
      //     1, 0.9, 1, 1.7, 1, 0.5, 1, 1.6, 1, 0.7, 1, 2.3, 1,
      //   ],
      //   [
      //     1.3, 1, 0.8, 1, 1.5, 1, 0.6, 1, 1.4, 1, 0.9, 1, 1.2, 1, 0.7, 1, 1.6,
      //     1, 0.5, 1, 1.1, 1, 0.8, 1, 1.7, 1, 0.6, 1, 1.9, 1,
      //   ],
      // ],
      datasets: [
        [
          1.1, 1, 2.0, 1, 1.3, 1, 1.6, 1, 2.2, 1.4, 1.2, 1, 2.1, 1, 1.5, 1, 1.8,
          1, 1.7, 1, 2.3, 1, 1.9, 1, 1.1, 1, 0.9, 1, 1.2, 1,
        ],
        [
          1.5, 1, 1.2, 1, 2.4, 1, 1.3, 1, 2.1, 1, 1.4, 1, 1.8, 1, 1.6, 1, 2.2,
          1, 1.7, 1, 2.0, 1, 1.1, 1, 2.1, 1, 1.3, 1, 2.2, 1,
        ],
        [
          0.7, 1, 1.6, 1, 0.8, 1, 0.9, 1, 0.6, 1, 2.1, 1, 0.5, 1, 1.3, 1, 0.7,
          1, 2.0, 1, 0.6, 1, 0.8, 1, 0.9, 1, 1.4, 1, 0.8, 1,
        ],
        [
          0.6, 1, 0.5, 1, 1.8, 1, 0.7, 1, 2.2, 1, 0.6, 1, 1.7, 1, 0.8, 1, 2.1,
          1, 0.7, 1, 1.5, 1, 0.5, 1, 0.9, 1, 1.6, 1, 0.7, 1,
        ],
        [
          1.3, 1, 1.1, 1, 2.0, 1, 0.9, 1, 1.7, 1, 1.2, 1, 1.5, 1, 0.8, 1, 1.6,
          1, 0.7, 1, 1.4, 1, 1.1, 1, 1.8, 1, 0.9, 1, 2.0, 1,
        ],
      ],
      talk: [7, 6, 3, 2, 5],
      config: {
        margin: 0,
      },
    };
  },

  mounted() {
    this.initMatrix();
  },

  methods: {
    initMatrix() {
      const container = this.$refs.container2;
      // 清空容器内的所有子元素（每次绘制前调用）
      d3.select(this.$refs.matrixContainer).selectAll("*").remove();

      // 或更精确地只删除 SVG 元素（推荐）
      // d3.select(this.$refs.chart).select("svg").remove();
      const width = container.clientWidth;
      const height = container.clientHeight * 0.85;

      // 生成示例数据
      const matrixData = this.fixedMatrixData;

      // 创建SVG画布
      const svg = d3
        .select(this.$refs.matrixContainer)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      this.drawPersonalCon(svg, height, width);
    },
    drawPersonalCon(svg, height, width) {
      // 计算每个图表的位置和尺寸
      const chartWidth =
        (width - this.config.margin * 2) / this.datasets.length;
      console.log(chartWidth);
      const baseRadius = 0.4 * (width / (this.datasets.length * 2));
      const meanRadius = 0.5 * (width / (this.datasets.length * 2));
      console.log(meanRadius);

      // 创建比例尺（核心修改部分）
      const radiusScale = d3
        .scaleLinear()
        .domain([0, 1]) // 数值0-1对应
        .range([baseRadius, meanRadius])
        .clamp(false); // 允许超出范围的值

      const radiusScaleForTalk = d3
        .scaleLinear()
        .domain([0, 10]) // 数值0-1对应
        .range([0, baseRadius])
        .clamp(false); // 允许超出范围的值

      this.datasets.forEach((data, i) => {
        const chartGroup = svg
          .append("g")
          .attr(
            "transform",
            `translate(${
              this.config.margin + i * chartWidth + chartWidth / 2
            },${height / 2 - 5})`
          );

        // 生成节点数据（动态角度分配）
        const nodes = data.map((score, i) => {
          // 计算角度间隔：360度 / 数据长度
          const angleStep = 360 / data.length;

          // 计算每个节点的角度（从-90度开始，顺时针分布）
          const degrees = i * angleStep - 90;

          // 转换为弧度
          const radians = (degrees * Math.PI) / 180;

          // 保持原有半径计算逻辑
          const radius = radiusScale(score);

          return {
            x: radius * Math.cos(radians),
            y: radius * Math.sin(radians),
            score,
          };
        });

        chartGroup
          .append("circle") // 数值1基准环
          .attr("r", meanRadius)
          .attr("class", "baseline mean-ring");
        // 在脚本部分修改多边形绘制逻辑
        // 添加剪切路径定义
        const defs = svg.append("defs");

        // 数值1基准圆剪切路径
        defs
          .append("clipPath")
          .attr("id", "mean-clip")
          .append("circle")
          .attr("r", meanRadius);

        // 绘制外部红色部分（基准圆之外）
        chartGroup
          .append("path")
          .datum(nodes)
          .attr("class", "polygon-outer")
          .attr(
            "d",
            d3
              .line()
              .x((d) => d.x)
              .y((d) => d.y)
              .curve(d3.curveCardinalClosed.tension(0.5))
          );

        // 绘制内部白色部分（基准圆之内）
        chartGroup
          .append("path")
          .datum(nodes)
          .attr("class", "polygon-inner")
          .attr("clip-path", "url(#mean-clip)")
          .attr(
            "d",
            d3
              .line()
              .x((d) => d.x)
              .y((d) => d.y)
              .curve(d3.curveCardinalClosed.tension(0.5))
          );

        // 绘制基准环系统
        chartGroup
          .append("circle") // 数值0基准环
          .attr("r", radiusScaleForTalk(this.talk[i]))
          .attr("fill", this.customColors[i]);
        // .attr("class", "baseline center-core");
      });
    },
  },
};
</script>

<style>
.overview-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
.matrix-wrapper {
  font-family: Arial;
}

.matrix-label {
  font-size: 12px;
  user-select: none;
}

.cell-text {
  font-size: 10px;
  user-select: none;
}

.bar-label {
  font-size: 10px;
  fill: #333;
}

.title {
  color: #4cc4d5;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}

.baseline {
  stroke-dasharray: 4 2;
  fill: none;
}

.max-ring {
  stroke: #ff5252;
  stroke-width: 1.5;
}

.mean-ring2 {
  /* stroke: #91ca0c;
            stroke-width: 1.5; */
  fill: white;
}

.mean-ring {
  /* stroke: #91ca0c;
            stroke-width: 1.5; */
  fill: rgba(25, 118, 210);
}

.data-node {
  fill: #ff5252;
  stroke: white;
  stroke-width: 1;
}

.center-core {
  fill: #616161;
}

.annotation {
  font: 14px sans-serif;
  fill: #212121;
}

/* 
        .polygon-line {
            stroke: #1976d2;
            fill: none;
            stroke-width: 2;
        } */

/* 新增极值环样式 */
.extreme-ring {
  stroke-dasharray: 5 3;
  stroke-width: 1.2;
  fill: none;
}

.max-extreme {
  stroke: #d32f2f;
  /* 深红色 */
}

.min-extreme {
  stroke: #1976d2;
  /* 深蓝色 */
}

.polygon-line {
  /* stroke: #1976d2; */
  fill: rgba(219, 76, 76);
  /* 新增半透明填充 */
  stroke-width: 2;
  /* fill-opacity: 0.8; */
  /* 填充透明度调整 */
}

.polygon-line2 {
  /* stroke: #1976d2; */
  fill: white;
  /* 新增半透明填充 */
  stroke-width: 2;
  /* fill-opacity: 0.8; */
  /* 填充透明度调整 */
}

.polygon-inner {
  fill: white;
  stroke: none;
}

.polygon-outer {
  fill: #ff5252;
  stroke: #1976d2;
  stroke-width: 0;
}
</style>