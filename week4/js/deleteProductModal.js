Vue.component('deleteProductModal', {
  template: `<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title " id="exampleModalLabel">
                      <span>刪除產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">是否刪除
                    <strong class='text-danger'>{{ tempProduct.title }}</strong>
                    商品(刪除後將無法恢復)。
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click='deleteProduct'>確認刪除</button>
                  </div>
                </div>
              </div>
            </div>
            </div>`,
  data() {
    return {};
  },
  props: {
    tempProduct: {
      imageUrl: []
    },
    user: {}
  },
  methods: {
    deleteProduct() {
      let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;

      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.delete(api)
        .then( () => {
          $("#deleteModal").modal("hide");
          this.$emit('update');
        })
    },
  }
})