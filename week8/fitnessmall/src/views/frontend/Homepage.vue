<template>
  <div>
    <HomepageSidebar/>
    <Header/>
    <div class="container">
      <section id="section_about">
        <div class="row">
          <div class="col-sm-12">
            <h1 v-scrollanimation>美食饗味</h1>
            <hr/>
          </div>
          <div id="imgWrap1" class="col-md-4 col-sm-6" v-scrollanimation>
            <div>
              <router-link :to="{ name: 'products', params: { categoryName: '早餐套餐' }}">
                <img src="https://images.unsplash.com/photo-1499969942143-ad2a66bc72dc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt="美味的餐點"/>
              </router-link>
              <h3>早餐</h3>
              <p>
              每天都拿不定主意早餐要吃什麼嗎? <br/>快來FITNESMALL挑選美味可口的早餐
              </p>
            </div>
          </div>
          <div id="imgWrap2" class="col-md-4 col-sm-6" v-scrollanimation>
            <div>
              <router-link :to="{ name: 'products', params: { categoryName: '沙拉' }}">
                <img src="https://images.unsplash.com/photo-1582034986517-30d163aa1da9?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt="美味的餐點"/>
              </router-link>
              <h3>沙拉</h3>
              <p>
              新鮮沙拉為FITNESSMALL最經典的產品<br/>採用豐富的萵苣、蘿蔓、歐式生菜與蔬果<br/>點綴自製的美味醬料，品嘗生菜的鮮甜爽脆
              </p>
            </div>
          </div>
          <div id="imgWrap3" class="col-md-4 col-sm-6" v-scrollanimation>
            <div>
              <router-link :to="{ name: 'products', params: { categoryName: '水果拼盤' }}">
                <img src="https://images.unsplash.com/photo-1562166453-964fd947f2a4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt="美味的餐點"/>
              </router-link>
              <h3>水果拼盤</h3>
              <p>
              水果為產地新鮮直送<br/>除了沙拉之外，也可以有別的輕食選擇
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="container">
      <section id="section_story">
        <div class="row">
          <div class="col-sm-5 foodImg" v-scrollanimation></div>
          <div class="col-sm-7 pl-0 pr-4">
            <div class="col-sm-12 content">
              <h1 v-scrollanimation>健康 & 飲食</h1>
              <hr/>
            </div>
            <div class="col-sm-12 p-0 features">
              <div class="row">
                <div class="col-sm-4" v-scrollanimation>
                  <i class="fas fa-stroopwafel"></i>
                  <h4>美味可口</h4>
                </div>
                <div class="col-sm-4" v-scrollanimation>
                  <i class="fas fa-seedling"></i>
                  <h4>健康營養</h4>
                </div>
                <div class="col-sm-4" v-scrollanimation>
                  <i class="fas fa-utensils"></i>
                  <h4>挑動味蕾</h4>
                </div>
              </div>
            </div>
            <div class="col-sm-12 content">
              <h5 v-scrollanimation>
                食物能夠傳遞喜悅與滿足。從蔬果產地、水質清洗到人工逐葉揀選，講究新鮮品質與食安衛生，無毒且口感水嫩清脆，
                打造安心且獨一無二的輕食品，讓您在味蕾間，品嘗疏食鮮甜的感動與原味本質。
              </h5>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- <section class="jumbotron rounded-0">
      <div class="container">
        <h2 class='text-center'>About us</h2>
        <div class="row">
          <div class="col-md-5">
            <div class="image-about"></div>
          </div>
          <div class="col-md-7"></div>
        </div>
      </div>
    </section> -->
    <Footer/>
  </div>
</template>

<script>
/* global $ */
import Header from '@/components/frontend/Header.vue';
import HomepageSidebar from '@/components/frontend/HomepageSidebar.vue';
import Footer from '@/components/frontend/Footer.vue';

// 視窗滑動時執行的事件
$(window).scroll(() => {
  if ($(window).scrollTop() > 0) {
    $('.nav-bar').removeClass('homebar');
    $('.nav-bar').addClass('bg-primary');
  } else {
    $('.nav-bar').addClass('homebar');
    $('.nav-bar').removeClass('bg-primary');
  }
});

export default {
  components: {
    HomepageSidebar,
    Header,
    Footer,
  },
};
</script>

<style>
section {
  padding: 50px 0px;
}

#section_about img {
  width: 100%;
  /* padding: 0; */
}
#section_about .before-enter {
  opacity: 0;
  transform: translateX(100px);
  transition: all 1s cubic-bezier(.41,.01,.57,1.61);
}
#section_about .enter {
  opacity: 1;
  transform: translateX(0px);
}

#section_about #imgWrap2 {
  transition-delay: .5s;
}
#section_about #imgWrap3 {
  transition-delay: 1s;
}

#section_story {
  background-color: #a6dcef;
  color: white;
  padding: 0px 0px;
  margin-bottom: 50px;
  text-align: center;
}
#section_story .foodImg {
  background-image: url(https://images.unsplash.com/photo-1576021182211-9ea8dced3690?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60);
  background-repeat: no-repeat;
  background-origin: content-box;
  height: 400px
}
#section_story .features {
  margin-top: 80px;
  margin-bottom: 80px;
}
#section_story .features i {
  font-size: 40px;
}
#section_story .before-enter {
  background-size: 150%;
  background-position: 0% 0%;
  transition: all 3s ease-out;
}
#section_story .enter {
  background-size: 100%;
  background-position: 50% 50%;
}
#section_story .features .before-enter{
  transform: scale(1.5);
  opacity: 0;
  transition: all 3s ease-out;
}
#section_story .features .enter{
  transform: scale(1);
  opacity: 1;
}
#section_story .content .before-enter{
  transform: scale(1.5);
  opacity: 0;
  transition: all 3s ease-out;
}
#section_story .content .enter{
  transform: scale(1);
  opacity: 1;
}

section.jumbotron {
  margin-top: 50px;
  padding: 20px;
  background: #e0ece4;
  /* text-align: center;
  background-image: url(https://images.unsplash.com/photo-1479803244419-b24dfe9cbafa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60);
  background-size: cover;
  background-attachment: fixed; */
  margin-bottom: 0px;
}
section.jumbotron .container {
  color: white;
}
section.jumbotron h2 {
  font-family: 'Great Vibes', cursive;
  font-size: 60px;
}

.image-about {
  background-image: url('https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 0 10px grey;
}
@media screen and (max-width: 767px) {
  #section_about #imgWrap2 {
    transition-delay: 0s;
  }
  #section_about #imgWrap3 {
    transition-delay: 0s;
  }
}

</style>
