<template>
  <div class="container mt-5">
    <div class="row product">
      <div class="col-sm col-md-4 col-sm-4" v-for="product in products" :key="product.id">
        <img class="size" :src="product.imageUrl[0]" alt=""/>
        <div class="title">{{product.title}}</div>
        <div class="price">{{product.price | currency}}</div>
        <router-link :to="`/product/${product.id}`"
        class="btn btn-outline-primary float-left">查看內容</router-link>
          <!-- <i v-if="statusId === product.id" class="spinner-grow spinner-grow-sm"></i> -->
        <button class="btn btn-outline-danger mt-2 float-right"
        @click="addToCart(product)">
          <b-spinner small type='grow' v-if='statusId === product.id'></b-spinner>
          <!-- <i v-if="statusId === product.id" class="spinner-grow spinner-grow-sm"></i> -->
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      products: [],
      statusId: '',
    };
  },
  methods: {
    getProducts(page = 1) {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(url, { params: { page } })
        .then((res) => {
          console.log(res);
          this.products = res.data.data;
          loader.hide();
        }).catch((err) => {
          console.log(err);
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
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
.product {
padding: 20px 10px;
text-align: center;
}
.product .col-sm {
  padding: 10px;
}
.size {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.price {
  color: red;
}
</style>
