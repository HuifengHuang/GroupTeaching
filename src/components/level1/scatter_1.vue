<template>
  <div ref="container2" class="overview-container">
    <div class="header-row">
      <div class="title">Scatter plot</div>
      <div ref="tuli" class="legend-container"></div>
    </div>
    <div ref="matrixContainer" class="matrix-wrapper"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      data: [
        { x: 0, y: 8.2 },
        { x: 0, y: 6.5 },
        { x: 0, y: 4.5 },
        { x: 1, y: 7.3 },
        { x: 1, y: 6.9 },
        { x: 1, y: 5 },
        { x: 2, y: 5.8 },
        { x: 2, y: 6.0 },
        { x: 2, y: 4.9 },
      ],
      data2: [
        // { x: 0, y: 7.34 },
        // { x: 0, y: 6.12 },
        // { x: 0, y: 5.89 },
        // { x: 1, y: 7.01 },
        // { x: 1, y: 6.45 },
        // { x: 1, y: 5.32 },
        { x: 2, y: 7.76 },
        { x: 2, y: 6.03 },
        { x: 2, y: 4.58 },
        { x: 3, y: 8.11 },
        { x: 3, y: 5.82 },
        { x: 3, y: 7.21 },
        // { x: 4, y: 6.43 },
        // { x: 4, y: 6.07 },
        // { x: 4, y: 4.65 },
        // { x: 5, y: 5.94 },
        // { x: 5, y: 4.18 },
        // { x: 5, y: 5.73 },
        // { x: 6, y: 6.15 },
        // { x: 6, y: 5.52 },
        // { x: 6, y: 4.99 },
      ],
      data3: [
        // { x: 0, y: 4.576694488525391 },
        // { x: 0, y: 4.753228664398193 },
        // { x: 0, y: 6.6107988357543945 },
        // { x: 0, y: 4.640771865844727 },
        // { x: 0, y: 4.5 },
        // { x: 1, y: 4.527336597442627 },
        // { x: 1, y: 7.1106767654418945 },
        // { x: 1, y: 6.88730525970459 },
        // { x: 1, y: 6.116478443145752 },
        // { x: 1, y: 7.251951217651367 },
        // { x: 2, y: 7.2603349685668945 },
        // { x: 2, y: 6.328682899475098 },
        // { x: 2, y: 7.087778091430664 },
        // { x: 2, y: 5.015030860900879 },
        // { x: 2, y: 7.325047492980957 },
        { x: 3, y: 6.911219596862793 },
        { x: 3, y: 6.610724449157715 },
        { x: 3, y: 8.091075897216797 },
        { x: 3, y: 7.849918365478516 },
        { x: 3, y: 7.903266429901123 },
        { x: 4, y: 7.233971118927002 },
        { x: 4, y: 7.109838962554932 },
        { x: 4, y: 8.316058158874512 },
        { x: 4, y: 7.576005935668945 },
        { x: 4, y: 5.065807342529297 },
        { x: 5, y: 7.801097869873047 },
        { x: 5, y: 8.127585411071777 },
        { x: 5, y: 8.289342880249023 },
        { x: 5, y: 5.464656829833984 },
        { x: 5, y: 6.4449462890625 },
        { x: 6, y: 7.98543643951416 },
        { x: 6, y: 8.5 },
        { x: 6, y: 8.271889686584473 },
        { x: 6, y: 7.797130584716797 },
        { x: 6, y: 4.7324934005737305 },
        { x: 7, y: 4.522614002227783 },
      ],
      data4: [
        // { x: 0, y: 4.576694488525391 },
        // { x: 0, y: 4.753228664398193 },
        // { x: 0, y: 6.6107988357543945 },
        // { x: 0, y: 4.640771865844727 },
        // { x: 0, y: 4.5 },
        // { x: 1, y: 4.527336597442627 },
        // { x: 1, y: 7.1106767654418945 },
        // { x: 1, y: 6.88730525970459 },
        // { x: 1, y: 6.116478443145752 },
        // { x: 1, y: 7.251951217651367 },
        // { x: 2, y: 7.2603349685668945 },
        // { x: 2, y: 6.328682899475098 },
        // { x: 2, y: 7.087778091430664 },
        // { x: 2, y: 5.015030860900879 },
        // { x: 2, y: 7.325047492980957 },
        // { x: 3, y: 6.911219596862793 },
        // { x: 3, y: 6.610724449157715 },
        // { x: 3, y: 8.091075897216797 },
        // { x: 3, y: 7.849918365478516 },
        // { x: 3, y: 7.903266429901123 },
        // { x: 4, y: 7.233971118927002 },
        // { x: 4, y: 7.109838962554932 },
        // { x: 4, y: 8.316058158874512 },
        // { x: 4, y: 7.576005935668945 },
        // { x: 4, y: 5.065807342529297 },
        { x: 5, y: 7.801097869873047 },
        { x: 5, y: 8.127585411071777 },
        { x: 5, y: 8.289342880249023 },
        { x: 5, y: 5.464656829833984 },
        { x: 5, y: 6.4449462890625 },
        { x: 6, y: 7.98543643951416 },
        { x: 6, y: 8.5 },
        { x: 6, y: 8.271889686584473 },
        { x: 6, y: 7.797130584716797 },
        { x: 6, y: 4.7324934005737305 },
        { x: 7, y: 8.522614002227783 },
        { x: 7, y: 4.522614002227783 },
        { x: 8, y: 8.722614002227783 },
        { x: 8, y: 4.322614002227783 },
      ],
      err_data1:[
        { x: 3, y: 4.8 },
        { x: 3, y: 5.5 },
        { x: 3, y: 7.1 },
        { x: 3, y: 8.2 },
        { x: 4, y: 4.7 },
        { x: 4, y: 8.6 },
        { x: 4, y: 5.7 },
      ],
      err_data2:[
        { x: 4, y: 4.9 },
        { x: 4, y: 7.5 },
        { x: 4, y: 5.1 },
        { x: 4, y: 6.2 },
        { x: 5, y: 7.8 },
        { x: 5, y: 4.6 },
        { x: 5, y: 4.7 },
      ],
      caseData: [
        // x=0 组（基准高值）
        { x: 1, y: 8.0 },
        { x: 1, y: 6.5 },
        { x: 1, y: 4.5 },

        // x=1 组
        { x: 2, y: 7.8 },
        { x: 2, y: 6.9 },
        { x: 2, y: 5.1 },

        // x=2 组（包含波动）
        { x: 3, y: 8.5 },
        { x: 3, y: 6.0 },
        { x: 3, y: 4.9 },

        // x=3 组（新增）
        { x: 4, y: 7.0 },
        { x: 4, y: 6.2 },
        { x: 4, y: 4.6 },

        // // x=4 组（中段收敛）
        // { x: 4, y: 6.5 },
        // { x: 4, y: 5.8 },
        // { x: 4, y: 5.1 },

        // // x=5 组（低区波动）
        // { x: 5, y: 5.7 },
        // { x: 5, y: 5.3 },
        // { x: 5, y: 4.8 },

        // // x=6 组（最终收敛）
        // { x: 6, y: 5.2 },
        // { x: 6, y: 5.0 },
        // { x: 6, y: 4.6 },
      ],
      config: {
        r: 2,
      },
      color: ["#c7522a", "#e5c185", "#74a892", "#008585"],
      theme: ["需求分析", "数据处理", "数据可视化"],
      // theme: ["时序数据", "地理数据"],
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
      const height = container.clientHeight * 0.8;

      // 生成示例数据
      const matrixData = this.fixedMatrixData;

      // 创建SVG画布
      const svg = d3
        .select(this.$refs.matrixContainer)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      this.data = this.adjustYCenter(this.data, 7);
      this.data2 = this.adjustYCenter(this.data2, 7);
      this.err_data1 = this.adjustYCenter(this.err_data1, 7);
      this.err_data2 = this.adjustYCenter(this.err_data2, 7);
      this.data4 = this.adjustYCenter(this.data4, 7);
      this.drawScatter(svg, width, height, this.data, this.color[0]);
      this.drawScatter(svg, width, height, this.data2, this.color[1]);
      this.drawScatter(svg, width, height, this.err_data1, this.color[2]);
      this.drawScatter(svg, width, height, this.err_data2, this.color[1]);
      this.drawScatter(svg, width, height, this.data4, this.color[2]);
      // this.drawScatter(svg, width, height, this.data4, this.color[3]);
      // this.drawScatter(svg, width, height, this.caseData, this.color[1]);
      this.drawTuli();
    },
    drawTuli() {
      // ============== 在tuli容器中添加图例 ==============
      const legendSvg = d3
        .select(this.$refs.tuli)
        .append("svg")
        .attr("width", "100%")
        .attr("height", 40); // 图例容器高度

      const legend = legendSvg.append("g").attr("transform", "translate(0,0)"); // 图例组偏移

      let x = 0;
      for (let i = 0; i < this.theme.length; i++) {
        // 主题1图例
        legend
          .append("rect")
          .attr("x", x)
          .attr("y", 0)
          .attr("width", 16)
          .attr("height", 15)
          .attr("rx", 3)
          .attr("ry", 3)
          .attr("fill", this.color[i])
          .attr("stroke", "#fff")
          .attr("stroke-width", 1);

        legend
          .append("text")
          .attr("x", x + 16)
          .attr("y", 8)
          .text(this.theme[i])
          .style("font-size", "12px")
          .style("font-family", "MingLiU")
          .style("fill", "#7F7F7F")
          .style("dominant-baseline", "middle");
        x += 80;
      }
    },
    drawScatter(svg, width, height, data, color) {
      // 动态比例尺
      const xScale = d3
        .scaleLinear()
        .domain([0, 8])
        .range([this.config.r, width - this.config.r]);

      const yScale = d3
        .scaleLinear()
        .domain([4.5, 9.5])
        .range([height - this.config.r - 5, this.config.r]);

      // 绘制散点（增强趋势表现）
      svg
        .selectAll("circle2")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("r", (d) => this.config.r)
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("fill", (d) => d3.interpolateCool(d.x / 19));
      // .append("title")
      // .text((d) => `阶段: ${d.x + 1}\n值: ${d.y.toFixed(2)}`);

      // 数据处理：生成极值数据集
      const grouped = d3.group(data, (d) => d.x);
      const maxData = [];
      const minData = [];

      grouped.forEach((values, x) => {
        const yValues = values.map((d) => d.y);
        maxData.push({ x: +x, y: Math.max(...yValues) });
        minData.push({ x: +x, y: Math.min(...yValues) });
      });

      // 创建曲线生成器（使用单调曲线插值）
      const lineGenerator = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))
        .curve(d3.curveMonotoneX); // 保持x方向单调性

      //   // 绘制最大值的连线
      //   svg
      //     .append("path")
      //     .datum(maxData.sort((a, b) => a.x - b.x))
      //     .attr("d", lineGenerator)
      //     .attr("fill", "none")
      //     .attr("stroke", "rgba(240, 178, 239, 0.2)") // 红色表示上限
      //     .attr("stroke-width", 2);
      //   // .attr("stroke-dasharray", "5 2");

      //   // 绘制最小值的连线
      //   svg
      //     .append("path")
      //     .datum(minData.sort((a, b) => a.x - b.x))
      //     .attr("d", lineGenerator)
      //     .attr("fill", "none")
      //     .attr("stroke", "rgba(240, 178, 239, 0.2)") // 蓝色表示下限
      //     .attr("stroke-width", 2);
      //   // .attr("stroke-dasharray", "5 2");

      // 在绘制极值线之后添加以下代码
      const areaGenerator = d3
        .area()
        .x((d) => xScale(d.x))
        .y0((d) => yScale(d.minY)) // 下边界
        .y1((d) => yScale(d.maxY)) // 上边界
        .curve(d3.curveMonotoneX);

      // 生成合并数据集（需保证x顺序一致）
      const combinedData = maxData
        .sort((a, b) => a.x - b.x)
        .map((maxPoint, i) => ({
          x: maxPoint.x,
          maxY: maxPoint.y,
          minY: minData[i].y, // 假设minData已排序对应
        }));

      // 绘制填充区域
      svg
        .append("path")
        .datum(combinedData)
        .attr("d", areaGenerator)
        .attr("fill", this.hexToRGBA(color, 0.8))
        .attr("stroke", "none");
    },
    hexToRGBA(hex, alpha = 1) {
      // 移除 # 号并统一处理缩写格式
      hex = hex.replace(/^#/, "");

      // 处理缩写格式（如 #f0e → ff00ee）
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((c) => c + c)
          .join("");
      }

      // 验证格式
      if (![6, 8].includes(hex.length)) {
        throw new Error("Invalid HEX color format");
      }

      // 解析颜色通道
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      // 处理带透明度的 HEX8 格式（如 #f0b2ef80）
      if (hex.length === 8) {
        const a = parseInt(hex.substring(6, 8), 16) / 255;
        return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
      }

      // 返回带自定义透明度的 RGBA
      return `rgba(${r}, ${g}, ${b}, ${Math.min(1, Math.max(0, alpha))})`;
    },
    adjustYCenter(data, centerY) {
      // 首先按x值分组
      const grouped = {};
      data.forEach(item => {
          if (!grouped[item.x]) {
              grouped[item.x] = [];
          }
          grouped[item.x].push(item.y);
      });
      
      // 处理每一组数据
      const result = [];
      for (const x in grouped) {
          const yValues = grouped[x];
          const minY = Math.min(...yValues);
          const maxY = Math.max(...yValues);
          const currentCenter = (minY + maxY) / 2;
          const offset = centerY - currentCenter;
          
          // 应用相同的偏移量到所有y值
          yValues.forEach(y => {
              result.push({ x: parseInt(x), y: y + offset });
          });
      }
      
      return result;
    }
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
.matrix-wrapper {
  font-family: Arial;
}
/* 新增header布局样式 */
.header-row {
  display: flex;
  flex-direction: row;

  width: 100%;
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
  color: #9b9b9b;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
  width: 25%;
  /* background-color: black; */
}

.legend-container {
  height: 0px; /* 与图例高度一致 */
  margin-top: 3px;
  width: 80%;
  /* margin-left: -100px; */
}
</style>