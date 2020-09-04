<template>
  <div class="container" style="margin-top: 5rem;margin-bottom: 5rem;">
    <div class="row justify-content-center flex-lg-row flex-column-reverse">
      <div class="col-lg-6 bg-white customer-info">
        <div class="mb-3">
          <h4>客戶資訊</h4>
        </div>
        <div>
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="createOrder">
              <div class="form-group">
                <ValidationProvider rules="required"
                v-slot="{ errors, classes, passed }" class="form-group">
                  <label for="username">收件人姓名</label>
                  <input type="text" name="姓名" class="form-control"
                  id="username" v-model="form.name" :class="classes">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                  <span v-if="passed" class="valid-feedback">姓名正確</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <ValidationProvider  rules="required|email"
                v-slot="{ errors, classes, passed }" class="form-group">
                  <label for="email">Email</label>
                  <input type="email" name="Email" class="form-control"
                  id="email" v-model="form.email" :class="classes">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                  <span v-if="passed" class="valid-feedback">Email 正確</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <ValidationProvider  rules="required|min:8"
                v-slot="{ errors, classes, passed }" class="form-group">
                  <label for="phoneNumber">電話</label>
                  <input type='tel' class="form-control" name="電話"
                  id="phoneNumber" v-model="form.tel" :class="classes">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                  <span v-if="passed" class="valid-feedback">電話正確</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <ValidationProvider  rules="required"
                v-slot="{ errors, classes, passed }" class="form-group">
                  <label for="address">地址</label>
                  <input class="form-control" name="地址"
                  id="address" v-model="form.address" :class="classes">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                  <span v-if="passed" class="valid-feedback">地址正確</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <label>選擇付款方式</label>
                <select v-model="form.payment" class="form-control" required>
                  <option value="" disabled selected="selected">選擇付款方式</option>
                  <option value="WebATM">WebATM</option>
                  <option value="ATM">ATM</option>
                  <option value="Barcode">Barcode</option>
                  <option value="Credit">Credit</option>
                  <option value="ApplePay">ApplePay</option>
                  <option value="GooglePay">GooglePay</option>
                </select>
              </div>
              <div class="form-group">
                <label for="message">留言</label>
                <textarea class="form-control" id="message" v-model="form.message"></textarea>
              </div>
              <div class="d-flex flex-column-reverse
                flex-md-row mt-4 justify-content-between
                align-items-md-center align-items-end w-100">
                <router-link to="/cart" class="text-dark mt-md-0 mt-3 h5">
                  <i class="fas fa-chevron-left mr-2"></i>
                  回到購物車
                </router-link>
                <button class="btn btn-secondary" :disabled="invalid">送出表單</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
      <div class="col-lg-4 p-3 mt-3">
        <div class="border p-5 mx-2 order-card">
          <h4 class="mb-4 text-brown font-weight-bold">訂單明細</h4>
          <div v-for="item in carts"
                :key="item.product.id + 1">
            <div class="d-flex mb-2">
              <img :src="item.product.imageUrl[0]"
                    alt="美味的餐點"
                    class="mr-2"
                    style="width: 48px; height: 48px; object-fit: cover">
              <div class="w-100">
                <div class="d-flex justify-content-between font-weight-bold">
                  <p class="mb-0">{{ item.product.title }}</p>
                  <p class="mb-0">x{{ item.quantity }}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <small class="mb-0 text-muted">
                    {{ item.product.price | currency }} / {{ item.product.unit }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <table class="table mt-4 border-top border-bottom text-muted">
            <tbody>
              <tr>
                <th scope="row"
                    class="border-0 px-0 pt-4 font-weight-normal">
                  小計
                </th>
                <td class="text-right border-0 px-0 pt-4">
                  {{ totalPrice | currency }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 font-weight-bold">總計</p>
            <p class="mb-0 h4 font-weight-bold">
              {{ totalPrice | currency }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
      carts: [],
      totalPrice: 0,
    };
  },
  methods: {
    createOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders`;

      const loader = this.$loading.show();
      this.$http.post(api, this.form)
        .then((res) => {
          const { id } = res.data.data;
          loader.hide();
          this.$router.push(`/checkform/${id}`);
        })
        .catch((err) => {
          this.$swal(
            '訂單創建失敗',
            err.response.data.errors[0],
            'error',
          );
        });
    },
    getCartData() {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;

      this.totalPrice = 0;

      const loader = this.$loading.show();
      this.$http.get(url)
        .then((res) => {
          this.carts = [...res.data.data];
          this.carts.forEach((item) => {
            this.totalPrice += item.product.price * item.quantity;
          });
          loader.hide();
        })
        .catch((err) => {
          this.$swal(
            '獲取購物車清單失敗',
            err.response.data.errors[0],
            'error',
          );
        });
    },
  },
  created() {
    this.getCartData();
  },
};
</script>

<style>
.customer-info {
  margin-top: 30px;
}

@media screen and (min-width: 769px) {
  .order-card {
    position: sticky;
    top: 115px;
  }
}
@media screen and (max-width: 769px) {
  .order-card {
    margin: 0;
    padding: 0;
  }
}
</style>
