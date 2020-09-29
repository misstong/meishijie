<template>
    <div class="recipe">
        <el-tabs type="border-card">
            <el-tab-pane
                :label="item.parent_name"
                v-for="item in classifies"
                :key="item.parent_type">
                <div class="recipe-link">
                    <router-link
                        :to="{query:{...$route.query, classify:option.type,page:1}}"
                        v-for="option in item.list"
                        :class="{active:classifyType===option.type}"
                        :key="option.type">
                        {{option.name}}
                    </router-link>
                </div>
            </el-tab-pane>
        </el-tabs>
        <h2>家常好味道，给你家一般的温暖</h2>
    </div>
</template>
<style lang="stylus">
.recipe-link
    font-size 0
    margin-top 5px
    a 
        display inline-block
        font-size 12px
        height 28px
        line-height 28px
        padding 0 8px
    .active
        background #ff3232
        color #fff
</style>
<script>
import {getClassify} from '@/service/index.js';
export default {
    name:'recipe',
    data(){
        return {
            classifies:[],
            classifyType:''
        }
    },
    mounted(){
        getClassify().then(data=>{
            this.classifies=data.data
            if(!this.$route.query.classify){
                this.classifyType=this.classifies[0].list[0].type
            }
        })
    }
}
</script>