// 导入 vue
import Vue from 'vue'
// 导入 vuex
import Vuex from 'vuex'
// vuex也是vue的插件, 需要use一下, 进行插件的安装初始化
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        Groups: {
            group1: {
                GroupID: 0,
                GroupThemeSimilarity: 0,
                GroupSpeechDuration: 0,
                Members: {
                    // Person1:{        成员格式
                    //     AskDuration: 0,
                    //     Replyuration: 0,
                    // }
                }
            }
        },
        CurrentGroup: 'group1',
    },
    mutations: {
        INIT(state, nameList){
            for(let i=0; i<nameList.length; i++){
                const name = nameList[i];
                state.Groups.group1.Members[name] = {
                    AskDuration: 0,
                    Replyuration: 0,
                }
            }
        },
        UPDATE_GROUP_THEME_SIMILARITY(state, value) {
            state.Groups.group1.GroupThemeSimilarity = value;
        },
        UPDATE_GROUP_SPEECH_DURATION(state, value) {
            state.Groups.group1.GroupSpeechDuration = value;
        },
        UPDATE_PERSON(state, payload) {
            const { personName, askDuration, replyDuration } = payload;
            if (state.Groups.group1.Members[personName]) {
                state.Groups.group1.Members[personName].AskDuration = askDuration;
                state.Groups.group1.Members[personName].Replyuration = replyDuration;
            } else {
                console.warn(`Person ${personName} does not exist in the group.`);
            }
        },
    },
    getters: {
        getGroupAskDuration(state, group_name) {
            let totalAskDuration = 0;
            const group = state.Groups[group_name];
            console.log(group);
            if (group) {
                for (const memberName in group.Members) {
                    totalAskDuration += group.Members[memberName].AskDuration;
                }
            } else {
                console.warn(`Group ${group_name} does not exist.`);
            }
            console.log(totalAskDuration);
            return totalAskDuration;
        },
        getGroupReplyDuration(state, group_name) {
            let totalReplyDuration = 0;
            const group = state.Groups[group_name];
            if (group) {
                for (const memberName in group.Members) {
                    totalReplyDuration += group.Members[memberName].ReplyDuration;
                }
            } else {
                console.warn(`Group ${group_name} does not exist.`);
            }
            return totalReplyDuration;
        }
    }
})

// 导出仓库
export default store;