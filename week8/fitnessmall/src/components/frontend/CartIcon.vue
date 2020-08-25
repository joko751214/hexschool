<template>
  <div>
    <i class="fa fa-shopping-cart text-light fa-1x"
      style="font-size: 1.4rem;transform: translateX(5px)"
      aria-hidden="true"></i>
    <span class="badge badge-pill badge-danger"
          style="transform: translateX(1px) translateY(-2px)">
      {{ carts.length }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: [],
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;

      this.$http.get(url)
        .then((res) => {
          this.carts = [...res.data.data];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getCart();
    this.$bus.$on('quantity', () => {
      this.getCart();
    });
  },
};
</script>

<style>

</style>
