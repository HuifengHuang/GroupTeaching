<template>
  <div ref="container2" class="overview-container">
    <div class="title">Interaction Overview</div>
    <div class="header-col">
      <div class="left-row">
        <div ref="tuli_1"></div>
        <div ref="tuli_2"></div>
      </div>
      <div ref="matrixContainer" class="matrix-wrapper"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      // labels: ["Adam", "Bob", "Carl", "David"],
      // labels: ["Ella", "Leo", "Amy", "Max"],
      // labels: ["Aria", "Caleb", "Luna", "Jett", "Tom"],
      labels: ["Nova", "Finn", "Zara", "Ethan", "Lila"],
      // labels: ["Eve", "Leo", "Max", "Kay", "Jay"],
      config: {
        width: 700,
        height: 650,
        margin: 10,
        cellSize: 27,
        gap: 10,
        bar: {
          row: { width: 100, color: "#4daf4a" },
          col: { height: 100, color: "#e5c185" },
        },
      },
      // 确定的矩阵数据
      fixedMatrixData: [
        [
          { row: "Adam", col: "Adam", value: 0 },
          { row: "Adam", col: "Bob", value: 0.85 },
          { row: "Adam", col: "Carl", value: 0.72 },
          { row: "Adam", col: "David", value: 0.63 },
          { row: "Bob", col: "Adam", value: 0.55 },
          { row: "Bob", col: "Bob", value: 0 },
          { row: "Bob", col: "Carl", value: 0.91 },
          { row: "Bob", col: "David", value: 0.45 },
          { row: "Carl", col: "Adam", value: 0.78 },
          { row: "Carl", col: "Bob", value: 0.67 },
          { row: "Carl", col: "Carl", value: 0 },
          { row: "Carl", col: "David", value: 0.82 },
          { row: "David", col: "Adam", value: 0.48 },
          { row: "David", col: "Bob", value: 0.59 },
          { row: "David", col: "Carl", value: 0.73 },
          { row: "David", col: "David", value: 0 },
        ],
        [
          { row: "Ella", col: "Ella", value: 0 },
          { row: "Ella", col: "Leo", value: 0.35 },
          { row: "Ella", col: "Amy", value: 0.32 },
          { row: "Ella", col: "Max", value: 0.41 },
          { row: "Leo", col: "Ella", value: 0.3 },
          { row: "Leo", col: "Leo", value: 0 },
          { row: "Leo", col: "Amy", value: 0.3 },
          { row: "Leo", col: "Max", value: 0.95 },
          { row: "Amy", col: "Ella", value: 0.28 },
          { row: "Amy", col: "Leo", value: 0.1 },
          { row: "Amy", col: "Amy", value: 0 },
          { row: "Amy", col: "Max", value: 0.2 },
          { row: "Max", col: "Ella", value: 0.6 },
          { row: "Max", col: "Leo", value: 0.92 },
          { row: "Max", col: "Amy", value: 0.63 },
          { row: "Max", col: "Max", value: 0 },
        ],
        [
          { row: "Aria", col: "Aria", value: 0 },
          { row: "Aria", col: "Caleb", value: 0.72 },
          { row: "Aria", col: "Luna", value: 0 },
          { row: "Aria", col: "Jett", value: 0 },
          { row: "Aria", col: "Tom", value: 0.68 },

          { row: "Caleb", col: "Aria", value: 0.65 },
          { row: "Caleb", col: "Caleb", value: 0 },
          { row: "Caleb", col: "Luna", value: 0 },
          { row: "Caleb", col: "Jett", value: 0 },
          { row: "Caleb", col: "Tom", value: 0.79 },

          { row: "Luna", col: "Aria", value: 0 },
          { row: "Luna", col: "Caleb", value: 0 },
          { row: "Luna", col: "Luna", value: 0 },
          { row: "Luna", col: "Jett", value: 0.62 }, // 低互动
          { row: "Luna", col: "Tom", value: 0 },

          { row: "Jett", col: "Aria", value: 0 },
          { row: "Jett", col: "Caleb", value: 0 },
          { row: "Jett", col: "Luna", value: 0.42 }, // 低互动
          { row: "Jett", col: "Jett", value: 0 },
          { row: "Jett", col: "Tom", value: 0 },

          { row: "Tom", col: "Aria", value: 0.64 },
          { row: "Tom", col: "Caleb", value: 0.75 },
          { row: "Tom", col: "Luna", value: 0 },
          { row: "Tom", col: "Jett", value: 0 },
          { row: "Tom", col: "Tom", value: 0 },
        ],
        [
          { row: "Nova", col: "Nova", value: 0 },
          { row: "Nova", col: "Finn", value: 0.78 },
          { row: "Nova", col: "Zara", value: 0.32 },
          { row: "Nova", col: "Ethan", value: 0.65 },
          { row: "Nova", col: "Lila", value: 0.41 },

          { row: "Finn", col: "Nova", value: 0.81 },
          { row: "Finn", col: "Finn", value: 0 },
          { row: "Finn", col: "Zara", value: 0.29 },
          { row: "Finn", col: "Ethan", value: 0.53 },
          { row: "Finn", col: "Lila", value: 0.67 },

          { row: "Zara", col: "Nova", value: 0.35 },
          { row: "Zara", col: "Finn", value: 0.24 },
          { row: "Zara", col: "Zara", value: 0 },
          { row: "Zara", col: "Ethan", value: 0.89 },
          { row: "Zara", col: "Lila", value: 0.45 },

          { row: "Ethan", col: "Nova", value: 0.62 },
          { row: "Ethan", col: "Finn", value: 0.57 },
          { row: "Ethan", col: "Zara", value: 0.92 },
          { row: "Ethan", col: "Ethan", value: 0 },
          { row: "Ethan", col: "Lila", value: 0.38 },

          { row: "Lila", col: "Nova", value: 0.43 },
          { row: "Lila", col: "Finn", value: 0.69 },
          { row: "Lila", col: "Zara", value: 0.47 },
          { row: "Lila", col: "Ethan", value: 0.33 },
          { row: "Lila", col: "Lila", value: 0 },
        ],
        [
          { row: "Eve", col: "Eve", value: 0 },
          { row: "Eve", col: "Leo", value: 0.25 },
          { row: "Eve", col: "Max", value: 0.18 },
          { row: "Eve", col: "Kay", value: 0.22 },
          { row: "Eve", col: "Jay", value: 0.27 },

          { row: "Leo", col: "Eve", value: 0.21 },
          { row: "Leo", col: "Leo", value: 0 },
          { row: "Leo", col: "Max", value: 0.58 },
          { row: "Leo", col: "Kay", value: 0.72 },
          { row: "Leo", col: "Jay", value: 0.61 },

          { row: "Max", col: "Eve", value: 0.19 },
          { row: "Max", col: "Leo", value: 0.55 },
          { row: "Max", col: "Max", value: 0 },
          { row: "Max", col: "Kay", value: 0.83 },
          { row: "Max", col: "Jay", value: 0.49 },

          { row: "Kay", col: "Eve", value: 0.23 },
          { row: "Kay", col: "Leo", value: 0.75 },
          { row: "Kay", col: "Max", value: 0.87 },
          { row: "Kay", col: "Kay", value: 0 },
          { row: "Kay", col: "Jay", value: 0.91 },

          { row: "Jay", col: "Eve", value: 0.28 },
          { row: "Jay", col: "Leo", value: 0.63 },
          { row: "Jay", col: "Max", value: 0.52 },
          { row: "Jay", col: "Kay", value: 0.89 },
          { row: "Jay", col: "Jay", value: 0 },
        ],
        [
          { row: "a", col: "a", value: 0 },
          { row: "a", col: "b", value: 0.85 },
          { row: "a", col: "c", value: 0.72 },
          { row: "a", col: "d", value: 0.63 },
          { row: "b", col: "a", value: 0.55 },
          { row: "b", col: "b", value: 0 },
          { row: "b", col: "c", value: 0.91 },
          { row: "b", col: "d", value: 0.45 },
          { row: "c", col: "a", value: 0.78 },
          { row: "c", col: "b", value: 0.67 },
          { row: "c", col: "c", value: 0 },
          { row: "c", col: "d", value: 0.82 },
          { row: "d", col: "a", value: 0.48 },
          { row: "d", col: "b", value: 0.59 },
          { row: "d", col: "c", value: 0.73 },
          { row: "d", col: "d", value: 0 },
        ],
        [
          { row: "a", col: "a", value: 0 },
          { row: "a", col: "b", value: 0.85 },
          { row: "a", col: "c", value: 0.72 },
          { row: "a", col: "d", value: 0.63 },
          { row: "b", col: "a", value: 0.55 },
          { row: "b", col: "b", value: 0 },
          { row: "b", col: "c", value: 0.91 },
          { row: "b", col: "d", value: 0.45 },
          { row: "c", col: "a", value: 0.78 },
          { row: "c", col: "b", value: 0.67 },
          { row: "c", col: "c", value: 0 },
          { row: "c", col: "d", value: 0.82 },
          { row: "d", col: "a", value: 0.48 },
          { row: "d", col: "b", value: 0.59 },
          { row: "d", col: "c", value: 0.73 },
          { row: "d", col: "d", value: 0 },
        ],
        [
          { row: "a", col: "a", value: 0 },
          { row: "a", col: "b", value: 0.85 },
          { row: "a", col: "c", value: 0.72 },
          { row: "a", col: "d", value: 0.63 },
          { row: "b", col: "a", value: 0.55 },
          { row: "b", col: "b", value: 0 },
          { row: "b", col: "c", value: 0.91 },
          { row: "b", col: "d", value: 0.45 },
          { row: "c", col: "a", value: 0.78 },
          { row: "c", col: "b", value: 0.67 },
          { row: "c", col: "c", value: 0 },
          { row: "c", col: "d", value: 0.82 },
          { row: "d", col: "a", value: 0.48 },
          { row: "d", col: "b", value: 0.59 },
          { row: "d", col: "c", value: 0.73 },
          { row: "d", col: "d", value: 0 },
        ],
        [
          { row: "a", col: "a", value: 0 },
          { row: "a", col: "b", value: 0.85 },
          { row: "a", col: "c", value: 0.72 },
          { row: "a", col: "d", value: 0.63 },
          { row: "b", col: "a", value: 0.55 },
          { row: "b", col: "b", value: 0 },
          { row: "b", col: "c", value: 0.91 },
          { row: "b", col: "d", value: 0.45 },
          { row: "c", col: "a", value: 0.78 },
          { row: "c", col: "b", value: 0.67 },
          { row: "c", col: "c", value: 0 },
          { row: "c", col: "d", value: 0.82 },
          { row: "d", col: "a", value: 0.48 },
          { row: "d", col: "b", value: 0.59 },
          { row: "d", col: "c", value: 0.73 },
          { row: "d", col: "d", value: 0 },
        ],
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
      const height = container.clientHeight * 0.85;

      // 生成示例数据
      const matrixData = this.fixedMatrixData[3];

      // 创建SVG画布
      const svg = d3
        .select(this.$refs.matrixContainer)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const cell =
        Math.min(width, height) -
        this.labels.length * this.config.gap -
        this.config.margin * 0.5;
      this.config.cellSize = cell / this.labels.length;

      //   const xOffset = 0;

      // 计算矩阵总宽度（含间距）
      const matrixWidth =
        this.labels.length * (this.config.cellSize + this.config.gap) -
        this.config.gap +
        this.config.margin * 2;

      // 动态计算居中偏移量
      const xOffset = 10;

      this.drawMatrix(svg, matrixData, xOffset);
      this.drawSumBars(svg, matrixData, xOffset);
      this.drawLabels(svg, xOffset);

      this.initLegend_1(width * 0.2, height);
      this.initLegend_2(width * 0.2, height);
    },
    initLegend_1(width, height) {
      const svg = d3
        .select(this.$refs.tuli_1)
        .append("svg")
        .attr("width", width)
        .attr("height", height * 0.7); // 图例容器高度

      // 定义垂直渐变
      const gradient = svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "vertical-gradient")
        .attr("x1", "0%")
        .attr("y1", "1") // 垂直渐变方向（底部到顶部）
        .attr("x2", "0%")
        .attr("y2", "0");

      gradient
        .selectAll("stop")
        .data(d3.range(0, 1.1, 0.1))
        .enter()
        .append("stop")
        .attr("offset", (d) => d)
        .attr("stop-color", (d) => d3.interpolate("#F2F3E9", "#76B5AF")(d));

      // 绘制渐变条
      svg
        .append("rect")
        .attr("x", 5)
        .attr("y", 5)
        .attr("width", width * 0.4)
        .attr("height", height * 0.6)
        .style("fill", "url(#vertical-gradient)");

      // 添加刻度标签
      const scale = d3
        .scaleLinear()
        .domain([0, 1])
        .range([height * 0.6 + 5, 5]);

      const axis = d3.axisRight(scale).ticks(1).tickFormat(d3.format(".0f"));

      svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${width * 0.6},0)`)
        .call(axis)
        .select(".domain")
        .remove(); // 隐藏轴线

      // 调整标签样式
      d3.selectAll(".axis text")
        .attr("class", "scale-label")
        .attr("x", 10)
        .style("fill", "#7F7F7F");
    },

    initLegend_2(width, height){
    // 创建SVG元素
      const svg = d3
        .select(this.$refs.tuli_2)
        .append("svg")
        .attr("width", width)
        .attr("height", height * 0.3); // 图例容器高度
      
      // 定义箭头标记
      
      svg.append("defs").append("marker") //箭头
          .attr("id", "arrowhead")
          .attr("viewBox", "0 0 10 10")
          .attr("refX", 8)
          .attr("refY", 5)
          .attr("markerWidth", 3)
          .attr("markerHeight", 3)
          .attr("orient", "auto")
          .append("path")
          .attr("d", "M 0 0 L 10 5 L 0 10 z")
          .attr("fill", "red")
          .attr("stroke", "blue");
      
      // 绘制方块
      const box = svg.append("rect")
          .attr("class", "box")
          .attr("x", 5)
          .attr("y", 5)
          .attr("width", 20)
          .attr("height", 20)
          .attr("fill", "#76B5AF");
      
      // 绘制右侧向下箭头
      svg.append("line")
          .attr("x1", 30)  // 方块右侧
          .attr("y1", 5)    // 方块垂直中点
          .attr("x2", 30)    // 保持x相同
          .attr("y2", 25)  // 向下延伸
          .style("stroke-width", 2)
          .style("stroke", this.config.bar.col.color)
          .attr("marker-end", "url(#arrowhead)");
          
      // 绘制下方向右箭头
      svg.append("line")
          .attr("marker-end", "url(#arrowhead)")
          .style("stroke-width", 2)
          .style("stroke", this.config.bar.row.color)
          .attr("x1", 5)  // 方块水平中点
          .attr("y1", 30)   // 方块底部
          .attr("x2", 25)   // 向右延伸
          .attr("y2", 30);  // 保持y相同
    },

    generateMatrixData() {
      return this.labels.flatMap((rowLabel) =>
        this.labels.map((colLabel) => ({
          row: rowLabel,
          col: colLabel,
          value: colLabel === rowLabel ? 0 : Math.random(),
        }))
      );
    },

    drawMatrix(svg, data, offset) {
      const colorScale = d3
        .scaleSequential()
        .domain([0, 1])
        .interpolator(d3.interpolate("#F2F3E9", "#76B5AF"));

      const matrixContainer = svg
        .append("g")
        .attr(
          "transform",
          `translate(${this.config.margin + offset},${this.config.margin})`
        );

      // 绘制单元格
      matrixContainer
        .selectAll(".cell")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr(
          "x",
          (d) =>
            this.labels.indexOf(d.col) *
            (this.config.cellSize + this.config.gap)
        )
        .attr(
          "y",
          (d) =>
            this.labels.indexOf(d.row) *
            (this.config.cellSize + this.config.gap)
        )
        .attr("width", this.config.cellSize - 2)
        .attr("height", this.config.cellSize - 2)
        .attr("fill", (d) => colorScale(d.value))
        .attr("rx", 3)
        .attr("stroke", "#fff");
    },

    drawLabels(svg, offset) {
      // 行标签
      svg
        .selectAll(".row-label")
        .data(this.labels)
        .enter()
        .append("text")
        .attr("x", this.config.margin / 2 + offset + 5)
        .attr(
          "y",
          (d, i) =>
            this.config.margin +
            i * (this.config.cellSize + this.config.gap) +
            this.config.cellSize / 2
        )
        .style("font-family", "MingLiU")
        .style("fill", "#7F7F7F")
        .style("font-size", "10px")
        .attr("text-anchor", "end")
        .attr("dy", "0.3em")
        .text((d) => d.slice(0, 3)); // 关键修改：仅展示前3个字母

      // 列标签
      svg
        .selectAll(".col-label")
        .data(this.labels)
        .enter()
        .append("text")
        .attr("class", "matrix-label")
        .attr(
          "x",
          (d, i) =>
            this.config.margin +
            i * (this.config.cellSize + this.config.gap) +
            this.config.cellSize / 2 +
            offset
        )
        .attr("y", this.config.margin / 2)
        .attr("text-anchor", "middle")
        .style("font-family", "MingLiU")
        .style("fill", "#7F7F7F")
        .style("font-size", "10px")
        .attr("dy", "0.3em")
        .text((d) => d.slice(0, 3)); // 关键修改：仅展示前3个字母
    },

    drawSumBars(svg, data, offset) {
      // 计算行列总和
      const rowSums = {},
        colSums = {};
      this.labels.forEach(
        (row) =>
          (rowSums[row] = d3.sum(
            data.filter((d) => d.row === row),
            (d) => d.value
          ))
      );
      this.labels.forEach(
        (col) =>
          (colSums[col] = d3.sum(
            data.filter((d) => d.col === col),
            (d) => d.value
          ))
      );

      // 创建比例尺
      const maxRowSum = d3.max(Object.values(rowSums));
      const maxColSum = d3.max(Object.values(colSums));

      const rowScale = d3
        .scaleLinear()
        .domain([0, maxRowSum])
        .range([0, this.config.bar.row.width]); // 行柱状图最大宽度

      const colScale = d3
        .scaleLinear()
        .domain([0, maxColSum])
        .range([0, this.config.bar.col.height]); // 列柱状图最大高度

      // 遍历每个单元格绘制关联柱状图
      this.labels.forEach((row, rowIndex) => {
        this.labels.forEach((col, colIndex) => {
          // 在每行最后一个单元格下方添加行总和柱状图
          if (colIndex === this.labels.length - 1) {
            svg
              .append("rect")
              .attr("x", offset + this.config.margin)
              .attr(
                "y",
                this.config.margin +
                  rowIndex * (this.config.cellSize + this.config.gap) +
                  this.config.cellSize
              )
              .attr("width", rowScale(rowSums[row]))
              .attr("height", 4) // 行柱状图高度
              .attr("fill", this.config.bar.row.color)
              .attr("rx", 3);
          }

          // 在每列最后一个单元格右侧添加列总和柱状图
          if (rowIndex === this.labels.length - 1) {
            svg
              .append("rect")
              .attr(
                "x",
                offset +
                  colIndex * (this.config.cellSize + this.config.gap) +
                  this.config.cellSize +
                  this.config.margin
              )
              .attr("y", this.config.margin)
              .attr("width", 4) // 列柱状图宽度
              .attr("height", colScale(colSums[col]))
              .attr("fill", this.config.bar.col.color)
              .attr("rx", 3);
          }
        });
      });
    },

    drawLegend(svg) {
      const legend = svg
        .append("g")
        .attr(
          "transform",
          `translate(${this.config.width - 250}, ${this.config.height - 80})`
        );

      legend
        .append("rect")
        .attr("width", 20)
        .attr("height", 10)
        .attr("fill", this.config.bar.row.color);

      legend
        .append("text")
        .attr("x", 25)
        .attr("y", 9)
        .text("Row Total")
        .style("font-size", "10px");

      legend
        .append("rect")
        .attr("y", 20)
        .attr("width", 20)
        .attr("height", 10)
        .attr("fill", this.config.bar.col.color);

      legend
        .append("text")
        .attr("x", 25)
        .attr("y", 29)
        .text("Column Total")
        .style("font-size", "10px");
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

/* .matrix-label {
  font-size: 12px;
  user-select: none;
} */

.cell-text {
  font-size: 10px;
  user-select: none;
}

.bar-label {
  font-size: 10px;
  fill: #333;
}
/* 新增header布局样式 */
.header-col {
  display: flex;
  flex-direction: row; /* 改为垂直排列 */
}

.left-row{
  display: flex;
  flex-direction: column;
}

.title {
  color: #9b9b9b;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
}
</style>