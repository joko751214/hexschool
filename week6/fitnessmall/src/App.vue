<template>
  <div>
    <Sidebar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Sidebar from '@/components/frontend/Sidebar.vue';
import Footer from '@/components/frontend/Footer.vue';
/* global $ */

export default {
  components: {
    Sidebar,
    Footer,
  },
  data() {
    return {

    };
  },
  mounted() {
    // 視窗滑動時執行的事件
    $(window).scroll(() => {
      if ($(window).scrollTop() > 0) {
        $('.navbar').removeClass('navbar-top');
        $('.navbar').addClass('navbar-light');
        $('.navbar').addClass('bg-light');
      } else {
        $('.navbar').addClass('navbar-top');
        $('.navbar').removeClass('navbar-light');
        $('.navbar').removeClass('bg-light');
      }
    });
  },
};
</script>

<style lang="scss">

</style>
