<template>
  <div ref="container" class="overview-container">
    <div class="title">Review</div>
    <svg ref="chart"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "RoundedStack",
  data() {
    return {
      data: [
        [0, 2, 3, 10, 5],
        [0, 4, 2, 4, 10],
        [0, 4, 2, 4, 10],
        [0, 2, 3, 10, 5],
        [0, 4, 2, 4, 10],
        [5, 2, 3, 5, 5],
      ],
      colors: ["#c7522a", "#e5c185", "#74a892", "#008585", "#5e606c"],
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      config: {
        barRadius: 8, // 圆角半径
        spacing: 3, // 层间距
        barWidth: 50, // 柱宽
      },
    };
  },
  mounted() {
    this.drawChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    drawChart() {
      // 清空画布
      d3.select(this.$refs.chart).selectAll("*").remove();

      // 容器尺寸
      const container = this.$refs.container;
      const width = container.clientWidth;
      const height = container.clientHeight;

      // 创建SVG元素
      const svg = d3
        .select(this.$refs.chart)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

      // 计算绘图区域
      const chartWidth = width - this.margin.left - this.margin.right;
      const chartHeight = height - this.margin.top - this.margin.bottom - 20;

      // 比例尺配置
      const xScale = d3
        .scaleBand()
        .domain(d3.range(this.data.length))
        .range([0, chartWidth])
        .padding(0.1);

      // 绘制堆叠柱
      this.data.forEach((columnData, columnIndex) => {
        const validLayers = columnData.filter((d) => d > 0);
        const n = validLayers.length;
        const totalSpacing = (n - 1) * this.config.spacing;
        const availableHeight = chartHeight - totalSpacing - 10;

        const columnGroup = svg
          .append("g")
          .attr("transform", `translate(${xScale(columnIndex)},0)`);

        let accumulatedY = chartHeight - 10; // 从容器底部开始绘制

        validLayers.forEach((value, layerIndex) => {
          const layerHeight = (value / 20) * availableHeight;
          const spacingAfter = layerIndex < n - 1 ? this.config.spacing : 0;

          // 绘制圆角矩形
          columnGroup
            .append("rect")
            .attr("x", (this.config.barWidth - xScale.bandwidth()) / 2)
            .attr("y", accumulatedY - layerHeight)
            .attr("width", this.config.barWidth)
            .attr("height", layerHeight)
            .attr("rx", this.config.barRadius)
            .attr("ry", this.config.barRadius)
            .attr("fill", this.colors[layerIndex % this.colors.length])
            .attr("stroke", "#fff")
            .attr("stroke-width", 1);

          // 更新垂直位置（向上移动）
          accumulatedY -= layerHeight + spacingAfter;
        });
      });
    },
    handleResize() {
      this.drawChart();
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
.rounded-stack {
  width: 100%;
  height: 100%;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
}

.rounded-stack rect {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.rounded-stack rect:hover {
  filter: brightness(1.1);
}

.title {
  color: #4cc4d5;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}
</style>