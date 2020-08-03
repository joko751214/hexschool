<template>
  <div class='container'>
    <form @submit.prevent='signin'>
      <h3 class='mb-5'>請先登入</h3>
      <div class="form-group">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" v-model='user.email' class="form-control"
          id="inputEmail" placeholder="Email address">
      </div>
      <div class="form-group">
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" v-model='user.password' class="form-control"
          id="inputPassword" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-block">登入</button>
      <p class='mt-5 text-muted'>&copy; 2020~∞ - 六角學院</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/auth/login`;
      const loader = this.$loading.show();
      this.$http.post(apiUrl, this.user)
        .then((res) => {
          const { expired } = res.data;
          const { token } = res.data;

          document.cookie = `hexToken=${token}; expires=${new Date(expired * 1000)}; path=/`;
          // 跳轉畫面
          this.$router.push('admin/products');
          loader.hide();
        }).catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
form{
  width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%)
}
</style>
