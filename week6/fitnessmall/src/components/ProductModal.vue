<template>
  <div class="modal fade" id="productModal"
  tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title " id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="imageUrl">輸入圖片網址</label>
                <input id="imageUrl" v-model="product.imageUrl[0]"
                class="form-control" type="text" placeholder="請輸入圖片網址" >
              </div>
              <div class="form-group">
                <label for="customFile">
                  或 上傳圖片
                </label>
                <input id="customFile"
                ref="file"
                type="file"
                class="form-control"
                @change="uploadFile">
                <img class="img-fluid mt-5" :src="product.imageUrl[0]" alt="">
              </div>
            </div>
            <div class="col-sm-8">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="title">標題</label>
                  <input id="title" v-model="product.title"
                  class="form-control" type="text" placeholder="請輸入標題" required>
                </div>
                <div class="form-group col-md-6">
                  <label for="inventory">庫存數量</label>
                  <input id="inventory" v-model="product.options.inventory"
                  class="form-control" type="text" placeholder="請輸入數量" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input type="text" v-model="product.category"
                  class="form-control" id="category" placeholder="請輸入分類" required>
                </div>
                <div class="form-group col-md-6">
                  <label for="unit">單位</label>
                  <input type="text" v-model="product.unit"
                  class="form-control" id="unit" placeholder="請輸入單位">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input type="text" v-model="product.origin_price"
                  class="form-control" id="origin_price" placeholder="請輸入原價">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input type="text" v-model="product.price"
                  class="form-control" id="price" placeholder="請輸入售價">
                </div>
              </div>
              <hr>
              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea id='description' v-model="product.description"
                class="form-control" placeholder="請輸入產品描述" required></textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea id='content' v-model="product.content"
                class="form-control" placeholder="請輸入說明內容" required></textarea>
              </div>
              <div class="form-check">
                <input class="form-check-input"
                v-model="product.enabled" type="checkbox" id="enabled">
                <label  class="form-check-label" for="enabled">是否上架</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
            <b-spinner small type='grow' v-if='status'></b-spinner>
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  props: ['token', 'tempProduct'],
  data() {
    return {
      product: {
        imageUrl: [],
        options: {
          inventory: 0,
        },
      },
      status: false,
    };
  },
  methods: {
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product`;
      let httpMethod = 'post';

      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      if (this.product.id) {
        api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${this.product.id}`;
        httpMethod = 'patch';
      }
      console.log(this.product);
      this.status = true;
      this.$http[httpMethod](api, this.product)
        .then(() => {
          this.$emit('update');
          this.status = false;
          $('#productModal').modal('hide');
          this.product = {};
        }).catch((error) => {
          console.log(error);
        });
    },
    getProduct(id) {
      if (id) {
        const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`;
        const loader = this.$loading.show();
        this.$http.get(api)
          .then((res) => {
            this.product = res.data.data;
            console.log(this.product);
            $('#productModal').modal('show');
            loader.hide();
          });
      } else {
        this.product = {
          imageUrl: [],
        };
      }
    },
    uploadFile() {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`;
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const uploadedFile = this.$refs.file.files[0];
      // 轉成Form Data
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const loader = this.$loading.show();
      this.$http.post(url, formData, {
        // 聲明這段內容為form-data的格式
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        this.product.imageUrl.push(res.data.data.path);
        loader.hide();
      }).catch((error) => {
        console.log('error:', error);
      });
    },
  },
  created() {
    this.product = this.tempProduct;
  },
};
</script>

<style>

</style>
