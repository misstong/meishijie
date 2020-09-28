<template>
  <div id="app">
      <el-container>
    <el-header>header</el-header>
    <el-main>
      <div class="main">
        <router-view></router-view>
      </div>
    </el-main>
    <el-footer>
      <div class="footer">
        Copyright © 2019 - 2019 
      </div>
    </el-footer>
  </el-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{

  }

}
</script>

<style lang="stylus">
body 
  background : #fae8c8
</style>
