<template>
  <div class="row product">
    <loading :active.sync="isLoading"></loading>
    <div class="col-sm col-md-4 col-sm-4" v-for="product in products" :key="product.id">
      <img class="imgSize" :src="product.imageUrl[0]" alt=""/>
      <div class="title">{{product.title}}</div>
      <div class="price">{{product.price | money}}</div>
      <!-- <button class="btn btn-outline-primary mt-2
      float-left" @click="openModal('content', product)">
        <i v-if="statusId === product.id" class="spinner-grow spinner-grow-sm"></i>
        查看內容
      </button> -->
      <!-- <button class="btn btn-outline-danger mt-2 float-right" @click="addToCart(product)">
        <i v-if="statusId === product.id" class="spinner-grow spinner-grow-sm"></i>
        加入購物車
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      isLoading: false,
    };
  },
  filters: {
    money(num) {
      const parts = num.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `$ ${parts.join('.')}`;
    },
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          console.log(res);
          this.products = res.data.data;
          this.isLoading = false;
        }).catch((err) => {
          console.log(err);
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
.imgSize {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.price {
  color: red;
}
</style>
