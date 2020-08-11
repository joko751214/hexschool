<template>
    <!-- 目前發現漢堡選單沒有辦法展開 -->
    <div class="container">
      <Sidebar/>
      <router-view ref="getCartNum"/>
    </div>
</template>

<script>
import Sidebar from '@/components/frontend/Sidebar.vue';

export default {
  name: 'Home',
  components: {
    Sidebar,
  },
  data() {
    return {
      cartNum: 0,
    };
  },
  methods: {
  },
  created() {
  },
};
</script>
