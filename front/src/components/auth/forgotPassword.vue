<template>
    <div class="container m-5">
        <form @submit.prevent="forgetPassword">
            <h3>忘記密碼</h3>

            <div class="form-group">
                <label>信箱</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">重新設定密碼</button>
        </form>
    </div>
</template>

<script>


export default {
  data() {
    return {
      user: {   
        email: ''
      }
    };
  },
  methods: {
    forgetPassword() {
        console.log('還沒弄')
    }
  }
};
</script>