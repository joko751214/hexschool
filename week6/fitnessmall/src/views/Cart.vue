<template>
  <div class="p-3" style="min-width: 600px;" data-offset="40">
    <div class="col-md-12">
      <div class="mb-2">
        <h4>已選擇商品</h4>
      </div>
      <div class="text-right">
        <button type="button" class="btn btn-outline-danger" @click="deleteCartList()">
          <font-awesome-icon :icon="['far', 'trash-alt']"/>刪除所有商品
        </button>
      </div>
      <table class="table mt-3">
        <thead>
          <tr>
            <th>刪除</th>
            <th>名稱</th>
            <th width="140px">數量</th>
            <th>單位</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts" :key="cart.product.id">
            <td class="align-middle">
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click="deleteCartList(cart.product)">
                <font-awesome-icon :icon="['far', 'trash-alt']"/>
              </button>
            </td>
            <td class="align-middle">{{cart.product.title}}</td>
            <td class="align-middle">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-primary"
                  @click="updateCartData(cart, '+')">+</button>
                </div>
                <input type="text" class="form-control text-center" :value="cart.quantity">
                <div class="input-group-append">
                  <button class="btn btn-outline-primary"
                  @click="updateCartData(cart, '-')" :disabled="cart.quantity === 1">-</button>
                </div>
              </div>
            </td>
            <td class="align-middle">{{cart.product.unit}}</td>
            <td class="align-middle">{{cart.product.price * cart.quantity | money}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"></td>
            <td>總計</td>
            <td>{{totalPrice | money}}</td>
          </tr>
        </tfoot>
      </table>
      <router-link to='/checkform' class="btn btn-primary btn-block">
        <font-awesome-icon icon="shopping-cart"/>結帳
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: [],
      totalPrice: 0,
    };
  },
  methods: {
    deleteCartList(item) {
      if (item) {
        const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/${item.id}`;
        const parm = {
          product: item.id,
        };

        this.isLoading = true;
        this.$http.delete(url, parm)
          .then(() => {
            this.getCartData();
            this.isLoading = false;
            this.$swal(
              '商品刪除',
              '可以再看看其他的',
              'success',
            );
          });
      } else {
        const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;

        this.isLoading = true;
        this.$http.delete(url)
          .then(() => {
            this.getCartData();
            this.isLoading = false;
            this.$swal(
              '商品清空',
              '目前商品已全數清空',
              'success',
            );
          });
      }
    },
    getCartData() {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;

      this.totalPrice = 0;
      this.$http.get(url)
        .then((res) => {
          this.carts = [...res.data.data];
          this.carts.forEach((item) => {
            this.totalPrice += item.product.price * item.quantity;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* eslint-disable no-param-reassign */
    updateCartData(item, status) {
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

      this.isLoading = true;
      this.$http.patch(url, parm)
        .then(() => {
          this.getCartData();
          // this.isLoading = false;
          this.$swal(
            '產品更新成功',
            '請至購物車結帳',
            'success',
          );
        })
        .catch((err) => {
          console.log('錯誤信息:', err);
        });
    },
  },
  created() {
    this.getCartData();
  },
};
</script>

<style>

</style>
