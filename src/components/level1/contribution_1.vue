<template>
  <div ref="container2" class="overview-container">
    <div class="title">Contribution Detail</div>
    <div ref="matrixContainer" class="matrix-wrapper"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      data: [
        // 前两行：大部分负数，末尾少量正值
        [
          -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, -0.2, -0.3,
          -0.4, -0.5, -0.3, -0.2, 0.1, 0.2, 0.3, 0.4, 0.5,
        ], // 行1：前15负，后5正
        [
          -1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, -0.2,
          -0.3, -0.4, -0.5, -0.3, 0.0, 0.1, 0.2, 0.3, 0.4,
        ], // 行2：前15负，后5正

        // 第三行：全负数（特殊模式）
        [
          -0.5, -0.6, -0.7, -0.8, -0.9, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5,
          -0.4, -0.3, -0.2, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6,
        ], // 行3：全负数

        // 后两行：前段负，后段正
        [
          -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0, 0.1, 0.2, 0.3,
          0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 0.9,
        ], // 行4：前9负，后11正
        [
          -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0, 0.1, 0.2,
          0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0,
        ], // 行5：前10负，后10正
      ],
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
      const height = container.clientHeight * 0.8;

      // 生成示例数据
      const matrixData = this.fixedMatrixData;

      // 创建SVG画布
      const svg = d3
        .select(this.$refs.matrixContainer)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      this.drawHeatMap(svg, width, height);
    },
    drawHeatMap(svg, width, height) {
      // 颜色映射器
      const colorScale = (d) => {
        if (d <= 0) {
          return d3.interpolate(
            d3.rgb(255, 0, 0), // 深红
            d3.rgb(255, 255, 255) // 浅红
          )((d + 1) / 1); // 负数映射到0-1区间
        }
        return d3.interpolate(
          d3.rgb(255, 255, 255), // 浅蓝
          d3.rgb(99, 86, 158) // 深蓝
        )(d); // 正数直接映射
      };
      // 计算单元格尺寸
      const cellWidth = width / this.data[0].length;
      const cellHeight = height / this.data.length;

      // 绘制热力块
      svg
        .selectAll("g.row")
        .data(this.data)
        .join("g")
        .attr("class", "row")
        .attr("transform", (d, i) => `translate(0,${i * cellHeight})`)
        .selectAll("rect")
        .data((d) => d)
        .join("rect")
        .attr("x", (d, i) => i * cellWidth)
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("fill", (d) => colorScale(d));
      // .attr("stroke", "#fff");
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
</style>