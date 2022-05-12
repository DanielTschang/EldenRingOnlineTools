<template>
  <div class="container m-5">
    <form @submit.prevent="userRegister">
        <h3>註冊</h3>

        <div class="form-group">
            <label>郵件地址</label>
            <input
                type="email"
                class="form-control form-control-lg"
                v-model="user.email"
            />
        </div>

        <div class="form-group">
            <label>username</label>
            <input
                type="text"
                class="form-control form-control-lg"
                v-model="user.username"
            />
        </div>

        <div class="form-group">
            <label>密碼</label>
            <input
                type="password"
                class="form-control form-control-lg"
                v-model="user.password"
            />
        </div>



      <button type="submit" class="btn btn-dark btn-lg btn-block">註冊</button>
      <button class="btn btn-dark btn-lg btn-block">
        <router-link to="/login">
          登入
        </router-link>
      </button>

      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">忘記密碼?</router-link>
      </p>
    </form>
  </div>
</template>

<script>

export default {
    name:"SignUp",
     
    data() {
        return {
            user: {
                email: "",
                password: "",
                username:""
            },
        };
    },
    methods: {
        userRegister(){
            
        }
    },
};
</script>