<template>
  <div>
    <h1>這是訂單頁面</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  created() {
    const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders`;
    this.$http.get(api)
      .then((res) => {
        console.log(res);
      });
  },
};
</script>

<style>

</style>
