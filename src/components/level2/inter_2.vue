<template>
  <div class="overview-container">
    <div class="title">Interaction Review</div>
    <!-- <div ref="tuli" class="tuli-container"></div> -->
    <div style="display: flex; flex-direction: row">
      <!-- <div ref="circle1" class="circle-container"></div> -->
      <div class="word-container" ref="wordcloud">
        <wordcloud
          :data="defaultWords"
          nameKey="name"
          valueKey="value"
          :color="myColors"
          :showTooltip="false"
          :wordClick="wordClickHandler"
          :fontSize="[10, 40]"
          :rotate="{ from: 0, to: 0 }"
          :margin="{ top: 0, right: 0, bottom: 0, left: 0 }"
        >
        </wordcloud>
      </div>
      <!-- <div ref="circle2" class="circle-container"></div> -->
    </div>
  </div>
</template>

<script>
import wordcloud from "vue-wordcloud";
import * as d3 from "d3";

export default {
  name: "app",
  components: {
    wordcloud,
  },
  mounted() {
    // this.drawCircles();
    // this.drawLegend(); // 新增
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    wordClickHandler(name, value, vm) {
      console.log("wordClickHandler", name, value, vm);
    },
    handleResize() {
      d3.select(this.$refs.circle1).select("svg").remove();
      d3.select(this.$refs.circle2).select("svg").remove();
      d3.select(this.$refs.tuli).select("svg").remove();
      //   this.drawCircles();
      //   this.drawLegend(); // 新增
    },
    drawCircles() {
      // 通用绘制函数
      const drawCircle = (container, color) => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        console.log(height);
        const size = width; // 圆形直径
        const svg = d3
          .select(container)
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        svg
          .append("circle")
          .attr("cx", size / 2)
          .attr("cy", height / 2)
          .attr("r", size / 4)
          .attr("fill", "none")
          .attr("stroke", color)
          .attr("stroke-width", 3);

        // 仅在右侧圆形添加连接线
        if (container === this.$refs.circle1) {
          svg
            .append("line")
            .attr("x1", size * 0.75) // 从圆形右侧边缘开始
            .attr("y1", height / 2)
            .attr("x2", width) // 延伸到容器右边界
            .attr("y2", height / 2) // 延伸到容器右边界
            .attr("stroke", color)
            .attr("stroke-width", 2);
          // .attr("stroke-dasharray", "5 2"); // 虚线样式
        }
        // 仅在右侧圆形添加连接线
        if (container === this.$refs.circle2) {
          svg
            .append("line")
            .attr("x1", size * 0.25) // 从圆形右侧边缘开始
            .attr("y1", height / 2)
            .attr("x2", 0) // 延伸到容器右边界
            .attr("y2", height / 2) // 延伸到容器右边界
            .attr("stroke", color)
            .attr("stroke-width", 2);
          // .attr("stroke-dasharray", "5 2"); // 虚线样式
        }
      };

      drawCircle(this.$refs.circle1, "#4cc4d5");
      drawCircle(this.$refs.circle2, "#629fc9");
    },
    drawLegend() {
      const container = this.$refs.tuli;
      //   container.selectAll("*").remove(); // 清空容器

      const width = container.clientWidth;
      const height = container.clientHeight;

      const legendData = [
        {
          color: "#4cc4d5",
          label: "A",
          value: "1",
          // time: "2023-01-01 ~ 2023-06-30",
        },
        {
          color: "#629fc9",
          label: "B",
          value: "2",
          // time: "2023-07-01 ~ 2023-12-31",
        },
        {
          color: "#92ba92",
          label: "C",
          value: "2",
          time: "time:2024-07-01 ~ 2024-07-01",
          type: "rect",
        },
      ];

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

      //   // 绘制图例项
      //   const legend = svg
      //     .selectAll("g")
      //     .data(legendData)
      //     .enter()
      //     .append("g")
      //     .attr("transform", (d, i) => `translate(${i * height * 1.5},0)`); // 水平间距

      //   // 圆形标记
      //   legend
      //     .append((d) =>
      //       document.createElementNS(
      //         "http://www.w3.org/2000/svg",
      //         d.type === "rect" ? "rect" : "circle"
      //       )
      //     )
      //     .attr("cx", 20)
      //     .attr("cy", height / 2)
      //     .attr("r", height / 4)
      //     .attr("x", (d) => 20 - (d.type === "rect" ? height / 4 : 0))
      //     .attr("y", (d) => height / 2 - (d.type === "rect" ? height / 4 : 0))
      //     .attr("width", (d) => (d.type === "rect" ? height / 2 : null))
      //     .attr("height", (d) => (d.type === "rect" ? height / 2 : null))
      //     .attr("rx", (d) => (d.type === "rect" ? 5 : null))
      //     .attr("fill", "none")
      //     .attr("stroke", (d) => d.color)
      //     .attr("stroke-width", 3);

      // // 阶段数字
      // legend
      //   .append("text")
      //   .attr("x", 20)
      //   .attr("y", 20)
      //   .attr("text-anchor", "middle")
      //   .attr("dominant-baseline", "middle")
      //   .attr("fill", "white")
      //   .style("font-weight", "bold")
      //   .text((d) => d.value);

      //   // 阶段标签
      //   legend
      //     .append("text")
      //     .attr("x", 45)
      //     .attr("y", height / 2 + 4)
      //     .style("fill", (d) => d.color)
      //     .style("font-size", "14px")
      //     .attr("font-weight", "bold")
      //     .text((d) => d.label);

      //   // 时间范围
      //   legend
      //     .append("text")
      //     .attr("x", 60)
      //     .attr("y", height / 2 + 4)
      //     .style("fill", (d) => d.color)
      //     .attr("font-weight", "bold")
      //     .style("font-size", "14px")
      //     .text((d) => d.time);
    },
  },
  data() {
    return {
      containerWidth: 800,
      containerHeight: 600,
      myColors: ["#92BA92"],
      defaultWords: [
        {
          name: "可视化",
          value: 26,
        },
        {
          name: "地理数据",
          value: 19,
        },
        {
          name: "可视分析系统",
          value: 18,
        },
        {
          name: "地图",
          value: 16,
        },
        {
          name: "折线图",
          value: 15,
        },
        {
          name: "动态渲染",
          value: 9,
        },
        {
          name: "d3js",
          value: 9,
        },
        {
          name: "饼图",
          value: 16,
        },
        {
          name: "堆叠图",
          value: 15,
        },
        {
          name: "数据处理",
          value: 9,
        },
        {
          name: "canvas",
          value: 9,
        },
      ],
    };
  },
};
</script>
<style scoped>
.overview-container {
  width: 95%;
  height: 20vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
.word-container {
  width: 100%;
  height: 16vh;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  /* background-color: gray; */
  /* 灰色边框 */
  border: 2px solid #92ba92;

  /* background-color: bisque; */
}
.tuli-container {
  width: 100%;
  height: 5vh;
}
.title {
  color: #4cc4d5;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  /* background-color: beige; */
}
.circle-container {
  width: 15vw; /* 与SVG尺寸一致 */
  height: 15vh;
}
</style>