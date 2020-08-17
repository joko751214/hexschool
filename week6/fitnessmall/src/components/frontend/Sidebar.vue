<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-md navbar-top">
      <div class="container"><a class="navbar-brand">FITNESSMALL</a>
        <div class="collapse navbar-collapse">
          <div class="nav navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首頁 HOME</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">菜單 MENU</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">購物車 CART</router-link>
            </li>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand logo">首頁</router-link>
    .navbar-toggler 漢堡式選單按鈕
    <button class="navbar-toggler" type="button" data-toggle="collapse"
    data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
    aria-label="Toggle navigation">
      .navbar-toggler-icon 漢堡式選單Icon
      <span class="navbar-toggler-icon"></span>
    </button>
    .collapse.navbar-collapse 用於外層中斷點群組和隱藏導覽列內容
    選單項目&漢堡式折疊選單
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        .active表示當前頁面
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
          <router-link class="nav-link" to="/admin">登入</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <button class="btn btn-sm btn-cart">
          <router-link class="nav-link" to="/cart">
            <font-awesome-icon class="text-light fa-2x" icon="shopping-cart" />
            這邊剩下接收購物車清單長度的部分
            <span class="badge badge-pill badge-danger">{{cartNum}}</span>
          </router-link>
        </button>
      </ul>
    </div>
  </nav> -->
</template>

<script>
export default {
  data() {
    return {
      cartNum: 0,
    };
  },
};
</script>

<style>
nav.bar {
  transition: 0.5s;
}

.navbar-top {
  background-color: transparent;
}
.navbar-top a {
  color: white;
  transition: 0.5s;
}
.navbar-top a:hover {
  color: #ff6e3a;
}

</style>
