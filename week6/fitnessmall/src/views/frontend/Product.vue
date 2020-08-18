<template>
  <div class="container mt-5 mb-5">
    <div class="row align-items-center">
      <div class="col-md-7">
        <img :src="product.imageUrl" class="d-block w-100">
        <p class="mt-3">{{product.content}}</p>
        <p class="text-muted"
        style="font-size: 8px;">{{product.description}}</p>
      </div>
      <div class="col-md-5">
        <h2 class="font-weight-bold h1 mb-1">{{product.title}}</h2>
        <p class="mb-0 text-muted text-right"><del>NT$ {{product.origin_price}}</del></p>
        <p class="h4 font-weight-bold text-right price">NT$ {{product.price}}</p>
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
        <!-- <div class="mt-3">
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
        </div> -->
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
        });
    },
    addToCart(item, num = 1) {
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
