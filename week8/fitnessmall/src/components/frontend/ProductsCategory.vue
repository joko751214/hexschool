.<template>
  <div class="my-5">
    <h4 class="font-weight-bold">商品介紹</h4>
    <div class="row">
      <div class="col-lg-4 my-4">
        <div class="card border-0 mb-4">
          <a href="#"
             @click.prevent="toCategory('沙拉')">
            <div style="
                    height: 300px;
                    background-size: cover;
                    background-position: center;
                    background-image:url('https://images.unsplash.com/photo-1569760142069-bc6838de16c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')
                  "
                 class="rounded-0">
                 <h3 class='description'>採用豐富的萵苣、蘿蔓、歐式生菜與蔬果</h3>
            </div>
          </a>
        </div>
      </div>
      <div class="col-lg-4 my-4">
        <div class="card border-0 mb-4">
          <a href="#"
             @click.prevent="toCategory('早餐套餐')">
            <div style="
                    height: 300px;
                    background-size: cover;
                    background-position: center;
                    background-image:url('https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')
                  "
                 class="rounded-0">
                 <h3 class='description'>還在思考早餐要吃什麼嗎?快來FITNESSMALL看看吧~~</h3>
            </div>
          </a>
        </div>
      </div>
      <div class="col-lg-4 my-4">
        <div class="card border-0 mb-4">
          <a href="#"
             @click.prevent="toCategory('水果拼盤')">
            <div style="
                    height: 300px;
                    background-size: cover;
                    background-position: center;
                    background-image:url('https://images.unsplash.com/photo-1495214783159-3503fd1b572d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')
                  "
                 class="rounded-0">
                 <h3 class='description'>水果為產地新鮮直送，除了新鮮還是新鮮!</h3>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toCategory(Name) {
      console.log(Name);
      this.$router.push({
        name: 'products',
        params: { categoryName: Name },
      });
    },
  },
};
</script>

<style>
.description {
  color: white;
  position: relative;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}
</style>
