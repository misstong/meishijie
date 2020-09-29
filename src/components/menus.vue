<template>
    <el-menu mode="horizontal" :default-active="'1'">
        <el-menu-item index="1">
            <router-link class="nav-link" :to="{name:'home'}">首页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link class="nav-link" :to="{name:'recipe'}">菜谱大全</router-link>
        </el-menu-item>
    </el-menu>
</template>
<style lang="stylus">
.nav-link {
    display inline-block
}
a
    text-decoration none
</style>
