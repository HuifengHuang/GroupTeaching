<template>
  <div ref="container2" class="overview-container-theme">
    <!-- 新增header容器包裹 -->
    <div class="header-row-theme">
      <div class="title">Theme Detail</div>
      <label class="switch">
        <input type="checkbox" id="themeToggle" />
        <span class="slider"></span>
      </label>
      <div class="checked-name" v-if="checked === 1">预设讨论主题</div>
      <div class="checked-name" v-if="checked === 2">小组讨论主题</div>
      <!-- <div class="checked-name">当前主题:</div> -->
      <div class="dropdown">
        <button class="dropdown-btn">
          <div class="color-preview"></div>
          <span class="checked-name">请选择</span>
        </button>
        <div class="dropdown-content" id="dropdownContent"></div>
      </div>
      <!-- <div ref="tuli" class="legend-container"></div> -->
    </div>
    <!-- <div ref="stairs"></div> -->
    <div ref="matrixContainer" class="matrix-wrapper"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import api from "@/utils/api";

export default {
  data() {
    return {
      checked: 2,
      color: [
        ["#c7522a", "#83C3A8", "#B0ECD3", "#D6FFEE"],
        ["#c7522a", "#e5c185", "#fbf2c4", "#fdf8e1"],
        ["#9692af", "#acdbdf", "#d7eaea"],
      ],
      colorDis: [
        "#FBB885",
        "#FCDCDB",
        "#D9D8ED",
        "#7CB6E4",
        "#727FBD",
        "#254BA0",
      ],
      startDate: "00:03:00",
      endDate: "00:10:00",
    };
  },

  mounted() {
    // this.initStairs();
    const that = this;
    this.initdraopdown();
    document
      .getElementById("themeToggle")
      .addEventListener("change", function () {
        if (this.checked) {
          that.checked = 1;
          that.initMatrix();
        } else {
          that.checked = 2;
          that.initMatrixGroup();
        }
      });
  },

  methods: {
    initdraopdown() {
      // 示例数据
      const data = [
        { color: "#c7522a", text: "数据可视化" },
        { color: "#e5c185", text: "需求分析" },
        { color: "#e5c185", text: "数据处理" },
        { color: "#008585", text: "可视化设计" },
      ];

      // 获取元素
      const dropdownBtn = document.querySelector(".dropdown-btn");
      const colorPreview = document.querySelector(".color-preview");
      const dropdownContent = document.getElementById("dropdownContent");
      const span = dropdownBtn.querySelector("span");

      // 生成下拉项
      data.forEach((item) => {
        const div = document.createElement("div");
        div.className = "dropdown-item";

        div.innerHTML = `
        <div class="color-box" style="background: ${item.color}"></div>
        <span>${item.text}</span>
      `;

        div.addEventListener("click", () => {
          colorPreview.style.background = item.color;
          span.textContent = item.text;
          dropdownContent.classList.remove("show");
          // 触发自定义事件
          onColorSelect(item);
        });

        dropdownContent.appendChild(div);
      });

      // 切换下拉可见性
      dropdownBtn.addEventListener("click", () => {
        dropdownContent.classList.toggle("show");
      });

      // 点击外部关闭
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".dropdown")) {
          dropdownContent.classList.remove("show");
        }
      });

      // 选择回调函数（示例）
      function onColorSelect(selectedItem) {
        console.log("已选择:", selectedItem);
        // 这里可以添加更多业务逻辑
        // document.body.style.backgroundColor = selectedItem.color + "20";
      }
    },
    initMatrixGroup() {
      const container = this.$refs.container2;
      // 清空容器内的所有子元素（每次绘制前调用）
      d3.select(this.$refs.matrixContainer).selectAll("*").remove();
    },
    initMatrix() {
      const container = this.$refs.container2;
      // 清空容器内的所有子元素（每次绘制前调用）
      d3.select(this.$refs.matrixContainer).selectAll("*").remove();

      // 或更精确地只删除 SVG 元素（推荐）
      // d3.select(this.$refs.chart).select("svg").remove();
      const width = container.clientWidth;
      const height = container.clientHeight * 0.85;

      // 创建SVG画布
      const svg = d3
        .select(this.$refs.matrixContainer)
        .append("svg")
        .attr("width", width)
        .attr("height", height + 100);
      const data = [
        {
          name: "trans",
          children: [
            {
              // name: "需求收集与定义",
              name: "数据分析",
              children: [
                { name: "目标用户分析" },
                { name: "目标场景分析" },
                { name: "用户访谈模拟" },
                { name: "需求整理" },
              ],
            },
          ],
        },
        {
          name: "trans",
          children: [
            {
              name: "可视化维度设计",
              children: [
                { name: "编码方式初步选择" },
                { name: "信息密度控制" },
                { name: "交互模式规划" },
                // { name: "可视化维度整理" },
              ],
            },
          ],
        },
        {
          name: "trans",
          children: [
            {
              name: "技术可行性验证",
              children: [
                { name: "数据整理思考" },
                { name: "渲染性能测试" },
                { name: "数据管道构建" },
              ],
            },
            {
              name: "方案迭代",
              // children: [{ name: "c-1" }, { name: "c-2" }, { name: "c-3" }],
            },
          ],
        },
      ];
      const data2 = [
        {
          name: "trans",
          children: [
            {
              name: "可视化方案",
              children: [
                { name: "空间映射" },
                { name: "基于地图的可视化" },
                { name: "聚类分析" },
                { name: "聚类图" },
              ],
            },
          ],
        },
      ];
      const data3 = [
        {
          name: "trans",
          children: [
            {
              name: "数据获取",
              children: [
                { name: "API接口" },
                { name: "数据库查询" },
                { name: "文件导入" },
                { name: "网络爬虫" },
              ],
            },
          ],
        },
        {
          name: "trans",
          children: [
            {
              name: "数据清洗",
              children: [
                { name: "缺失值处理" },
                { name: "异常值检测" },
                { name: "噪声去除" },
              ],
            },
          ],
        },
        {
          name: "trans",
          children: [
            {
              name: "数据转换",
              children: [
                {
                  name: "数据转换算法",
                  children: [
                    { name: "标准化" },
                    { name: "归一化" },
                    { name: "离散化" },
                  ],
                },

                { name: "特征编码" },
              ],
            },
          ],
        },
      ];

      const config = {
        width: 800,
        levelWidth: [100, 90, 80, 25], // 各层级宽度 [0级,1级,2级]
        nodeHeight: 20,
        num: 5,
      };

      config.nodeHeight = height / (config.num + 1);
      config.levelWidth[0] = width / 3;
      config.levelWidth[1] = width / 3;
      config.levelWidth[2] = width / 3 - 10;
      config.levelWidth[3] = width / 3 - 20;

      function drawAligned(node, startX, startY, depth = 0, color) {
        const colorDis = [
          "#FBB885",
          "#FCDCDB",
          "#D9D8ED",
          "#7CB6E4",
          "#727FBD",
          "#254BA0",
        ];
        // console.log(startDate, endDate);
        // if (flag == 5) {
        //     startX = startX + 300
        //     flag = 0
        // } else {
        //     flag = flag + 1
        // }

        // 当前层级的宽度
        const nodeWidth = config.levelWidth[depth];

        // 右侧对齐坐标计算
        const x = startX - nodeWidth;

        if (node.name != "trans") {
          // 绘制当前节点
          const g = svg
            .append("g")
            .attr("transform", `translate(${x},${startY - 20})`);
          // .classed(`level${depth}`, true);

          g.append("rect")
            .attr("width", nodeWidth)
            .attr("height", config.nodeHeight)
            .attr("rx", 5) // 圆角x半径
            .attr("ry", 5) // 圆角y半径
            .attr("stroke", (d) => {
              const specialNodes = ["聚类图", "聚类分析", "important"];
              return specialNodes.includes(node.name) ? "#F77A7A" : "white";
            }) // 边框颜色
            .attr("fill", color[depth])
            .attr("stroke-width", 2) // 边框粗细
            .on("click", function (event, d) {
              // 添加点击事件
              d3.selectAll(".node-popup").remove();
              showPopup(event, node); // 触发弹窗显示
            });

          g.append("text")
            .style("font-size", "12px")
            .style("dominant-baseline", "middle")
            .style("text-anchor", "end")
            .style("font-family", "MingLiU")
            .style("fill", "#7F7F7F")
            .attr("x", nodeWidth - 10)
            .attr("y", config.nodeHeight / 2)
            .text(node.name);
        }
        // 弹窗控制函数
        async function showPopup(event, nodeData) {
          // const that = this;
          // console.log(startDate);
          // 创建遮罩层
          const overlay = d3
            .select("body")
            .append("div")
            .style("position", "fixed")
            .style("top", 0)
            .style("left", 0)
            .style("width", "100%")
            .style("height", "100%")
            .style("background", "rgba(0,0,0,0.5)")
            .style("z-index", "999");

          // 创建弹窗容器
          const popup = d3
            .select("body")
            .append("div")
            .attr("class", "node-popup")
            .style("position", "fixed")
            .style("left", "10%")
            .style("top", "10%")
            // .style("transform", "translate(-50%, -50%)") // 居中关键代码
            .style("background", "white")
            .style("padding", "20px")
            .style("border-radius", "8px")
            .style("width", "60%")
            .style("height", "60%")
            .style("box-shadow", "0 4px 12px rgba(0,0,0,0.25)")
            .style("z-index", "1000");

          // 弹窗内容
          popup
            .append("h3")
            .style("margin", "0 0 15px 0")
            .style("font-size", "18px")
            .style("color", "#333")
            .text(nodeData.name);

          popup.append("p").style("margin", "0 0 8px 0").style("color", "#666");
          // .text(`时间区间: ${startDate}~${endDate}`);

          // 添加导航栏
          const nav = popup
            .append("div")
            .style("display", "flex")
            .style("gap", "10px")
            .style("margin-bottom", "20px");

          // 导航按钮
          const buttons = [
            { id: "sum", label: "摘要速览" },
            { id: "con", label: "发言总结" },
            { id: "chat", label: "详细对话" },
          ];

          nav
            .selectAll("button")
            .data(buttons)
            .enter()
            .append("button")
            .text((d) => d.label)
            .style("padding", "8px 16px")
            .style("border", "none")
            .style("font-size", "10px")
            .style("border-radius", "4px")
            .style("cursor", "pointer")
            .style("background", "#f0f0f0")
            .style("color", "#666")
            .on("click", function (_, d) {
              // 切换激活状态
              d3.selectAll(".nav-button").classed("active", false);
              d3.select(this).classed("active", true);

              // 切换内容显示
              d3.select("#chat-view").style(
                "display",
                d.id === "chat" ? "block" : "none"
              );
              d3.select("#con-view").style(
                "display",
                d.id === "con" ? "block" : "none"
              );
              d3.select("#stats-view").style(
                "display",
                d.id === "sum" ? "block" : "none"
              );
            })
            .classed("nav-button", true)
            .filter((d, i) => i === 0) // 默认激活第一个
            .classed("active", true);

          // 创建内容容器
          const content = popup
            .append("div")
            .style("height", "calc(100% - 50px)")
            .style("overflow-y", "auto");

          // 聊天视图容器
          const chatView = content
            .append("div")
            .attr("id", "chat-view")
            .style("display", "none");

          // 分析视图容器（初始隐藏）
          const statsView = content.append("div").attr("id", "stats-view");

          // 总结视图容器（初始隐藏）
          const conView = content
            .append("div")
            .attr("id", "con-view")
            .style("display", "none");

          // ========== 对话视图==========
          // 在chatView最前面添加搜索容器
          const searchContainer = chatView
            .append("div")
            .style("margin-bottom", "15px");

          // 创建搜索输入框
          searchContainer
            .append("input")
            .attr("type", "text")
            .attr("placeholder", "搜索对话内容...")
            .style("width", "60%")
            .style("padding", "8px")
            .style("border", "1px solid #99ccff")
            .style("border-radius", "4px")
            .style("font-size", "14px")
            .on(
              "input",
              debounce(function () {
                filterMessages(this.value);
              }, 300)
            );

          function debounce(func, wait) {
            let timeout;
            return function (...args) {
              clearTimeout(timeout);
              timeout = setTimeout(() => func.apply(this, args), wait);
            };
          }
          function filterMessages(keyword) {
            const lowerKeyword = keyword.toLowerCase().trim();

            // 过滤消息
            chatView
              .selectAll(".message")
              .style("display", (d) =>
                d.content.toLowerCase().includes(lowerKeyword)
                  ? "block"
                  : "none"
              );

            // 添加高亮效果
            chatView.selectAll(".bubble").html((d) => {
              const highlighted = d.content.replace(
                new RegExp(`(${keyword})`, "gi"),
                "<mark>$1</mark>"
              );
              return formatContent(highlighted);
            });
          }
          const messagesApi = await api.getApi({
            test: 1,
            api: "getAllDisDataOrigin",
          });
          const messages = messagesApi.message;
          // console.log(messages.message);

          // 绘制消息
          const messageGroups = chatView
            .selectAll(".message")
            .data(messages)
            .enter()
            .append("div")
            .attr("class", "message");

          // 消息头部
          const headers = messageGroups
            .append("div")
            .attr("class", "message-header");

          headers
            .append("span")
            .attr("class", (d) => `speaker`)
            .style("color", (d, i) => {
              if (d.speaker == "Adam") {
                return colorDis[0];
              }
              if (d.speaker == "Bob") {
                return colorDis[1];
              }
              if (d.speaker == "Carl") {
                return colorDis[2];
              }
              if (d.speaker == "David") {
                return colorDis[3];
              }
              if (d.speaker == "Edward") {
                return colorDis[4];
              }
            })
            .text((d) => `${d.speaker}`);

          headers
            .append("span")
            .attr("class", "time")
            .text((d) => d.time);
          // 消息内容气泡
          messageGroups
            .append("div")
            .attr("class", "bubble")
            .html((d) => {
              // 保存原始内容用于搜索
              d.rawContent = d.content;
              return formatContent(d.content);
            })
            .on("mouseover", function () {
              d3.select(this).style("transform", "translateX(5px)");
            })
            .on("mouseout", function () {
              d3.select(this).style("transform", "none");
            });

          // 格式化内容（自动分段）
          function formatContent(text) {
            // 使用正向预查保留原标点
            return text
              .split(/(?<=[。；])/g)
              .filter((s) => s.trim())
              .map((s) => `<p>${s}</p>`)
              .join("");
          }
          // ========== 摘要视图==========

          // 添加分析内容（示例柱状图）
          const messagesForSum = [
            {
              time: "00:05",
              content: "会议启动，讨论数据类型分类。",
            },
            {
              time: "00:29",
              content:
                "提出常见数据类型：分类数据（如手机类型）、空间数据、时序数据、多变量数据。",
            },
            {
              time: "00:47",
              content: "分类数据定义为多类别标签数据，如手机系统类型。",
            },
            {
              time: "01:09",
              content:
                "补充数据类型：高维数据（高维度复杂性）、时序数据（时间变化）、图数据（对象关系）与时空数据（地理属性）。",
            },
            {
              time: "02:02",
              content:
                "高维数据特点：抽象难理解，需矩阵/散点图等针对性可视化。",
            },
            {
              time: "03:19",
              content:
                "图数据描述对象间关系（如社交网络），需邻接表等特殊结构表示。",
            },
            {
              time: "04:47",
              content:
                "数据来源示例：体育运动员信息（图数据）、股票/传感器（时序数据）、游戏实时数据、GPS（时空数据）。",
            },
            {
              time: "06:08",
              content:
                "动态数据展示形式：基于静态图表改进（动画时间轴、多视图并列）。",
            },
            {
              time: "10:28",
              content: "总结：不同数据类型展示方式差异显著，需针对性设计。",
            },
          ];
          // 绘制消息
          const messageGroupsForSum = statsView
            .selectAll(".message")
            .data(messagesForSum)
            .enter()
            .append("div")
            .attr("class", "message");

          // 消息头部
          const headersForSum = messageGroupsForSum
            .append("div")
            .attr("class", "message-header");

          // headersForSum
          //   .append("span")
          //   .attr("class", (d) => `speaker speaker-${d.speaker}`)
          //   .text((d) => `参与者 ${d.speaker}`);

          headersForSum
            .append("span")
            .attr("class", "time")
            .text((d) => d.time);
          // 消息内容气泡
          messageGroupsForSum
            .append("div")
            .attr("class", "bubble")
            .html((d) => formatContent(d.content))
            .on("mouseover", function () {
              d3.select(this).style("transform", "translateX(5px)");
            })
            .on("mouseout", function () {
              d3.select(this).style("transform", "none");
            });

          // ========== 总结视图==========
          const messagesForMember2 = [
            {
              speaker: "B",
              time: "00:05",
              content: "可以，我们开始。",
            },
            {
              speaker: "D",
              time: "00:08",
              content: "拆笔记。",
            },
            {
              speaker: "B",
              time: "00:10",
              content: "第一个讨论数据类型。",
            },
          ];

          const messagesForMember_ = [
            {
              speaker: "Adam",
              time: "未提及",
              content:
                "地图能够直观呈现站点的地理位置，结合热力图可以通过颜色深浅，清晰展示站点分布的密度情况。",
            },
            {
              speaker: "Bob",
              time: "未提及",
              content:
                "对于有明显聚类特征的站点数据，地图可能会掩盖信息，无法突出不同区域站点的集中程度差异。通过算法按一定规则对站点进行聚类，能更清晰地呈现站点分布结构和聚集特征。",
            },
          ];
          const messagesForMember = [
            {
              speaker: "Adam",
              time: "未提及",
              content:
                "数据分析分类应注重数据的关联性，可采用关联规则挖掘方法，发现不同数据类别之间的潜在联系，为决策提供更全面的依据。",
            },
            {
              speaker: "Bob",
              time: "未提及",
              content:
                "聚类分析在数据分析分类中十分关键，通过划分数据子集，能有效识别数据中的相似模式和差异，帮助理解数据的内在结构。",
            },
            {
              speaker: "Carl",
              time: "未提及",
              content:
                "决策树算法是一种直观有效的分类方式，它通过树形结构展示数据的分类过程，便于理解和解释数据分类的逻辑。",
            },
            {
              speaker: "David",
              time: "未提及",
              content:
                "在数据分析分类时，不能忽视数据的质量和特征工程，需对数据进行清洗、转换和特征提取，才能提高分类模型的准确性和稳定性。",
            },
          ];
          // 绘制消息
          const messageGroupsForMember = conView
            .selectAll(".message")
            .data(messagesForMember)
            .enter()
            .append("div")
            .attr("class", "message");

          // 消息头部
          const headersForMember = messageGroupsForMember
            .append("div")
            .attr("class", "message-header");

          headersForMember
            .append("span")
            .attr("class", (d) => `speaker`)
            .style("color", (d, i) => {
              if (d.speaker == "Adam") {
                return colorDis[0];
              }
              if (d.speaker == "Bob") {
                return colorDis[1];
              }
              if (d.speaker == "Carl") {
                return colorDis[2];
              }
              if (d.speaker == "David") {
                return colorDis[3];
              }
              if (d.speaker == "Edward") {
                return colorDis[4];
              }
            })
            .text((d) => `${d.speaker}`);

          // headersForMember
          //   .append("span")
          //   .attr("class", "time")
          //   .text((d) => d.time);
          // 消息内容气泡
          messageGroupsForMember
            .append("div")
            .attr("class", "bubble")
            .html((d) => formatContent(d.content))
            .on("mouseover", function () {
              d3.select(this).style("transform", "translateX(5px)");
            })
            .on("mouseout", function () {
              d3.select(this).style("transform", "none");
            });

          // 自动滚动到底部
          // popup.node().scrollTop = popup.node().scrollHeight;

          // 添加关闭按钮
          popup
            .append("button")
            .text("×")
            .style("position", "absolute")
            .style("right", "10px")
            .style("top", "10px")
            .style("font-size", "20px")
            .style("background", "none")
            .style("border", "none")
            .style("cursor", "pointer")
            .style("color", "#999")
            .on("click", function () {
              popup.remove();
              overlay.remove();
            });

          // 点击遮罩层关闭
          overlay.on("click", function () {
            popup.remove();
            overlay.remove();
          });
        }
        // 绘制子节点
        if (node.children) {
          let currentY = startY + config.nodeHeight;

          node.children.forEach((child) => {
            // 保持右侧对齐：子节点继承父节点的起始X坐标
            const childEndX = x + nodeWidth;
            const childWidth = config.levelWidth[depth + 1];

            // // 绘制连接线
            // svg.append("path")
            //     .attr("class", "connector")
            //     .attr("d", `M ${x + nodeWidth} ${startY + config.nodeHeight / 2}
            //               L ${childEndX - childWidth} ${currentY + config.nodeHeight / 2}`);

            // 递归绘制
            currentY = drawAligned(
              child,
              childEndX, // 保持右侧对齐
              currentY,
              depth + 1,
              color
            );
          });

          return currentY;
        }
        return startY + config.nodeHeight;
      }

      let startx = config.levelWidth[0];
      const color = this.color;
      // console.log(this.startDate);

      for (let node of data2) {
        drawAligned(node, startx, 0, 0, color[0]);
        startx = startx + config.levelWidth[1];
      }
      startx = startx - config.levelWidth[1] + config.levelWidth[0];

      // for (let node of data2) {
      //   drawAligned(node, startx, 0, 0, color[1]);
      //   startx = startx + config.levelWidth[1];
      // }

      // ============== 在tuli容器中添加图例 ==============
      const legendSvg = d3
        .select(this.$refs.tuli)
        .append("svg")
        .attr("width", "100%")
        .attr("height", 40); // 图例容器高度

      const legend = legendSvg.append("g").attr("transform", "translate(30,0)"); // 图例组偏移

      // 主题1图例
      legend
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 16)
        .attr("height", 15)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", this.color[0][0])
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);

      legend
        .append("text")
        .attr("x", 25)
        .attr("y", 8)
        .text("主题1")
        .style("font-size", "12px")
        .style("dominant-baseline", "middle");

      // 主题2图例
      legend
        .append("rect")
        .attr("x", 80)
        .attr("y", 0)
        .attr("width", 16)
        .attr("height", 15)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", this.color[1][0])
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);

      legend
        .append("text")
        .attr("x", 105)
        .attr("y", 8)
        .text("主题2")
        .style("font-size", "12px")
        .style("dominant-baseline", "middle");
    },
    initStairs() {
      const container = this.$refs.container2;
      // 清空容器内的所有子元素（每次绘制前调用）
      d3.select(this.$refs.stairs).selectAll("*").remove();

      // 或更精确地只删除 SVG 元素（推荐）
      // d3.select(this.$refs.chart).select("svg").remove();
      const width = container.clientWidth;
      const height = container.clientHeight * 0.2;

      // 创建SVG画布
      const svg = d3
        .select(this.$refs.stairs)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      const data = [25, 60, 40, 80, 55, 35, 70].map((v, i) => ({ x: i, y: v }));

      // 创建比例尺
      const xScale = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width]);

      const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

      // 创建阶梯线生成器
      const line = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))
        .curve(d3.curveStep); // 关键配置：使用阶梯曲线

      // 绘制路径
      svg
        .append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);
    },
  },
};
</script>

<style>
.dropdown {
  position: relative;
  width: 140px;
  height: 10px;
  margin-left: 10px;
  font-family: Arial, sans-serif;
}

.dropdown-btn {
  width: 100%;
  padding-left: 5px;
  background: white;
  border: 1px solid rgb(182, 182, 182);
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
}

.color-preview {
  width: 20px;
  height: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  /* border: 1px solid #ccc; */
  border-top: none;
  border-radius: 0 0 4px 4px;
  display: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f5f5f5;
}

.color-box {
  width: 20px;
  height: 10px;
  margin-right: 10px;
  flex-shrink: 0;
}

.show {
  display: block;
}
.checked-name {
  margin-left: 5px;
  margin-top: 2px;
  font-size: 15px;
  color: #7f7f7f;
}
.header-row-theme {
  display: flex;
  flex-direction: row;

  width: 100%;
}
.overview-container-theme {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
/* .title_theme {
  color: #d7d7d7;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
} */
/* 切换按钮样式 */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 20px;
  margin-left: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 4px;
  bottom: 2.5px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  transform: translateX(27px);
}
/* 导航按钮激活状态 */
.nav-button.active {
  background: #2196f3 !important;
  color: white !important;
}

/* 分析视图样式 */
#stats-view rect {
  transition: height 0.3s;
}
.node-popup {
  min-width: 200px;
  border: 1px solid #ddd;
  font-family: Arial;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.chat-container {
  width: 600px;
  height: 600px;
  margin: 20px auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f5f5f5;
  overflow-y: auto;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.message {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.speaker {
  font-weight: 600;
  font-size: 14px;
  margin-right: 8px;
}

.time {
  font-size: 12px;
  color: #666;
}

.bubble {
  max-width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  word-break: break-word;
  line-height: 1.5;
  margin-left: 5px;
}

.bubble::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right-color: white;
  left: -16px;
  top: 12px;
}

/* 不同发言者颜色 */
.speaker-A {
  color: #e91e63;
}

.speaker-B {
  color: #2196f3;
}

::v-deep .speaker-C {
  color: #4caf50;
}

.speaker-D {
  color: #9c27b0;
}

.speaker-E {
  color: #ff9800;
}
</style>