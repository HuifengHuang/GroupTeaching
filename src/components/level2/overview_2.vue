<template>
  <div ref="container" class="overview-container">
    <div class="title">Member Review</div>
    <svg ref="MemberReview" style="width: 100%"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      dataM: [
        { month: "Jan", value: 30 },
        { month: "Feb", value: 80 },
        { month: "Mar", value: 45 },
        { month: "Apr", value: 60 },
        { month: "May", value: 95 },
      ],
      dataG: [
        { month: "Jan", value: 15 },
        { month: "Feb", value: 60 },
        { month: "Mar", value: 55 },
        { month: "Apr", value: 55 },
        { month: "May", value: 30 },
      ],
      config: {
        margin: { top: 10, right: 0, bottom: 10, left: 0 },
      },
    };
  },
  mounted() {
    this.drawChart();
    // window.addEventListener("resize", this.handleResize);
  },
  // beforeDestroy() {
  //   window.removeEventListener("resize", this.handleResize);
  // },
  methods: {
    // handleResize() {
    //   d3.select(this.$refs.MemberReview).selectAll("*").remove();
    //   this.drawChart();
    // },
    drawChart() {
      const container = this.$refs.container;
      const width = container.clientWidth;
      const height = container.clientHeight * 0.9;

      // 创建SVG容器
      const svg = d3
        .select(this.$refs.MemberReview)
        .attr("width", width)
        .attr("height", height);

      console.log(width);

      // 计算有效绘图区域
      const chartWidth =
        width - this.config.margin.left - this.config.margin.right;
      const chartHeight =
        height - this.config.margin.top - this.config.margin.bottom;

      // 合并数据计算范围;
      const allValues = [...this.dataM, ...this.dataG].map((d) => d.value);
      const xDomain = [
        ...new Set([
          ...this.dataM.map((d) => d.month),
          ...this.dataG.map((d) => d.month),
        ]),
      ];

      // 创建比例尺
      const xScale = d3
        .scaleBand()
        .domain(xDomain)
        .range([0, chartWidth])
        .padding(0.2);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(allValues)])
        .range([chartHeight, 0]);

      // 创建主图表区域
      const chart = svg
        .append("g")
        .attr(
          "transform",
          `translate(${this.config.margin.left},${this.config.margin.top})`
        );

      // 绘制柱状图
      chart
        .selectAll(".bar")
        .data(this.dataM)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.month))
        .attr("y", (d) => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => chartHeight - yScale(d.value))
        .attr("fill", "#4CAF50")
        .attr("opacity", 0.6);

      // 绘制折线图
      const line = d3
        .line()
        .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
        .y((d) => yScale(d.value));

      chart
        .append("path")
        .datum(this.dataG)
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke", "#2196F3")
        .attr("stroke-width", 2)
        .attr("fill", "none");

      // // 添加X轴
      // svg
      //   .append("g")
      //   .attr(
      //     "transform",
      //     `translate(${this.config.margin.left},${
      //       height - this.config.margin.bottom
      //     })`
      //   )
      //   .call(d3.axisBottom(xScale))
      //   .selectAll("text")
      //   .style("text-anchor", "middle");

      // // 添加Y轴（隐藏刻度）
      // svg
      //   .append("g")
      //   .attr(
      //     "transform",
      //     `translate(${this.config.margin.left},${this.config.margin.top})`
      //   )
      //   .call(d3.axisLeft(yScale).tickFormat("").tickSize(0))
      //   .select(".domain")
      //   .attr("stroke-width", 1);

      // 添加图例;
      this.drawLegend(svg, width);
    },
    drawLegend(svg, width) {
      const legend = svg
        .append("g")
        .attr("transform", `translate(${width - 180}, 0)`);

      // 柱状图图例
      legend
        .append("rect")
        .attr("width", 20)
        .attr("height", 15)
        .attr("fill", "#4CAF50")
        .attr("opacity", 0.6);

      legend
        .append("text")
        .attr("x", 25)
        .attr("y", 12)
        .text("Member Data")
        .style("font-size", "12px")
        .style("fill", "#666");

      // 折线图图例
      legend
        .append("path")
        .attr("d", "M0,30 L20,30")
        .attr("stroke", "#2196F3")
        .attr("stroke-width", 2);

      legend
        .append("text")
        .attr("x", 25)
        .attr("y", 32)
        .text("Group Data")
        .style("font-size", "12px")
        .style("fill", "#666");
    },
  },
};
</script>

<style scoped>
.overview-container {
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