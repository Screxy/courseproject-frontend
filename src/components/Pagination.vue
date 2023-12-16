<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button
          @click="pageChanged(currentPage-1)"
          :disabled="currentPage === 0"
      >
        &lt;
      </button>
    </li>
    {{ currentPage + 1 }}/
    {{ totalPages }}
    <li class="pagination-item">
      <button
          @click="pageChanged(currentPage+1)"
          :disabled="currentPage === totalPages-1"
      >
        >
      </button>
    </li>

  </ul>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

const emit = defineEmits(['pageChanged'])
const props = defineProps({
  totalPages: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})
const pages = computed(() => {
  const pages = []
  for (let i = 0; i < props.totalPages; i++) {
    pages.push(i)
  }
  return pages
})
const pageChanged = (val: number) => {
  emit('pageChanged', val)
}
</script>

<style lang="scss">
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4AAE9B;
  color: #ffffff;
}
</style>
