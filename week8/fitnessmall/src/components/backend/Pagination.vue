<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
    <li class="page-item" :class="{ 'disabled': pages.current_page === 1 }">
        <a class="page-link" href="#" aria-label="Previous"
        @click="emitPages(pages.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>
    <li class="page-item"
        v-for="(item, index) in pages.total_pages"
        :key="index"
        :class="{ 'active': item === pages.current_page }"
    >
        <a class="page-link" href="#" @click="emitPages(item)">{{ item }}</a>
    </li>
    <li class="page-item" :class="{ 'disabled': pages.current_page === pages.total_pages }">
        <a class="page-link" href="#" aria-label="Next" @click="emitPages(pages.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>
    </ul>
</nav>
</template>

<script>
export default {
  props: ['pages'],
  data() {
    return {};
  },
  methods: {
    emitPages(item) {
      this.$emit('emit-pages', item);
    },
  },
};
</script>

<style>

</style>
