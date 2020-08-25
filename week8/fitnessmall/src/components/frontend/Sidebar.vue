<template>
  <nav class="navbar fixed-top navbar-expand-md navbar-top">
    <div class="container">
      <a class="navbar-brand">FITNESSMALL</a>
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
