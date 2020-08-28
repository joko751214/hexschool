<template>
  <nav class="navbar fixed-top navbar-expand-md navbar-top bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">FITNESSMALL</router-link>
      <button class="navbar-toggler navbar-light" type="button"
      data-toggle="collapse"
      data-target="#backendNavbar"
      aria-expanded="false"
      aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="backendNavbar">
        <div class="nav navbar-nav ml-auto">
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
.navbar-top a {
  color: white;
}
.navbar-top a:hover {
  color: #ff6e3a;
}
.nav-link {
  color: white;
}
</style>
