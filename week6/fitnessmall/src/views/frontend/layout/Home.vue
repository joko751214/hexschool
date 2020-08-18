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
        $('.navbar').addClass('bg-dark');
      } else {
        $('.navbar').addClass('navbar-top');
        $('.navbar').removeClass('navbar-dark');
        $('.navbar').removeClass('bg-dark');
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

section {
  padding: 50px 0px;
}

section#section_about img {
  width: 100%;
}

section#section_story {
  background-color: #a6dcef;
  color: white;
  padding: 0;
}
section#section_story .col-sm-5 {
  background-image: url(https://images.unsplash.com/photo-1576021182211-9ea8dced3690?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60);
  background-size: 100% auto;
  height: 400px;
}
section#section_story .col-sm-7 {
  text-align: center;
}
section#section_story .col-sm-7 i {
  font-size: 40px;
}
section#section_story .features {
  margin-top: 40px;
  margin-bottom: 40px;
}

</style>
