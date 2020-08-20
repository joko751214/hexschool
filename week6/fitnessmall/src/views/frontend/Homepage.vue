<template>
  <div>
    <section id="section_about">
      <div class="container">
        <div class="row">
          <!-- data-bottom-top為skrollr的相對定位方式-->
          <div class="col-sm-12"
          data-300="transform: translateY(-50px);opacity: 0"
          data-500="transform: translateY(0px);opacity: 1">
            <h1>美食饗味</h1>
            <hr/>
          </div>
          <div class="col-md-4 col-sm-6"
          data-bottom-top="transform: translateY(-50px);opacity: 0"
          data-center="transform: translateY(0px);opacity: 1">
            <div class="img_wrap" data-bottom-top="transform: translateY(-50px);opacity: 0" data-center="transform: translateY(0px);opacity: 1"><img src="https://images.unsplash.com/photo-1499969942143-ad2a66bc72dc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"/>
              <h3 data-bottom-top="transform: translateY(-50px);opacity: 0"
              data-center="transform: translateY(0px);opacity: 1">早餐</h3>
              <p data-bottom-top="transform: translateY(-50px);opacity: 0"
              data-center="transform: translateY(0px);opacity: 1">
              每天都拿不定主意早餐要吃什麼嗎? <br/>快來FITNESMALL挑選美味可口的
              </p>
            </div>
          </div>
          <div class="col-md-4 col-sm-6"
          data-bottom-top="transform: translateY(-50px);opacity: 0"
          data-center="transform: translateY(0px);opacity: 1">
            <div class="img_wrap" data-bottom-top="transform: translateY(-50px);opacity: 0" data-center="transform: translateY(0px);opacity: 1"><img src="https://images.unsplash.com/photo-1582034986517-30d163aa1da9?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"/>
              <h3 data-bottom-top="transform: translateY(-50px);opacity: 0"
              data-center="transform: translateY(0px);opacity: 1">沙拉</h3>
              <p data-bottom-top="transform: translateY(-50px);opacity: 0"
              data-center="transform: translateY(0px);opacity: 1">
              新鮮沙拉為FITNESSMALL最經典的產品<br/>採用豐富的萵苣、蘿蔓、歐式生菜與蔬果<br/>點綴自製的美味醬料，品嘗生菜的鮮甜爽脆
              </p>
            </div>
          </div>
          <div class="col-md-4 col-sm-6"
          data-bottom-top="transform: translateY(-50px);opacity: 0"
          data-center="transform: translateY(0px);opacity: 1">
            <div class="img_wrap" data-bottom-top="transform: translateY(-50px);opacity: 0" data-center="transform: translateY(0px);opacity: 1"><img src="https://images.unsplash.com/photo-1562166453-964fd947f2a4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60"/>
              <h3 data-bottom-top="transform: translateY(-50px);opacity: 0"
              data-center="transform: translateY(0px);opacity: 1">水果拼盤</h3>
              <p data-bottom-top="transform: translateY(-50px);opacity: 0"
              data-center="transform: translateY(0px);opacity: 1">
              水果為產地新鮮直送<br/>除了沙拉之外，也可以有別的輕食選擇
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <section id="section_story">
        <div class="row">
          <div class="col-sm-5 map"
          data-bottom-top="background-size: 150%;background-position: 0% 0%"
          data-center="background-size: 100%;background-position: 50% 50%"></div>
          <div class="col-sm-7">
            <div class="col-sm-12">
              <h1>健康 & 飲食</h1>
              <hr/>
            </div>
            <div class="col-sm-12 features">
              <div class="row">
                <div class="col-sm-4"
                data-bottom-top="transform: scale(1.5);opacity: 0"
                data-center="transform: scale(1);opacity: 1"><i class="fas fa-stroopwafel"></i>
                  <h4>美味可口</h4>
                </div>
                <div class="col-sm-4"
                data-bottom-top="transform: scale(1.5);opacity: 0"
                data-center="transform: scale(1);opacity: 1"><i class="fas fa-seedling"></i>
                  <h4>健康營養</h4>
                </div>
                <div class="col-sm-4"
                data-bottom-top="transform: scale(1.5);opacity: 0"
                data-center="transform: scale(1);opacity: 1"><i class="fas fa-utensils"></i>
                  <h4>挑動味蕾</h4>
                </div>
              </div>
            </div>
            <div class="col-sm-12">
              <p>食物能夠傳遞喜悅與滿足。</p>
              <p>從蔬果產地、水質清洗到人工逐葉揀選</p>
              <p>講究新鮮品質與食安衛生，無毒且口感水嫩清脆</p>
              <h4>打造安心且獨一無二的輕食品牌</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="jumbotron rounded-0">
    <div class="container">
      <h2>© FITNESSMAL 2020 All Rights Reserved.<br/>圖片為練習使用，無商業用途。</h2>
      <hr/>
      <button class="btn btn-outline-secondary">訂閱故事</button>
    </div>
  </section>
  </div>
</template>

<script>
export default {

};
</script>

<style>
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

section.jumbotron {
  margin-top: 50px;
  text-align: center;
  background-image: url(https://images.unsplash.com/photo-1479803244419-b24dfe9cbafa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60);
  background-size: cover;
  background-attachment: fixed;
  margin-bottom: 50px;
}
section.jumbotron .container {
  color: white;
  padding: 60px 0px;
}
section.jumbotron hr {
  max-width: 50px;
  border: 2px solid #ff6e3a;
}

</style>
