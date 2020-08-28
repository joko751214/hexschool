<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/admin" class="navbar-brand logo">後台首頁</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse"
    data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
    aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">回到前台</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/products">產品列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/coupons">優惠券列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/orders">訂單列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/storages">圖片存儲頁面</router-link>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click.prevent="signout">登出</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    signout() {
      document.cookie = 'hexToken=;expires=;';
      this.$router.push('/login');
    },
  },
};
</script>

<style>

</style>
