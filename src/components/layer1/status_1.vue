<template>
  <div ref="container" class="overview-container"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "D3ParticipationHeatmap",
  data() {
    return {
      groups: 4,
      studentsPerGroup: 6,
      timeSlots: 10,
      config: {
        cell: { width: 12, height: 12, spacing: 2 },
        group: { spacing: 12, titleHeight: 13, barHeight: 10 },
        colors: {
          individual: [
            { value: 0, color: "#E1F7F5" },
            { value: 50, color: "#108b96" },
            { value: 100, color: "#284179" },
          ],
          groupBar: [
            { value: 0, color: "#D8E2FA" },
            { value: 100, color: "#284179" },
          ],
        },
      },
      data: [],
    };
  },
  mounted() {
    this.generateData();
    this.initChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    d3.select(this.$refs.container).selectAll("*").remove();
  },
  methods: {
    generateData() {
      this.data = Array.from({ length: this.groups }, (_, gi) => ({
        means: Array.from({ length: this.timeSlots }, () =>
          d3.randomUniform(30, 90)()
        ),
        students: Array.from({ length: this.studentsPerGroup }, () =>
          Array.from({ length: this.timeSlots }, () =>
            d3.randomUniform(0, 100)()
          )
        ),
        rank: this.groups - gi,
      }));
    },
    initChart() {
      const container = d3.select(this.$refs.container);
      container.selectAll("*").remove();

      // 创建 SVG 画布
      this.svg = container
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");
      // .style('background', 'white')
      // .style('border', '1px solid #e8e8e8');

      this.updateChart();
    },
    updateChart() {
      const { width, height } = this.$refs.container.getBoundingClientRect();
      this.svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      // 创建颜色插值器
      const colorScale = d3
        .scaleLinear()
        .domain(this.config.colors.individual.map((d) => d.value))
        .range(this.config.colors.individual.map((d) => d.color))
        .interpolate(d3.interpolateRgb.gamma(2.2));

      // 绘制小组
      const groups = this.svg
        .selectAll(".group")
        .data(this.data)
        .join("g")
        .attr("class", "group")
        .attr(
          "transform",
          (d, i) =>
            `translate(0, ${
              i *
              (this.studentsPerGroup * (this.config.cell.height + 1) +
                this.config.group.spacing)
            })`
        );

      // 绘制学生热力单元
      groups.each((group, gi, nodes) => {
        const groupG = d3.select(nodes[gi]);
        const meanValues = group.students[0].map((_, ti) =>
          d3.mean(group.students, (s) => s[ti])
        );

        // 绘制组平均条
        const avg = d3.mean(meanValues);
        groupG
          .append("rect")
          .attr("x", 0)
          .attr("y", -25)
          .attr("width", width * 0.6 * (avg / 100))
          .attr("height", this.config.group.barHeight)
          .attr("fill", this.createGroupGradient(gi));

        // 绘制每个学生
        groupG
          .selectAll(".student")
          .data(group.students)
          .join("g")
          .attr("class", "student")
          .attr(
            "transform",
            (d, si) => `translate(0, ${si * (this.config.cell.height + 1)})`
          )
          .each((student, si, nodes) => {
            const studentG = d3.select(nodes[si]);

            // 绘制时间单元
            studentG
              .selectAll(".cell")
              .data(student)
              .join("rect")
              .attr("class", "cell")
              .attr(
                "x",
                (d, ti) =>
                  ti * (this.config.cell.width + this.config.cell.spacing)
              )
              .attr("y", 0)
              .attr("width", this.config.cell.width)
              .attr("height", this.config.cell.height)
              .attr("fill", (d) => colorScale(d))
              .each((d, ti, cells) => {
                const cell = d3.select(cells[ti]);
                const diff = d - meanValues[ti];

                // 动态边框
                if (diff > meanValues[ti] * 0.15) {
                  cell.attr("stroke", "#389e0d").attr("stroke-width", 2);
                } else if (diff < -meanValues[ti] * 0.2) {
                  cell
                    .attr("stroke", "#cf1322")
                    .attr("stroke-dasharray", "3,2");
                }
              });
          });
      });
    },
    createGroupGradient(index) {
      const gradientId = `groupGradient${index}`;
      const gradient = this.svg
        .append("defs")
        .append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

      this.config.colors.groupBar.forEach((c) =>
        gradient
          .append("stop")
          .attr("offset", `${c.value}%`)
          .attr("stop-color", c.color)
      );

      return `url(#${gradientId})`;
    },
    handleResize() {
      this.updateChart();
    },
  },
};
</script>

<style scoped>
.overview-container {
  width: 100%;
  height: 100%;
  position: relative;
}

/* svg {
    display: block;
    margin: 0 auto;
} */
</style>