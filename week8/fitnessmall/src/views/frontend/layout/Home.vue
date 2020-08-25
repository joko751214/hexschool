<template>
    <div class="home">
      <Sidebar/>
      <Header/>
      <router-view/>
      <Footer/>
    </div>
</template>

<script>
/* global $ */
import Sidebar from '@/components/frontend/Sidebar.vue';
import Header from '@/components/frontend/Header.vue';
import Footer from '@/components/frontend/Footer.vue';

export default {
  name: 'Home',
  components: {
    Sidebar,
    Header,
    Footer,
  },
  data() {
    return {
      cartNum: 0,
    };
  },
  methods: {
  },
  created() {

  },
  mounted() {
    // 視窗滑動時執行的事件
    $(window).scroll(() => {
      if ($(window).scrollTop() > 0) {
        $('.navbar').removeClass('navbar-top');
        $('.navbar').addClass('navbar-dark');
        $('.navbar').addClass('bg-primary');
      } else {
        $('.navbar').addClass('navbar-top');
        $('.navbar').removeClass('navbar-dark');
        $('.navbar').removeClass('bg-primary');
      }
    });
  },
};
</script>

<style>
@charset "UTF-8";
* {
  font-family: 微軟正黑體;
}

body {
  height: 1000px;
}

h1, h2, h3, h4, h5, h6.h1, .h2, .h3, .h4, .h5, .h6 {
  font-weight: bold;
}

</style>
