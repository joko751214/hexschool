<template>
  <div class="modal fade" id="deleteModal" tabindex="-1"
  role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
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
          <button type="button" class="btn btn-primary"
          @click='deleteProduct' ref='demo'>
          <b-spinner small type='grow' v-if='status'></b-spinner>
          確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  props: ['tempProduct', 'token'],
  data() {
    return {
      status: false,
    };
  },
  methods: {
    deleteProduct() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;

      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      this.status = true;
      this.$http.delete(api)
        .then(() => {
          this.status = false;
          $('#deleteModal').modal('hide');
          this.$emit('update');
        });
    },
  },
  created() {
  },
};
</script>

<style>

</style>
