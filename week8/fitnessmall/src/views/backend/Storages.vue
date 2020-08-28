<template>
  <div>
    <div class="text-right mt-4">
      <button type="button" class="btn btn-primary" @click="openModal('new')">新增圖片</button>
    </div>
    <table class="table mt-4">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>圖片</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in storages" :key="index">
          <td style="vertical-align: middle">#{{ index+1 }}</td>
          <td>
            <img class="img-fluid" width='100px' :src="item.path" alt="美味的餐點">
          </td>
          <td style="vertical-align: middle">
            <div class="btn-group">
              <button type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', item, index)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Coupon Modal -->
    <div class="modal fade" id="storageModal"
  tabindex="-1" role="dialog" aria-labelledby="storageModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title " id="exampleModalLabel">
              上傳圖片
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <input id="customFile"
                type="file"
                class="form-control mt-3"
                ref='file'
                @change="uploadFile">
                <img :src="filePath" class='img-fluid mt-3' alt="美味的餐點">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            v-if="status"
            @click="confirm">圖片上傳成功</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1"
      role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title " id="exampleModalLabel">
              <span>刪除圖片</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">是否刪除
            <strong class='text-danger'>第{{ index+1 }}張</strong>
            圖片(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click='deleteStorage(tempStorage.id)'>
              <b-spinner small type='grow' v-if='mode'></b-spinner>
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  data() {
    return {
      storages: [],
      mode: false,
      tempStorage: '',
      index: '',
      filePath: '',
      status: false,
    };
  },
  methods: {
    openModal(status, item, index) {
      switch (status) {
        case 'new':
          $('#storageModal').modal('show');
          break;
        case 'delete':
          this.tempStorage = Object.assign({}, item);
          this.index = index;
          $('#deleteModal').modal('show');
          break;
        default:
          break;
      }
    },
    getStorages() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`;
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;

      const loader = this.$loading.show();
      this.$http.get(api)
        .then((res) => {
          this.storages = res.data.data;
          loader.hide();
        })
        .catch((err) => {
          this.$swal(
            '伺服器狀況',
            err.response.data.errors[0],
            'error',
          );
        });
    },
    deleteStorage(id) {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage/${id}`;

      this.mode = true;
      this.$http.delete(api)
        .then(() => {
          this.mode = false;
          $('#deleteModal').modal('hide');
          this.getStorages();
        });
    },
    uploadFile() {
      const uploadFile = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file', uploadFile);

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`;

      const loader = this.$loading.show();
      this.$http.post(api, formData, {
        // 聲明這段內容為form-data的格式
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          this.filePath = res.data.data.path;
          this.tempStorage = res.data.data;
          loader.hide();
          this.status = true;
        })
        .catch((err) => {
          this.$swal(
            '伺服器狀況',
            err.response.data.errors[0],
            'error',
          );
        });
    },
    confirm() {
      this.getStorages();
    },
  },
  created() {
    this.getStorages();
  },
};
</script>
