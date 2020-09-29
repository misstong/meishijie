import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const Home = ()=> import('../views/Home')
const Detail = () => import('../views/Detail')

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
        }
    ]
})

export default router