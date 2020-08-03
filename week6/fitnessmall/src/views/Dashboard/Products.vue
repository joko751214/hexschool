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
  </div>
</template>

<script>
export default {
  props: ['token'],
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;

      // this.$http.defaults.headers['Authorization'] = `Bearer ${this.user.token}`;
      const loader = this.$loading.show();
      this.$http.get(apiUrl)
        .then((res) => {
          console.log(res);
          this.products = res.data.data; // 取得產品列表
          this.pagination = res.data.meta.pagination; // 取得分頁資訊
          loader.hide();
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>

</style>
