<template>
  <div ref="container" class="overview-container">
    <div class="header-row-theme">
      <div class="title">Interaction Detail</div>
      <label class="switch">
        <input type="checkbox" id="interToggle" />
        <span class="slider"></span>
      </label>
      <div class="checked-name" v-if="checkedInter === 1">隐藏主题</div>
      <div class="checked-name" v-if="checkedInter === 2">显示主题</div>
    </div>

    <div ref="plotContainer" style="width: 100%; height: 90%"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapState } from "vuex";
import { style } from "d3";

export default {
  data() {
    return {
      checkedInter: 1,
      params: {
        numValues: 8,
        lineWidth: 1,
        jitter: 0.5,
        // height: 3200,
        customColors: [
          "#FBB885",
          "#FCDCDB",
          "#D9D8ED",
          "#7CB6E4",
          "#727FBD",
          "#254BA0",
        ],
        customColors2: ["#9DD0C7", "#9180AC", "#FEE69A", "#E58579 ", "#8AB1D2"],
        bubcolor: ["#69779b", "#9692af", "#acdbdf", "#d7eaea"],
        color: ["#e5c185", "#c7522a", "#74a892", "#008585"],
        time: 30,
        length: 11,
      },
    };
  },
  mounted() {
    this.plot();
  },
  methods: {
    genValues() {
      return d3.shuffle(d3.range(this.params.numValues));
    },
    timsort(values) {
      // const history = new Map([
      //     [1, [[0, 0], [1, 2], [2, 2], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]]],
      //     [2, [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]]],
      //     [3, [[0, 2], [1, 0], [2, 0], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]]],
      //     [4, [[0, 3], [1, 3], [2, 3], [3, 3], [4, 5], [5, 3], [6, 5], [7, 3]]],
      //     [5, [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4]]],
      //     [6, [[0, 5], [1, 5], [2, 5], [3, 5], [4, 3], [5, 5], [6, 3], [7, 5]]],
      //     [7, [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6]]],
      //     [8, [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7]]],
      //     [9, [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8]]],
      //     [10, [[0, 9], [1, 9], [2, 10], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9]]],
      //     [11, [[0, 10], [1, 10], [2, 9], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10]]],
      //     [12, [[0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11]]],
      //     [13, [[0, 12], [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12]]],
      //     [14, [[0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13]]],
      //     [15, [[0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14]]],
      //     [16, [[0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15]]]
      // ]);

      //案例2
      const history = new Map([
        [
          1,
          [
            [0, 0],
            [1, 2],
            [2, 2],
            [3, 0],
            [4, 0],
            [5, 1],
            [6, 1],
            [7, 1],
            [8, 0],
            [9, 1],
          ],
        ],
        [
          2,
          [
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
            [5, 0],
            [6, 0],
            [7, 0],
            [8, 1],
            [9, 0],
          ],
        ],
        [
          3,
          [
            [0, 2],
            [1, 0],
            [2, 0],
            [3, 2],
            [4, 2],
            [5, 2],
            [6, 3],
            [7, 2],
            [8, 2],
            [9, 2],
          ],
        ],
        [
          4,
          [
            [0, 3],
            [1, 3],
            [2, 3],
            [3, 3],
            [4, 3],
            [5, 3],
            [6, 2],
            [7, 3],
            [8, 3],
            [9, 3],
          ],
        ],

        [
          5,
          [
            [0, 4],
            [1, 4],
            [2, 4],
            [3, 4],
            [4, 4],
            [5, 4],
            [6, 4],
            [7, 4],
            [8, 4],
            [9, 4],
          ],
        ],
        [
          6,
          [
            [0, 5],
            [1, 5],
            [2, 5],
            [3, 5],
            [4, 5],
            [5, 5],
            [6, 5],
            [7, 5],
            [8, 5],
            [9, 5],
          ],
        ],
        [
          7,
          [
            [0, 6],
            [1, 6],
            [2, 6],
            [3, 6],
            [4, 6],
            [5, 6],
            [6, 6],
            [7, 6],
            [8, 6],
            [9, 6],
          ],
        ],
        [
          8,
          [
            [0, 7],
            [1, 7],
            [2, 7],
            [3, 7],
            [4, 7],
            [5, 7],
            [6, 7],
            [7, 7],
            [8, 7],
            [9, 7],
          ],
        ],

        [
          9,
          [
            [0, 8],
            [1, 8],
            [2, 8],
            [3, 9],
            [4, 8],
            [5, 8],
            [6, 8],
            [7, 8],
            [8, 8],
            [9, 8],
          ],
        ],
        [
          10,
          [
            [0, 9],
            [1, 11],
            [2, 9],
            [3, 8],
            [4, 9],
            [5, 10],
            [6, 9],
            [7, 10],
            [8, 9],
            [9, 10],
          ],
        ], //异常
        [
          11,
          [
            [0, 10],
            [1, 10],
            [2, 10],
            [3, 10],
            [4, 10],
            [5, 9],
            [6, 10],
            [7, 9],
            [8, 10],
            [9, 9],
          ],
        ], //异常
        [
          12,
          [
            [0, 11],
            [1, 9],
            [2, 11],
            [3, 11],
            [4, 11],
            [5, 11],
            [6, 11],
            [7, 11],
            [8, 11],
            [9, 11],
          ],
        ], //异常

        [
          13,
          [
            [0, 12],
            [1, 12],
            [2, 12],
            [3, 12],
            [4, 12],
            [5, 12],
            [6, 12],
            [7, 12],
            [8, 12],
            [9, 12],
          ],
        ],
        [
          14,
          [
            [0, 13],
            [1, 13],
            [2, 13],
            [3, 13],
            [4, 13],
            [5, 13],
            [6, 13],
            [7, 13],
            [8, 13],
            [9, 13],
          ],
        ],
        [
          15,
          [
            [0, 14],
            [1, 15],
            [2, 14],
            [3, 15],
            [4, 14],
            [5, 14],
            [6, 14],
            [7, 14],
            [8, 14],
            [9, 14],
          ],
        ],
        [
          16,
          [
            [0, 15],
            [1, 14],
            [2, 15],
            [3, 14],
            [4, 15],
            [5, 15],
            [6, 15],
            [7, 15],
            [8, 15],
            [9, 15],
          ],
        ],
      ]);
      return { time: 10, history };
    },
    makePlotSettings(values, width, height) {
      const maxTime = this.params.time;
      return {
        maxTime,
        scales: {
          x: d3.scaleLinear().domain([0, maxTime]).range([0, width]),
          y: d3
            .scaleLinear()
            .domain([0, this.params.length])
            .range([5, height + 60]),
          color: d3.interpolateYlGnBu,
        },
      };
    },
    makePointsData({ history }, maxTime, params) {
      function makePoints(entries) {
        const res = [entries[0]];
        for (let i = 1; i < entries.length; i++) {
          const a = entries[i - 1],
            b = entries[i];
          res.push([b[0] - params.jitter, a[1]]);
          res.push([b[0] + params.jitter, b[1]]);
        }
        res.push([maxTime, res[res.length - 1][1]]);
        return res;
      }

      return [...history.entries()].map(([k, v]) => [k, makePoints(v)]);
    },
    swapIndexAandIndexB(data, indexA, indexB) {
      const series = [];
      for (let i = 0; i < data.length; i++) {
        if (i === indexA) {
          series.push(data[indexB]);
        } else if (i === indexB) {
          series.push(data[indexA]);
        } else {
          series.push(data[i]);
        }
      }
      return series;
    },

    //绘制曲线
    drawLineCur(filteredData, xa, ya, lines, scales, color) {
      // console.log(filteredData);
      // let linecolor = Object.values(color);
      lines
        .selectAll(".line")
        .data(filteredData)
        .join("g")
        .each((d, i, nodes) => {
          const clipId = `clip-x-range-${xa * 10}-${ya * 10}`; // 唯一标识符

          // 1. 创建曲线生成器
          const lineGenerator = d3
            .line()
            .curve(d3.curveBasis) // 指定插值方式，如curveBasis、curveCardinal等[6,7](@ref)
            .x(([t, y]) => scales.x(t)) // 定义x坐标
            .y(([t, y]) => scales.y(y)); // 定义y坐标

          // 2. 生成路径字符串
          const pathData = lineGenerator(d[1]);

          const svg = d3.select("svg");
          //   console.log(this.params.height);
          if (!svg.select(`#${clipId}`).node()) {
            svg
              .append("defs")
              .append("clipPath")
              .attr("id", clipId)
              .append("rect")
              .attr("x", scales.x(xa))
              .attr("y", 0)
              .attr("width", scales.x(ya) - scales.x(xa))
              .attr("height", this.params.height)
              .attr("stroke", "none") // 明确禁止边框
              .attr("fill", "transparent"); // 避免任何填充颜色干扰
          }

          // 3. 绘制曲线路径
          const path = d3
            .select(nodes[i])
            .append("path")
            .classed("line-fill", true)
            .attr("d", pathData) // 直接绑定生成的路径
            .attr("stroke", color[(d[0] - 1) % color.length])
            .attr("fill", "none")
            .attr("stroke-width", this.params.lineWidth)
            .attr("stroke-linecap", "round")
            .attr("clip-path", `url(#${clipId})`) // 应用裁剪路径
            .on("click", (event, data) => {
              this.$store.state.count = 10;
              // 获取当前路径对应的完整数据
              const seriesData = d[1];
              const seriesName = d[0];

              // 显示数据（示例使用alert）
              console.log(`数据序列: ${seriesName}\n数据点: 
            ${seriesData.map((p) => `(${p[0]}, ${p[1]})`).join("\n")}`);
              console.log(data);
            });
        });
    },
    // 生成三组缠绕数据
    generateWindingLines(timePeriod, startPoints, datapoints) {
      const [start, end] = [startPoints[0][0], timePeriod];
      const result = [];
      const lineCount = startPoints.length;
      let values = [
        startPoints[datapoints[0]][1],
        startPoints[datapoints[1]][1],
        startPoints[datapoints[2]][1],
      ];

      values.sort((x, y) => x - y);
      const startPoints2 = JSON.parse(JSON.stringify(startPoints));
      if (values[1] - values[0] != 1) {
        let changeIndex1 = startPoints.findIndex(
          (item) => item[1] === values[0]
        );
        let changeIndex2 = startPoints.findIndex(
          (item) => item[1] === values[1] - 1
        );
        let temp = startPoints2[changeIndex1];
        startPoints2[changeIndex1] = startPoints2[changeIndex2];
        startPoints2[changeIndex2] = temp;
      }
      if (values[2] - values[1] != 1) {
        let changeIndex1 = startPoints.findIndex(
          (item) => item[1] === values[2]
        );
        let changeIndex2 = startPoints.findIndex(
          (item) => item[1] === values[1] + 1
        );
        let temp = startPoints2[changeIndex1];
        startPoints2[changeIndex1] = startPoints2[changeIndex2];
        startPoints2[changeIndex2] = temp;
      }
      let valuesnew = [
        startPoints2[datapoints[0]][1],
        startPoints2[datapoints[1]][1],
        startPoints2[datapoints[2]][1],
      ];
      valuesnew.sort((x, y) => x - y);

      let a = valuesnew[0] + 0.5;
      let b = valuesnew[1];
      let c = valuesnew[2] - 0.5;

      for (let i = 0; i < lineCount; i++) {
        const line = [];

        let currentY = startPoints2[i][1];

        line.push([startPoints[i][0], startPoints[i][1]]);
        line.push([startPoints2[i][0] + 1, startPoints2[i][1]]);
        if (datapoints.includes(i)) {
          if (currentY == b + 1) {
            currentY = c;
          }
          if (currentY == b - 1) {
            currentY = a;
          }
          // 起始点 x 坐标从 2 开始

          // line.push([startPoints[i][0] + 0.5, currentY]);

          for (let x = start + 2; x <= end - 0.1; x += 0.5) {
            if (x % 1 === 0.5) {
              if (currentY === a) {
                currentY = b;
              } else if (currentY === b) {
                currentY = a;
              }
            } else {
              if (currentY === c) {
                currentY = b;
              } else if (currentY === b) {
                currentY = c;
              }
            }
            line.push([x - 0.5, currentY]);
            // line.push([x, currentY]);
          }
          // line.push([end - 0.5, currentY]);
          if (currentY == c) {
            currentY = c + 0.5;
          }
          if (currentY == a) {
            currentY = a - 0.5;
          }
          line.push([end - 0.5, startPoints2[i][1]]);
          line.push([end, startPoints2[i][1]]);
        } else {
          for (let x = start + 2; x <= end; x += 0.5) {
            line.push([x - 0.5, currentY]);
            // line.push([x, currentY]);
          }
          // line.push([end - 0.5, startPoints2[i][1]]);
          line.push([end, startPoints2[i][1]]);
        }
        result.push([i + 1, line]);
      }

      return result;
    },
    //绘制三股数据
    generateDrawLineCurCalls(
      start,
      end,
      swapPairs,
      data,
      lines,
      scales,
      color
    ) {
      let step = 1.5;
      let current = start - 0.5;
      let pairIndex = 0;

      while (current < end) {
        let next = Math.min(current + step, end);
        let [swapIdx1, swapIdx2] = swapPairs[pairIndex];
        this.drawLineCur(
          processArrays(data, swapIdx1, swapIdx2),
          current,
          next,
          lines,
          scales,
          color
        );
        current = next;
        pairIndex = (pairIndex + 1) % swapPairs.length;
      }
      function processArrays(sourceArr, swapIdx1, swapIdx2) {
        let index1, index2;
        for (let i = 0; i < sourceArr.length; i++) {
          if (sourceArr[i][0] == swapIdx1) {
            index1 = i;
          }
          if (sourceArr[i][0] == swapIdx2) {
            index2 = i;
          }
        }

        // 深拷贝原始数组避免污染
        const clonedArr = JSON.parse(JSON.stringify(sourceArr));

        // 步骤2：数组位置交换（直接操作克隆后的数组）
        if (index1 < clonedArr.length && index2 < clonedArr.length) {
          [clonedArr[index1], clonedArr[index2]] = [
            clonedArr[index2],
            clonedArr[index1],
          ];
        }

        return clonedArr;
      }
    },

    //生成两股数据
    generateArray(initialValues, swapIndices, endTime, datapoints) {
      // 返回数据
      const result = [];
      //起始时间
      const startTime = initialValues[0][0];

      const step = 0.5;
      //备份原始数据
      const initialValues2 = JSON.parse(JSON.stringify(initialValues)); // [[1, 0], [1, 1], [1, 2], [1, 3]]
      // initialValues = [[1, 0], [1, 2], [1, 1], [1, 3]]
      // 排序让两个点靠近，选取最上方的的点
      if (
        Math.abs(datapoints[swapIndices[0]] - datapoints[swapIndices[1]]) != 1
      ) {
        if (datapoints[swapIndices[0]] > datapoints[swapIndices[1]]) {
          let changeIndex = initialValues.findIndex(
            (item) => item[1] === initialValues[swapIndices[1]][1] + 1
          );
          let temp = initialValues[swapIndices[0]];
          initialValues[swapIndices[0]] = initialValues[changeIndex];
          initialValues[changeIndex] = temp;
        } else {
          let changeIndex = initialValues.findIndex(
            (item) => item[1] === initialValues[swapIndices[0]][1] + 1
          );
          let temp = initialValues[swapIndices[1]];
          initialValues[swapIndices[1]] = initialValues[changeIndex];
          initialValues[changeIndex] = temp;
        }
      }

      for (let i = 0; i < initialValues.length; i++) {
        const lineId = i + 1;
        const linePoints = [];
        let currentValue = initialValues[i][1];
        let otherValue;
        linePoints.push([startTime, initialValues2[i][1]]);
        linePoints.push([startTime + 1, initialValues2[i][1]]);

        // 如果是要交换的索引之一，获取另一个要交换的值
        if (swapIndices.includes(i)) {
          const otherIndex = swapIndices.filter((index) => index !== i)[0];
          otherValue = initialValues[otherIndex][1];
        }

        for (let time = startTime + 2; time <= endTime; time += step) {
          linePoints.push([time, currentValue]);
          // 每 1 个时间单位交换一次值
          if ((time - startTime) % 1 === 0) {
            if (swapIndices.includes(i)) {
              currentValue =
                currentValue === otherValue ? initialValues[i][1] : otherValue;
            }
          }
        }

        result.push([lineId, linePoints]);
      }
      // console.log(result);

      return result;
    },
    //绘制两股数据
    generateDrawLineDouble(start, end, swapPairs, data, lines, scales, color) {
      let step = 1;
      let current = start;
      let pairIndex = 0;
      let [swapIdx1, swapIdx2] = swapPairs;

      while (current < end) {
        let next = Math.min(current + step, end);

        if (pairIndex % 2 == 0) {
          this.drawLineCur(data, current, next, lines, scales, color);
        } else {
          this.drawLineCur(
            processArrays(data, swapIdx1 + 1, swapIdx2 + 1),
            current,
            next,
            lines,
            scales,
            color
          );
        }

        current = next;
        pairIndex++;
      }
      function processArrays(sourceArr, swapIdx1, swapIdx2) {
        let index1, index2;
        for (let i = 0; i < sourceArr.length; i++) {
          if (sourceArr[i][0] == swapIdx1) {
            index1 = i;
          }
          if (sourceArr[i][0] == swapIdx2) {
            index2 = i;
          }
        }

        // 深拷贝原始数组避免污染
        const clonedArr = JSON.parse(JSON.stringify(sourceArr));

        // 步骤2：数组位置交换（直接操作克隆后的数组）
        if (index1 < clonedArr.length && index2 < clonedArr.length) {
          [clonedArr[index1], clonedArr[index2]] = [
            clonedArr[index2],
            clonedArr[index1],
          ];
        }

        return clonedArr;
      }
    },

    drawLinesForWinding(data, settings, svg, color) {
      const { scales } = settings;
      const lines = svg.append("g").attr("transform", `translate(0,0)`);
      const vm = this;

      // 添加起始点标签函数
      function addStartLabel(xPos, yPos, text) {
        // lines
        //   .append("text")
        //   .attr("x", scales.x(xPos) - 6)
        //   .attr("y", scales.y(yPos) + 5) // 向下偏移20像素避免重叠
        //   .attr("text-anchor", "middle")
        //   .attr("font-size", "12px")
        //   .attr("fill", "#333")
        //   .text(text);
      }

      //遍历画的区间
      function generateResult(data, st, ed) {
        let result = [];
        let start = st;
        let end = ed;
        for (let i = 0; i < data.length; i++) {
          end = data[i][0];
          result.push([start, end, 1]);
          result.push([data[i][0], data[i][1], data[i][2], data[i][3]]);
          start = data[i][1];
        }
        result.push([start, ed, 1]);
        return result;
      }

      let time_sp = generateResult(data.wing, 0, this.params.time); //绘制区间
      // addStartLabel(0, data.pointsxy[0], "0");
      // addStartLabel(0, data.pointsxy[1], "1");
      // addStartLabel(0, data.pointsxy[2], "2");
      // addStartLabel(0, data.pointsxy[3], "3");
      // addStartLabel(0, data.pointsxy[4], "4");

      let datapoints = data.pointsxy;

      for (let time_slice of time_sp) {
        // console.log(time_slice);
        if (time_slice[2] == 1) {
          //直线
          let data_line = [];
          for (let i = 0; i < datapoints.length; i++) {
            data_line.push([
              i + 1,
              [
                [time_slice[0], datapoints[i]],
                [time_slice[1], datapoints[i]],
              ],
            ]);
          }

          this.drawLineCur(
            data_line,
            0,
            this.params.time,
            lines,
            scales,
            color
          );
        }

        if (time_slice[2] == 2) {
          //两股
          let data_do = [];
          for (let i = 0; i < datapoints.length; i++) {
            data_do.push([time_slice[0], datapoints[i]]);
          }
          let swapIndices = [time_slice[3][0], time_slice[3][1]]; // 要交换的两个元素
          let endTime = time_slice[1]; // 终止点
          let data_do_draw = this.generateArray(
            data_do,
            swapIndices,
            endTime,
            datapoints
          );
          // console.log(data_do);
          this.generateDrawLineDouble(
            time_slice[0],
            time_slice[1],
            swapIndices,
            data_do_draw,
            lines,
            scales,
            color
          );
          //更新数据为了让后续数据顺序正确
          for (let item in datapoints) {
            datapoints[item] =
              data_do_draw[item][1][data_do_draw[item][1].length - 1][1];
          }
        }

        if (time_slice[2] == 3) {
          //三股
          let timeend = time_slice[1];
          let data_tr = [];
          for (let i = 0; i < datapoints.length; i++) {
            data_tr.push([time_slice[0], datapoints[i]]);
          }

          let data_tr_draw = this.generateWindingLines(
            timeend,
            data_tr,
            time_slice[3]
          ); //生成缠绕数据

          let swapId;
          //交换顺序，如果起点为单数
          if (time_slice[0] % 2 !== 1) {
            swapId = [
              [time_slice[3][1] + 1, time_slice[3][2] + 1],
              [time_slice[3][0] + 1, time_slice[3][1] + 1],
            ];
          } else {
            swapId = [
              [time_slice[3][0] + 1, time_slice[3][1] + 1],
              [time_slice[3][1] + 1, time_slice[3][2] + 1],
            ];
          }
          this.generateDrawLineCurCalls(
            time_slice[0],
            time_slice[1],
            swapId,
            data_tr_draw,
            lines,
            scales,
            color
          ); //绘制缠绕数据

          //更新数据为了让后续数据顺序正确
          for (let item in datapoints) {
            datapoints[item] =
              data_tr_draw[item][1][data_tr_draw[item][1].length - 1][1];
          }
        }
      }
    },
    drawLines(data, settings, svg, xt, tf, a, b) {
      const { scales } = settings;
      const lines = svg
        .append("g")
        .attr("transform", `translate(0,${this.params.lineWidth})`);

      let filteredData = data;
      if (tf === 1) {
        filteredData = data.map((series) => [
          series[0],
          series[1].filter((point) => point[0] >= a && point[0] <= b),
        ]);
      }
      const vm = this;

      // 三组缠绕
      function generateWindingLines(timePeriod, startPoints) {
        const [start, end] = timePeriod.split("-").map(Number);
        const result = [];
        const lineCount = startPoints.length;
        let a = startPoints[0][1];
        let c = startPoints[1][1];
        let b = startPoints[2][1];

        for (let i = 0; i < lineCount; i++) {
          const line = [];
          let currentY = startPoints[i][1];
          // 起始点 x 坐标从 2 开始
          line.push([startPoints[i][0], currentY]);

          for (let x = start + 1; x <= end; x++) {
            if (x % 2 === 1) {
              if (currentY === a) {
                currentY = b;
              } else if (currentY === b) {
                currentY = a;
              }
            } else {
              if (currentY === c) {
                currentY = b;
              } else if (currentY === b) {
                currentY = c;
              }
            }
            line.push([x - 0.5, currentY]);
            line.push([x, currentY]);
          }
          line.push([end + 1, currentY]);
          result.push([i + 1, line]);
        }

        return [
          [result[0][0], result[0][1]],
          [result[1][0], result[1][1]],
          [result[2][0], result[2][1]],
        ];
      }

      const timePeriod = "2-7";
      const startPoints = [
        [2, 5],
        [2, 7],
        [2, 6],
      ];
      let testarr = generateWindingLines(timePeriod, startPoints);
      // console.log(testarr);

      function supplementMissingData(startTime, missingRange, data) {
        const missingStart = startTime;
        const missingEnd = missingRange;
        const newData = [];

        for (let i = 0; i < data.length; i++) {
          const lineData = data[i];
          const lineId = lineData[0];
          const linePoints = lineData[1];
          const firstPoint = linePoints[0];
          const newPoints = [];

          // 补充缺失的数据
          for (let x = missingStart; x < missingEnd; x++) {
            newPoints.push([x, firstPoint[1]]);
          }

          // 合并补充的数据和原数据
          const combinedPoints = [...newPoints, ...linePoints];
          newData.push([lineId, combinedPoints]);
        }

        return newData;
      }

      const startTime = 0;
      const missingRange = 1.5;

      const result = supplementMissingData(startTime, missingRange, testarr);
      // console.log(result);

      //三股辫
      // testarr2 = [
      //     [1, [[0, 0], [0.5, 1], [1, 1], [1.5, 1.3], [2, 1.3], [3, 1.3], [3.5, 1.3], [4, 1.3], [5, 1.3], [5.5, 1], [6, 1], [7, 1], [7.5, 0.7], [8, 0.7], [9, 0.7], [9.5, 0.7], [10, 0]]],
      //     [2, [[0, 1], [0.5, 0.7], [1, 0.7], [1.5, 0.7], [2, 0.7], [3, 0.7], [3.5, 1], [4, 1], [5, 1], [5.5, 1.3], [6, 1.3], [7, 1.3], [7.5, 1.3], [8, 1.3], [9, 1.3], [9.5, 1], [10, 1]]],
      //     [3, [[0, 2], [0.5, 1.3], [1, 1.3], [1.5, 1], [2, 1], [3, 1], [3.5, 0.7], [4, 0.7], [5, 0.7], [5.5, 0.7], [6, 0.7], [7, 0.7], [7.5, 1], [8, 1], [9, 1], [9.5, 1.3], [10, 2]]],
      // ]

      let testarr4 = [
        [
          1,
          [
            [0, 5],
            [1, 5],
            [1.5, 6.5],
            [2, 6.5],
            [2.5, 6.5],
            [3, 6.5],
            [3.5, 5.5],
            [4, 5.5],
          ],
        ],
        [
          2,
          [
            [0, 6],
            [1, 6],
            [1.5, 6],
            [2, 6],
            [2.5, 5.5],
            [3, 5.5],
            [3.5, 6.5],
            [4, 6.5],
          ],
        ],
        [
          3,
          [
            [0, 7],
            [1, 7],
            [1.5, 5.5],
            [2, 5.5],
            [2.5, 6],
            [3, 6],
            [3.5, 6],
            [4, 6],
          ],
        ],
      ];

      let startPoints1 = [
        [2, 5],
        [2, 6],
        [2, 7],
      ];
      // testarr4 = this.generateWindingLines(20, startPoints1, [0, 1, 2])
      // drawLineCur(testarr4, 0, 20);

      //绘制数据
      function generateDrawLineCurCalls(start, end, swapPairs, data) {
        let step = 1.5;
        let current = start;
        let pairIndex = 0;

        while (current < end) {
          // console.log(current);
          console.log();
          let next = Math.min(current + step, end);
          let [swapIdx1, swapIdx2] = swapPairs[pairIndex];
          drawLineCur(processArrays(data, swapIdx1, swapIdx2), current, next);
          current = next;
          pairIndex = (pairIndex + 1) % swapPairs.length;
        }
      }
      // this.generateDrawLineCurCalls(
      //     0,
      //     20,
      //     [
      //         [1, 2],
      //         [2, 3],

      //     ],
      //     testarr4, lines, scales
      // );
      let testarr2 = [
        [
          1,
          [
            [7.5, 5],
            [8, 6],
            [8.5, 6],
            [9, 5],
            [9.5, 5],
            [10, 6],
            [10.5, 6],
          ],
        ],
        [
          2,
          [
            [7.5, 6],
            [8, 5],
            [8.5, 5],
            [9, 6],
            [9.5, 6],
            [10, 5],
            [10.5, 5],
          ],
        ],
        [
          3,
          [
            [7.5, 7],
            [8, 7],
            [9, 7],
            [10, 7],
          ],
        ],
      ];

      function generateArray(initialValues, swapIndices, endTime) {
        const result = [];
        const startTime = initialValues[0][0];
        const step = 0.5;

        for (let i = 0; i < initialValues.length; i++) {
          const lineId = i + 1;
          const linePoints = [];
          let currentValue = initialValues[i][1];
          let otherValue;

          // 如果是要交换的索引之一，获取另一个要交换的值
          if (swapIndices.includes(i)) {
            const otherIndex = swapIndices.filter((index) => index !== i)[0];
            otherValue = initialValues[otherIndex][1];
          }

          for (let time = startTime; time <= endTime; time += step) {
            linePoints.push([time, currentValue]);
            // 每 1 个时间单位交换一次值
            if ((time - startTime) % 1 === 0) {
              if (swapIndices.includes(i)) {
                currentValue =
                  currentValue === otherValue
                    ? initialValues[i][1]
                    : otherValue;
              }
            }
          }

          result.push([lineId, linePoints]);
        }

        return result;
      }

      // 示例输入
      const initialValues = [
        [7.5, 5],
        [7.5, 6],
        [7.5, 7],
      ];
      const swapIndices = [2, 1]; // 要交换的两个元素
      const endTime = 9.5; // 终止点
      const testarr3 = generateArray(initialValues, swapIndices, endTime);
      // console.log(testarr3);
      testarr2 = testarr3;

      // drawLineCur(testarr2, 7, 8.5);
      // drawLineCur(processArrays(testarr2, 3, 2), 8.5, 9);
      // drawLineCur(testarr2, 9, 10.5);

      function drawLineCur(filteredData, xa, ya) {
        lines
          .selectAll(".line")
          .data(filteredData)
          .join("g")
          .each((d, i, nodes) => {
            // console.log(d);

            const clipId = `clip-x-range-${xa * 10}-${ya * 10}`; // 唯一标识符

            // 1. 创建曲线生成器
            const lineGenerator = d3
              .line()
              .curve(d3.curveBasis) // 指定插值方式，如curveBasis、curveCardinal等[6,7](@ref)
              .x(([t, y]) => scales.x(t)) // 定义x坐标
              .y(([t, y]) => scales.y(y)); // 定义y坐标

            // 2. 生成路径字符串
            const pathData = lineGenerator(d[1]);

            const svg = d3.select("svg");
            if (!svg.select(`#${clipId}`).node()) {
              svg
                .append("defs")
                .append("clipPath")
                .attr("id", clipId)
                .append("rect")
                .attr("x", scales.x(xa))
                .attr("y", -100)
                .attr("width", scales.x(ya) - scales.x(xa))
                .attr("height", svg.attr("height"))
                .attr("stroke", "none") // 明确禁止边框
                .attr("fill", "transparent"); // 避免任何填充颜色干扰
            }

            // 3. 绘制曲线路径
            const path = d3
              .select(nodes[i])
              .append("path")
              .classed("line-fill", true)
              .attr("d", pathData) // 直接绑定生成的路径
              .attr("stroke", scales.color(d[0] / filteredData.length))
              .attr("fill", "none")
              .attr("stroke-width", 10)
              .attr("stroke-linecap", "round")
              .attr("clip-path", `url(#${clipId})`); // 应用裁剪路径
          });
      }

      function processArrays(sourceArr, swapIdx1, swapIdx2) {
        let index1, index2;
        for (let i = 0; i < sourceArr.length; i++) {
          if (sourceArr[i][0] == swapIdx1) {
            index1 = i;
          }
          if (sourceArr[i][0] == swapIdx2) {
            index2 = i;
          }
        }

        // 深拷贝原始数组避免污染
        const clonedArr = JSON.parse(JSON.stringify(sourceArr));

        // 步骤2：数组位置交换（直接操作克隆后的数组）
        if (index1 < clonedArr.length && index2 < clonedArr.length) {
          [clonedArr[index1], clonedArr[index2]] = [
            clonedArr[index2],
            clonedArr[index1],
          ];
        }

        return clonedArr;
      }
    },
    drawRoundedBubble(svg, x, y, width, height, settings, style = {}) {
      const { scales } = settings;
      // 合并样式配置
      const { fill = "#4cc4d5", opacity = 0.3, cornerRatio = 0.2 } = style;

      // 计算圆角半径
      const radius =
        Math.min(width * scales.y(1), height * scales.x(1)) * cornerRatio;

      // 绘制气泡
      svg
        .append("rect")
        .attr("x", scales.x(x))
        .attr("y", scales.y(y))
        .attr("width", width * scales.y(1))
        .attr("height", height * scales.x(1))
        .attr("rx", radius) // 圆角X轴半径
        .attr("ry", radius) // 圆角Y轴半径
        .attr("fill", fill)
        .style("opacity", opacity)
        .style("stroke", "#fff")
        .style("stroke-width", 2);
    },
    plot() {
      const container = this.$refs.plotContainer;

      // 清空容器内的所有子元素（每次绘制前调用）
      d3.select(container).selectAll("*").remove();

      // 或更精确地只删除 SVG 元素（推荐）
      d3.select(container).select("svg").remove();
      const width = container.clientWidth;
      const height = container.clientHeight;
      this.params.height = height;
      this.params.lineWidth = height / (this.params.length * 1.5);
      //   console.log(height);

      const values = this.genValues();
      const result = this.timsort(values);
      const settings = this.makePlotSettings(values, width, height);
      const data = this.makePointsData(result, settings.maxTime, this.params);

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", "100%")
        .attr("height", this.params.height);

      // // // 绘制一个基础气泡
      // this.drawRoundedBubble(svg, 1.5, 1.5, 4.5, 1, settings, {
      //   fill: this.params.color[1],
      // });
      // this.drawRoundedBubble(svg, 6, 0, 16, 1, settings, {
      //   fill: this.params.color[3],
      // });
      // this.drawRoundedBubble(svg, 21.5, -0.5, 4, 1, settings, {
      //   fill: this.params.color[3],
      // });
      // this.drawRoundedBubble(svg, 26.5, 2.5, 5, 1, settings, {
      //   fill: this.params.color[1],
      // });

      // this.drawRoundedBubble(svg, 1.5, 4.5, 7.5, 1, settings, {
      //   fill: this.params.color[3],
      // });

      // this.drawRoundedBubble(svg, 9.5, 6.5, 4.5, 1, settings, {
      //   fill: this.params.color[1],
      // });

      // this.drawRoundedBubble(svg, 14.5, 5, 9.5, 1, settings, {
      //   fill: this.params.color[3],
      // });

      // this.drawRoundedBubble(svg, 24.5, 5.5, 6.5, 1, settings, {
      //   fill: this.params.color[3],
      // });

      // 案例3
      // let data_new_1 = {
      //   pointsxy: [0, 1, 2, 3, 4],
      //   wing: [
      //     // [1, 6, 2, [0, 2]],
      //     [0, 5, 2, [2, 3]],
      //     [5, 20, 3, [0, 1, 4]],
      //     [20, 25, 2, [0, 1]],
      //     [25, 30, 2, [2, 3]],
      //     // [15, 20, 2, [4, 2]],
      //     // [16, 20, 2, [2, 4]],
      //     // [16, 18, 2, [0, 4]],
      //     // [14, 17, 2, [0, 2]],
      //     // [6, 14, 2, [0, 2]],
      //     // [16, 18, 2, [1, 3]]
      //     // [18, 20, 2, [0, 1]]
      //   ],
      // };

      // let data_new_2 = {
      //   pointsxy: [5, 6, 7, 8, 9],
      //   wing: [
      //     [0, 8, 2, [0, 1]],
      //     [8, 13, 2, [2, 3]],
      //     [13, 23, 3, [1, 0, 4]],
      //     [23, 30, 2, [1, 4]],
      //     // [15, 20, 3, [0, 1, 2]]
      //   ],
      // };

      // ====================视图展示1====================

      let data_new_1 = {
        pointsxy: [0, 1, 2, 3, 4],
        wing: [
          // [1, 6, 2, [0, 2]],
          [0, 15, 3, [2, 3, 1]],
          [15, 20, 2, [0, 1]],
          [20, 25, 2, [3, 1]],
          [25, 30, 2, [2, 4]],
          // [15, 20, 2, [4, 2]],
          // [16, 20, 2, [2, 4]],
          // [16, 18, 2, [0, 4]],
          // [14, 17, 2, [0, 2]],
          // [6, 14, 2, [0, 2]],
          // [16, 18, 2, [1, 3]]
          // [18, 20, 2, [0, 1]]
        ],
      };

      let data_new_2 = {
        pointsxy: [5, 6, 7, 8, 9],
        wing: [
          [0, 10, 2, [0, 2]],
          [10, 15, 2, [1, 4]],
          [15, 23, 3, [1, 2, 4]],
          [23, 30, 2, [1, 3]],
          // [15, 20, 3, [0, 1, 2]]
        ],
      };
      // ====================END========================

      // ====================视图展示2====================

      // let data_new_1 = {
      //   pointsxy: [0, 1, 2, 3, 4],
      //   wing: [
      //     [0, 13, 3, [2, 3, 1]],
      //     [13, 30, 3, [2, 1, 4]],
      //   ],
      // };

      // let data_new_2 = {
      //   pointsxy: [5, 6, 7, 8, 9],
      //   wing: [
      //     [0, 8, 2, [0, 2]],
      //     [8, 18, 3, [3, 4, 2]],
      //     [19, 30, 2, [2, 4]],
      //   ],
      // };
      // // // 绘制一个基础气泡
      // this.drawRoundedBubble(svg, 1, 0.7, 15, 1, settings, {
      //   fill: this.params.color[4],
      // });
      // this.drawRoundedBubble(svg, 14, 0.7, 19, 1, settings, {
      //   fill: this.params.color[4],
      // });
      // this.drawRoundedBubble(svg, 1.5, 4.3, 8, 1, settings, {
      //   fill: this.params.color[4],
      // });
      // this.drawRoundedBubble(svg, 9, 6.7, 11, 1, settings, {
      //   fill: this.params.color[4],
      // });
      // this.drawRoundedBubble(svg, 20.5, 6.2, 13, 1, settings, {
      //   fill: this.params.color[4],
      // });
      // ====================END========================

      // this.drawLines(data, settings, svg, 0, 1, 0, 1.5);
      // let test = this.swapIndexAandIndexB(data, 0, 2);
      // this.drawLines(test, settings, svg, 0, 1, 1.5, 2.5);
      // let test_1 = this.swapIndexAandIndexB(test, 10, 9);
      // this.drawLines(test_1, settings, svg, 0, 1, 2.5, 4.5);
      // let test2 = this.swapIndexAandIndexB(data, 3, 5);
      // this.drawLines(test2, settings, svg, 0, 1, 4.5, 5.5);
      // let test3 = this.swapIndexAandIndexB(test2, 3, 5);
      // this.drawLines(test3, settings, svg, 0, 1, 5.5, 6.5);
      // let test4 = this.swapIndexAandIndexB(test3, 3, 5);
      // this.drawLines(test4, settings, svg, 0, 1, 6.5, 10);

      //案例2

      // this.drawLines(data, settings, svg, 0, 1, 0, 1.5);
      // let test = this.swapIndexAandIndexB(data, 0, 2);
      // test = this.swapIndexAandIndexB(test, 9, 11);
      // this.drawLines(test, settings, svg, 0, 1, 1.5, 4.5);
      // let test1 = this.swapIndexAandIndexB(test, 0, 2);
      // test1 = this.swapIndexAandIndexB(test1, 9, 11);
      // // let test_1 = this.swapIndexAandIndexB(test, 10, 9);
      // // this.drawLines(test_1, settings, svg, 0, 1, 2.5, 4.5);
      // let test2 = this.swapIndexAandIndexB(test1, 3, 5);
      // this.drawLines(test2, settings, svg, 0, 1, 4.5, 5.5);
      // let test3 = this.swapIndexAandIndexB(test2, 3, 5);
      // test3 = this.swapIndexAandIndexB(test3, 9, 10);
      // this.drawLines(test3, settings, svg, 0, 1, 5.5, 6.5);
      // let test4 = this.swapIndexAandIndexB(test3, 3, 5);
      // test4 = this.swapIndexAandIndexB(test4, 9, 10);
      // console.log(data);

      // this.drawLines(test4, settings, svg, 0, 1, 6.5, 7.5);
      // let test5 = this.swapIndexAandIndexB(test4, 9, 10);
      // this.drawLines(test5, settings, svg, 0, 1, 7.5, 8.5);
      // let test6 = this.swapIndexAandIndexB(test5, 9, 10);
      // this.drawLines(test6, settings, svg, 0, 1, 8.5, 10);

      // // 使用示例
      // let timeline = [
      //     { startX: 0, endX: 1, startY: 0, endY: 1.5, swaps: [] },
      //     { startX: 0, endX: 1, startY: 1.5, endY: 2.5, swaps: [{ indexA: 0, indexB: 2 }, { indexA: 9, indexB: 11 }, { indexA: 14, indexB: 15 }] },
      //     { startX: 0, endX: 1, startY: 2.5, endY: 3.5, swaps: [{ indexA: 14, indexB: 15 }] },
      //     { startX: 0, endX: 1, startY: 3.5, endY: 4.5, swaps: [{ indexA: 0, indexB: 2 }, { indexA: 9, indexB: 11 }, { indexA: 9, indexB: 8 }, { indexA: 14, indexB: 15 }] },
      //     { startX: 0, endX: 1, startY: 4.5, endY: 5.5, swaps: [{ indexA: 9, indexB: 8 }] },
      //     { startX: 0, endX: 1, startY: 5.5, endY: 6.5, swaps: [{ indexA: 9, indexB: 10 }] },
      //     { startX: 0, endX: 1, startY: 6.5, endY: 7.5, swaps: [{ indexA: 9, indexB: 10 }] },
      //     { startX: 0, endX: 1, startY: 7.5, endY: 8.5, swaps: [{ indexA: 9, indexB: 10 }] },
      //     { startX: 0, endX: 1, startY: 8.5, endY: 10, swaps: [{ indexA: 9, indexB: 10 }] }
      // ];

      // 使用示例
      let timeline = [
        { startX: 0, endX: 1, startY: 0, endY: 10, swaps: [] },
        // { startX: 0, endX: 1, startY: 3.5, endY: 12.5, swaps: [{ indexA: 0, indexB: 2 }, { indexA: 9, indexB: 11 }, { indexA: 14, indexB: 15 }] },
        // { startX: 0, endX: 1, startY: 2.5, endY: 3.5, swaps: [{ indexA: 14, indexB: 15 }] },
        // { startX: 0, endX: 1, startY: 3.5, endY: 4.5, swaps: [{ indexA: 0, indexB: 2 }, { indexA: 9, indexB: 11 }, { indexA: 9, indexB: 8 }, { indexA: 14, indexB: 15 }] },
        // { startX: 0, endX: 1, startY: 4.5, endY: 5.5, swaps: [{ indexA: 9, indexB: 8 }] },
        // { startX: 0, endX: 1, startY: 5.5, endY: 6.5, swaps: [{ indexA: 9, indexB: 10 }] },
        // { startX: 0, endX: 1, startY: 6.5, endY: 7.5, swaps: [{ indexA: 9, indexB: 10 }] },
        // { startX: 0, endX: 1, startY: 7.5, endY: 8.5, swaps: [{ indexA: 9, indexB: 10 }] },
        // { startX: 0, endX: 1, startY: 8.5, endY: 10, swaps: [{ indexA: 9, indexB: 10 }] }
      ];
      // 初始绘制
      // this.drawLines(data, settings, svg, timeline[0].startX, timeline[0].endX, timeline[0].startY, timeline[0].endY);

      this.drawLinesForWinding(
        data_new_1,
        settings,
        svg,
        Object.values(this.params.customColors)
      );
      // this.drawLinesForWinding(
      //   data_new_2,
      //   settings,
      //   svg,
      //   Object.values(this.params.customColors)
      // );
      //   this.drawLinesForWinding(data_new_3, settings, svg);

      let currentData = data;
      // 按时间线顺序处理数据并绘制
      for (let i = 1; i < timeline.length; i++) {
        console.log(123123);

        // 执行交换操作
        for (let swap of timeline[i].swaps) {
          currentData = this.swapIndexAandIndexB(
            currentData,
            swap.indexA,
            swap.indexB
          );
        }
        // 绘制线条
        this.drawLines(
          currentData,
          settings,
          svg,
          timeline[i].startX,
          timeline[i].endX,
          timeline[i].startY,
          timeline[i].endY
        );
      }
    },
  },
  computed: {
    ...mapState(["count"]), // 映射 count 到计算属性
  },
  watch: {
    // 监听 count 变化
    count(newVal, oldVal) {
      this.plot();
      console.log("重新绘制交互视图");
    },
  },
};
</script>

<style scoped>
.line-border {
  stroke: hsl(0, 0, 10%);
  stroke-width: 12.5px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* .line-fill {
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 13px;
} */

svg {
  background: #f8f9fa;
  margin: 20px;
}

h2,
h3 {
  margin: 20px;
}

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
</style>
