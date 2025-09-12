<template>
  <div class="container">
    <svg ref="svg" :width="width" :height="height"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "RectanglesWithCurves",
  data() {
    return {
      //案例2-1
      width: 20000,
      height: 1600,
      rectWidth: 100,
      spacing: {
        column: 100,
        row: 60,
      },
      start: {
        x: 50,
        y: 50,
      },
      // heights: {
      //     //600
      //     a: 100, b: 300, c: 80, aa: 120,
      //     d: 90, e: 320, f: 100, bb: 90,
      //     g: 100, h: 10, i: 190, cc: 300,
      //     j: 80, k: 100, l: 270, dd: 150,
      // },
      // colors: ['#C8E6C9', '#FFF280', '#E1BEE7', '#BBDEFB', '#FFCCBC'],    // 蓝色系渐变

      //案例1-1
      heights: {
        // //600
        a: 130,
        b: 140,
        c: 150,
        aa: 180,

        d: 150,
        e: 120,
        f: 180,
        bb: 150,

        g: 100,
        h: 250,
        i: 120,
        cc: 130,

        j: 100,
        k: 320,
        l: 110,
        dd: 70,

        m: 130,
        n: 250,
        o: 120,
        ee: 100,

        1: 130,
        2: 250,
        3: 120,
        4: 100,
      },
      colors: [
        "#FBB885",
        "#FCDCDB",
        "#D9D8ED",
        "#7CB6E4",
        "#727FBD",
        "#254BA0",
      ],
      dataTalk: [
        [130, 140, 150, 180],
        [150, 120, 180, 150],
        [100, 250, 120, 130],
        [100, 320, 110, 70],
        [130, 250, 120, 100],
        [130, 250, 120, 100],
      ],

      // //案例2-2
      // heights: {
      //     //600
      //     a: 170, b: 180, c: 190, aa: 60,
      //     d: 280, e: 100, f: 190, bb: 30,
      //     g: 320, h: 100, i: 150, cc: 30,
      //     j: 120, k: 160, l: 270, dd: 50,
      // },
      // colors: ['#72E877', '#FFEE57', '#EC9AF9', '#77B9F6', '#77B9F6'],    // 蓝色系渐变
    };
  },
  computed: {
    columns() {
      function createNumberMatrix(rows, cols, options = {}) {
        const {
          start = 1, // 起始数字
          step = 1, // 数字步长
          random = false, // 是否生成随机数
          max = 100, // 随机数最大值
        } = options;

        let counter = start;

        return Array.from({ length: rows }, (_, i) =>
          Array.from({ length: cols }, (_, j) => {
            if (random) {
              return Math.floor(Math.random() * max);
            }
            const value = counter;
            counter += step;
            return value;
          })
        );
      }

      function matrixToOrderedObject(matrix) {
        const result = {};
        let keyCounter = 1;

        // 使用双层循环遍历二维数组
        for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
          const currentRow = matrix[rowIndex];

          // 处理可能存在的非数组行
          if (!Array.isArray(currentRow)) continue;

          for (let colIndex = 0; colIndex < currentRow.length; colIndex++) {
            // 将有效值存入对象
            if (currentRow[colIndex] !== undefined) {
              result[keyCounter] = currentRow[colIndex];
              keyCounter++;
            }
          }
        }

        return result;
      }

      // 测试用例
      const testData = [
        [120, 190, 140, 150], // 随机化
        [100, 250, 120, 130], // 保留
        [70, 130, 250, 150], // 随机化
        [110, 180, 160, 150], // 随机化
        [160, 140, 130, 170], // 随机化
        [80, 280, 110, 130], // 保留
        [245, 155, 130, 70], // 随机化

        [90, 260, 120, 130], // 保留
        [155, 145, 140, 160], // 随机化
        [235, 85, 215, 65], // 随机化
      ];
      const testData2 = [
        [100, 120, 180, 90, 110],
        [30, 100, 250, 120, 100],
        [100, 80, 150, 170, 100],
        [60, 110, 180, 120, 130],
        [90, 140, 90, 120, 160],
        [70, 120, 130, 200, 80],
        [80, 120, 90, 210, 100],
        [90, 230, 110, 100, 70],
        [120, 140, 110, 150, 80],
        [80, 90, 110, 120, 200],
      ];
      const testData3 = [
        [180, 130, 95, 85, 110], // 和600，中间两列随机波动
        [120, 190, 105, 75, 110],
        [145, 155, 80, 90, 130],
        [200, 110, 70, 100, 120],
        [110, 210, 90, 80, 110],
        [135, 165, 85, 75, 140],
        [170, 100, 110, 60, 160], // 末列偶尔偏高
        [150, 140, 120, 50, 140], // 第4列低至50
        [190, 90, 100, 80, 140],
        [100, 200, 120, 60, 120],
      ];
      this.heights = matrixToOrderedObject(testData3);
      return createNumberMatrix(10, 5);
    },
    positions() {
      const positions = {};
      this.columns.forEach((col, colIndex) => {
        let y = this.start.y;

        col.forEach((label, index) => {
          positions[label] = {
            x: this.start.x + colIndex * (this.rectWidth + this.spacing.column),
            y: y,
            width: this.rectWidth,
            height: this.heights[label],
            color: this.colors[index % col.length],
          };
          y += this.heights[label] + this.spacing.row;
        });
      });
      return positions;
    },
  },
  mounted() {
    this.drawElements();
  },
  methods: {
    drawElements() {
      const svg = d3.select(this.$refs.svg).attr("transform", "scale(1, 1)"); // 缩小为原来的一半;
      // 绘制曲线区域
      this.drawCurvedAreas(svg);

      // 绘制矩形
      svg
        .selectAll("rect")
        .data(Object.entries(this.positions))
        .join("rect")
        .attr("x", (d) => d[1].x)
        .attr("y", (d) => d[1].y)
        .attr("width", (d) => d[1].width)
        .attr("height", (d) => d[1].height)
        .style("fill", "none")
        .style("stroke", (d) => d[1].color)
        .style("stroke-width", "20");

      // // 添加文字标签
      // svg
      //   .selectAll("text")
      //   .data(Object.entries(this.positions))
      //   .join("text")
      //   .attr("x", (d) => d[1].x + d[1].width / 2)
      //   .attr("y", (d) => d[1].y + d[1].height / 2 + 5)
      //   .style("text-anchor", "middle")
      //   .style("font-size", "30px")
      //   .text((d) => d[0]);
    },
    drawCurvedAreas(svg) {
      const createAreaPath = (
        start,
        end,
        bottomStart,
        bottomEnd,
        color = "rgba(255, 0, 0)"
      ) => {
        const path = d3.path();

        // 顶部曲线
        path.moveTo(start.x, start.y);
        path.bezierCurveTo(
          start.x + 30,
          start.y,
          end.x - 30,
          end.y,
          end.x,
          end.y
        );

        // 底部曲线
        path.lineTo(bottomEnd.x, bottomEnd.y);
        path.bezierCurveTo(
          bottomEnd.x - 30,
          bottomEnd.y,
          bottomStart.x + 30,
          bottomStart.y,
          bottomStart.x,
          bottomStart.y
        );

        path.closePath();

        svg.append("path").attr("d", path.toString()).style("fill", color);
        //   .style("mix-blend-mode", "multiply");
      };

      // 定义曲线连接关系
      const connections2 = [
        // {
        //     from: 'a',
        //     to: 'e',
        //     color: '#E1BEE7',
        //     offset: 0,
        //     wid: 1 / 4
        // },
        // {
        //     from: 'c',
        //     to: 'e',
        //     color: '#C8E6C9',
        //     offset: 1 / 2,
        //     wid: 1 / 2
        // },
        // {
        //     from: 'b',
        //     to: 'e',
        //     color: '#BBDEFB',
        //     offset: 1 / 4,
        //     wid: 1 / 4
        // },
        // {
        //     from: 'e',
        //     to: 'h',
        //     color: '#E1BEE7',
        //     offset: 0,
        //     wid: 1 / 4
        // },
        // {
        //     from: 'e',
        //     to: 'h',
        //     color: '#C8E6C9',
        //     offset: 1 / 2,
        //     wid: 1 / 2
        // },
        // {
        //     from: 'e',
        //     to: 'h',
        //     color: '#BBDEFB',
        //     offset: 1 / 4,
        //     wid: 1 / 4
        // },

        //案例2_6
        // {
        //     from: 'b',
        //     to: 'f',
        //     color: '#FFF280',
        //     offset: 0,
        //     wid: 1 / 2
        // },
        // {
        //     from: 'f',
        //     to: 'i',
        //     color: '#E1BEE7',
        //     offset: 1 / 2,
        //     wid: 1 / 2
        // },
        // {
        //     from: 'f',
        //     to: 'i',
        //     color: '#FFF280',
        //     offset: 0,
        //     wid: 1 / 2
        // },
        // {
        //     from: 'c',
        //     to: 'f',
        //     color: '#E1BEE7',
        //     offset: 1 / 2,
        //     wid: 1 / 2
        // },
        // {
        //     from: 'i',
        //     to: 'l',
        //     color: '#E1BEE7',
        //     offset: 0,
        //     wid: 1
        // },

        //案例2_7
        // {
        //     from: 'b',
        //     to: 'bb',
        //     color: '#FFF280',
        //     offset: 0,
        //     wid: 3 / 4
        // },
        // {
        //     from: 'bb',
        //     to: 'cc',
        //     color: '#FFF280',
        //     offset: 0,
        //     wid: 3 / 4
        // },
        // {
        //     from: 'cc',
        //     to: 'dd',
        //     color: '#BBDEFB',
        //     offset: 0,
        //     wid: 1
        // },
        // {
        //     from: 'aa',
        //     to: 'bb',
        //     color: '#BBDEFB',
        //     offset: 3 / 4,
        //     wid: 1 / 4
        // },
        // {
        //     from: 'bb',
        //     to: 'cc',
        //     color: '#BBDEFB',
        //     offset: 3 / 4,
        //     wid: 1 / 4
        // }

        // //案例2-2

        // {
        //     from: 'c',
        //     to: 'f',
        //     color: '#EC9AF9',
        //     offset: 0,
        //     wid: 1
        // },
        // {
        //     from: 'f',
        //     to: 'i',
        //     color: '#EC9AF9',
        //     offset: 0,
        //     wid: 1
        // },
        // {
        //     from: 'i',
        //     to: 'l',
        //     color: '#EC9AF9',
        //     offset: 0,
        //     wid: 1
        // },

        //案例1-1

        {
          from: "c",
          to: "e",
          color: "#FCDCDB",
          offset: 1 / 5,
          wid: 4 / 5,
        },
        {
          from: "b",
          to: "e",
          color: "#FCDCDB",
          offset: 0,
          wid: 1 / 5,
        },
        {
          from: "e",
          to: "h",
          color: "#FCDCDB",
          offset: 1 / 5,
          wid: 4 / 5,
        },
        {
          from: "e",
          to: "h",
          color: "#FCDCDB",
          offset: 0,
          wid: 1 / 5,
        },
        ,
        {
          from: "h",
          to: "k",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
      ];

      const connections = [
        {
          from: "1",
          to: "6",
          color: "#FCDCDB",
          offset: 0,
          wid: 1 / 2,
        },
        {
          from: "3",
          to: "6",
          color: "#FCDCDB",
          offset: 1 / 2,
          wid: 1 / 2,
        },
        {
          from: "6",
          to: "10",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "10",
          to: "14",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "14",
          to: "18",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "17",
          to: "22",
          color: "#FCDCDB",
          offset: 0,
          wid: 2 / 3,
        },
        {
          from: "18",
          to: "22",
          color: "#FCDCDB",
          offset: 2 / 3,
          wid: 1 / 3,
        },

        {
          from: "22",
          to: "26",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "26",
          to: "30",
          color: "#FCDCDB",
          offset: 0,
          wid: 1 / 3,
        },
        {
          from: "28",
          to: "30",
          color: "#FCDCDB",
          offset: 1 / 3,
          wid: 2 / 3,
        },
        {
          from: "30",
          to: "34",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "34",
          to: "38",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
      ];
      const connections3 = [
        {
          from: "2",
          to: "6",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "6",
          to: "10",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "10",
          to: "14",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "14",
          to: "18",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "18",
          to: "22",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "22",
          to: "26",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "26",
          to: "30",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "30",
          to: "34",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
        {
          from: "34",
          to: "38",
          color: "#FCDCDB",
          offset: 0,
          wid: 1,
        },
      ];
      const connections4 = [
        {
          from: "3",
          to: "8",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
        {
          from: "8",
          to: "13",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
        {
          from: "13",
          to: "18",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
        {
          from: "18",
          to: "23",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
        {
          from: "23",
          to: "28",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
        {
          from: "28",
          to: "33",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
        {
          from: "33",
          to: "38",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
        {
          from: "38",
          to: "43",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
        {
          from: "43",
          to: "48",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
      ];
      const connections5 = [
        {
          from: "3",
          to: "8",
          color: this.colors[2],
          offset: 0,
          wid: 1 / 2,
        },
        {
          from: "4",
          to: "8",
          color: this.colors[2],
          offset: 1 / 2,
          wid: 1 / 2,
        },
        {
          from: "8",
          to: "13",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
        {
          from: "13",
          to: "18",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
        {
          from: "18",
          to: "23",
          color: this.colors[2],
          offset: 0,
          wid: 1 / 2,
        },
        {
          from: "19",
          to: "23",
          color: this.colors[2],
          offset: 1 / 2,
          wid: 1 / 2,
        },
        {
          from: "23",
          to: "28",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
        {
          from: "28",
          to: "33",
          color: this.colors[2],
          offset: 0,
          wid: 1 / 4,
        },
        {
          from: "29",
          to: "33",
          color: this.colors[2],
          offset: 1 / 4,
          wid: 3 / 4,
        },
        {
          from: "33",
          to: "38",
          color: this.colors[2],
          offset: 0,
          wid: 3 / 4,
        },
        {
          from: "34",
          to: "38",
          color: this.colors[2],
          offset: 3 / 4,
          wid: 1 / 4,
        },
        {
          from: "38",
          to: "43",
          color: this.colors[2],
          offset: 0,
          wid: 2 / 3,
        },
        {
          from: "39",
          to: "43",
          color: this.colors[2],
          offset: 2 / 3,
          wid: 1 / 3,
        },
        {
          from: "43",
          to: "48",
          color: this.colors[2],
          offset: 0,
          wid: 1,
        },
      ];

      const connections6 = [
        {
          from: "4",
          to: "9",
          color: this.colors[3],
          offset: 0,
          wid: 1,
        },
        {
          from: "9",
          to: "14",
          color: this.colors[3],
          offset: 1 / 2,
          wid: 1 / 2,
        },
        {
          from: "8",
          to: "14",
          color: this.colors[3],
          offset: 0,
          wid: 1 / 2,
        },
        {
          from: "13",
          to: "19",
          color: this.colors[3],
          offset: 0,
          wid: 1 / 2,
        },
        {
          from: "14",
          to: "19",
          color: this.colors[3],
          offset: 1 / 2,
          wid: 1 / 2,
        },
        {
          from: "18",
          to: "24",
          color: this.colors[3],
          offset: 0,
          wid: 1,
        },
        {
          from: "24",
          to: "29",
          color: this.colors[3],
          offset: 0,
          wid: 1,
        },
        {
          from: "29",
          to: "34",
          color: this.colors[3],
          offset: 0,
          wid: 1,
        },
        {
          from: "34",
          to: "39",
          color: this.colors[3],
          offset: 0,
          wid: 1,
        },
        {
          from: "39",
          to: "44",
          color: this.colors[3],
          offset: 0,
          wid: 1,
        },
        {
          from: "44",
          to: "49",
          color: this.colors[3],
          offset: 0,
          wid: 1,
        },
      ];

      connections6.forEach((conn) => {
        const fromRect = this.positions[conn.from];
        const toRect = this.positions[conn.to];

        const start = {
          x: fromRect.x + fromRect.width,
          y: fromRect.y + fromRect.height * conn.offset - 10,
        };

        const end = {
          x: toRect.x,
          y: toRect.y + toRect.height * conn.offset - 10,
        };

        const bottomStart = {
          x: fromRect.x + fromRect.width,
          y: fromRect.y + fromRect.height * (conn.offset + conn.wid) + 10,
        };

        const bottomEnd = {
          x: toRect.x,
          y: toRect.y + toRect.height * (conn.offset + conn.wid) + 10,
        };

        // console.log(this.columns.findIndex(
        //     column => column.includes("a")
        // ));

        // let colorcon = this.colors[this.columns.findIndex(
        //     column => column.includes(conn.from)
        // )]

        createAreaPath(start, end, bottomStart, bottomEnd, conn.color);
      });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

svg {
  border: 1px solid #ccc;
  background-color: white;
}
</style>