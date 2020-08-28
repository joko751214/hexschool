<template>
  <div class="container" style="margin-top: 7rem;margin-bottom: 8rem;" v-if="products.length > 0">
    <div class="row product">
      <div class="col-md-3">
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
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-4" v-for="item in filterCategories" :key="item.id">
            <div class="card border-0 mb-4 position-relative position-relative">
              <router-link :to="`/product/${ item.id }`">
                <div style="
                    height: 200px;
                    background-size: cover;
                    background-position: center;
                  "
                    class="rounded-0"
                    :style="{ backgroundImage: `url(${ item.imageUrl[0] })` }">
                  </div>
              </router-link>
              <div class="card-body p-0">
                <router-link :to="`/product/${ item.id }`">
                  <h4 class="mt-3 mb-2">
                    {{item.title}}
                  </h4>
                </router-link>
                <p class="card-text mb-0 price">{{ item.price | currency }}
                  <span class="text-muted"><del>{{ item.origin_price | currency }}</del></span>
                </p>
                <p class="text-muted" style="font-size: 8px;">{{ item.content }}</p>
                <button class="btn btn-primary mt-2 btn-block text-white"
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
    <router-link to="/cart" class="cart px-2 py-3 bg-primary">
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
          this.products = res.data.data;
          const { categoryName } = this.$route.params;
          if (categoryName) {
            this.filterCategory = categoryName;
          }
          loader.hide();
        }).catch((err) => {
          this.$swal(
            '獲取清單列表失敗',
            err.response.data.errors[0],
            'error',
          );
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
.cart {
  position: fixed;
  right: 1%;
  bottom: 30%;
  border-radius: 50%;
  cursor: pointer;
}
.price {
  color: red;
}
</style>
