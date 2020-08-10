<template>
  <div>
    <div class="text-right mt-4">
      <button type="button" class="btn btn-primary" @click="openModal('new')">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead class="thead-dark">
          <tr>
              <th>圖片</th>
              <th>分類</th>
              <th>產品名稱</th>
              <th>現貨數量</th>
              <th>原價</th>
              <th>售價</th>
              <th>是否上架</th>
              <th width='120'>操作</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for='product in products' :key='product.id'>
            <td width='100'>
              <img :src="product.imageUrl[0]" class="img-fluid">
            </td>
            <td>{{ product.category }}</td>
            <td>{{ product.title }}</td>
            <td>{{ product.options.inventory }}</td>
            <td>{{ product.origin_price }}</td>
            <td>{{ product.price }}</td>
            <td>
              <span v-if='product.enabled' class="text-success">上架</span>
              <span v-else>不上架</span>
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
        options: {
          inventory: 0,
        },
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
            options: {
              inventory: 0,
            },
          };

          // 將 input 的內容重置
          $('#customFile').val('');
          $('#productModal').modal('show');
          this.$refs.productModal.getProduct();
          break;

        case 'edit':
          $('#customFile').val('');
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
