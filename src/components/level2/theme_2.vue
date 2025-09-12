<template>
  <div ref="container2" class="overview-container">
    <div class="title">Theme Overview</div>
    <div ref="matrixContainer" class="matrix-wrapper"></div>
    <div ref="treemap" class="matrix-wrapper"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      data: [
        [0.15, 0.22, 0.33, 0.8, 0.4, 0.66, 0.45, 0.28, 0.92, 1.05], // 行5：前10负，后10正
        // [0.15, 0.22, 0.33, 0.5, 0.4, 0.66, 0.7, 0.48, 0.92, 1.05], // 行5：前10负，后10正
      ],
      dataTheme: [
        { category: "A", parts: [20, 25, 15] },
        { category: "B", parts: [40, 3, 10] },
        { category: "C", parts: [25, 10, 20] },
        { category: "D", parts: [25, 35, 10] },
      ],
      // dataTheme: [
      //   { category: "A", parts: [20, 55, 25] },
      //   { category: "B", parts: [40, 30, 30] },
      //   { category: "C", parts: [25, 50, 25] },
      // ],
      themeColor: ["#c7522a", "#e5c185", "#74a892", "#008585"],
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
      // const matrixHeight = height * 0.2;
      // const svg = d3
      //   .select(this.$refs.matrixContainer)
      //   .append("svg")
      //   .attr("width", width)
      //   .attr("height", matrixHeight);
      // this.drawHeatMap(svg, width, matrixHeight);
      // 创建SVG画布
      const treeHeight = height * 0.5;
      const svg2 = d3
        .select(this.$refs.treemap)
        .append("svg")
        .attr("width", width)
        .attr("height", treeHeight);
      this.drawTreeMap(svg2, width, treeHeight);
    },
    drawHeatMap(svg, width, height) {
      // 颜色映射器
      const colorScale = (d) => {
        if (d <= 0) {
          return d3.interpolate(
            d3.rgb(99, 86, 158), // 深蓝
            d3.rgb(255, 255, 255) // 浅蓝
          )((d + 1) / 1); // 负数映射到0-1区间
        }
        return d3.interpolate(
          d3.rgb(255, 255, 255), // 浅红
          d3.rgb(255, 0, 0) // 深红
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
    drawTreeMap(svg, width, height) {
      const barHeight = height; // 单个柱子的高度
      const spacing = 100; // 柱子间距
      // 横向布局计算
      this.dataTheme.forEach((d, i) => {
        let xOffset = i * spacing; // 柱子起始X位置

        // 堆叠计算
        let accum = 0;
        d.parts.forEach((value, partIndex) => {
          console.log(partIndex);
          if (partIndex == 1) {
            svg
              .append("rect")
              .attr("x", xOffset + accum)
              .attr("y", 0)
              .attr("width", value) // 长度放大系数
              .attr("height", barHeight)
              .attr("fill", this.themeColor[i]);
            // .attr("stroke", this.themeColor[i]);
            // .attr("stroke-width", 2);
          } else if (partIndex == 2) {
            svg
              .append("rect")
              .attr("x", xOffset + accum)
              .attr("y", 0)
              .attr("width", value) // 长度放大系数
              .attr("height", barHeight)
              .attr("fill", this.themeColor[i])
              .attr("fill-opacity", 0.8);
            // .attr("stroke", this.themeColor[i])
            // .attr("stroke-width", 2);
          } else {
            svg
              .append("rect")
              .attr("x", xOffset + accum)
              .attr("y", 0)
              .attr("width", value) // 长度放大系数
              .attr("height", barHeight)
              .attr("fill", this.themeColor[i])
              .attr("fill-opacity", 0.5);
            // .attr("stroke", this.themeColor[i])
            // .attr("stroke-width", 2);
          }

          accum += value; // 累加堆叠位置
        });
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
  color: #d7d7d7;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}
</style>