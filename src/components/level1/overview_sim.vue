<template>
  <div ref="container2" class="overview-container">
    <div class="title">Overview</div>
    <div class="header-col">
      <div ref="tuli" class="legend-container"></div>
      <svg ref="chart" style="position: absolute; left: 23%"></svg>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import timeline from "../layer1/timeline.vue";
import { mapState } from "vuex";

export default {
  name: "Overview1",
  components: {
    timeline,
  },
  data() {
    return {
      groupName: ["Nova", "Finn", "Zara", "Ethan", "Lila"],

      //视图2
      groupDisData: [
        //5-1
        //总结，反对，支持，提问
        { label: "A", values: [5, 7, 5, 4, 10] },
        { label: "B", values: [3, 10, 8, 16, 8] },
        { label: "C", values: [14, 5, 15, 13] },
        { label: "D", values: [5, 10, 6, 7] },
        { label: "E", values: [5, 5, 9, 16] },
        // { label: 'w', values: [5, 5, 9, 16] },
      ], //讨论互动模式

      groupTheme: [2, 4, 2, 2, 5],

      memberData: [
        //5-1
        { label: "A", values: [33, 32, 10, 24, 37] },
        { label: "B", values: [10, 40, 20, 58, 23] },
        { label: "C", values: [40, 22, 42, 38] },
        { label: "D", values: [33, 32, 22, 33] },
        { label: "E", values: [50, 20, 33, 42] },
      ], //每个人的讨论时间

      grouptheme: [
        { label: "A", values: [30, 20, 50, 30] },
        { label: "B", values: [50, 8, 52, 58] },
        { label: "C", values: [50, 0, 52, 58] },
        { label: "D", values: [50, 8, 52, 58] },
        { label: "E", values: [50, 0, 110] },
      ],

      grouptheme: [
        { label: "A", values: [30, 20, 50, 30] },
        { label: "B", values: [50, 8, 52, 58] },
        { label: "C", values: [50, 0, 52, 58] },
        { label: "D", values: [50, 8, 52, 58] },
        { label: "E", values: [50, 0, 110] },
      ],
      colorDis: [
        "#FBB885",
        "#FCDCDB",
        "#D9D8ED",
        "#7CB6E4",
        "#727FBD",
        "#254BA0",
      ],

      colors: [
        "#f5d7b0",
        "#d15b56",
        "#c43138",
        "#7ba8a3",
        "#3e909d",
        "#007896",
        "#004e61",
      ], // 讨论主题5-1
      // colorPie: ["#E1BEE7", "#BBDEFB", "#C8E6C9", "#FFF9C4", "#FFCCBC"] // 柔和马卡龙色
      // startDate: "00:08:00",
      // endDate: "00:15:00",
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
    initLegend(width, height) {
      // ============== 在tuli容器中添加图例 ==============
      const legendSvg = d3
        .select(this.$refs.tuli)
        .append("svg")
        .attr("width", width)
        .attr("height", height); // 图例容器高度

      const legend = legendSvg.append("g").attr("transform", "translate(0,0)"); // 图例组偏移

      const MembersAskDuration = this.$store.getters.getMembersAskDurationMap('group1');
      const MembersReplyDuration = this.$store.getters.getMembersReplyDurationMap('group1');
      const MembersName = Object.keys(MembersAskDuration);
      console.log(MembersName);
      for (let i = 0; i < MembersName.length; i++) {
        let text = MembersName[i];
        let group = i;
        legend
          .append("rect")
          .attr("x", 0)
          .attr("y", group * 16)
          .attr("width", 16)
          .attr("height", 16)
          .attr("rx", 3)
          .attr("ry", 3)
          .attr("fill", this.colorDis[group])
          .attr("stroke", "#fff")
          .attr("stroke-width", 1);

        legend
          .append("text")
          .attr("x", 17)
          .attr("y", group * 16 + 10)
          .text(text)
          .style("font-size", "12px")
          .style("font-family", "MingLiU")
          .style("fill", "#7F7F7F")
          .style("dominant-baseline", "middle");
      }
    },
    initChart() {
      const container = this.$refs.container2;
      // 清空容器内的所有子元素（每次绘制前调用）
      d3.select(this.$refs.chart).selectAll("*").remove();

      // 或更精确地只删除 SVG 元素（推荐）
      // d3.select(this.$refs.chart).select("svg").remove();
      const width = container.clientWidth * 0.8;
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

      this.createDonutChart(svg, width, height);

      this.initLegend(width * 0.9, container.clientHeight);

      // this.drawRectanglesBasedOnData(svg, horizontalWidth + verticalWidth, rectWidth, height)
    },
    createDonutChart(svg, width, height) {
      const chartWidth = width; // 每图宽度
      const chartHeight = height; // 行高度

      // 在循环外统一定义箭头（仅执行一次）
      svg
        .append("defs")
        .append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5) // 箭头中心点
        .attr("refY", 5)
        .attr("markerWidth", 3) // 增大显示面积
        .attr("markerHeight", 8)
        .attr("orient", "auto") // 自动方向适应线段角度
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10")
        .style("fill", "#666"); // 箭头填充颜色

      const index = this.$store.getters.getCurrentGroup;
      const MembersAskDuration = this.$store.getters.getMembersAskDurationMap('group1');
      const MembersReplyDuration = this.$store.getters.getMembersReplyDurationMap('group1');
      const GroupThemeSimilarity = this.$store.getters.getGroupThemeSimilarity('group1');


      // ===== 动态中心坐标计算 =====
      const centerX = chartWidth / 2; // 水平居中
      const centerY = chartHeight / 2; // 垂直居中

      // ===== 动态半径计算 =====
      const containerSize = Math.min(chartWidth, chartHeight); // 取宽高中较小值
      const outerRadius = containerSize * 0.5; // 外层半径占可用空间的35%
      const innerRadius = outerRadius * 0.7; // 内层为外层的70%

      // ========== 内层饼图（使用成员values的前半部分） ==========
      const innerValues = Object.values(MembersAskDuration);
      // const innerRadius = chartWidth / 4;
      // 创建阈值判断函数
      const getSliceColorIn = (d, index) => {
        const percentage = d.data / totalInnerValue;
        return percentage > 0.4 || percentage < 0.1 ? "#F77A7A" : "none";
      };

      const totalInnerValue = d3.sum(innerValues);
      const dynamicInnerAngle = (totalInnerValue / 50) * 2 * Math.PI; // 根据总和动态计算角度

      const innerPie = d3
        .pie()
        .startAngle(0)
        .endAngle(dynamicInnerAngle)
        .value((d) => d)
        .sort(null);

      const innerArc = d3
        .arc()
        .innerRadius(innerRadius * 0.7)
        .outerRadius(innerRadius);

      svg
        .selectAll(`.inner-slice-${index}`)
        .data(innerPie(innerValues))
        .enter()
        .append("path")
        .attr("class", `inner-slice-${index}`)
        .attr("d", innerArc)
        .attr("fill", (d, i) => this.colorDis[i % this.colorDis.length])
        // .attr("stroke", function (d, i) {
        //   return getSliceColorIn(d, i);
        // })
        .attr("transform", `translate(${centerX},${centerY})`);

      // ========== 外层饼图（使用成员values的后半部分） ==========
      const outerValues = Object.values(MembersReplyDuration);
      // const outerRadius = chartWidth / 3;
      const totalOuterValue = d3.sum(outerValues);
      const dynamicAngle = (totalOuterValue / 180) * 2 * Math.PI; // 根据总和动态计算角度

      // 创建阈值判断函数
      const getSliceColor = (d, index) => {
        const percentage = d.data / totalOuterValue;
        return percentage > 0.5 || percentage < 0.1 ? "#F77A7A" : "none";
      };

      const outerPie = d3
        .pie()
        .startAngle(0)
        .endAngle(dynamicAngle)
        .value((d) => d)
        .sort(null);

      const outerArc = d3
        .arc()
        .innerRadius(outerRadius * 0.8)
        .outerRadius(outerRadius);

      svg
        .selectAll(`.outer-slice-${index}`)
        .data(outerPie(outerValues))
        .enter()
        .append("path")
        .attr("class", `outer-slice-${index}`)
        .attr("d", outerArc)
        .attr("fill", (d, i) => this.colorDis[i % this.colorDis.length])
        // .attr("stroke", function (d, i) {
        //   return getSliceColor(d, i);
        // })
        .attr("transform", `translate(${centerX},${centerY})`);

      // ========== 添加中心箭头线 ==========
      const lineLength = innerRadius * 0.6; // 线段长度等于外层半径
      const angle = -90 * (Math.PI / 180); // 指向上方（SVG坐标系Y轴向下）

      // 计算线段起点终点
      const lineData = {
        x1: centerX,
        y1: centerY,
        x2: centerX + lineLength * Math.cos(angle),
        y2: centerY + lineLength * Math.sin(angle),
      };

      // 绘制线段
      svg
        .append("line")
        .attr("class", "center-line")
        .attr("x1", lineData.x1)
        .attr("y1", lineData.y1)
        .attr("x2", lineData.x2)
        .attr("y2", lineData.y2)
        .attr("stroke", "#666")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)"); // 添加箭头标记

      // ===== 动态计算角度 =====
      // 数据范围 0~10 映射到角度 180°~0°（0指向上，10指向下）
      const angle2 = (1.5 + GroupThemeSimilarity * 0.1) * Math.PI; // 转换为弧度

      // ===== 动态线段长度 =====
      const lineLength2 = innerRadius * 0.5; // 取内半径的80%

      // 计算终点坐标（考虑SVG坐标系Y轴向下）
      const lineEnd = {
        x: centerX + lineLength2 * Math.cos(angle2),
        y: centerY + lineLength2 * Math.sin(angle2),
      };

      // ===== 绘制线段 =====
      svg
        .append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", lineEnd.x)
        .attr("y2", lineEnd.y)
        .attr("stroke", "#ff6b6b")
        .attr("stroke-width", 1.5)
        .attr("marker-end", "url(#arrowhead)");
    },

    handleResize() {
      d3.select(this.$refs.chart).selectAll("*").remove();
      this.initChart();
      d3.select(this.$refs.tuli).selectAll("*").remove();
      this.initLegend();
    },
  },
  computed: {
    ...mapState(["groupOverview"]), // 映射 count 到计算属性
  },
  watch: {
    // 监听 groupOverview 变化
    groupOverview(newVal, oldVal) {
      d3.select(this.$refs.chart).select("svg").remove();
      d3.select(this.$refs.tuli).select("svg").remove();
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

/* .title {
  color: #d7d7d7;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
} */

/* 新增header布局样式 */
.header-col {
  position: relative;
  display: flex;
  flex-direction: row; /* 改为垂直排列 */
}

.legend-container {
  height: 0px; /* 与图例高度一致 */
  background-color: black;
}
</style>
