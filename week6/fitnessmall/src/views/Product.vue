<template>
  <div class="row mt-3">
    <div class="col-md">
      <h5 class="modal-title" id="tempProductModalLabel">{{product.title}}</h5>
      <img class="imgSize mt-3" :src="product.imageUrl">
      <div class="text-center mt-3">
        <p>{{product.content}}</p>
        <p class="text-muted"
        style="font-size: 8px;">{{product.description}}</p>
        <p class="price">$ {{product.price}}</p>
      </div>
      <select v-model="amount" class="form-control mt-3">
        <option value="0" disabled selected="selected">
          請選擇數量
        </option>
        <option v-for="num in 10" :key="num" :value="num" >
          選購 {{ num }} {{ product.unit }}
        </option>
      </select>
      <div class="modal-footer">
        <div v-if="amount" class="text-muted">
          小計
          <strong>{{ amount * product.price }} 元</strong>
        </div>
        <button type="button" class="btn btn-primary"
        @click="addToCart(product, amount)">加到購物車</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      amount: 0,
    };
  },
  methods: {
    getProduct(id) {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`;

      // this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          this.product = res.data.data;
          // this.isLoading = false;
          // this.statusId = '';
        });
    },
    addToCart(item, num = 1) {
      this.statusId = item.id;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;

      const parm = {
        product: item.id,
        quantity: num,
      };

      // this.isLoading = true;
      this.$http.post(url, parm)
        .then(() => {
          this.$swal(
            '產品添加成功',
            '請至購物車結帳',
            'success',
          );
        })
        .catch((err) => {
          this.$swal(
            '商品重複',
            err.response.data.errors[0],
            'error',
          );
        });
      // this.isLoading = false;
      // this.statusId = '';
    },
  },
  created() {
    const { id } = this.$route.params;
    this.getProduct(id);
  },
};
</script>

<style>
.imgSize {
  height: 450px;
  width: 450px;
}
.price {
  color: red;
}
</style>
