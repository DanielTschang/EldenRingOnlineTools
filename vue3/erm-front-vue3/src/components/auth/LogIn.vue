<template>
    <div class="popup" @click="closeLogin">
        <div @click.stop="" class="popupLogin">
            <div @click="closeLogin" class="close-btn">&times;</div>
            <form @submit.prevent="handleSubmit">
                <h2>登入</h2>
                <h3>{{errorCode}} {{errorMessage}} </h3>
                <div class="form-group">
                    <label> Email </label>
                    <input type="email" class="form-control" v-model="email" placeholder="Email"/>
                </div>
                <div class="form-group">
                    <label> Password </label>
                    <input type="password" class="form-control" v-model="password" placeholder="Password"/>
                </div>
                
                <div class="form-group">
                    <input type="checkbox" class="form-control" v-model="rememberMe"/>
                    <label>Remember Me</label>
                </div>
                <div class="form-group">
                    <button class="Login">Login </button>
                </div>
                <div class="form-group">
                    <a href="#"> Forget Password </a>
                </div>
                
            </form>
        </div>
    </div>
</template>

<script>
import { setCookie } from '@/utils/Cookies';
import axios from 'axios'
import "@/utils/axiosConfig"

export default {
    name:"LogIn",
    methods:{
        async handleSubmit(){
            await axios.post('auth/login',{
                email:this.email,
                username:"test123",
                password:this.password
            }).then(response=>{
                if(response.status === 200){
                    this.closeLogin()
                    setCookie("jwt", response.data.token)
                    this.$router.push('/map')
                }else{
                    this.errorMessage = response.data.message
                }
            }).catch(error=>{
                this.errorMessage = error.response.data.message
            })


        },
        closeLogin(){
            this.$emit('LogInTrigger')
        }
    },
    data(){
        return {
            email:'',
            password:'',
            errorCode:'',
            errorMessage:''
        }
    }
}
</script>

<style scoped>
    .popup{
        z-index: 1000000;
        position: fixed;
        width:100%;
        height: 100%;
        background-color: rgb(222, 220, 217,0.5);
    }
    .popupLogin{
        opacity: 1;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        width:380px;
        padding:20px 30px;
        background: rgb(217, 207, 191);
        box-shadow: 2px 2px 5px 5px rgba(0,0,0,0.15);
        border-radius: 10px;
    }
    .popupLogin form h2{
        text-align: center;
        color: #222;
        margin: 10px 0px 20px;
        font-size:25px;
    }
    .popupLogin .close-btn{
        position: absolute;
        top:10px;
        right:10px;
        height: 15px;
        width: 15px;
        background:#888;
        text-align:center;
        line-height: 15px;
        border-radius: 15px;
        cursor:pointer;
    }
    .popupLogin form .form-group{
        margin:15px 0px;
    }
    .popupLogin form .form-group label {
        font-size:14px;
        color:#222;
    }
    .popupLogin form .form-group input[type="email"],
    .popupLogin form .form-group input[type="password"]{
        margin-top:5px;
        display:block;
        width:100%;
        padding:10px;
        outline:none;
        border: 1px solid #aaa;
        border-radius: 5px;
    }
    .popupLogin form .form-group input[type="checkbox"]{
        margin-right:5px;
    }
    .popupLogin form .form-group a{
        display:block;
        text-align:right;
        font-size:15px;
        color:#1a79ca;
        text-decoration: none;
        font-weight: 600;
    }

</style>