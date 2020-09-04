<template>
  <div class="container" style="margin-top: 8rem;">
    <div class="row mt-5 mb-5 justify-content-center" v-if='followProducts.length'>
      <div class="col-md-8">
        <div class="row justify-content-between px-3 mb-3">
          <h3>已追蹤商品</h3>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>名稱</th>
              <th>價格</th>
              <th>加入購物車</th>
              <th>刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="followProduct in followProducts" :key="followProduct.id">
              <td width='100'>
                <img :src="followProduct.imageUrl[0]" class="img-fluid" alt="美味的餐點">
              </td>
              <td class="align-middle">{{ followProduct.title }}</td>
              <td class="align-middle">{{ followProduct.price | currency }}</td>
              <td class="align-middle">
                <button class="btn btn-primary mt-2 btn-block text-white"
                @click="addToCart(followProduct)">
                  <b-spinner small type='grow' v-if='statusId === followProduct.id'></b-spinner>
                  加入購物車
                </button>
              </td>
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm border-0"
                @click="deleteFollowProduct(followProduct)">
                  <i class="fas fa-times"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div style='margin-bottom: 103px;margin-top: 200px;' v-else>
      <div class="d-flex justify-content-center my-7">
        <h4 class="mb-3 warning-text">沒有追蹤商品，快去逛逛</h4>
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
      followed: JSON.parse(localStorage.getItem('followList')) || [],
      followProducts: [],
      totalPrice: 0,
      status: false,
      statusId: '',
    };
  },
  methods: {
    deleteFollowProduct(item) {
      if (item) {
        const index = this.followed.indexOf(item.id);
        this.followed.splice(index, 1);
        this.$swal(
          '追蹤取消',
          '可以再看看其他的',
          'success',
        );
      }
      localStorage.setItem('followList', JSON.stringify(this.followed));
      this.getProducts();
      // if (item) {
      //   const parm = {
      //     product: item.id,
      //   };

      //   this.statusId = item.id;
      //   this.$http.delete(url, parm)
      //     .then(() => {
      //       this.getCartData();
      //       this.statusId = '';
      //       this.$swal(
      //         '商品刪除',
      //         '可以再看看其他的',
      //         'success',
      //       );
      //     })
      //     .catch((err) => {
      //       this.$swal(
      //         '商品無法刪除',
      //         err.response.data.errors[0],
      //         'error',
      //       );
      //     });
      // } else {

      //   this.status = true;
      //   this.$http.delete(url)
      //     .then(() => {
      //       this.getCartData();
      //       this.status = false;
      //       this.$swal(
      //         '商品清空',
      //         '目前商品已全數清空',
      //         'success',
      //       );
      //     })
      //     .catch((err) => {
      //       this.$swal(
      //         '商品無法刪除',
      //         err.response.data.errors[0],
      //         'error',
      //       );
      //     });
      // }
    },
    getProducts() {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data;
          this.getFollow();
          loader.hide();
        }).catch((err) => {
          this.$swal(
            '獲取清單列表失敗',
            err.response.data.errors[0],
            'error',
          );
        });
    },
    getFollow() {
      this.followProducts = this.products.filter((item) => this.followed.indexOf(item.id) > -1);
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
