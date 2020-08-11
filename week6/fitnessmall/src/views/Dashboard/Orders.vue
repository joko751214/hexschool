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
              <span v-if='order.paid' class="text-success">已付款</span>
              <span v-else class="text-danger">尚未付款</span>
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

      this.$http.get(api)
        .then((res) => {
          console.log(res);
          this.orders = res.data.data;
          console.log('this.orders:', this.orders);
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
