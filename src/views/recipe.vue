<template>
    <div class="recipe">
        <el-tabs type="border-card" @tab-click="tabClickHandle" v-model="activeName">
            <el-tab-pane
                :label="item.parent_name"
                v-for="item in classifies"
                :key="item.parent_type"
                :name="item.parent_type">
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
                                    @click="selectTag(option)"
                                    :class="{'tag-selected':propertiesTypes[item.title] === option.type}">
                                        {{option.name}}
                                </el-tag>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-aside>
            <el-main class="filter-menus-box" style="padding:0px">
                <div v-show="!list.length&&!loading" class="menu-empty">暂时没有过滤出菜谱信息，请选择其他的筛选条件</div>
                <el-row type="flex">
                    <el-col v-for="item in list" :key="item._id">
                        <el-card  class="box-card" :body-style="{ padding: '0px' }">
                            <router-link :to="{name:'detail', query:{menuId: item._id}}">
                                <img :src="item.product_pic_url" style="width:232px;height:232px">
                                <div style="padding:14px">
                                    <span>{{item.title}}</span>
                                    <strong>{{item.comments_len}}评论</strong>
                                    <em>{{item.name}}</em>
                                </div>
                            </router-link>                           
                        </el-card>
                    </el-col>
                </el-row>
                
                <el-pagination v-show="!loading"
                    layout="total,prev,pager,next"
                    :page-size="pages.pageSize"
                    :total="pages.total"
                    :current-page="pages.currentPage"
                    @current-change="handleCurrentChange"></el-pagination>
            </el-main>
        </el-container>
    </div>
</template>
<style lang="stylus">
.el-pagination
    text-align right 
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
    .el-col 
        margin-bottom 20px
        margin-left 22px
        width auto
    .el-row
        flex-wrap wrap
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
.filter-box 
    .tag-selected
        background red
.menu-empty
    text-align center
    font-size 20px

</style>
<script>
import {getClassify,getProperty,getMenus} from '@/service/index.js';
export default {
    name:'recipe',
    data(){
        return {
            classifies:[],
            classifyType:'',
            properties: [],
            propertiesTypes:{},
            propertiesActivName:[],
            list: [],
            activeName:'',
            loading: false,
            pages: {
                pageSize: 0,
                total: 0,
                currentPage: 0,
                totalPages: 0
            }
        }
    },
    watch: {
        $route: {
            handler() {
                console.log('route changes')
                console.log('route', this.$route)
                const query = {...this.$route.query}
                console.log('before delete', query)
                if (query.classify) {
                     const params = {
                        page: query.page || 1,
                        classify: query.classify
                    }
                    this.classifyType = query.classify
                    delete query.page
                    delete query.classify
                    console.log('after delete', query)
                    if(Object.keys(query).length){
                        params.property={
                            ...query
                        }
                    }

                    //增加loading效果
                    let loading = null;
                    this.$nextTick(()=>{
                        loading = this.$loading({
                            target: '.filter-menus-box',
                            text: 'Loading',
                            lock: true,
                            spinner: 'el-icon-loading',
                            background:'rgba(0, 0, 0, 0.7)'
                        })
                    })
                    this.loading= true

                    getMenus(params).then(res=>{
                        this.list = res.data.list
                        if(loading) loading.close()
                        this.loading= false
                        console.log(this.list)
                        this.pages.total=res.data.total
                        this.pages.pageSize=res.data.page_size
                        this.pages.currentPage=res.data.current_page
                        this.pages.totalPages =Math.ceil(this.pages.total/this.pages.pageSize);
                        console.log('pages',this.pages)
                    })

                }
            },
            immediate: true
        }
    },
    methods: {
        handleCurrentChange(val){
            const query = {...this.$route.query}
            query.page=val
            console.log('val',val,query)

            this.$router.push({query})
        },
        selectTag(option){
            console.log('option',option)
            console.log('propertiesTypes',this.propertiesTypes)
            const query = {...this.$route.query}
            if(this.propertiesTypes[option.title]===option.type) {
                this.propertiesTypes[option.title]=""
                delete query[option.title]

            }else{
                this.propertiesTypes[option.title]=option.type
                query[option.title] = option.type
            }
            console.log('query',query)
            this.$router.push({query})
        },
        tabClickHandle(tab,e) {
            console.log('tab',tab)
            console.log('e',e)
            console.log('activename', this.activeName)
            const activeName = this.activeName
            const activeItem = this.classifies.find(item=>item.parent_type===activeName)
            const classify = activeItem.list[0].type 
            const query = {...this.$route.query}
            this.$router.push({
                query:   
                {
                    ...query,
                    classify
                }
                    
            })

        }
    },
    mounted(){
        console.log('mounted')
        getClassify().then(data=>{
            this.classifies=data.data
            // console.log('classifies',this.classifies)
            this.activeName = this.classifies[0].parent_type
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
            // console.log('query',query)
            this.propertiesTypes = this.properties.reduce((o, item) => {
                o[item.title] = query[item.title] ? query[item.title] : '';
                // console.log('o:',o)
                if(o[item.title]){
                this.propertiesActivName.push(o[item.title][0]);
                }
                return o;
            },{});
            // console.log('propertiesTypes',this.propertiesTypes);
        })
    }
}
</script>