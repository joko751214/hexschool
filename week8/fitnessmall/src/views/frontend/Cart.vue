<template>
  <div class="container" style="margin-top: 8rem;" v-if='carts.length'>
    <div class="row mt-5 mb-5 justify-content-center">
      <div class="col-md-8">
        <div class="row justify-content-between px-3 mb-3">
          <h3>已選擇商品</h3>
          <div class="text-right">
            <button type="button" class="btn btn-outline-danger border-0" @click="deleteCartList()">
              <b-spinner small type='grow' v-if='status'></b-spinner>
              <i class="fas fa-times"></i>
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
                <img :src="cart.product.imageUrl[0]" class="img-fluid" alt="美味的餐點">
              </td>
              <td class="align-middle">{{ cart.product.title }}</td>
              <td class="align-middle">
                <div class="input-group">
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary"
                    @click="updateCartData(cart, '-')" :disabled="cart.quantity === 1">-</button>
                  </div>
                  <input type="text" class="form-control text-center" :value="cart.quantity">
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-primary"
                    @click="updateCartData(cart, '+')">+</button>
                  </div>
                </div>
              </td>
              <td class="align-middle">{{ cart.product.unit }}</td>
              <td class="align-middle">{{ cart.product.price * cart.quantity | currency }}</td>
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="deleteCartList(cart.product)">
                  <b-spinner small type='grow' v-if='statusId === cart.product.id'></b-spinner>
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3"></td>
              <td colspan="3" class="text-right">
                <h5>總計: {{ totalPrice | currency }}</h5>
              </td>
            </tr>
          </tfoot>
        </table>
        <div class='text-right'>
          <router-link to='/order'>
            <button class="btn btn-primary" style='width: 120px;height: 50px'>
              <i class="fas fa-shopping-cart text-white"> 結帳</i>
            </button>
          </router-link>
        </div>
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
        this.$http.delete(url, parm)
          .then(() => {
            this.getCartData();
            this.statusId = '';
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

      this.$http.patch(url, parm)
        .then(() => {
          this.getCartData();
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
