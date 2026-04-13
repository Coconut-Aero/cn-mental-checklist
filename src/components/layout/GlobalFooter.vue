<template>
  <footer class="mt-12 sm:mt-16 text-xs text-gray-400 dark:text-gray-500 transition-opacity duration-500 hover:opacity-80 text-center p-4">
    Made With ❤  | 由 
    <a
      href="https://github.com/Coconut-Aero"
      target="_blank"
      rel="noopener noreferrer"
      class="font-medium text-indigo-600 dark:text-indigo-400 underline hover:opacity-90"
    >
      Coconut-Aero
    </a>
    构建 ｜ 当前版本 {{ version }} 
    <br />
    <a href="https://icp.gov.moe/?keyword=20250702"> 萌ICP备20250702号 </a>
  </footer>
</template>

<script setup>
defineProps({
  version: {
    type: String,
    required: true
  }
})
</script>
