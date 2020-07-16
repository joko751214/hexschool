Vue.component('productModal', {
  template: `<div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
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
                          <input id="imageUrl" v-model="tempProduct.imageUrl[0]" class="form-control" type="text" placeholder="請輸入圖片網址" >
                        </div>
                        <div class="form-group">
                          <label for="customFile">
                            或 上傳圖片
                          </label>
                          <input id="customFile" ref="file" type="file" class="form-control" @change="uploadFile">
                        </div>
                        <img class="img-fluid mt-3" :src="tempProduct.imageUrl[0]" alt="">
                      </div>
                      <div class="col-sm-8">
                        <div class="form-group">
                          <label for="title">標題</label>
                          <input id="title" v-model="tempProduct.title" class="form-control" type="text" placeholder="請輸入標題" required>
                        </div>
                        <div class="form-row">
                          <div class="form-group col-md-6">
                            <label for="category">分類</label>
                            <input type="text" v-model="tempProduct.category" class="form-control" id="category" placeholder="請輸入分類" required>
                          </div>
                          <div class="form-group col-md-6">
                            <label for="unit">單位</label>
                            <input type="text" v-model="tempProduct.unit" class="form-control" id="unit" placeholder="請輸入單位">
                          </div>
                        </div>
                        <div class="form-row">
                          <div class="form-group col-md-6">
                            <label for="origin_price">原價</label>
                            <input type="text" v-model="tempProduct.origin_price" class="form-control" id="origin_price" placeholder="請輸入原價">
                          </div>
                          <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input type="text" v-model="tempProduct.price" class="form-control" id="price" placeholder="請輸入售價">
                          </div>
                        </div>
                        <hr>
                        <div class="form-group">
                          <label for="description">產品描述</label>
                          <textarea id='description' v-model="tempProduct.description" class="form-control" placeholder="請輸入產品描述" required></textarea>
                        </div>
                        <div class="form-group">
                          <label for="content">說明內容</label>
                          <textarea id='content' v-model="tempProduct.content" class="form-control" placeholder="請輸入說明內容" required></textarea>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" v-model="tempProduct.enabled" type="checkbox" id="enabled">
                          <label  class="form-check-label" for="enabled">是否啟用</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                  </div>
                </div>
              </div>
            </div>`,
  props: {
    tempProduct: {
      imageUrl: []
    },
    user: {}
  },
  data() {
    return {}
  },
  methods: {
    updateProduct() {
      let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
      let httpMethod = 'post'
      
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      if(this.tempProduct.id) {
        api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`
        httpMethod = 'patch'
      }

      axios[httpMethod](api, this.tempProduct)
        .then( () => {
          this.$emit('update');
          $("#productModal").modal("hide");
        }).catch(error => {
          console.log(error);
        })      
    },
    getProduct(id) {
      let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;

      axios.get(api)
        .then(res => {
          this.tempProduct = res.data.data
          $("#productModal").modal("show");
        })
    },
    uploadFile() {
      const uploadedFile = this.$refs.file.files[0];

      // 轉成Form Data
      const formData = new FormData();

      formData.append("file", uploadedFile);

      let url = `https://course-ec-url.hexschool.io/api/${this.user.uuid}/admin/storage`;

      axios.post(url, formData, {
        // 聲明這段內容為form-data的格式
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then( res => {
        console.log(res)
        this.tempProduct.imageUrl.push(res.data.data.path);
      }).catch( error => {
        console.log('error:', error)
      })
    }
  }
})