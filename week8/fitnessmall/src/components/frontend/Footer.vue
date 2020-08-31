<template>
  <footer class="footer bg-primary">
     <div class="container">
      <div class="text-white">
        <div class="row">
          <div class="col-6">
            <div class="d-flex justify-content-center">
              <ul class="d-flex list-unstyled mb-0">
                <li class="nav-item">
                  <router-link to="/products"
                              class="nav-link text-white">
                    商品列表
                  </router-link>
                </li>
                <li>
                  <router-link to="/about"
                              class="nav-link text-white">
                    關於我們
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="icon-box text-center col-6">
            <ul class="d-flex justify-content-center list-unstyled">
              <li class="px-2 pt-2">
                <a href="#">
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
              <li class="px-2 pt-2">
                <a href="#">
                  <i class="fab fa-github"></i>
                </a>
              </li>
              <li class="px-2 pt-2">
                <a href="#">
                  <i class="fab fa-facebook-square"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class='row justify-content-center'>
          <p>無商業用途，僅供學習使用</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

};
</script>

<style>

.sideline {
  color: white;
}
.logo .sideline {
  font-size: 32px;
}

.icon-box i{
  font-size: 2rem;
  color: white;
}

a:hover {
  text-decoration: none;
}

@media screen and (max-width: 767px) {
  .title {
    font-size: 20px;
  }
  .sideline {
    font-size: 15px;
  }
}

</style>
