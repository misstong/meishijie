import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '../store'
import { userInfo } from '../service'

Vue.use(VueRouter)

const Home = ()=> import('../views/Home')
const Detail = () => import('../views/Detail/detail.vue')

const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            name: 'home',
            title:'首页',
            component: Home
        },
        {
            path:'/detail',
            name: 'detail',
            title:'详情',
            component: Detail
        },
        {
            path: '/recipe',
            name: 'recipe',
            title: "菜谱大全",
            component: () => import('@/views/recipe.vue')
        },
        {
            path:'/login',
            name:'login',
            title:'登录注册',
            component:()=>import('@/views/login.vue')
        }
    ]
})

router.beforeEach(async (to,_, next)=>{

    const data= await userInfo()
    store.commit('changeUserInfo',data.data)
    // if(true){
        next()
    // }
})

export default router