<template>
  <div class="row">
    <div class="col-md-4" v-for="item in relatedProduct" :key="item.id">
      <div class="card border-0 mb-4 position-relative position-relative">
        <router-link :to="`/product/${ item.id }`">
          <div style="
              height: 200px;
              background-size: cover;
              background-position: center;
            "
              class="rounded-0"
              :style="{ backgroundImage: `url(${ item.imageUrl[0] })` }">
            </div>
        </router-link>
        <div class="card-body p-0">
          <h4 class="mt-3 mb-2">{{item.title}}</h4>
          <p class="card-text mb-0 price">{{ item.price | currency }}
            <span class="text-muted"><del>{{ item.origin_price | currency }}</del></span>
          </p>
          <button class="btn btn-primary text-white mt-2 btn-block"
          @click="addToCart(item)">
            <b-spinner small type='grow' v-if='statusId === item.id'></b-spinner>
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      products: [],
      relatedProduct: [],
    };
  },
  methods: {
    getProducts(page = 1) {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(url, { params: { page } })
        .then((res) => {
          this.products = res.data.data;
          this.relatedProduct = this.products.filter(
            (item) => item.id !== this.product.id && item.category === this.product.category,
          );
          loader.hide();
        }).catch((err) => {
          this.$swal(
            '獲取清單列表失敗',
            err.response.data.errors[0],
            'error',
          );
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>

</style>
