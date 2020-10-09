<template>
    <div class="detail-header">
        <img class="detail-img" :src="info.product_pic_url"/>
        <div class="detail-header-right">
            <div class="detail-title clearfix">
                <h1 class="title">{{info.title}}</h1>
                <div class="detail-collection" v-if="!isOwner">
                    <a href="javascript:;" class="collection-at"
                     :class="{'no-collection-at': info.isCollection}"
                     @click="toggleCollection">
                         {{
                            info.isCollection ? '已收藏'  : '收藏'
                            }}
                    </a>
                </div>
            </div>
            <ul class="detail-property clearfix">
                <li v-for="item in info.properties_show"
                    :key="item.type">
                    <strong>{{item.parent_name}} </strong>  
                    <span>{{item.name}} </span>
                </li>
            </ul>
            <div class="user">
                <router-link class="img" :to="{name:space,query:{userId: info.userInfo.userId}}">
                    <img :src="info.userInfo.avatar">
                </router-link>
                <div class="info">
                    <h4>
                        <router-link id="tongji_author"  :to="{name:'space', query:{userId: info.userInfo.userId}}">
                        {{info.userInfo.name}}
                        </router-link>
                    </h4>
                    <span>菜谱：{{info.userInfo.work_menus_len}}/关注：{{info.userInfo.following_len}}/粉丝：{{info.userInfo.follows_len}}</span>
                    <strong>{{info.userInfo.createdAt}}</strong>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
.detail-header
    display flex
.detail-header-right
    background #fff
    width 662px
    .detail-title
        padding-left  25px
        border-bottom: 1px solid #eee;
        display flex
        justify-content space-between
        .title
            height 44px
            padding 28px 0px
            line-height 44px
            font-size 36px
            color #333
            margin 0
            font-weight normal
            // float left
        .detail-collection
            // float right
            height: 50px;
            line-height: 44px;
            color #fff
            padding: 0px 14px;
            text-align center
            margin-top 25px
            cursor pointer
        .clearfix:after 
            content ""
            display block
            height 0
            clear both

</style>
<script>
export default {
    name:'DetailHeader',
    props:{
        info:{
            type:Object,
            default:()=>({})
        }
    },
    computed:{
        isOwner(){
            return this.$store.state.userInfo.userId === this.info.userInfo.userId
        }
    },
    methods:{
        toggleCollection(){
            
        }
    }
}
</script>