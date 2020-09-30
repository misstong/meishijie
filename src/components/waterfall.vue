<template>
    <div class="waterfall" ref="waterfall">
        <slot></slot>
        <div style="text-align: center">
            <i class="el-icon-loading"></i>
        </div>
    </div>
</template>
<script>
import {throttle} from 'throttle-debounce'
export default {
    name: 'waterfall',
    data() {
        return {
            isLoading: false
        }
    },
    mounted(){
        this.scrollHandler = throttle(300, this.scroll.bind(this))
        window.addEventListener('scroll', this.scrollHandler)
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollHandler)
    },
    methods: {
        scroll(){
            console.log('scroll')
            if (this.isLoading) return
            if (this.$refs.waterfall.getBoundingClientRect().bottom < document.documentElement.clientHeight) {
                console.log('update')
                this.isLoading = true
                this.$emit('view')
            }
        }
    }
}
</script>