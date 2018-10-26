<template>
    <div class="login-bg">
        <div class="login">
            <div class="login-item" style="margin-top:60px">
                <label class="icon icon-user"></label>
                <input type="text" v-model="username"/>
            </div>
            <div class="login-item">
                <label class="icon icon-pwd"></label>
                <input type="text" v-model="password"/>
            </div>
            <div class="login-btn">
                <a href="javascript:void(0);" @click="loginfn">登录</a>
            </div>
        </div>
        
    </div>
</template>
<script>
    import cookie from "../public/js/cookie.js"
    
    export default{
        data(){
            return {
                username:"",
                password:""
            }
        },
        methods:{
            loginfn(){
                if(this.username == ""){
                    alert("请填写用户名");
                    reutrn ;
                }
                if(this.password == ""){
                    alert("请填写用户密码");
                    reutrn ;
                }
                this.$router.push({name:"index"});
                cookie.setCookie("username",this.username);
                cookie.setCookie("password",this.password);

            }
        }
    }
</script>
<style>
    .login-bg{
        width:100%;
        height:100vh;
        background:url("../public/images/bj.jpg");
        margin:0px;
    }
    .login{
        width:500px;
        height:330px;
        position:absolute;
        background:rgba(200,222,232,0.9);
        left:50%;
        margin-left:-250px;
        top:50%;
        margin-top:-165px;
    }
    
    .login-item{
        display: flex;
        background:#fff;
        width:320px;
        margin:40px auto;

    }
    .icon{
        width:20px;
        height:20px;
        background:url("../public/images/denglu.png");
        background-size:cover;
        margin-top:10px;
        margin-left:10px;
        margin-right:10px;
    }
    .login-item input{
        flex:1;
        line-height:40px;
        height:40px;
        border:0px;
        outline:none;
    }
    .login-btn{
        margin-top:30px;
        text-align:center;
    }
    .login-btn a{
        text-align: center;
        padding:10px 18px;
        background:#1296db;
        font-size:16px;
        color:#fff;
        border-radius:5px;
    }

</style>
