<template>
  <div class="container mt-2">
    <div class="row justify-content-center">
      <div class="col-md-6"></div>
      <div class="col-md-6">
        <div class="border p-5 mx-2 mb-4 order-card">
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
              <tr>
                <th scope="row"
                    class="border-0 px-0 pt-1 font-weight-normal">
                  Email
                </th>
                <td class="text-right border-0 px-0 pt-1">
                  {{ user.email }}
                </td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-1">收貨人姓名</th>
                <td class="text-right border-0 px-0 pt-1">{{ user.name }}</td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-1">收貨人電話</th>
                <td class="text-right border-0 px-0 pt-1">{{ user.tel }}</td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-1">收貨人地址</th>
                <td class="text-right border-0 px-0 pt-1">{{ user.address }}</td>
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
      products: [],
      totalPrice: 0,
      user: {},
    };
  },
  methods: {
    getOrder() {
      const { orderId } = this.$route.params;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders/${orderId}`;

      this.$http.get(api)
        .then((res) => {
          console.log(res);
          const { data } = res.data;
          this.products = data.products;
          this.user = data.user;
          this.products.forEach((item) => {
            this.totalPrice += item.product.price * item.quantity;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getOrder();
  },
};
</script>

<style>

</style>
