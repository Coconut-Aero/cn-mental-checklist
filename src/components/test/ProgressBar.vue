<template>
  <div class="mb-6">
    <div class="flex justify-between text-sm text-gray-500 mb-1">
      <span>第 {{ currentIndex + 1 }} / {{ totalQuestions }} 题</span>
      <span>{{ Math.round((currentIndex / totalQuestions) * 100) }}%</span>
    </div>
    <div class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
      <div
        class="h-full bg-blue-500 transition-all duration-500"
        :style="{ width: (currentIndex / totalQuestions * 100) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentIndex: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  }
})
</script>
