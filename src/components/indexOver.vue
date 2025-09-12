<template>
  <div v-if="lay === 1" class="parent">
    <!-- 布局1的内容 -->
    <div class="div1">
      <overview_1_fengling />
    </div>
    <div class="div2">
      <div class="title">Interation</div>
      <!-- <inter_2_new></inter_2_new> -->

      <!-- <inter_2 style="top: 45%; " /> -->
    </div>
    <div class="div3">
      <div class="title">Status</div>
      <status_3 style="top: -10%" />
    </div>
    <div class="div4">
      <theme_3 />
    </div>
  </div>

  <div v-else-if="lay === 2" class="parent2">
    <!-- 布局2的内容 -->
    <div class="div5">
      <overview_2 />
    </div>
    <div class="div6">
      <div class="title">Status</div>
      <status_3 style="top: -10%" />
    </div>
    <div class="div7">
      <theme_3 />
    </div>
    <div class="div8">
      <inter_1 />
    </div>
  </div>

  <div v-else-if="lay === 3" class="parent">
    <!-- <review_1></review_1> -->
    <!-- 布局3的内容 -->
    <div class="div1">
      <inter_1 />
    </div>
    <div class="div2">
      <div class="title">Review</div>
      <!-- <review_2 /> -->
    </div>
    <div class="div3">
      <div class="title">Status</div>
      <status_3 style="top: -10%" />
    </div>
    <div class="div4">
      <!-- <overview_3 /> -->
      <inter_3 />
    </div>
  </div>

  <div v-else-if="lay === 4" class="parent2">
    <!-- <review_1></review_1> -->
    <!-- 布局4的内容 -->
    <div class="div5">
      <overview_2 />
    </div>
    <div class="div6">
      <div class="title">Status</div>
      <status_3 style="top: -10%" />
    </div>
    <div class="div7">
      <theme_3 />
    </div>
    <div class="div8">
      <inter_1 />
    </div>
  </div>

  <div v-else-if="lay === 5">
    <inter_1 />
    <!-- <timeline /> -->
    <!-- 布局5的内容--review -->
  </div>

  <div v-else-if="lay === 6" class="parent">
    <!-- 布局6的内容 -->
    <div class="div1">
      <div class="title">Review</div>
      <review_1_meeting></review_1_meeting>
    </div>
    <div class="div2"></div>
    <div class="div3"></div>
    <div class="div4"></div>
  </div>

  <div v-else-if="lay === 7" class="parent">
    <!-- 布局6的内容 -->
    <div class="div1">
      <!-- <status_1></status_1> -->
    </div>
    <div class="div2"></div>
    <div class="div3"></div>
    <div class="div4"></div>
  </div>

  <div v-else-if="lay === 8" class="parent3">
    <!-- 布局8的内容 -->
    <div class="div10">
      <!-- <overview_1_fengling></overview_1_fengling> -->
      <inter_1 />
    </div>
    <div class="div9">
      <overview_1_fengling></overview_1_fengling>
      <!-- <inter_1 /> -->
    </div>

    <div class="div9-2">
      <!-- <overview_1_fengling></overview_1_fengling> -->
      <div v-if="reviewIndex == 0"><review_2_new></review_2_new></div>
      <div v-if="reviewIndex == 1">
        <review_2_member />
        <!-- <overview_1_fengling></overview_1_fengling> -->
      </div>
      <div v-if="reviewIndex == 2">
        <review_2_dis />
        <!-- <overview_1_fengling></overview_1_fengling> -->
      </div>
    </div>
  </div>

  <div v-else-if="lay === 9" class="parent4">
    <!-- 布局9的内容 -->
    <div class="div12">
      <inter_1 />
    </div>
    <div class="div11">
      <overview_level_1 />
    </div>
  </div>

  <div v-else-if="lay === 10" class="parent5">
    <!-- 布局8的内容 -->
    <div class="div15">
      <!-- <overview_1_fengling></overview_1_fengling> -->
      <inter_1 />
    </div>
    <div class="div13">
      <overview_1_fengling></overview_1_fengling>
      <!-- <inter_1 /> -->
    </div>

    <div class="div14">
      <review_3_cloud />
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";
// 布局-1
import overview_1 from "./layer1/overview_1.vue";
import inter_2 from "./layer2/inter_2.vue";
import status_3 from "./layer3/status_3.vue";
import theme_3 from "./layer3/review_3.vue";
import overview_1_new from "./layer1/overview_1_new.vue";
// import timeline from "./layer1/timeline.vue"
import overview_1_fengling from "./layer1/overview_1_fengling.vue";
import review_1_meeting from "./layer1/review_1_meeting.vue";
import status_1 from "./layer1/status_1.vue";

import review_2_member from "./layer2/review_2_member.vue";
import review_2_dis from "./layer2/review_2_dis.vue";

import overview_level_1 from "./level1/overview.vue";

// 布局-2
import inter_1 from "./layer1/inter_1.vue";
import overview_2 from "./layer2/overview_2.vue";
// import status_3 from './layer3/status_3.vue'
// import theme_3 from "./layer3/theme_3.vue"

import inter_2_new from "./layer2/inter_2_new.vue";
import review_2_new from "./layer2/review_2_new.vue";

// 布局-3
import review_2 from "./layer2/review_2.vue";
import overview_3 from "./layer3/overview_3.vue";

import inter_3 from "./layer3/inter_3.vue";
import review_1 from "./layer1/review_1.vue";
import review_3_cloud from "./layer3/review_3_cloud.vue";

// import { mapState, mapGetters, mapActions } from "vuex";
import { mapState } from "vuex";
import review_2_disVue from "./layer2/review_2_dis.vue";
import review_3_cloudVue from "./layer3/review_3_cloud.vue";
export default {
  name: "Home",
  components: {
    // 布局-1
    overview_1,
    inter_2,
    status_3,
    theme_3,

    inter_2_new,
    overview_1_new,

    overview_1_fengling,
    review_1_meeting,
    status_1,
    review_2_member,
    review_2_dis,

    overview_level_1,

    // 布局-2
    inter_1,
    overview_2,
    review_2_new,

    //布局-3
    review_2,
    overview_3,

    inter_3,
    review_1,
    review_3_cloud,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      lay: 10,
      reviewIndex: 0,
    };
  },
  async mounted() {
    console.log(123123);
    const res = await api.test({});
    console.log(res);
    // this.$store.state.count = 1123;
    // console.log(this.$store.state.count);
  },
  computed: {
    ...mapState(["count"]), // 映射 count 到计算属性
    ...mapState(["overviewLayer"]),
  },
  watch: {
    // 监听 count 变化
    count(newVal, oldVal) {
      this.lay = newVal;
      console.log("count 变化:", oldVal, "→", newVal);
    },
    overviewLayer(newVal, oldVal) {
      if (newVal == 1) {
        this.reviewIndex = 1;
      }
      if (newVal == 0) {
        this.reviewIndex = 0;
      }
      if (newVal == 2) {
        this.reviewIndex = 2;
      }

      console.log("overviewLayer 变化:", oldVal, "→", newVal);
    },
  },
};
</script>

<style scoped>
/* 父容器网格布局 */
.parent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  height: 100vh;
  /* margin-top: 6vh; */
}

/* 区域1：顶部通栏 */
.div1 {
  grid-area: 1 / 1 / 3 / 5;
  /* background-color: #000; */
  /* border-right: 1rpx dashed #000; */
  border-bottom: 1px dashed #000;
  position: relative;
  max-height: 50vh;
}

/* 区域2：左下方块 */
.div2 {
  /* background-color: aqua; */
  grid-area: 3 / 1 / 5 / 3;
  /* border-right: 1rpx dashed #000;
    border-top: 1rpx dashed #000; */
  max-height: 50vh;
  /* max-width: 50vw; */
}

/* 区域3：右下小方块 */
.div3 {
  /* background-color: beige; */
  grid-area: 4 / 3 / 5 / 5;
  border-left: 1px dashed #000;
  max-height: 25vh;
  min-height: 25vh;
  /* margin-left: 10px; */
  /* border-top: 1rpx dashed #000; */
}

/* 区域4：右中过渡区 */
.div4 {
  /* background-color: burlywood; */
  grid-area: 3 / 3 / 4 / 5;
  border-left: 1px dashed #000;
  border-bottom: 1px dashed #000;
  max-height: 25vh;
}

.parent2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div5 {
  grid-area: 1 / 1 / 3 / 2;
  max-width: 50vw;
  max-height: 50vh;
}

.div6 {
  grid-area: 1 / 2 / 2 / 3;
  border-left: 1px dashed #000;
  max-width: 50vw;
  max-height: 25vh;
  min-height: 25vh;
}

.div7 {
  grid-area: 2 / 2 / 3 / 3;
  max-height: 25vh;
  min-height: 25vh;
  border-left: 1px dashed #000;
  border-top: 1px dashed #000;
  max-width: 50vw;
}

.div8 {
  grid-area: 3 / 1 / 5 / 3;
  border-top: 1px dashed #000;
  max-height: 50vh;
}

.chart-wrapper {
  width: 100%;
  height: 100%;
  /* min-height: 400px; */
  /* 保证最小高度 */
}

.title {
  color: #4cc4d5;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}

.echart-container {
  transform: rotate(90deg);
  /* transform-origin: center; */
  /* width: 400px; */
  /* 根据实际情况调整 */
  /* height: 4000px; */
  /* 根据实际情况调整 */
}

.parent3 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div9 {
  grid-area: 1 / 1 / 3 / 3;
  min-height: 50vh;
  max-height: 50vh;
}

.div9-2 {
  grid-area: 3 / 1 / 4 / 3;

  min-height: 25vh;
  max-height: 25vh;
}

.div10 {
  grid-area: 4 / 1 / 5 / 3;
  border-top: 1px dashed #000;
  min-height: 25vh;
  max-height: 25vh;
}

.parent4 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div11 {
  grid-area: 1 / 1 / 2 / 3;
  min-height: 50vh;
  max-height: 50vh;
}

.div12 {
  grid-area: 2 / 1 / 3 / 3;
  border-top: 1px dashed #000;
  min-height: 50vh;
  max-height: 50vh;
}

.parent5 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div13 {
  grid-area: 1 / 1 / 2 / 3;
  min-height: 25vh;
  max-height: 25vh;
  border-bottom: 1px dashed #000;
}
.div14 {
  grid-area: 2 / 1 / 3 / 3;
  min-height: 25vh;
  max-height: 25vh;
}
.div15 {
  grid-area: 3 / 1 / 5 / 3;

  min-height: 50vh;
  max-height: 50vh;
}
</style>