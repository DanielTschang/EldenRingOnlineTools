<template>
  <div class="container m-5">
    <form @submit.prevent="userLogin">
      <h3>登入</h3>

      <div class="form-group">
        <label>郵件地址</label>
        <input
          type="email"
          class="form-control form-control-lg"
          v-model="user.email"
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

      <button type="submit" class="btn btn-dark btn-lg btn-block">登入</button>
      <button class="btn btn-dark btn-lg btn-block">
        <router-link to="/register">
          註冊
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
    data() {
        return {
            user: {
                email: "",
                password: "",
                username: "test123",
            },
        };
    },
    methods: {
        userLogin() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "email": this.user.email,
                "username": this.user.username,
                "password": this.user.password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://127.0.0.1:3150/auth/login", requestOptions)
                .then(response => {
                    if(response.status===200){
                        return response.json()
                    }
                }).then(result => {
                    localStorage.token = result.token
                }).catch(error => console.log('error', error));
        },
    },
};
</script>