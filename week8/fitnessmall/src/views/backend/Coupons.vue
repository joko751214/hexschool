<template>
  <div>
    <div class="text-right mt-4">
      <button type="button" class="btn btn-primary" @click="openModal('new')">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead class="thead-dark">
          <tr>
              <th>名稱</th>
              <th>折扣百分比</th>
              <th>到期日</th>
              <th>是否啟用</th>
              <th>編輯</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for='(coupon, key) in coupons' :key='key'>
              <td>{{ coupon.title }}</td>
              <td>{{ coupon.percent }}%</td>
              <td>{{ coupon.deadline.datetime }}</td>
              <td>
                <span v-if='coupon.enabled' class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal('edit', coupon)">編輯</button>
                  <button type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openModal('delete', coupon)">刪除</button>
                </div>
              </td>
          </tr>
      </tbody>
    </table>

    <!-- Coupon Modal -->
    <div class="modal fade" id="couponModal"
  tabindex="-1" role="dialog" aria-labelledby="couponModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title " id="exampleModalLabel">
              建立優惠券
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input id="title" v-model='tempCoupon.title'
                  class="form-control" type="text" placeholder="請輸入標題" required>
                </div>
                <div class="form-group">
                  <label for="category">優惠碼</label>
                  <input type="text" v-model='tempCoupon.code'
                  class="form-control" id="category" placeholder="請輸入優惠碼" required>
                </div>
                <div class="form-group">
                  <label for="due_date">到期日</label>
                  <input type="date" v-model='due_date'
                  class="form-control" id="due_date">
                </div>
                <div class="form-group">
                  <label for="due_time">到期時間</label>
                  <input type="time" v-model='due_time'
                  step="1" class="form-control" id="due_time">
                </div>
                <div class="form-group">
                  <label for="percent">折扣百分比</label>
                  <input type="text" v-model='tempCoupon.percent'
                  class="form-control" id="percent" placeholder="請輸入折扣數量">
                </div>
                <div class="form-check">
                  <input type="checkbox" v-model='tempCoupon.enabled'
                  class="form-check-input" id="enabled">
                  <label class="form-check-label" for="enabled">是否開放</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon(tempCoupon.id)">
              <b-spinner small type='grow' v-if='mode'></b-spinner>
              {{ status === 'new' ? '新增優惠券' : '更新優惠券'}}
            </button>
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
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">是否刪除
            <strong class='text-danger'>{{ tempCoupon.title }}</strong>
            優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary"
            @click='deleteCoupon(tempCoupon.id)' ref='demo'>
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
      coupons: {},
      tempCoupon: {
        title: '',
        code: '',
        percent: 0,
        enabled: false,
        deadline_at: '',
      },
      due_date: '',
      due_time: '',
      status: '',
      mode: false,
    };
  },
  methods: {
    openModal(status, item) {
      this.status = status;
      switch (status) {
        case 'new':
          this.tempCoupon = {};
          this.due_date = '';
          this.due_time = '';
          $('#couponModal').modal('show');
          break;
        case 'edit': {
          this.tempCoupon = { ...item };
          const deadline = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = deadline;
          $('#couponModal').modal('show');
          break;
        }
        case 'delete':
          this.tempCoupon = { ...item };
          $('#deleteModal').modal('show');
          break;
        default:
          break;
      }
    },
    getCoupons() {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupons`;
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;

      const loader = this.$loading.show();
      this.$http.get(apiUrl)
        .then((res) => {
          this.coupons = res.data.data;
          loader.hide();
        })
        .catch((err) => {
          this.$swal(
            '獲取優惠券失敗',
            err.response.data.errors[0],
            'error',
          );
        });
    },
    updateCoupon(id) {
      let apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let httpMethod = 'post';

      if (id) {
        apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`;
        httpMethod = 'patch';
      }
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;

      this.mode = true;
      this.$http[httpMethod](apiUrl, this.tempCoupon)
        .then(() => {
          this.mode = false;
          $('#couponModal').modal('hide');
          this.getCoupons();
        })
        .catch((err) => {
          this.$swal(
            '更新優惠券失敗',
            err.response.data.errors[0],
            'error',
          );
        });
    },
    deleteCoupon(id) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`;

      this.mode = true;
      this.$http.delete(apiUrl)
        .then(() => {
          this.mode = false;
          $('#deleteModal').modal('hide');
          this.getCoupons();
        })
        .catch((err) => {
          this.$swal(
            '刪除優惠券失敗',
            err.response.data.errors[0],
            'error',
          );
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
