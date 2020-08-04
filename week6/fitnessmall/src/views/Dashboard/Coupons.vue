<template>
  <div>
    <Loading :active.sync="isLoading" />
    <div class="text-right mt-4">
      <button type="button" class="btn btn-primary" @click="openModal('new')">建立新的產品</button>
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
                  <button type="button" class="btn btn-outline-danger btn-sm">刪除</button>
                </div>
              </td>
          </tr>
      </tbody>
    </table>

    <!-- coupon modal -->
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
            <div class="row text-left">
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
                  class="form-control" id="due_time">
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
              <!-- <b-spinner small type='grow' v-if='status'></b-spinner> -->
              <span>新增優惠券</span>
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
  props: ['token'],
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
      isLoading: false,
    };
  },
  methods: {
    openModal(status, item) {
      switch (status) {
        case 'new':
          this.tempCoupon = {
            title: '',
            code: '',
            percent: 0,
            enabled: false,
            deadline_at: '',
          };
          this.due_date = '';
          this.due_time = '';
          $('#couponModal').modal('show');
          break;
        case 'edit':
          this.getCoupon(item.id);
          break;
        default:
          break;
      }
    },
    getCoupons() {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupons`;
      this.$http.defaults.headers.Authorization = `Bearer ${this.token}`;

      this.isLoading = true;
      this.$http.get(apiUrl)
        .then((res) => {
          this.coupons = res.data.data;
          console.log(this.coupons);
          this.isLoading = false;
        });
    },
    getCoupon(id) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`;
      this.$http.defaults.headers.Authorization = `Bearer ${this.token}`;

      this.isLoading = true;
      this.$http.get(apiUrl)
        .then((res) => {
          this.tempCoupon = res.data.data;
          const deadline = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = deadline;
          this.isLoading = false;
          $('#couponModal').modal('show');
        });
    },
    updateCoupon(id) {
      let apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      this.$http.defaults.headers.Authorization = `Bearer ${this.token}`;
      let httpMethod = 'post';

      if (id) {
        apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`;
        httpMethod = 'patch';
      }
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;
      // const datetime = new Date(this.tempCoupon.deadline_at);
      // console.log(datetime);
      // console.log(this.due_time);
      // console.log(this.tempCoupon);
      this.isLoading = true;
      this.$http[httpMethod](apiUrl, this.tempCoupon)
        .then((res) => {
          this.coupons = res.data.data;
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

<style>

</style>
