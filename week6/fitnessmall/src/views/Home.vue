<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand logo">首頁</router-link>
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
          <!-- .active表示當前頁面-->
          <li class="nav-item">
            <router-link class="nav-link" to="/about">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">線上商城</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contactus">聯絡我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">後台管理頁面</router-link>
          </li>
          <!-- 這邊是文章介紹專區，之後再規劃 -->
          <!-- .dropdown Navbar選項使用下拉式選單
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink"
            href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">文章介紹</a>
            .dropdown-menu 下拉選單內容
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else</a>
            </div>
          </li> -->
        </ul>
        <ul class="navbar-nav">
          <button class="btn btn-sm btn-cart">
            <router-link class="nav-link" to="/cart">
              <font-awesome-icon class="text-light fa-2x" icon="shopping-cart" />
              <span class="badge badge-pill badge-danger">1</span>
            </router-link>
          </button>
        </ul>
      </div>
    </nav>
  <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
};
</script>
