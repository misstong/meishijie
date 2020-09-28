import Vuex from "vuex";
import Vue from 'vue'
import {userInfo} from '../service/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {}
    },
    getters: {
        isLogin(state) {
            return !!Object.keys(state.userInfo).length
        }
    },
    mutations: {
        changeUserInfo(state, data) {
            state.userInfo = data
        }
    },
    actions: {
        async login({commit}) {
            const data = await userInfo()
            console.log('login', data)
            commit('changeUserInfo',data)
        }
    }
})

export default store