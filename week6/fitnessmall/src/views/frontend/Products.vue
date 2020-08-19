<template>
  <div class="container mt-5">
    <div class="row product" v-if="products.length > 0">
      <div class="col-md-4">
        <ul class="list-group sticky-top rounded-0">
          <a href="#"
              class="list-group-item list-group-item-action"
              @click.prevent="filterCategory = ''"
              :class="{ active: filterCategory === '' }">
            全部商品
          </a>
          <a class="list-group-item list-group-item-action"
              href="#"
              @click.prevent="filterCategory = item"
              :class="{ active: item === filterCategory }"
              v-for="item in categories"
              :key="item">
            {{ item }}
          </a>
        </ul>
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-6" v-for="item in filterCategories" :key="item.id">
            <div class="card border-0 mb-4 position-relative position-relative">
              <img :src="item.imageUrl[0]" class="card-img-top rounded-0" alt="...">
              <div class="card-body p-0">
                <h4 class="mb-0 mt-3">
                  <router-link :to="`/product/${item.id}`">{{item.title}}</router-link>
                </h4>
                <p class="card-text mb-0 price">{{item.price | currency}}
                  <span class="text-muted "><del>{{item.origin_price | currency}}</del></span>
                </p>
                <button class="btn btn-outline-danger mt-2 btn-block"
                @click="addToCart(item)">
                  <b-spinner small type='grow' v-if='statusId === item.id'></b-spinner>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/cart" class="cart px-2 py-3 bg-dark">
      <CartIcon />
    </router-link>
  </div>
</template>

<script>
import CartIcon from '@/components/frontend/CartIcon.vue';

export default {
  components: {
    CartIcon,
  },
  data() {
    return {
      products: [],
      statusId: '',
      categories: ['沙拉', '早餐套餐', '水果拼盤'],
      filterCategory: '',
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
  computed: {
    filterCategories() {
      if (this.filterCategory) {
        return this.products.filter((item) => {
          const data = item.category
            .toLowerCase()
            .includes(this.filterCategory.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
.price {
  color: red;
}
.cart {
  position: fixed;
  right: 1%;
  bottom: 10%;
  border-radius: 50%;
  /* background-color: #6b5139af; */
  cursor: pointer;
}
</style>
