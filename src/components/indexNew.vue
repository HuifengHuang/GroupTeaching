<template>
  <div v-if="lay === 6" class="parent6">
    <!-- <review_1 /> -->
    <!-- 布局4的内容 -->
    <div class="div6-1"><overviewLevel1 /></div>
    <div class="div6-2"><overviewSim /></div>
    <div class="div6-3"><interMatrixSim /></div>
    <div class="div6-4"><interLevel1 /></div>
    <div class="div6-5"><scatterLevel1 /></div>
    <div class="div6-6"><themeLevel2 /></div>
    <div class="div6-7"><thememapLevel1 /></div>
  </div>
</template>

<script>
import api from "@/utils/api";
import { mapState } from "vuex";
import overviewLevel1 from "./level1/overview.vue";
import overviewLevel2 from "./level2/overview_2.vue";
import interLevel2 from "./level2/inter_2.vue";
import interLevel1 from "./level1/inter_1.vue";
import interLevel0 from "./level0/inter_0.vue";
import reviewLevel0 from "./level0/review_0.vue";
import reviewLevel1 from "./level1/review_1.vue";
import intertreemapLevel1 from "./level1/intertreemap_1.vue";
import thememapLevel1 from "./level1/thememap_1.vue";
import contributionLevel1 from "./level1/contribution_1.vue";
import contributionLevel0 from "./level0/contribution.vue";
import scatterLevel1 from "./level1/scatter_1.vue";
import themeLevel2 from "./level2/theme_2.vue";
import overviewSim from "./level1/overview_sim.vue";
import interMatrixSim from "./level1/interMatrix_sim.vue";
import review_1 from "./layer1/review_1.vue";
export default {
  name: "Home",
  components: {
    overviewLevel1,
    overviewLevel2,
    interLevel2,
    interLevel1,
    interLevel0,
    reviewLevel0,
    reviewLevel1,
    intertreemapLevel1,
    thememapLevel1,
    contributionLevel1,
    contributionLevel0,
    scatterLevel1,
    themeLevel2,
    overviewSim,
    interMatrixSim,
    review_1,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      lay: 6,
      reviewIndex: 0,
    };
  },
  async mounted() {
    // console.log(123123);
    // const res = await api.test({});
    // console.log(res);
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
/* 布局1 */
.parent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
.div6 {
  grid-area: 4 / 2 / 5 / 3;
  min-height: 20vh;
  max-height: 20vh;
  min-width: 50vw;
  max-width: 50vw;
}

/* 布局2 */

.parent2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.parent6 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 2fr) repeat(3, 1fr) 3fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div6-1 {
  grid-area: 1 / 1 / 2 / 3;
  min-height: 20vh;
  max-height: 20vh;
  border-bottom: 1px dashed #d4d4d4;
}
.div6-2 {
  grid-area: 2 / 1 / 3 / 2;
  min-height: 20vh;
  max-height: 20vh;
  min-width: 50vw;
  max-width: 50vw;
  border-bottom: 1px dashed #d4d4d4;
  border-right: 1px dashed #d4d4d4;
}
.div6-3 {
  grid-area: 2 / 2 / 3 / 3;
  min-height: 20vh;
  max-height: 20vh;
  min-width: 50vw;
  max-width: 50vw;
  border-bottom: 1px dashed #d4d4d4;
  /* border-right: 1px dashed #d4d4d4; */
}
.div6-4 {
  grid-area: 3 / 1 / 4 / 3;
  min-height: 10vh;
  max-height: 10vh;
  border-bottom: 1px dashed #d4d4d4;
}
.div6-5 {
  grid-area: 4 / 1 / 5 / 3;
  min-height: 10vh;
  max-height: 10vh;
  border-bottom: 1px dashed #d4d4d4;
}
.div6-6 {
  grid-area: 5 / 1 / 6 / 3;
  min-height: 10vh;
  max-height: 10vh;
  border-bottom: 1px dashed #d4d4d4;
}
.div6-7 {
  grid-area: 6 / 1 / 7 / 3;
  min-height: 30vh;
  max-height: 30vh;
  /* border-bottom: 1px dashed #d4d4d4; */
}
</style>