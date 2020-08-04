<template>
  <div>
    <div class="text-right mt-4">
      <button type="button" class="btn btn-primary" @click="openModal('new')">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead class="thead-dark">
          <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for='product in products' :key='product.id'>
              <td>{{ product.category }}</td>
              <td>{{ product.title }}</td>
              <td>{{ product.origin_price }}</td>
              <td>{{ product.price }}</td>
              <td>
                <span v-if='product.enabled' class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm"
                  @click="openModal('edit', product)">編輯</button>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                  @click="openModal('delete', product)">刪除</button>
                </div>
              </td>
          </tr>
      </tbody>
    </table>

    <Pagination @emit-pages='getProducts' :pages='pagination'/>

    <ProductModal :temp-product='tempProduct' :token='token'
    ref='productModal' @update="getProducts"/>

    <DeleteModal :temp-product='tempProduct' :token='token' @update='getProducts'/>

  </div>
</template>

<script>
/* global $ */
import ProductModal from '@/components/ProductModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    ProductModal,
    DeleteModal,
    Pagination,
  },
  props: ['token'],
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imageUrl: [],
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products`;
      this.$http.defaults.headers.Authorization = `Bearer ${this.token}`;

      const params = {
        // eslint-disable-next-line object-shorthand
        page: page,
        paged: 10,
      };
      const loader = this.$loading.show();
      this.$http.get(apiUrl, { params })
        .then((res) => {
          console.log(res);
          this.products = res.data.data; // 取得產品列表
          this.pagination = res.data.meta.pagination; // 取得分頁資訊
          loader.hide();
        });
    },
    openModal(status, item) {
      switch (status) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
          };
          $('#productModal').modal('show');
          this.$refs.productModal.getProduct();
          break;

        case 'edit':
          this.tempProduct = Object.assign({}, item);
          this.$refs.productModal.getProduct(this.tempProduct.id);
          break;

        case 'delete':
          this.tempProduct = Object.assign({}, item);
          $('#deleteModal').modal('show');
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>

</style>
