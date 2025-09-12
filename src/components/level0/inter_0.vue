<template>
  <div ref="container2" class="overview-container">
    <div class="title">Interaction</div>
    <div><svg ref="chart"></svg></div>
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
      data: [
        [
          0,
          [
            [0, 0.5],
            [1, 0.5],
            [2, 0.5],
            [3, 0.5],
          ],
        ],
        [
          1,
          [
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [3.25, 1.25],
            [3.5, 0.75],
            [3.75, 1.25],
            [4, 0.75],
            [4.25, 1.25],
          ],
        ],
        [
          2,
          [
            [0, 1.5],
            [1, 1.5],
            [2, 1.5],
            [3, 1.5],
          ],
        ],
      ],
      time: 10,
      length: 4,
      color: ["#e1cfb6", "#c79b68", "#47596f", "#671827", "#3d2832"],
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
    makePlotSettings(width, height) {
      const maxTime = this.time;
      return {
        maxTime,
        scales: {
          x: d3.scaleLinear().domain([0, maxTime]).range([0, width]),
          y: d3.scaleLinear().domain([0, this.length]).range([10, height]),
          color: d3.interpolateYlGnBu,
        },
      };
    },

    initChart() {
      function generateLineData(n, intervalsArray, time) {
        const result = [];
        const amplitude = 0.25; // 固定波动幅度

        for (let lineIdx = 0; lineIdx < n; lineIdx++) {
          const baseline = 0.5 + lineIdx * 0.5;
          const intervals = intervalsArray[lineIdx];
          const points = [];

          // 修复1：正确计算最大时间
          const maxTime = time;

          // 生成时间点（步长0.25秒）
          for (let time = 0; time <= maxTime; time += 0.25) {
            time = parseFloat(time.toFixed(2)); // 保持精度
            let y = baseline;
            let isJitter = false;

            // // 检查每个抖动区间
            // for (const [start, end] of intervals) {
            //   if (time >= start && time <= end) {
            //     const steps = Math.round((time - start) / 0.25);
            //     if (steps >= 0) {
            //       // 修复2：包含起始点
            //       y = baseline + (steps % 2 === 1 ? amplitude : -amplitude);
            //       isJitter = true;
            //     }
            //     break;
            //   }
            // }

            points.push([time, parseFloat(y.toFixed(2))]);
          }

          result.push([lineIdx, points]);
        }

        return result;
      }
      // 使用示例
      const sampleIntervals = [
        [
          [2, 3],
          [8, 9],
        ], // 第0条线的抖动区间
        [[3, 4.25]], // 第1条线的抖动区间
        [[2, 3]],
        [[5, 6]],
        [[9, 10]], // 第2条线的抖动区间
      ];

      //   console.log(generateLineData(3, sampleIntervals));
      this.data = generateLineData(5, sampleIntervals, this.time);
      const container = this.$refs.container2;
      // 清空容器内的所有子元素（每次绘制前调用）
      d3.select(this.$refs.chart).selectAll("*").remove();

      const width = container.clientWidth;
      const height = container.clientHeight;

      // 创建基础SVG
      const svg = d3
        .select(this.$refs.chart)
        .attr("width", width)
        .attr("height", height);
      // 修改后的绘制逻辑
      const lines = svg.append("g");

      const settings = this.makePlotSettings(width, height);
      const { scales } = settings;

      lines
        .selectAll(".line")
        .data(this.data)
        .join("g")
        .each((d, i, nodes) => {
          const lineGroup = d3.select(nodes[i]);
          const timeData = d[1];
          const intervals = sampleIntervals[i];

          // 生成直线路径生成器
          const lineGenerator = d3
            .line()
            .defined(([t]) => !isNaN(t)) // 过滤无效数据
            .x(([t]) => scales.x(t))
            .y(([_, y]) => scales.y(y));

          // 分割数据段
          let currentColor = "black";
          let segmentPoints = [];

          timeData.forEach((point, idx) => {
            const [t] = point;
            let inInterval = intervals.some(
              ([start, end]) => t >= start && t <= end
            );

            // 颜色切换时绘制当前段
            if (inInterval !== (currentColor === "red")) {
              if (segmentPoints.length > 0) {
                lineGroup
                  .append("path")
                  .attr("d", lineGenerator(segmentPoints))
                  .attr("stroke", currentColor)
                  .attr("fill", "none")
                  .attr("stroke-width", 3);
              }
              currentColor = inInterval ? "red" : "black";
              segmentPoints = [];
            }

            segmentPoints.push(point);
          });

          // 绘制最后一段
          if (segmentPoints.length > 0) {
            lineGroup
              .append("path")
              .attr("d", lineGenerator(segmentPoints))
              .attr("stroke", currentColor)
              .attr("fill", "none")
              .attr("stroke-width", 3);
          }
        });
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
