<template>
  <div>
    <table class="table mt-4">
      <thead class="thead-dark">
          <tr>
              <th>下單時間</th>
              <th>購買款項</th>
              <th>付款方式</th>
              <th>應付金額</th>
              <th>是否付款</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for='(order, key) in orders' :key='key'>
            <td>{{ order.created.datetime }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for='(item, index) in order.products' :key=index>
                  {{item.product.title}} 數量: {{item.quantity}} {{item.product.unit}}
                </li>
              </ul>
            </td>
            <td>{{ order.payment }}</td>
            <td>{{ order.amount }}</td>
            <!-- <td>{{ order.user. }}</td> -->
            <!-- <td>{{ order.paid }}</td> -->
            <td>
              <div class="custom-control custom-switch">
                <input type="checkbox"
                class='custom-control-input'
                v-model='order.paid'
                :id='order.id'
                @change='setOrderPaid(order)'>
                <label :for="order.id" class='custom-control-label'>
                  <strong v-if='order.paid' class="text-success">已付款</strong>
                  <span v-else class="text-muted">尚未付款</span>
                </label>
              </div>
            </td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['token'],
  data() {
    return {
      orders: '',
    };
  },
  methods: {
    getOrders() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders`;
      this.$http.defaults.headers.Authorization = `Bearer ${this.token}`;

      const loader = this.$loading.show();
      this.$http.get(api)
        .then((res) => {
          this.orders = res.data.data;
          loader.hide();
        });
    },
    setOrderPaid(item) {
      let api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;
      this.$http.defaults.headers.Authorization = `Bearer ${this.token}`;

      if (!item.paid) {
        api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
      }

      const loader = this.$loading.show();
      this.$http.patch(api)
        .then(() => {
          loader.hide();
          // 原先將getOrders放在外面，導致畫面沒有同步處理
          this.getOrders();
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

<style>

</style>
