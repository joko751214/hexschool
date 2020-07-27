<template>
  <div class="about">
    <loading :active.sync="isLoading"></loading>
    <h1>This is an about page</h1>
    <button @click="test">測試</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    test() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          console.log(res);
        });
    },
  },
  created() {

  },
};
</script>
