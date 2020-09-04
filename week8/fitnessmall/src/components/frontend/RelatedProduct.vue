<template>
  <div class="row" v-if='relatedProducts.length'>
    <div class="col-md-4" v-for="item in relatedProducts" :key="item.id">
      <div class="card border-0 mb-4 position-relative position-relative">
        <div class='relatedPicture'
          :style="{ backgroundImage: `url(${ item.imageUrl[0] })` }"
          @click.prevent='move(item.id)'>
        </div>
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
      statusId: '',
    };
  },
  methods: {
    getProducts(page = 1) {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(url, { params: { page } })
        .then((res) => {
          this.products = res.data.data;
          loader.hide();
        }).catch((err) => {
          this.$swal(
            '獲取清單列表失敗',
            err.response.data.errors[0],
            'error',
          );
        });
    },
    addToCart(item) {
      this.statusId = item.id;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;

      const parm = {
        product: item.id,
        quantity: 1,
      };

      this.$http.post(url, parm)
        .then(() => {
          this.$bus.$emit('quantity', parm.quantity);
          this.statusId = '';
          this.$swal(
            '產品添加成功',
            '請至購物車結帳',
            'success',
          );
        })
        .catch((err) => {
          this.statusId = '';
          this.$swal(
            '商品重複',
            err.response.data.errors[0],
            'error',
          );
        });
    },
    move(id) {
      this.$router.push(`/product/${id}`);
      this.$emit('update');
    },
  },
  computed: {
    relatedProducts() {
      const data = this.products.filter(
        (item) => item.id !== this.product.id && item.category === this.product.category,
      );
      return data;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
.relatedPicture {
  height: 200px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
}
</style>
