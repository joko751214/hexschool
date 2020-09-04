<template>
  <div class="container" style="margin-top: 8rem;">
    <div class="row mt-5 mb-5 justify-content-center" v-if='carts.length'>
      <div class="col-md-6">
        <div class="row justify-content-between px-3 mb-5">
          <h3>已選擇商品</h3>
          <div class="text-right">
            <a href="#" class="h4 text-dark" @click.prevent="deleteCartList()">
              <i class="fas fa-times"></i>
            </a>
          </div>
        </div>
        <div class='d-flex mt-4 bg-light' v-for="cart in carts" :key="cart.product.id">
          <div class='cartImage'
          :style="{ backgroundImage: `url(${ cart.product.imageUrl[0] })`}"></div>
          <div class="w-100 p-3 position-relative">
            <a href="#"
                @click.prevent="deleteCartList(cart.product)"
                class="position-absolute  text-dark"
                style="top: 16px; right: 16px;">
              <i class="fas fa-times"></i>
            </a>
            <p class="mb-0 font-weight-bold">
              {{ cart.product.title }}
            </p>
            <p class="mb-1 text-muted"
                style="font-size: 14px;">
              {{ cart.product.content }}
            </p>
            <div class="d-flex justify-content-between align-items-center w-100 mt-3">
              <div class="input-group w-50 align-items-center">
                <div class="input-group-append pr-1">
                  <button class="btn btn-outline-primary btn-sm border-0"
                      @click.prevent="updateCartData(cart, '-')" :disabled="cart.quantity === 1">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
                <input  type="number"
                        class="form-control border-0
                          text-center my-auto shadow-none bg-light px-0"
                        :value="cart.quantity"
                        disabled />
                <div class="input-group-prepend">
                  <button class="btn btn-outline-primary btn-sm border-0"
                          @click.prevent="updateCartData(cart, '+')">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <p class="mb-0 ml-auto info-text">
                {{ cart.product.price | currency }}/{{ cart.product.unit }}
              </p>
            </div>
          </div>
        </div>
        <div style="margin-left: 124px;">
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 font-weight-bold">總計</p>
            <p class="mb-0 h4 font-weight-bold">
              {{ totalPrice | currency }}
            </p>
          </div>
        </div>
        <div class="d-flex mt-4 justify-content-between
              align-items-md-center align-items-end w-100">
          <router-link to="/products"
                        class="text-dark mt-5 h5">
            <i class="fas fa-chevron-left mr-1"></i>
            繼續購物
          </router-link>
          <router-link to="/order"
                        class="btn btn-primary mt-5 rounded-0">
            <i class="fas fa-shopping-cart text-white"> 結帳</i>
          </router-link>
        </div>
      </div>
    </div>
    <div style='margin-bottom: 103px;margin-top: 200px;' v-else>
      <div class="d-flex justify-content-center my-7">
        <h4 class="mb-3 warning-text">目前沒有商品，快去逛逛</h4>
        <router-link to="/products"
                      class="text-dark mt-5 mt-3 h5">
          <i class="fas fa-chevron-left mr-2"></i>
          查看商品
        </router-link>
      </div>
    </div>
    <ProductsCategory/>
  </div>
</template>

<script>
import ProductsCategory from '@/components/frontend/ProductsCategory.vue';

export default {
  components: {
    ProductsCategory,
  },
  data() {
    return {
      carts: [],
      totalPrice: 0,
      status: false,
      statusId: '',
    };
  },
  methods: {
    deleteCartList(item) {
      if (item) {
        const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/${item.id}`;
        const parm = {
          product: item.id,
        };

        this.statusId = item.id;
        const loader = this.$loading.show();
        this.$http.delete(url, parm)
          .then(() => {
            this.getCartData();
            this.statusId = '';
            loader.hide();
            this.$swal(
              '商品刪除',
              '可以再看看其他的',
              'success',
            );
          })
          .catch((err) => {
            this.$swal(
              '商品無法刪除',
              err.response.data.errors[0],
              'error',
            );
          });
      } else {
        const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;

        const loader = this.$loading.show();
        this.$http.delete(url)
          .then(() => {
            this.getCartData();
            loader.hide();
            this.$swal(
              '商品清空',
              '目前商品已全數清空',
              'success',
            );
          })
          .catch((err) => {
            this.$swal(
              '商品無法刪除',
              err.response.data.errors[0],
              'error',
            );
          });
      }
    },
    getCartData() {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;

      this.totalPrice = 0;

      const loader = this.$loading.show();
      this.$http.get(url)
        .then((res) => {
          this.carts = [...res.data.data];
          this.carts.forEach((item) => {
            this.totalPrice += item.product.price * item.quantity;
          });
          loader.hide();
        })
        .catch((err) => {
          this.$swal(
            '獲取購物車清單失敗',
            err.response.data.errors[0],
            'error',
          );
        });
    },
    updateCartData(items, status) {
      const item = items;
      switch (status) {
        case '+':
          item.quantity += 1;
          break;
        case '-':
          item.quantity -= 1;
          break;
        default:
          break;
      }

      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;

      const parm = {
        product: item.product.id,
        quantity: item.quantity,
      };

      const loader = this.$loading.show();
      this.$http.patch(url, parm)
        .then(() => {
          this.getCartData();
          loader.hide();
          this.$swal(
            '產品更新成功',
            '請至購物車結帳',
            'success',
          );
        })
        .catch((err) => {
          this.$swal(
            '產品更新失敗',
            err.response.data.errors[0],
            'error',
          );
        });
    },
  },
  created() {
    this.getCartData();
  },
};
</script>

<style>
.cartImage {
  width: 130px;
  background-size: cover;
  background-position: center;
}
</style>
