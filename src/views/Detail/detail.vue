<template>
    <div class="menu-detail">
        <detail-header :info="menuInfo"></detail-header>
    </div>
</template>
<script>
import DetailHeader from './detailHeader'
import {menuInfo} from '@/service/index.js'
export default {
    name:'detail',
    components:{
        DetailHeader
    },
    data(){
        return {
            menuInfo: {

            }
        }
    },
    watch:{
        $route:{
            handler(){
                let {menuId}= this.$route.query
                if(menuId){
                    menuInfo({menuId}).then(res=>{
                        this.menuInfo=res.data.info
                    })
                }else{
                    this.$message({
                        message: '请重新进入',
                        type: 'warning'
                    })
                }
            },
            immediate: true
        }
    }
}
</script>