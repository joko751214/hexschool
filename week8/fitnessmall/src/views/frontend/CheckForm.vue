<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="border px-5 py-4 mx-2 mb-4 order-card">
          <h4 class="mb-4 text-brown font-weight-bold">訂單資料</h4>
          <div v-for="(item, index) in products"
                :key="index">
            <div class="d-flex mb-2">
              <img :src="item.product.imageUrl[0]"
                    alt=""
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
              <tr class="mt-3">
                <th scope="row"
                    class="border-0 px-0 pt-3 font-weight-normal">
                  Email
                </th>
                <td class="text-right border-0 px-0 pt-3">
                  {{ user.email }}
                </td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-3">收貨人姓名</th>
                <td class="text-right border-0 px-0 pt-3">{{ user.name }}</td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-3">收貨人電話</th>
                <td class="text-right border-0 px-0 pt-3">{{ user.tel }}</td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-3">收貨人地址</th>
                <td class="text-right border-0 px-0 pt-3">{{ user.address }}</td>
              </tr>
            </tbody>
          </table>
          <table class="table text-muted">
            <tbody>
              <tr>
                <th scope="row" class="border-0 px-0 pt-3">付款金額</th>
                <td class="text-right border-0 px-0 pt-3">{{ totalPrice }}</td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-3">付款方式</th>
                <td class="text-right border-0 px-0 pt-3">{{ payment }}</td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-3">付款狀態</th>
                <td class="text-right border-0 px-0 pt-3" :class="paid ? 'text-success' : ''">
                  {{ paid ? '付款成功' : '尚未付款'}}
                </td>
              </tr>
            </tbody>
          </table>
          <div class='text-right' v-if="!paid">
            <button type="button"
            class='btn btn-danger mt-4'
            @click="setOrderPaid()"
            >確認付款</button>
          </div>
          <div v-else>
            <div class="row justify-content-between align-items-center">
              <h2 class="my-0">完成訂單</h2>
              <div class='text-right'>
                <button type="button"
                class='btn btn-outline-secondary'
                @click.prevent="backHome"
                >回到首頁</button>
              </div>
            </div>
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
      products: [],
      orderId: '',
      totalPrice: 0,
      user: {},
      paid: '',
      payment: '',
    };
  },
  methods: {
    getOrder() {
      this.orderId = this.$route.params.orderId;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders/${this.orderId}`;
      const loader = this.$loading.show();
      this.$http.get(api)
        .then((res) => {
          const { data } = res.data;
          this.user = data.user;
          this.paid = data.paid;
          this.payment = data.payment;
          this.products = data.products;
          this.products.forEach((item) => {
            this.totalPrice += item.product.price * item.quantity;
          });
          loader.hide();
        })
        .catch(() => {
        });
    },
    setOrderPaid() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders/${this.orderId}/paying`;
      const loader = this.$loading.show();
      this.$http.post(api)
        .then(() => {
          loader.hide();
          this.getOrder();
        });
    },
    backHome() {
      this.$router.push('/');
    },
  },
  created() {
    this.getOrder();
  },
};
</script>

<style>

</style>
