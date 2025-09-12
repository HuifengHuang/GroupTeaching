// 导入 vue
import Vue from 'vue'
// 导入 vuex
import Vuex from 'vuex'
// vuex也是vue的插件, 需要use一下, 进行插件的安装初始化
Vue.use(Vuex)

// 创建仓库 store
const store = new Vuex.Store(
    {
        state: {
            count: 1, // 要监控的值
            overviewLayer: 0,
            inter: {
                start: 0,
                end: 0,
                startMe: 0,
                endMe: 0,
                KeyMe: 0,
            },
            groupOverview: 0,
            groupDisData: [
                //5-1
                //总结，反对，支持，提问
                { label: "A", values: [15, 10, 12, 10] },
                { label: "B", values: [3, 10, 1, 7] },
                { label: "C", values: [10, 10, 10, 20] },
                { label: "D", values: [3, 10, 1, 16] },
                { label: "E", values: [5, 5, 9, 16] },
                // { label: 'w', values: [5, 5, 9, 16] },
            ],
            memberData: [
                //5-1
                { label: "A", values: [30, 20, 50, 30] },
                { label: "B", values: [50, 8, 52, 58] },
                { label: "C", values: [50, 0, 52, 58] },
                { label: "D", values: [50, 8, 52, 58] },
                { label: "E", values: [50, 0, 110] },
            ], //每个人的讨论时间
            groupTheme: [6, 7, 9, 3, 0]
        },
    }
)

// 导出仓库
export default store
