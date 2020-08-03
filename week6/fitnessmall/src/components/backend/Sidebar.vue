<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/admin" class="navbar-brand logo">後台首頁</router-link>
      <!-- <a class="navbar-brand logo" href="#">首頁</a> -->
      <!-- .navbar-toggler 漢堡式選單按鈕-->
      <button class="navbar-toggler" type="button" data-toggle="collapse"
      data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
      aria-label="Toggle navigation">
        <!-- .navbar-toggler-icon 漢堡式選單Icon-->
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- .collapse.navbar-collapse 用於外層中斷點群組和隱藏導覽列內容-->
      <!-- 選單項目&漢堡式折疊選單 -->
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
            <a href="#" class="nav-link" @click.prevent="signout">登出</a>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
export default {

};
</script>

<style>

</style>
