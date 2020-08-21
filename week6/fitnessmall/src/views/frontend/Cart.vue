<template>
  <div class="container">
    <div class="row mt-5 mb-5 justify-content-center">
      <div class="col-md-8">
        <div class="row justify-content-between px-3 mb-3">
          <h3>已選擇商品</h3>
          <div class="text-right">
            <button type="button" class="btn btn-outline-danger border-0" @click="deleteCartList()">
              <i class="fas fa-times">
                <b-spinner small type='grow' v-if='status'></b-spinner>
              </i>
              <!-- <font-awesome-icon :icon="['far', 'trash-alt']"/>刪除所有商品 -->
            </button>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>名稱</th>
              <th width="140px">數量</th>
              <th>單位</th>
              <th>價格</th>
              <th>刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cart in carts" :key="cart.product.id">
              <td width='100'>
                <img :src="cart.product.imageUrl[0]" class="img-fluid">
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
              <td class="align-middle">{{cart.product.price * cart.quantity | currency}}</td>
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="deleteCartList(cart.product)">
                  <b-spinner small type='grow' v-if='statusId === cart.product.id'></b-spinner>
                  <font-awesome-icon :icon="['far', 'trash-alt']"/>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3"></td>
              <td colspan="2">
                <h5>總計: {{totalPrice | currency}}</h5>
              </td>
              <!-- <td></td> -->
            </tr>
          </tfoot>
        </table>
        <router-link to='/order' class="btn btn-primary btn-block">
          <font-awesome-icon icon="shopping-cart"/> 結帳
        </router-link>
      </div>
      <!-- <div class="col-md-4">
        <div class="border p-4 mb-4">
          <h4 class="font-weight-bold mb-4">Order Detail</h4>
          <table class="table text-muted border-bottom">
            <tbody>
              <tr>
                <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">小計</th>
                <td class="text-right border-0 px-0 pt-4">{{totalPrice | currency}}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 font-weight-bold">總計</p>
            <p class="mb-0 h4 font-weight-bold">{{totalPrice | currency}}</p>
          </div>
          <router-link to='/checkform' class="btn btn-primary btn-block">
            <font-awesome-icon icon="shopping-cart"/>結帳
          </router-link>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
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
        this.$http.delete(url, parm)
          .then(() => {
            this.getCartData();
            this.statusId = '';
            this.$swal(
              '商品刪除',
              '可以再看看其他的',
              'success',
            );
          });
      } else {
        const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;

        this.status = true;
        this.$http.delete(url)
          .then(() => {
            this.getCartData();
            this.status = false;
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

      const loader = this.$loading.show();
      this.$http.get(url)
        .then((res) => {
          this.carts = [...res.data.data];
          this.carts.forEach((item) => {
            this.totalPrice += item.product.price * item.quantity;
          });
          loader.hide();
        })
        .catch(() => {
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

      this.$http.patch(url, parm)
        .then(() => {
          this.getCartData();
          this.$swal(
            '產品更新成功',
            '請至購物車結帳',
            'success',
          );
        })
        .catch(() => {
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
