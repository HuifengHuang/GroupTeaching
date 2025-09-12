<template>

    <div ref="container" class="overview-container">
        <!-- <div class="title">Overview</div> -->
        <div ref="chart" style="background-color: white;transform: rotate(90deg);
    transform-origin: center; /* 设置旋转中心，默认为中心点 */
/* 根据实际情况调整，帮助居中或适应新的尺寸 */
    /* 可能需要调整宽高以适应旋转后的布局 */
    /* width 和 height 的值可以互换或者设置为具体的值 */"></div>
    </div>



</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'SankeyChart',
    data() {
        return {
            dataset: [
                {
                    "sex": "female",
                    "ses": "low",
                    "<High School": 5.4,
                    "High School": 17.1,
                    "Some Post-secondary": 36.2,
                    "Post-secondary": 16.0,
                    "Associate’s": 9.3,
                    "Bachelor’s and up": 15.9
                },
                {
                    "sex": "male",
                    "ses": "low",
                    "<High School": 10.0,
                    "High School": 26.5,
                    "Some Post-secondary": 35.8,
                    "Post-secondary": 8.7,
                    "Associate’s": 6.9,
                    "Bachelor’s and up": 12.2
                },
                {
                    "sex": "male",
                    "ses": "middle",
                    "<High School": 2.7,
                    "High School": 17.3,
                    "Some Post-secondary": 36.5,
                    "Post-secondary": 10.1,
                    "Associate’s": 8.6,
                    "Bachelor’s and up": 24.8
                },
                {
                    "sex": "female",
                    "ses": "middle",
                    "<High School": 2.4,
                    "High School": 8.9,
                    "Some Post-secondary": 32.9,
                    "Post-secondary": 12.1,
                    "Associate’s": 11.0,
                    "Bachelor’s and up": 32.8
                },
                {
                    "sex": "male",
                    "ses": "high",
                    "<High School": 0.8,
                    "High School": 4.4,
                    "Some Post-secondary": 27.1,
                    "Post-secondary": 4.8,
                    "Associate’s": 7.5,
                    "Bachelor’s and up": 55.3
                },
                {
                    "sex": "female",
                    "ses": "high",
                    "<High School": 0,
                    "High School": 1.8,
                    "Some Post-secondary": 20.1,
                    "Post-secondary": 6.2,
                    "Associate’s": 5.9,
                    "Bachelor’s and up": 65.7
                },
                {
                    "sex": "male",
                    "ses": "test",
                    "<High School": 0.8,
                    "High School": 4.4,
                    "Some Post-secondary": 27.1,
                    "Post-secondary": 4.8,
                    "Associate’s": 7.5,
                    "Bachelor’s and up": 55.3
                },
                {
                    "sex": "female",
                    "ses": "test",
                    "<High School": 0,
                    "High School": 1.8,
                    "Some Post-secondary": 20.1,
                    "Post-secondary": 6.2,
                    "Associate’s": 5.9,
                    "Bachelor’s and up": 65.7
                }
            ],
            width: 1800,
            height: 1000,
            dimensions: {
                width: this.width,
                height: this.height,
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
                pathHeight: this.height / 15,
                endsBarsWidth: 15,
                endingBarPadding: 3,
            },
        };
    },
    mounted() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
        this.drawChart();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateDimensions);
    },
    methods: {
        updateDimensions() {
            const containerWidth = this.$refs.container.clientHeight;
            const containerHeight = this.$refs.container.clientWidth

            // 设置宽度和高度为容器的尺寸
            this.width = containerWidth / 1.1; // 最大宽度限制为1200px
            this.height = containerHeight - 10;
            console.log(containerHeight);


            // 更新维度对象
            this.dimensions = {
                width: this.width,
                height: this.height,
                margin: {
                    top: -15,
                    right: 0,
                    bottom: -20,
                    left: 0,
                },
                pathHeight: this.height / 10,
                endsBarsWidth: 15,
                endingBarPadding: 3,
            };

            // 重新绘制图表
            // this.drawChart();
        },
        drawChart() {
            const { dataset, width, height } = this;

            // Accessors
            const sexAccessor = d => d.sex;
            const sexes = ["female", "male"];
            const sexIds = d3.range(sexes.length);
            const educationNames = [
                "<High School",
                "High School",
                "Some Post-secondary",
                "Post-secondary",
                "Associate’s",
                "Bachelor’s and up"
            ];
            const educationAccessor = d => d.education
            const educationIds = d3.range(educationNames.length);
            const sesAccessor = d => d.ses;
            const sesNames = ["low", "middle", "high", "test"];
            const sesIds = d3.range(sesNames.length);

            // probabilities
            const stackedProbabilities = {};
            dataset.forEach(startingPoint => {
                const key = `${startingPoint.sex}--${startingPoint.ses}`;
                let stackedProbability = 0;
                stackedProbabilities[key] = educationNames.map((education, i) => {
                    stackedProbability += startingPoint[education] / 100;
                    if (i == educationNames.length - 1) {
                        return 1;
                    } else {
                        return stackedProbability;
                    }
                });
            });


            // dimensions
            // const dimensions = {
            //     width: Math.min(width, 1200),
            //     height: height,
            //     margin: {
            //         top: 10,
            //         right: 200,
            //         bottom: 10,
            //         left: 120,
            //     },
            //     pathHeight: 50,
            //     endsBarsWidth: 15,
            //     endingBarPadding: 3,
            // };
            const dimensions = this.dimensions
            dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
            dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

            // canvas
            const wrapper = d3.select(this.$refs.chart)
                .append("svg")
                .attr("width", dimensions.width)
                .attr("height", dimensions.height);
            const bounds = wrapper.append("g")
                .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

            // scales
            const xScale = d3.scaleLinear()
                .domain([0, 1])
                .range([0, dimensions.boundedWidth])
                .clamp(true);
            const startYScale = d3.scaleLinear()
                .domain([sesIds.length, -1])
                .range([0, dimensions.boundedHeight]);
            const endYScale = d3.scaleLinear()
                .domain([educationIds.length, -1])
                .range([0, dimensions.boundedHeight]);
            const linkLineGenerator = d3.line()
                .x((d, i) => i * (dimensions.boundedWidth / 5))
                .y((d, i) => i <= 2 ? startYScale(d[0]) : endYScale(d[1]))
                .curve(d3.curveMonotoneX);
            console.log(dimensions.boundedWidth);

            const yTransitionProgressScale = d3.scaleLinear()
                .domain([0.45, 0.55])
                .range([0, 1])
                .clamp(true);
            const colorScale = d3.scaleLinear()
                .domain(d3.extent(sesIds))
                .range(["#12CBC4", "#B53471"])
                .interpolate(d3.interpolateHcl);

            // draw data
            const linkOptions = d3.merge(
                sesIds.map(startId => (
                    educationIds.map(endId => (
                        new Array(6).fill([startId, endId])
                    ))
                ))
            );
            const linksGroup = bounds.append("g");
            const links = linksGroup.selectAll(".category-path")
                .data(linkOptions)
                .enter().append("path")
                .attr("class", "category-path")
                .attr("d", linkLineGenerator)
                .attr("stroke-width", dimensions.pathHeight * 1.52)
                .attr("fill", "none")
                .attr("stroke", "#EEDCCC")
            console.log(dimensions.pathHeight);


            const scaleFactor = 0.5;
            // draw peripherals
            const trianglePoints = [
                `${-7 * scaleFactor}, ${6 * scaleFactor}`,
                `${0 * scaleFactor}, ${-6 * scaleFactor}`,
                `${7 * scaleFactor}, ${6 * scaleFactor}`
            ].join(" ");
            const startingLabelsGroup = bounds.append("g")
                .style("transform", "translateX(-20px)");
            // const startingLabels = startingLabelsGroup.selectAll(".start-label")
            //     .data(sesIds)
            //     .enter().append("text")
            //     .attr("class", "label start-label")
            //     .attr("y", (d, i) => startYScale(i))
            //     .text((d, i) => this.capitalizeFirstLetter(sesNames[i]));
            // const startLabel = startingLabelsGroup.append("text")
            //     .attr("class", "start-title")
            //     .attr("y", startYScale(sesIds[sesIds.length - 1]) - 65)
            //     .text("Socioeconomic");
            // const startLabelLineTwo = startingLabelsGroup.append("text")
            //     .attr("class", "start-title")
            //     .attr("y", startYScale(sesIds[sesIds.length - 1]) - 50)
            //     .text("Status");
            const startingBars = startingLabelsGroup.selectAll(".start-bar")
                .data(sesIds)
                .enter().append("rect")
                .attr("x", 20)
                .attr("y", d => startYScale(d) - (dimensions.pathHeight / 2))
                .attr("width", dimensions.endsBarsWidth)
                .attr("height", dimensions.pathHeight)
                .attr("fill", colorScale);

            const endingLabelsGroup = bounds.append("g")
                .style("transform", `translateX(${dimensions.boundedWidth + 20}px)`);
            // const endingLabels = endingLabelsGroup.selectAll(".end-label")
            //     .data(educationNames)
            //     .enter().append("text")
            //     .attr("class", "label end-label")
            //     .attr("y", (d, i) => endYScale(i) - 15)
            //     .text(d => d);

            // const legendGroup = bounds.append("g")
            //     .attr("class", "legend")
            //     .attr("transform", `translate(${dimensions.boundedWidth}, 5)`);
            // const femaleLegend = legendGroup.append("g")
            //     .attr("transform", `translate(${-dimensions.endsBarsWidth * 1.5 + dimensions.endingBarPadding + 1}, 0)`);
            // femaleLegend.append("polygon")
            //     .attr("points", trianglePoints)
            //     .attr("transform", "translate(-7, 0)");
            // femaleLegend.append("text")
            //     .attr("class", "legend-text-left")
            //     .text("Female")
            //     .attr("x", -20)
            //     .attr("y", 4);
            // femaleLegend.append("line")
            //     .attr("class", "legend-line")
            //     .attr("x1", -dimensions.endsBarsWidth / 2 + 19)
            //     .attr("x2", -dimensions.endsBarsWidth / 2 + 19)
            //     .attr("y1", 12)
            //     .attr("y2", 37);

            // const maleLegend = legendGroup.append("g")
            //     .attr("transform", `translate(${-dimensions.endsBarsWidth / 2 - 4}, 0)`);
            // maleLegend.append("circle")
            //     .attr("r", 5.5)
            //     .attr("transform", "translate(5, 0)");
            // maleLegend.append("text")
            //     .attr("class", "legend-text-right")
            //     .text("Male")
            //     .attr("x", 15)
            //     .attr("y", 4);
            // maleLegend.append("line")
            //     .attr("class", "legend-line")
            //     .attr("x1", -dimensions.endsBarsWidth / 2 - 6)
            //     .attr("x2", -dimensions.endsBarsWidth / 2 - 6)
            //     .attr("y1", 12)
            //     .attr("y2", 37);

            const maxPeople = 10000;
            let people = [];
            const markersGroup = bounds.append("g")
                .attr("class", "markers-group");
            const endingBarGroup = bounds.append("g")
                .attr("transform", `translate(${dimensions.boundedWidth}, 0)`);

            function updateMarkers(elapsed) {
                const xProgressAccessor = d => (elapsed - d.startTime) / 5000;
                if (people.length < maxPeople) {
                    people = [
                        ...people,
                        ...d3.range(2).map(() => generatePerson(elapsed)),
                    ];
                }


                const females = markersGroup.selectAll(".marker-circle")
                    .data(people.filter(d => (
                        xProgressAccessor(d) < 1 && sexAccessor(d) === 0
                    )), d => d.id);
                females.enter().append("circle")
                    .attr("class", "marker marker-circle")
                    .attr("r", 5.5 * scaleFactor)
                    .style("opacity", 0);
                females.exit().remove();

                const males = markersGroup.selectAll(".marker-triangle")
                    .data(people.filter(d => (
                        xProgressAccessor(d) < 1 && sexAccessor(d) === 1
                    )), d => d.id);
                males.enter().append("polygon")
                    .attr("class", "marker marker-triangle")
                    .attr("points", trianglePoints)
                    .style("opacity", 0);
                males.exit().remove();

                const markers = d3.selectAll(".marker");
                markers.style("transform", d => {
                    const x = xScale(xProgressAccessor(d));
                    const yStart = startYScale(sesAccessor(d));
                    const yEnd = endYScale(educationAccessor(d));
                    const yChange = yEnd - yStart;
                    const yProgress = yTransitionProgressScale(xProgressAccessor(d));
                    const y = yStart + (yChange * yProgress) + d.yJitter;
                    return `translate(${x}px, ${y}px)`;
                })
                    .attr("fill", d => colorScale(sesAccessor(d)))
                    .transition().duration(100)
                    .style("opacity", d => xScale(xProgressAccessor(d)) < 10 ? 0 : 1);

                const endingGroups = educationIds.map((endId, i) => (
                    people.filter(d => (
                        xProgressAccessor(d) >= 1 && educationAccessor(d) === endId
                    ))
                ));

                const endingPercentages = d3.merge(
                    endingGroups.map((peopleWithSameEnding, endingId) => (
                        d3.merge(
                            sexIds.map(sexId => (
                                sesIds.map(sesId => {
                                    const peopleInBar = peopleWithSameEnding.filter(d => (
                                        sexAccessor(d) === sexId
                                    ));
                                    const countInBar = peopleInBar.length;
                                    const peopleInBarWithSameStart = peopleInBar.filter(d => (
                                        sesAccessor(d) === sesId
                                    ));
                                    const count = peopleInBarWithSameStart.length;
                                    const numberOfPeopleAbove = peopleInBar.filter(d => (
                                        sesAccessor(d) > sesId
                                    )).length;
                                    return {
                                        endingId,
                                        sesId,
                                        sexId,
                                        count,
                                        countInBar,
                                        percentAbove: numberOfPeopleAbove / (peopleInBar.length || 1),
                                        percent: count / (countInBar || 1),
                                    };
                                })
                            ))
                        )
                    ))
                );

                endingBarGroup.selectAll(".ending-bar")
                    .data(endingPercentages)
                    .join("rect")
                    .attr("class", "ending-bar")
                    .attr("x", d => -dimensions.endsBarsWidth * (d.sexId + 1) - (d.sexId * dimensions.endingBarPadding))
                    .attr("width", dimensions.endsBarsWidth)
                    .attr("y", d => endYScale(d.endingId) - dimensions.pathHeight / 2 + dimensions.pathHeight * d.percentAbove)
                    .attr("height", d => d.countInBar ? dimensions.pathHeight * d.percent : dimensions.pathHeight)
                    .attr("fill", d => d.countInBar ? colorScale(d.sesId) : "#DADADD");

                // endingLabelsGroup.selectAll(".ending-value")
                //     .data(endingPercentages)
                //     .join("text")
                //     .attr("class", "ending-value")
                //     .attr("x", d => (d.sesId) * 33 + 47)
                //     .attr("y", d => endYScale(d.endingId) - dimensions.pathHeight / 2 + 14 * d.sexId + 35)
                //     .attr("fill", d => d.countInBar ? colorScale(d.sesId) : "#DADADD")
                //     .text(d => d.count);
            }

            function generatePerson(elapsed) {
                const sex = Math.floor(Math.random() * 2);
                const ses = Math.floor(Math.random() * 4);
                const statusKey = `${sexes[sex]}--${sesNames[ses]}`;
                const probabilities = stackedProbabilities[statusKey];
                const education = d3.bisect(probabilities, Math.random());
                return {
                    id: Date.now(),
                    sex,
                    ses,
                    education,
                    startTime: elapsed + (Math.random() * 0.2 - 0.1),
                    yJitter: (Math.random() * 30 - 15)
                };
            }

            d3.timer(updateMarkers);
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
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

.title {
    color: #4cc4d5;
    font-size: 20px;
    font-weight: bold;
    text-align: left;

}

svg {
    overflow: visible;
    fill: #34495e;
}

svg text {
    user-select: none;
}

.title {
    position: relative;
    margin-top: 1.3em;
    margin-bottom: 0;
    line-height: 1.2em;
    display: flex;
    justify-content: center;
    text-align: center;
    display: flex;
    letter-spacing: -0.011em;
    align-items: center;
}

.description {
    max-width: 40em;
    margin-bottom: 2.9em;
    font-size: 0.9em;
    text-align: center;
    line-height: 1.4em;
    opacity: 0.5;
}

.source {
    position: absolute;
    bottom: 1em;
    left: 2em;
    opacity: 0.5;
    font-size: 0.8em;
    font-style: italic;
}

.source a {
    color: inherit;
}

.category-path {
    fill: none;
    stroke: white;
}

.start-label {
    text-anchor: end;
    dominant-baseline: middle;
}

.start-title {
    text-anchor: end;
    font-size: 0.8em;
    opacity: 0.6;
}

.label {
    font-weight: 600;
    dominant-baseline: middle;
}

.ending-marker {
    opacity: 0.6;
}

.marker {
    mix-blend-mode: multiply;
}

.ending-bar {
    transition: all 0.3s ease-out;
}

.ending-value {
    font-size: 0.7em;
    text-anchor: end;
    font-weight: 600;
    font-feature-settings: 'tnum' 1;
}

.legend {
    font-size: 0.8em;
    opacity: 0.6;
    dominant-baseline: middle;
}

.legend-text-left {
    text-anchor: end;
}

.legend-line {
    stroke: gray;
    stroke-width: 1px;
}
</style>