<template>
  <div ref="container" class="overview-container">
    <div class="title">Theme Review</div>
    <svg ref="bond"></svg>

    <!-- <div v-if="layer == 1">
      <div class="title">Member Review</div>
      <svg ref="bond" style="width: 100%"></svg>
    </div> -->

    <!-- <svg ref="chart" style="width: 100%;"></svg> -->

    <!-- <wordcloud :data="defaultWords" nameKey="name" valueKey="value" :color="myColors" :showTooltip="true"
            :wordClick="wordClickHandler">
        </wordcloud> -->
  </div>
</template>
<script>
import * as d3 from "d3";
import cloud from "../layer1/d3.layout.cloud";
import wordcloud from "vue-wordcloud";
import { mapState } from "vuex";
export default {
  components: {
    wordcloud,
  },
  data() {
    return {
      layer: 0,
      rectH: 5,
      // groupdata: [
      //   {
      //     name: "Alice",
      //     color: "red",
      //     points: [
      //       { time: 0, value: 1 },
      //       { time: 1, value: 1 },
      //       { time: 2, value: 1 },
      //       { time: 3, value: 1 },
      //       { time: 4, value: 1 },
      //       { time: 8, value: 1 },
      //       { time: 9.5, value: 1.6 },
      //       { time: 13, value: 1.6 },
      //       { time: 15, value: 1 },
      //       { time: 20, value: 1 },
      //     ],
      //   },
      //   {
      //     name: "Bob",
      //     color: "green",
      //     points: [
      //       { time: 0, value: 2 },
      //       { time: 0.5, value: 2 },
      //       { time: 1, value: 2.5 },
      //       { time: 2, value: 2.5 },
      //       { time: 3, value: 2.5 },
      //       { time: 4, value: 2.5 },
      //       { time: 8, value: 2.5 },
      //       { time: 9.5, value: 4 },
      //       { time: 13, value: 4 },
      //       { time: 15, value: 3.2 },
      //       { time: 20, value: 3.2 },
      //     ],
      //   },
      //   {
      //     name: "Clare",
      //     color: "black",
      //     points: [
      //       { time: 0, value: 3 },
      //       { time: 1, value: 3 },
      //       { time: 2, value: 3 },
      //       { time: 3, value: 3 },
      //       { time: 3.5, value: 2.7 },
      //       { time: 4, value: 2.7 },
      //       { time: 8, value: 2.7 },
      //       { time: 9.5, value: 2.3 },
      //       { time: 13, value: 2.3 },
      //       { time: 15, value: 2.7 },
      //       { time: 20, value: 2.7 },
      //     ],
      //   },
      //   {
      //     name: "Dog",
      //     color: "brown",
      //     points: [
      //       { time: 0, value: 4 },
      //       { time: 1, value: 4 },
      //       { time: 2, value: 4 },
      //       { time: 3, value: 4 },
      //       { time: 3.5, value: 3 },
      //       { time: 4, value: 3 },
      //       { time: 8, value: 3 },
      //       { time: 9, value: 5 },
      //       { time: 13, value: 5 },
      //       { time: 20, value: 5 },
      //     ],
      //   },
      // ],
      timemax: 20,
      // bubbleSpecs: [
      //   {
      //     x: 1,
      //     width: 7,
      //     y: 1.5,
      //     height: 2,
      //     radius: 10,
      //     color: "gold",
      //   },
      //   {
      //     x: 9,
      //     width: 5,
      //     y: 1.5,
      //     height: 1,
      //     radius: 8,
      //     color: "lightblue",
      //   },
      //   {
      //     x: 15,
      //     width: 5,
      //     y: 2.5,
      //     height: 1,
      //     radius: 8,
      //     color: "lightgreen",
      //   },
      // ],
      bubbleSpecs: [
        {
          x: 0,
          width: 5,
          y: 2.5,
          height: 5,
          radius: 10,
          color: "gold",
          words: [
            { text: "Design", size: 8 },
            // { text: "Prototype", size: 9 },
            // { text: "Testing", size: 3 },
            // { text: "Design1", size: 7 },
            // { text: "Prototype1", size: 8 },
            // { text: "Testing1", size: 9 },
            // { text: "Design1", size: 17 },
            // { text: "Protot1ype", size: 18 },
            // { text: "Testi1ng", size: 19 },
          ],
        },
        {
          x: 6,
          width: 5,
          y: 2.5,
          height: 5,
          radius: 8,
          color: "lightblue",
          words: [
            { text: "Analysis", size: 9 },
            { text: "Data", size: 7 },
            // { text: "Metrics", size: 16 }
          ],
        },
        {
          x: 12,
          width: 5,
          y: 2.5,
          height: 5,
          radius: 8,
          color: "lightgreen",
          words: [
            { text: "Analysis", size: 9 },
            { text: "Data", size: 7 },
            // { text: "Metrics", size: 16 }
          ],
        },
      ],
    };
  },
  mounted() {
    // this.drawStroyLine();
    this.drawTheme();
  },

  methods: {
    // wordClickHandler(name, value, vm) {
    //     console.log('wordClickHandler', name, value, vm);
    // },

    drawTheme() {
      const container = this.$refs.container;
      // const width = container.clientWidth;
      // const height = container.clientHeight;
      // let data = this.groupdata;
      // const width = 4000;
      // const height = 300;
      const padding = 0;
      const width = container.clientWidth;

      const height = container.clientHeight;

      const rectH = 5; //长方形固定高度

      // 创建基础SVG
      const svg = d3
        .select(this.$refs.bond)
        .attr("width", width)
        .attr("height", height);

      // const allValues = data.flatMap((d) => d.points.map((p) => p.value));
      const xScale = d3
        .scaleLinear()
        .domain([0, this.timemax])
        .range([10, width - 10]);

      const yScale = d3.scaleLinear().domain([0, 10]).range([height, 0]);

      // 手动绘制X轴
      const axisYPosition = height / 2.5; // 轴线垂直位置
      const tickSize = 6; // 端点竖线高度

      // 绘制水平主线
      svg
        .append("path")
        .attr("d", `M${xScale(0)},${axisYPosition} H${xScale(this.timemax)}`)
        .attr("stroke", "#333")
        .attr("stroke-width", 1.5)
        .attr("fill", "none");

      // 绘制左端竖线
      svg
        .append("path")
        .attr(
          "d",
          `M${xScale(0)},${axisYPosition - tickSize} V${
            axisYPosition + tickSize
          }`
        )
        .attr("stroke", "#333")
        .attr("stroke-width", 1.5);

      // 绘制右端竖线
      svg
        .append("path")
        .attr(
          "d",
          `M${xScale(this.timemax)},${axisYPosition - tickSize} V${
            axisYPosition + tickSize
          }`
        )
        .attr("stroke", "#333")
        .attr("stroke-width", 1.5);

      // // 添加左侧标签
      // svg.append("text")
      //     .attr("class", "axis-label")
      //     .attr("x", xScale(0))         // X位置对齐轴线起点
      //     .attr("y", axisYPosition)     // Y位置对齐轴线
      //     .attr("dx", "-0.5em")         // 向左微调半个字符宽度
      //     .attr("dy", "0.3em")          // 垂直居中调整
      //     .style("font-size", "12px")
      //     .style("fill", "#333")
      //     .style("text-anchor", "end")  // 文字右对齐
      //     .text("Theme");
      // 定义多个标注矩形参数
      // const bubbleSpecs = [
      //     {
      //         x: 1, width: 7,
      //         y: 0, height: 10,
      //         radius: 10,
      //         color: "gold"
      //     },
      //     {
      //         x: 9, width: 5,
      //         y: 0, height: 10,
      //         radius: 8,
      //         color: "lightblue"
      //     }
      // ];

      // 定义带词云数据的矩形参数
      const bubbleSpecs = this.bubbleSpecs;
      // 创建矩形组容器
      const rectGroups = svg
        .selectAll(".annotation-group")
        .data(bubbleSpecs)
        .enter()
        .append("g")
        .attr("class", "annotation-group")
        .attr(
          "transform",
          (d) => `translate(${xScale(d.x) + 10},${yScale(d.y + d.height) - 15})`
        );
      // 词云布局配置
      // 绘制半透明矩形
      rectGroups
        .append("rect")
        .attr("class", "annotation-rect")
        .attr("width", (d) => xScale(d.width) - xScale(0))
        .attr("height", (d) => yScale(0) - yScale(d.height))
        .attr("rx", (d) => d.radius)
        .attr("ry", (d) => d.radius)
        .attr("fill", (d) => d.color)
        .attr("fill-opacity", 0.5)
        .attr("stroke", (d) => d3.color(d.color).darker())
        .attr("stroke-width", 1);
      // .attr("stroke-dasharray", "3,2");

      // 为每个矩形创建词云
      rectGroups.each(function (d) {
        const group = d3.select(this);
        const rectWidth = xScale(d.width) - xScale(0);
        const rectHeight = yScale(0) - yScale(d.height);

        // 词云布局配置
        const layout = cloud()
          // .size([rectWidth, rectHeight]) // 保留10%边距
          // .center([rectWidth / 2, rectHeight / 2])
          .words(d.words)
          .random(() => 0.5) // 固定随机种子
          .rotate(() => 0) // 暂时禁用旋转
          .spiral("rectangular") // 使用更紧凑的布局算法
          .fontSize((w) => w.size)
          // .spiral("spiralValue")
          .on("end", (words) => {
            group
              .selectAll(".cloud-text")
              .data(words)
              .enter()
              .append("text")
              .attr("class", "cloud-text")
              .style("font-size", (w) => `${w.size}px`)
              .style("fill", "#333")
              .style("font-family", "Arial")
              .attr("text-anchor", "middle")
              .attr(
                "transform",
                (w) =>
                  `translate(${w.x + rectWidth / 2},${w.y + rectHeight / 2})`
              )
              .text((w) => w.text);
          });

        layout.start();
      });
    },
  },
  computed: {
    ...mapState(["overviewLayer"]), // 映射 count 到计算属性
  },
  watch: {
    // 监听 count 变化
    // overviewLayer(newVal, oldVal) {
    //   this.layer = 1;
    //   console.log("overviewLayer变化:", oldVal, "→", newVal);
    // },
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

/* .overview-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  border: 1px solid #f0f2f5;
  background: linear-gradient(45deg, #4bc0c0, #4b65c0) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
} */

/* 在组件样式部分添加 */
.cloud-text {
  pointer-events: none;
  /* 防止文字干扰鼠标事件 */
  user-select: none;
  /* 禁止文字选择 */
}

.annotation-rect {
  transition: opacity 0.3s;
}

.annotation-rect:hover {
  opacity: 0.8;
}

.title {
  color: #4cc4d5;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  /* background-color: beige; */
}
</style>