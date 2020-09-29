<template>
    <el-header style="height: auto">
        <div class="header">
            <div class="header_c">
                <el-row type="flex" align="middle">
                    <el-col :span="6">
                        <a href="" class="logo"></a>
                    </el-col>
                    <el-col :span="10" :offset="2"></el-col>
                    <el-col :span="6" :offset="3" class="avatar-box" v-show="isLogin">
                        <router-link :to="{name: 'space'}">
                            <el-avatar></el-avatar>
                        </router-link>
                        <router-link :to="{name: 'sapce'}" class="user-name">TTT</router-link>
                        <router-link :to="{name: 'create'}" class="collection">发布菜谱</router-link>
                        <a href="javascript:;" class="collection" @click="loginOut">退出</a>
                    </el-col>
                    <el-col :span="6" v-show="!isLogin">
                        <router-link :to="{name: 'login'}" class="user-name">登录</router-link>
                        <router-link :to="{name: 'login'}" class="collection">注册</router-link>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="nav-box">
            <div class="nav_c">
                <Menus></Menus>
            </div>
        </div>
    </el-header>
</template>
<style lang="stylus">
.header
    height 129px
    background-color #c90000

    .logo
        display block
        height 129px
        background url(https://s1.c.meishij.net/n/images/logo2.png) no-repeat -15px 9px

.header_c, .nav_c
    width 990px
    margin 0 auto

.nav-box
    height  60px
    background #fff;
    box-shadow 10px 0px 10px rgba(0,0,0,0.3)
</style>
<script>
import Menus from '@/components/menus'
export default {
    name: 'Header',
    computed: {
        isLogin() {
            return this.$store.getters.isLogin
        }
    },
    components: {
        Menus
    },
    methods: {
        loginOut() {

        }
    }
}
</script>