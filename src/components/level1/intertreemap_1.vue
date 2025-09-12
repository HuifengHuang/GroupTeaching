<template>
  <div ref="container2" class="overview-container">
    <div class="title">Interaction Overview</div>
    <div ref="matrixContainer" class="matrix-wrapper"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      labels: ["a", "b", "c", "d"],
      config: {
        width: 700,
        height: 650,
        margin: 10,
        cellSize: 18,
        gap: 10,
        bar: {
          row: { width: 100, color: "#4daf4a" },
          col: { height: 100, color: "#e5c185" },
        },
      },
      // 确定的矩阵数据
      fixedMatrixData: [
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
      const matrixData = this.fixedMatrixData;

      // 创建SVG画布
      const svg = d3
        .select(this.$refs.matrixContainer)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // 绘制两个矩阵并排
      this.fixedMatrixData.forEach((matrixData, index) => {
        const xOffset =
          index * (this.labels.length * this.config.cellSize + 60); // 50为间距
        this.drawMatrix(svg, matrixData, xOffset);
        this.drawSumBars(svg, matrixData, xOffset);
        this.drawLabels(svg, xOffset);
      });

      //   // 绘制主矩阵
      //   this.drawMatrix(svg, matrixData[0], 0);

      //   // 绘制行列标签
      //   this.drawLabels(svg);

      //   // 绘制总和柱状图
      //   this.drawSumBars(svg, matrixData);

      // 添加图例
      //   this.drawLegend(svg);
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

      //   // 添加数值标签
      //   matrixContainer
      //     .selectAll(".value-label")
      //     .data(data)
      //     .enter()
      //     .append("text")
      //     .attr("class", "cell-text")
      //     .attr(
      //       "x",
      //       (d) =>
      //         this.labels.indexOf(d.col) * this.config.cellSize +
      //         this.config.cellSize / 2
      //     )
      //     .attr(
      //       "y",
      //       (d) =>
      //         this.labels.indexOf(d.row) * this.config.cellSize +
      //         this.config.cellSize / 2
      //     )
      //     .attr("text-anchor", "middle")
      //     .attr("dy", "0.3em")
      //     .text((d) => d.value.toFixed(2))
      //     .attr("fill", (d) => (d.value > 0.5 ? "white" : "black"));
    },

    drawLabels(svg, offset) {
      // 行标签
      svg
        .selectAll(".row-label")
        .data(this.labels)
        .enter()
        .append("text")
        .attr("class", "matrix-label")
        .attr("x", this.config.margin / 2 + offset)
        .attr(
          "y",
          (d, i) =>
            this.config.margin +
            i * (this.config.cellSize + this.config.gap) +
            this.config.cellSize / 2
        )
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .text((d) => d);

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
        .attr("dy", "0.3em")
        .text((d) => d);
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
  color: #4cc4d5;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}
</style>