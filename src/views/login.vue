<template>
<div class="loginPage">
    <el-tabs v-model="currentTab"  type="border-card" >
        <el-tab-pane label="登录" name="login">
            <div class="login_section">
                <el-form label-position="top" :model="ruleForm" status-icon ref="ruleForm" l  style="padding:0 20px" :rules="rules"> 
                    <el-form-item label="用户名" prop="name">
                        <el-input  v-model="ruleForm.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="密码"  prop="password">
                        <el-input type="password"  v-model="ruleForm.password"  autocomplete="off"> </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="submitForm('ruleForm')">提交</el-button>
                        <el-button  @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            
        </el-tab-pane>
        <el-tab-pane label="注册" name="register"></el-tab-pane>
        
    
    </el-tabs>
</div>
    
    
</template>
<style lang="stylus">
.loginPage
    width 500px
    margin 0 auto
    background #fff
    box-shadow 0 0 25px #cac6c6
    border-radius 10px
</style>
<script>
import {login} from '@/service/index.js'
export default {
    name:'login',
    data(){
        return {
            currentTab:'login',
            ruleForm: {
                name: '',
                password: ''
            },
            rules:{
                name:[
                    {required:true, message:'请输入用户名',trigger:'blur'},
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    login({
                        name: this.ruleForm.name,
                        password: this.ruleForm.password
                    }).then(res=>{
                        console.log(res)
                        if(res.code===0) {
                            localStorage.setItem('token',res.data.token)
                            window.location.href='/'
                        }
                        if(res.code===1){
                            this.$message(res.mes)
                        }
                        
                    })
                }
            })
        }
    }

}
</script>