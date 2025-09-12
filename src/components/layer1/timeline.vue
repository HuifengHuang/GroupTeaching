<template>
  <div ref="containerTimeline12" class="overview-container">
    <!-- <div ref="chart1231" id="chartTimeline"></div> -->
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapState } from "vuex";

export default {
  name: "timeline",
  data() {
    return {
      // data: [
      //   { x: 0, y: 20 },
      //   { x: 1, y: 30 },
      //   { x: 2, y: 50 },
      //   { x: 3, y: 40 },
      //   { x: 4, y: 60 },
      //   { x: 5, y: 5 },
      // ],
      // data2: [
      //   { x: 0, y: 20 },
      //   { x: 1, y: 30 },
      //   { x: 2, y: 50 },
      //   { x: 3, y: 40 },
      //   { x: 4, y: 60 },
      //   { x: 5, y: 5 },
      // ],

      // layers: [
      //   // 第一层：基础高频波动层（峰值x=5）
      //   [
      //     { x: 0, y: 5 },
      //     { x: 1, y: 38 },
      //     { x: 2, y: 65 },
      //     { x: 3, y: 42 },
      //     { x: 4, y: 81 },
      //     { x: 5, y: 173 },
      //     { x: 6, y: 58 },
      //     { x: 7, y: 32 },
      //     { x: 8, y: 71 },
      //     { x: 9, y: 129 },
      //     { x: 10, y: 44 },
      //     { x: 11, y: 23 },
      //     { x: 12, y: 87 },
      //   ],

      //   // 第二层：双峰震荡层（主峰x=8，次峰x=3）
      //   [
      //     { x: 0, y: 8 },
      //     { x: 1, y: 24 },
      //     { x: 2, y: 47 },
      //     { x: 3, y: 42 },
      //     { x: 4, y: 63 },
      //     { x: 5, y: 55 },
      //     { x: 6, y: 39 },
      //     { x: 7, y: 68 },
      //     { x: 8, y: 195 },
      //     { x: 9, y: 77 },
      //     { x: 10, y: 31 },
      //     { x: 11, y: 18 },
      //     { x: 12, y: 53 },
      //   ],

      //   // 第三层：随机尖峰层（随机分布3个尖峰）
      //   [
      //     { x: 0, y: 5 },
      //     { x: 1, y: 31 },
      //     { x: 2, y: 18 },
      //     { x: 3, y: 64 },
      //     { x: 4, y: 9 },
      //     { x: 5, y: 37 },
      //     { x: 6, y: 83 },
      //     { x: 7, y: 15 },
      //     { x: 8, y: 197 },
      //     { x: 9, y: 6 },
      //     { x: 10, y: 128 },
      //     { x: 11, y: 42 },
      //     { x: 12, y: 73 },
      //   ],

      //   // 第四层：周期脉冲层（每4个单位出现脉冲）
      //   [
      //     { x: 0, y: 10 },
      //     { x: 1, y: 22 },
      //     { x: 2, y: 18 },
      //     { x: 3, y: 35 },
      //     { x: 4, y: 203 },
      //     { x: 5, y: 29 },
      //     { x: 6, y: 41 },
      //     { x: 7, y: 15 },
      //     { x: 8, y: 179 },
      //     { x: 9, y: 32 },
      //     { x: 10, y: 27 },
      //     { x: 11, y: 48 },
      //     { x: 12, y: 192 },
      //   ],
      //   // // 第五层：趋势波动+随机峰值层（x=2,5,9为异常峰值）
      //   [
      //     { x: 0, y: 8 },
      //     { x: 1, y: 82 },
      //     { x: 2, y: 57 }, // 峰值1（趋势值158的2倍）
      //     { x: 3, y: 134 },
      //     { x: 4, y: 189 },
      //     { x: 5, y: 173 }, // 峰值2（趋势值136的2倍）
      //     { x: 6, y: 103 }, // 趋势顶点
      //     { x: 7, y: 178 },
      //     { x: 8, y: 132 },
      //     { x: 9, y: 245 }, // 峰值3（趋势值123的2倍）
      //     { x: 10, y: 87 },
      //     { x: 11, y: 53 },
      //     { x: 12, y: 28 },
      //   ],
      // ],
      layers: [
        // 第一层：三峰值层（x=3、x=7、x=11）
        [
          { x: 0, y: 15 },
          { x: 1, y: 25 },
          { x: 2, y: 40 },
          { x: 3, y: 90 }, // 峰值1
          { x: 4, y: 20 },
          { x: 5, y: 70 },
          { x: 6, y: 25 },
          { x: 7, y: 110 }, // 峰值2（全局最高）
          { x: 8, y: 50 },
          { x: 9, y: 55 },
          { x: 10, y: 35 },
          { x: 11, y: 100 }, // 峰值3
          { x: 12, y: 40 },
        ],

        // 第二层：总量最小层（局部小波动）
        [
          { x: 0, y: 15 },
          { x: 1, y: 10 },
          { x: 2, y: 25 }, // 小峰值1
          { x: 3, y: 10 },
          { x: 4, y: 15 },
          { x: 5, y: 18 },
          { x: 6, y: 23 }, // 小峰值2
          { x: 7, y: 10 },
          { x: 8, y: 15 },
          { x: 9, y: 18 },
          { x: 10, y: 12 }, // 小峰值3
          { x: 11, y: 10 },
          { x: 12, y: 15 },
        ],

        // 第三层：总量最大层（四峰值，x=2、5、8、12为突出峰值）
        [
          { x: 0, y: 25 },
          { x: 1, y: 45 },
          { x: 2, y: 120 }, // 峰值1
          { x: 3, y: 30 },
          { x: 4, y: 40 },
          { x: 5, y: 150 }, // 峰值2
          { x: 6, y: 50 },
          { x: 7, y: 60 },
          { x: 8, y: 140 }, // 峰值3
          { x: 9, y: 100 },
          { x: 10, y: 30 },
          { x: 11, y: 50 },
          { x: 12, y: 160 }, // 峰值4（全局最高）
        ],
        // 第五层：趋势上升+双峰层（x=5、x=9为峰值）
        [
          { x: 0, y: 10 },
          { x: 1, y: 20 },
          { x: 2, y: 30 },
          { x: 3, y: 40 },
          { x: 4, y: 50 },
          { x: 5, y: 100 }, // 峰值1
          { x: 6, y: 80 },
          { x: 7, y: 90 },
          { x: 8, y: 60 },
          { x: 9, y: 130 }, // 峰值2（高于峰值1）
          { x: 10, y: 80 },
          { x: 11, y: 50 },
          { x: 12, y: 30 },
        ],

        // 第四层：双周期脉冲层（每6个单位一对脉冲）
        [
          { x: 0, y: 10 },
          { x: 1, y: 20 },
          { x: 2, y: 30 },
          { x: 3, y: 50 }, // 脉冲1
          { x: 4, y: 20 }, // 脉冲2（高于脉冲1）
          { x: 5, y: 70 },
          { x: 6, y: 40 },
          { x: 7, y: 50 },
          { x: 8, y: 60 },
          { x: 9, y: 100 }, // 脉冲3
          { x: 10, y: 70 }, // 脉冲4（高于脉冲3）
          { x: 11, y: 50 },
          { x: 12, y: 40 },
        ],
      ],
      colors: ["#2c516e", "#4c956c", "#fefee3", "#ffc9b9", "#d68c45"], // 分层颜色
      width: 600,
      height: 400,
      margin: { top: 20, right: 20, bottom: 50, left: 20 }, // 增加底部边距

      x: null,
      y: null,
      curveGenerator: null,
      areaGenerator: null,
      svg: null,
      selectionBox: null,
      leftDragEdge: null,
      rightDragEdge: null,
      dragOffsetX: 0,
      selectionBoxWidth: null,
      ballRadius: 5,
      topLeftBall: null,
      topRightBall: null,
      bottomLeftBall: null,
      bottomRightBall: null,
      curcolor: "#f1ddbf",
      selecolor: "#525e75",
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    d3.select(this.$refs.containerTimeline12).selectAll("*").remove();
  },
  methods: {
    initChart() {
      const chart = this.$refs.containerTimeline12;
      d3.select(chart).select("svg").remove();
      const width = chart.clientWidth;
      this.width = width;
      this.height = chart.clientHeight;

      // 创建SVG容器
      this.svg = d3
        .select(chart)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

      // 生成堆叠数据
      const stack = d3
        .stack()
        .keys(d3.range(this.layers.length))
        .value((d, key) => this.layers[key][d].y);

      const stackedData = stack(d3.range(this.layers[0].length));

      // 初始化比例尺
      this.x = d3
        .scaleLinear()
        .domain([
          d3.min(
            this.layers.flatMap((layer) => layer),
            (d) => d.x
          ),
          d3.max(
            this.layers.flatMap((layer) => layer),
            (d) => d.x
          ),
        ])
        .range([0, this.width]);

      this.y = d3
        .scaleLinear()
        .domain([
          10,
          d3.max(stackedData, (layer) => d3.max(layer, (d) => d[1])),
        ])
        .range([this.height - 2 * this.ballRadius, 5]);

      // 创建区域生成器
      this.areaGenerator = d3
        .area()
        .x((d, i) => this.x(this.layers[0][i].x))
        .y0((d) => this.y(d[0]))
        .y1((d) => this.y(d[1]))
        .curve(d3.curveCatmullRom.alpha(0.5));

      // 绘制堆叠层
      this.svg
        .selectAll(".layer")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", "layer")
        .style("fill", (d, i) => this.colors[i])
        .style("opacity", 0.8)
        .attr("d", this.areaGenerator);

      // 初始化交互元素
      this.initSelectionBox();
    },
    // initChart() {
    //   const chart = this.$refs.containerTimeline12;
    //   // 或更精确地只删除 SVG 元素（推荐）
    //   d3.select(chart).select("svg").remove();
    //   const width = chart.clientWidth;
    //   this.width = width;
    //   this.height = chart.clientHeight;
    //   this.svg = d3
    //     .select(chart)
    //     .append("svg")
    //     .attr("width", this.width)
    //     .attr("height", this.height);
    //   // .append("g")  // 重新启用分组并应用边距
    //   // .append("g")
    //   // .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    //   this.x = d3
    //     .scaleLinear()
    //     .domain([d3.min(this.data, (d) => d.x), d3.max(this.data, (d) => d.x)]) // 数据x的实际范围
    //     .range([0, this.width]); // 占满容器宽度
    //   // .padding(0.1);

    //   this.y = d3
    //     .scaleLinear()
    //     .domain([0, d3.max(this.data, (d) => d.y)])
    //     .range([this.height - 2 * this.ballRadius, 0]);

    //   // this.curveGenerator = d3.line()
    //   //     .x(d => this.x(d.x))
    //   //     .y(d => this.y(d.y))
    //   //     .curve(d3.curveCatmullRom.alpha(0.5));

    //   this.areaGenerator = d3
    //     .area()
    //     .x((d) => this.x(d.x))
    //     .y0(this.height - 2 * this.ballRadius)
    //     .y1((d) => this.y(d.y))
    //     .curve(d3.curveCatmullRom.alpha(0.5));

    //   // 创建堆叠布局
    //   const stack = d3
    //     .stack()
    //     .keys(d3.range(this.layers.length))
    //     .value((d, key) => this.layers[key][d].y);

    //   const stackedData = stack(d3.range(this.layers[0].length));

    //   // 计算y轴最大值
    //   const maxY = d3.max(stackedData, (layer) => d3.max(layer, (d) => d[1]));

    //   this.y.domain([0, maxY]);

    //   // 绘制堆叠区域
    //   this.svg
    //     .selectAll(".layer")
    //     .data(stackedData)
    //     .enter()
    //     .append("path")
    //     .attr("class", "layer")
    //     .style("fill", (d, i) => this.colors[i])
    //     .attr(
    //       "d",
    //       this.areaGenerator
    //         .x((d, i) => this.x(this.layers[0][i].x))
    //         .y0((d) => this.y(d[0]))
    //         .y1((d) => this.y(d[1]))
    //     );

    //   // this.drawArea();
    //   // this.drawCurve();
    //   this.initSelectionBox();
    // },
    drawArea() {
      this.svg
        .append("path")
        .datum(this.data)
        .attr("fill", this.curcolor)
        .attr("d", this.areaGenerator);
    },
    drawCurve() {
      this.svg
        .append("path")
        .datum(this.data)
        .attr("fill", "none")
        .attr("stroke", this.curcolor)
        .attr("stroke-width", 15)
        .attr("d", this.curveGenerator);
    },
    initSelectionBox() {
      this.selectionBoxWidth = 10;
      this.selectionBox = this.svg
        .append("rect")
        .attr("fill", this.selecolor)
        // .attr('stroke', this.selecolor)
        .attr("opacity", 0.6)
        .attr("x", this.x(0) + 0.5 * this.selectionBoxWidth)
        .attr("y", -this.ballRadius)
        .attr("width", this.selectionBoxWidth)
        .attr("height", this.height)
        .call(
          d3
            .drag()
            .on("start", this.dragstarted.bind(this))
            .on("drag", this.dragged.bind(this))
            .on("end", this.dragended.bind(this))
        );

      this.createDragEdges();
      this.createDragBalls();
    },
    createDragEdges() {
      this.leftDragEdge = this.svg
        .append("rect")
        .attr("class", "drag-edge")
        .attr("fill", "transparent")
        .attr("cursor", "ew-resize")
        .attr("x", this.x(0))
        .attr("y", 0)
        .attr("width", 5)
        .attr("height", this.height)
        .call(
          d3
            .drag()
            .on("start", this.dragEdgeStarted.bind(this))
            .on("drag", this.leftEdgeDragged.bind(this))
            .on("end", this.dragEdgeEnded.bind(this))
        );

      this.rightDragEdge = this.svg
        .append("rect")
        .attr("class", "drag-edge")
        .attr("fill", "transparent")
        .attr("cursor", "ew-resize")
        .attr("x", this.x(0) + this.selectionBoxWidth - 5)
        .attr("y", 0)
        .attr("width", 5)
        .attr("height", this.height)
        .call(
          d3
            .drag()
            .on("start", this.dragEdgeStarted.bind(this))
            .on("drag", this.rightEdgeDragged.bind(this))
            .on("end", this.dragEdgeEnded.bind(this))
        );
    },
    createDragBalls() {
      this.topLeftBall = this.svg
        .append("circle")
        .attr("class", "drag-ball")
        .attr("fill", "blue")
        .attr("cursor", "ew-resize")
        .attr("cx", parseFloat(this.selectionBox.attr("x")))
        .attr("cy", parseFloat(this.selectionBox.attr("y")) + this.height)
        .attr("r", this.ballRadius)
        .call(
          d3
            .drag()
            .on("start", this.ballDragStarted.bind(this))
            .on("drag", this.topLeftBallDragged.bind(this))
            .on("end", this.ballDragEnded.bind(this))
        );

      this.topRightBall = this.svg
        .append("circle")
        .attr("class", "drag-ball")
        .attr("fill", "blue")
        .attr("cursor", "ew-resize")
        .attr(
          "cx",
          parseFloat(this.selectionBox.attr("x")) + this.selectionBoxWidth
        )
        .attr("cy", parseFloat(this.selectionBox.attr("y")) + this.height)
        .attr("r", this.ballRadius)
        .call(
          d3
            .drag()
            .on("start", this.ballDragStarted.bind(this))
            .on("drag", this.topRightBallDragged.bind(this))
            .on("end", this.ballDragEnded.bind(this))
        );

      this.bottomLeftBall = this.svg
        .append("circle")
        .attr("class", "drag-ball")
        .attr("fill", "white")
        .attr("stroke", this.selecolor)
        .attr("cursor", "point")
        .attr("cx", parseFloat(this.selectionBox.attr("x")))
        .attr("cy", parseFloat(this.selectionBox.attr("y")) + this.height)
        .attr("r", this.ballRadius)
        .call(
          d3
            .drag()
            .on("start", this.ballDragStarted.bind(this))
            .on("drag", this.bottomLeftBallDragged.bind(this))
            .on("end", this.ballDragEnded.bind(this))
        );

      this.bottomRightBall = this.svg
        .append("circle")
        .attr("class", "drag-ball")
        .attr("fill", "white")
        .attr("stroke", this.selecolor)
        .attr("cursor", "point")
        .attr(
          "cx",
          parseFloat(this.selectionBox.attr("x")) + this.selectionBoxWidth
        )
        .attr("cy", parseFloat(this.selectionBox.attr("y")) + this.height)
        .attr("r", this.ballRadius)
        .call(
          d3
            .drag()
            .on("start", this.ballDragStarted.bind(this))
            .on("drag", this.bottomRightBallDragged.bind(this))
            .on("end", this.ballDragEnded.bind(this))
        );
    },
    dragstarted(event) {
      event.subject.initialX = parseFloat(this.selectionBox.attr("x"));
      this.dragOffsetX = event.x - event.subject.initialX;
    },
    dragged(event) {
      const newX = Math.max(
        0,
        Math.min(
          this.width - this.selectionBoxWidth,
          event.x - this.dragOffsetX
        )
      );
      this.selectionBox.attr("x", newX);
      this.leftDragEdge.attr("x", newX);
      this.rightDragEdge.attr("x", newX + this.selectionBoxWidth - 5);
      this.updateDragBalls();
    },
    dragended(event) {
      console.log(
        `Selection box at (${parseFloat(
          this.selectionBox.attr("x")
        )}, 0) with size (${this.selectionBoxWidth}, ${this.height})`
      );
    },
    dragEdgeStarted(event) {
      event.subject.initialX = parseFloat(this.selectionBox.attr("x"));
      event.subject.initialWidth = parseFloat(this.selectionBox.attr("width"));
    },
    leftEdgeDragged(event) {
      const newX = Math.max(
        0,
        Math.min(
          event.subject.initialX + event.subject.initialWidth - 10,
          event.x
        )
      );
      const newWidth =
        event.subject.initialWidth + (event.subject.initialX - newX);
      this.selectionBox.attr("x", newX).attr("width", newWidth);
      this.leftDragEdge.attr("x", newX);
      this.rightDragEdge.attr("x", newX + newWidth - 5);
      this.selectionBoxWidth = newWidth;
      this.updateDragBalls();
    },
    rightEdgeDragged(event) {
      const newWidth = Math.max(
        10,
        Math.min(
          this.width - parseFloat(this.selectionBox.attr("x")),
          event.subject.initialWidth +
            (event.x - (event.subject.initialX + event.subject.initialWidth))
        )
      );
      this.selectionBox.attr("width", newWidth);
      this.rightDragEdge.attr(
        "x",
        parseFloat(this.selectionBox.attr("x")) + newWidth - 5
      );
      this.selectionBoxWidth = newWidth;
      this.updateDragBalls();
    },
    dragEdgeEnded(event) {
      console.log(
        `Selection box at (${parseFloat(
          this.selectionBox.attr("x")
        )}, 0) with size (${parseFloat(this.selectionBox.attr("width"))}, ${
          this.height
        })`
      );
    },
    updateDragBalls() {
      this.topLeftBall
        .attr("cx", parseFloat(this.selectionBox.attr("x")))
        .attr("cy", parseFloat(this.selectionBox.attr("y")) + this.height);
      this.topRightBall
        .attr(
          "cx",
          parseFloat(this.selectionBox.attr("x")) + this.selectionBoxWidth
        )
        .attr("cy", parseFloat(this.selectionBox.attr("y")) + this.height);
      this.bottomLeftBall
        .attr("cx", parseFloat(this.selectionBox.attr("x")))
        .attr("cy", parseFloat(this.selectionBox.attr("y")) + this.height);
      this.bottomRightBall
        .attr(
          "cx",
          parseFloat(this.selectionBox.attr("x")) + this.selectionBoxWidth
        )
        .attr("cy", parseFloat(this.selectionBox.attr("y")) + this.height);
    },
    ballDragStarted(event) {
      event.subject.initialX = parseFloat(this.selectionBox.attr("x"));
      event.subject.initialWidth = parseFloat(this.selectionBox.attr("width"));
    },
    topLeftBallDragged(event) {
      const newX = Math.max(
        0,
        Math.min(
          event.subject.initialX + event.subject.initialWidth - 10,
          event.x
        )
      );
      const newWidth =
        event.subject.initialWidth + (event.subject.initialX - newX);
      this.selectionBox.attr("x", newX).attr("width", newWidth);
      this.leftDragEdge.attr("x", newX);
      this.rightDragEdge.attr("x", newX + newWidth - 5);
      this.selectionBoxWidth = newWidth;
      this.updateDragBalls();
    },
    topRightBallDragged(event) {
      const newWidth = Math.max(
        10,
        Math.min(
          this.width - parseFloat(this.selectionBox.attr("x")),
          event.subject.initialWidth +
            (event.x - (event.subject.initialX + event.subject.initialWidth))
        )
      );
      this.selectionBox.attr("width", newWidth);
      this.rightDragEdge.attr(
        "x",
        parseFloat(this.selectionBox.attr("x")) + newWidth - 5
      );
      this.selectionBoxWidth = newWidth;
      this.updateDragBalls();
    },
    bottomLeftBallDragged(event) {
      const newX = Math.max(
        0,
        Math.min(
          event.subject.initialX + event.subject.initialWidth - 10,
          event.x
        )
      );
      const newWidth =
        event.subject.initialWidth + (event.subject.initialX - newX);
      this.selectionBox.attr("x", newX).attr("width", newWidth);
      this.leftDragEdge.attr("x", newX);
      this.rightDragEdge.attr("x", newX + newWidth - 5);
      this.selectionBoxWidth = newWidth;
      this.updateDragBalls();
    },
    bottomRightBallDragged(event) {
      const newWidth = Math.max(
        10,
        Math.min(
          this.width - parseFloat(this.selectionBox.attr("x")),
          event.subject.initialWidth +
            (event.x - (event.subject.initialX + event.subject.initialWidth))
        )
      );
      this.selectionBox.attr("width", newWidth);
      this.rightDragEdge.attr(
        "x",
        parseFloat(this.selectionBox.attr("x")) + newWidth - 5
      );
      this.selectionBoxWidth = newWidth;
      this.updateDragBalls();
    },
    ballDragEnded(event) {
      console.log(
        `Selection box at (${parseFloat(
          this.selectionBox.attr("x")
        )}, 0) with size (${parseFloat(this.selectionBox.attr("width"))}, ${
          this.height
        })`
      );
    },
  },
  computed: {
    ...mapState(["count"]), // 映射 count 到计算属性
  },
  watch: {
    // 监听 count 变化
    count(newVal, oldVal) {
      this.initChart();
      console.log("重新绘制交互视图");
    },
  },
};
</script>

<style scoped>
.selection-box {
  fill: rgba(8, 8, 238, 0.2);
  stroke: blue;
  stroke-width: 1px;
}

.drag-edge {
  fill: transparent;
  cursor: ew-resize;
}

.drag-ball {
  fill: blue;
  cursor: pointer;
}
</style>