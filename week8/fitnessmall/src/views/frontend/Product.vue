<template>
  <div class="container"
  style="margin-top: 7rem;margin-bottom: 5rem;"
  v-if="product.imageUrl">
    <div class="row align-items-center justify-content-center mb-4">
      <div class="col-lg-5">
        <div style="
              height: 400px;
              background-size: cover;
              background-position: center;"
             class="rounded-0"
             :style="{ backgroundImage: `url(${ product.imageUrl })` }">
        </div>
      </div>
      <div class="col-lg-5 mt-3">
        <h2 class="font-weight-bold h1 mb-5">{{ product.title }}</h2>
        <p class="mt-3">{{ product.content }}</p>
        <p class="text-muted"
        style="font-size: 8px;">{{ product.description }}</p>
        <p class="mb-0 text-muted text-right">
          <del>{{ product.origin_price | currency }}</del>
        </p>
        <p class="h4 font-weight-bold text-right price">{{ product.price | currency }}</p>
        <div class="d-flex align-items-center mt-3">
          <div class="input-group my-3 mr-2">
            <select v-model="amount" class="form-control">
              <option value="0" disabled selected="selected">
                請選擇數量
              </option>
              <option v-for="num in 10" :key="num" :value="num" >
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <button type="button" class="btn btn-primary btn-block"
          @click="addToCart(product, amount)">加到購物車</button>
        </div>
      </div>
    </div>
    <hr>
    <h5 class="font-weight-bold mt-4">相關商品</h5>
    <RelatedProduct :product='product' @update="getProduct"/>
  </div>
</template>

<script>
import RelatedProduct from '@/components/frontend/RelatedProduct.vue';

export default {
  components: {
    RelatedProduct,
  },
  data() {
    return {
      product: {},
      amount: 0,
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`;

      const loader = this.$loading.show();
      this.$http.get(api)
        .then((res) => {
          this.product = res.data.data;
          loader.hide();
        })
        .catch((err) => {
          this.$swal(
            '商品獲取失敗',
            err.response.data.errors[0],
            'error',
          );
        });
    },
    addToCart(item, num = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;

      const parm = {
        product: item.id,
        quantity: num,
      };

      const loader = this.$loading.show();
      this.$http.post(url, parm)
        .then(() => {
          loader.hide();
          this.$swal(
            '產品添加成功',
            '請至購物車結帳',
            'success',
          );
        })
        .catch((err) => {
          loader.hide();
          this.$swal(
            '商品重複',
            err.response.data.errors[0],
            'error',
          );
        });
    },
  },
  created() {
    const { id } = this.$route.params;
    this.getProduct(id);
  },
};
</script>

<style>
.price {
  color: red;
}
</style>
