<template>
  <div>
    <Sidebar/>
    <div class="container-fluid">
      <router-view v-if="checkSuccess"/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/backend/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      token: '',
      checkSuccess: false,
    };
  },
  methods: {
    checkAuth() {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const url = `${process.env.VUE_APP_APIPATH}/auth/check`;
      this.$http.post(url, {
        api_token: this.token,
      }).then(() => {
        this.checkSuccess = true;
      }).catch(() => {
        this.$router.push('/login');
      });
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>
