<template>
  <div class="max-w-2xl mt-12 text-center">
    <h1 class="text-3xl font-bold mb-4">{{ version?.title_name || '未知测试' }}</h1>
    <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-prose break-words mx-auto">
      {{ version?.desc || '无描述' }}
      <a v-if="version?.refer_url" :href="version?.refer_url" target="_blank" class="text-blue-500 hover:underline">这个链接</a>
    </p>
      
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow text-left text-sm space-y-3 text-gray-700 dark:text-gray-200">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white text-center">开始测试前请阅读</h2>
      
      <p class="text-base">你将会看到一系列问题。请根据你的实际情况回答这些问题。</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b class="text-gray-700 dark:text-gray-300">提示：</b>请跟随第一直觉作答。
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b class="text-gray-700 dark:text-gray-300">声明：</b>本项目依靠前端实现，代码完全开源，不会收集和保存任何数据。
      </p>

      <p v-if="version?.how_to_answer" class="p-3 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
        📌 <b>作答方式：</b>{{ version?.how_to_answer }}
      </p>

      <p v-if="version?.introduction" class="p-3 border-l-4 border-purple-400 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm rounded">
        ℹ️ <b>简介：</b>  {{ version?.introduction }}
      </p>
      <p v-if="version?.warning" class="p-3 border-l-4 border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded">
        ⚠️ {{ version?.warning }}
      </p>
    </div>

    <button
      @click="emit('start')"
      class="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition active:scale-95"
    >
      开始测试
    </button>
  </div>
</template>

<script setup>
defineProps({
  version: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['start'])
</script>

<style scoped>
.break-words {
  word-wrap: break-word; 
  overflow-wrap: break-word; 
}
</style>
