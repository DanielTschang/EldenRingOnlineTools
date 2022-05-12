<template>
  <div class="container m-5">
    <form @submit.prevent="userRegistration">
      <h3>註冊</h3>

      <div class="form-group">
        <label>Username</label>
        <input
          type="text"
          class="form-control form-control-lg"
          v-model="user.username"
        />
      </div>

      <div class="form-group">
        <label>信箱</label>
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

      <button type="submit" class="btn btn-dark btn-lg btn-block">
        註冊
      </button>

      <p class="forgot-password text-right">
        已經註冊過了?
        <router-link to="/login">登入</router-link>
      </p>
    </form>
  </div>
</template>

<script>

export default {
    data() {
        return {
            user: {
                username: "",
                email: "",
                password: "",
            },
        };
    },
    methods: {
        userRegistration() {
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

            fetch("http://127.0.0.1:3150/auth/register", requestOptions)
                .then(response => {
                  if (response.status===201){
                    console.log(response.json());
                    this.$router.push("/login");
                  }
                })
                .catch(error => console.log('error', error));
        },
    },
};
</script>