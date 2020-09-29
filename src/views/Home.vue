<template>
    <div class="home">
        <el-carousel  type='card' :interval="5000" height="300px">
            <el-carousel-item v-for="item in banners" :key="item._id">
                <router-link :to="{name:'detail', query: {menuId: item._id}}">
                    <img :src="item.product_pic_url" width="100%" alt="">
                </router-link>
            </el-carousel-item>
        </el-carousel>
        <waterfall  ref="waterfall" @view="loadingMenuHandle">
            <menu-card :info="menuList"></menu-card>
        </waterfall>
    </div>
</template>
<script>
import {getBanner, getMenus} from '@/service/index.js'
import waterfall from '@/components/waterfall'
import MenuCard from '@/components/menu-card.vue'

export default {
    name: 'home',
    components:{
        waterfall,
        MenuCard
    },
    data() {
        return {
            banners: [],
            menuList: [],
            page: 1
        }
    },
    mounted() {
        getBanner().then((data)=>{
            console.log(data)
            this.banners=data.data.list
        });

        getMenus({page: this.page}).then(data=>{
            this.menuList = data.data.list 
            this.pages = Math.ceil(data.data.total/data.data.page_size)
        })

    },
    methods: {
        loadingMenuHandle() {
            console.log('next page')
            this.page++
            if(this.page>this.pages) {
                this.$refs.waterfall.isLoading=false
                return
            }
            this.$refs.waterfall.isLoading = true

            getMenus({page: this.page}).then(data=>{
                this.menuList.push(...data.data.list)
                this.$refs.waterfall.isLoading=false
            })
        }
    }
}
</script>