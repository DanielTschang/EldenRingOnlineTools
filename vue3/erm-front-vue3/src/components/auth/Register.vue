<template>
        <form @submit.prevent="handleSubmit">
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
                <label for="rememberme">Remember Me</label>
                <input type="checkbox" class="form-control" v-model="rememberMe"/>
            </div>

            <button class="popupLogin">Login </button>
        </form>
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
                    setCookie("jwt", response.data.token)
                    this.$router.push('/map')
                }else{
                    this.errorMessage = response.data.message
                }
            }).catch(error=>{
                this.errorMessage = error.response.data.message
            })


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

<style>

</style>