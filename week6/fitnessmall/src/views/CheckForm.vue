<template>
  <div class="p-3">
    <div class="col-md-12">
      <div class="mb-2">
        <h4>訂單</h4>
      </div>
      <div>
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="confirm">
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
              <label>付款方式</label>
              <select v-model="form.payment" class="form-control" required>
                <option value="" disabled selected="selected">請選擇付款方式</option>
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
            <div class="text-right">
              <button class="btn btn-primary" :disabled="invalid">送出表單</button>
            </div>
          </form>
        </ValidationObserver>
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
    };
  },
};
</script>

<style>

</style>
