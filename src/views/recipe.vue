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
        <el-container>
            <el-aside width="200px">
                <div class="filter-box">
                    <h4>筛选</h4>
                    <el-collapse v-model="propertiesActivName">
                        <el-collapse-item
                            v-for="item in properties"
                            :key="item.parent_type"
                            :title="item.parent_name"
                            :name="item.parent_type"
                            >
                            <div class="filter-tags">
                                <el-tag
                                    type="info"
                                    v-for="option in item.list"
                                    :key="option.type"
                                    :class="{'tag-selected':propertiesTypes[item.title] === option.type}">
                                        {{option.name}}
                                </el-tag>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-aside>
            <el-main>
                hhh
            </el-main>
        </el-container>
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

.recipe
    h2 
        text-align center
        line-height 150px
        font-weight normal
        margin-block-start 0.83em
        margin-block-end 0.83em
    .filter-box 
        background #fff 
        padding 10px
        box-sizing border-box
        width 100%
.filter-tags
    display flex
    flex-wrap wrap
    justify-content space-around
#app .el-tag.el-tag--info {
    padding: 0 10px;
    margin: 5px 10px;
    cursor: pointer;
    min-width: 56px;
    text-align: center;
}
</style>
<script>
import {getClassify,getProperty} from '@/service/index.js';
export default {
    name:'recipe',
    data(){
        return {
            classifies:[],
            classifyType:'',
            properties: [],
            propertiesTypes:{},
            propertiesActivName:[]
        }
    },
    mounted(){
        getClassify().then(data=>{
            this.classifies=data.data
            if(!this.$route.query.classify){
                this.classifyType=this.classifies[0].list[0].type
                this.$router.push({
                    query: {
                        classify: this.classifyType,
                        page: 1
                    }
                })
            }
        })
        getProperty().then(data=>{
            this.properties = data.data
            const {query} = this.$route
            console.log('query',query)
            this.propertiesTypes = this.properties.reduce((o, item) => {
                o[item.title] = query[item.title] ? query[item.title] : '';
                console.log('o:',o)
                if(o[item.title]){
                this.propertiesActivName.push(o[item.title][0]);
                }
                return o;
            },{});
            console.log('propertiesTypes',this.propertiesTypes);
        })
    }
}
</script>