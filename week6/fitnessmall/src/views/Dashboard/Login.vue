<template>
  <div>
    <form @submit.prevent='signin'>
      <h3 class='mb-3'>請先登入</h3>
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

      this.$http.post(apiUrl, this.user)
        .then((res) => {
          const { expired } = res.data;
          const { token } = res.data;

          document.cookie = `hexToken=${token}; expires=${new Date(expired * 1000)}; path=/`;
          // 跳轉畫面
          this.$router.push('admin/products');
        }).catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
html, body{
  height: 100%;
  text-align: center;
}
body{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
