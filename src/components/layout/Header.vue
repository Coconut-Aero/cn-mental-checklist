<template>
  <div class="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
    <button
      @click="emit('toggle-menu')"
      class="w-12 h-12 flex items-center justify-center 
             rounded-lg border shadow-lg transition 
             bg-white text-gray-800 border-gray-300 
             hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
      aria-label="打开菜单"
    >
      ☰
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['toggle-menu'])
</script>
