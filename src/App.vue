<template>
  <div :class="{ dark: isDark }">
  <!-- 暗色模式切换按钮 -->
  <div class="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
    <button
      @click="toggleDark"
      class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
            border shadow-lg bg-white hover:bg-gray-100 text-gray-800
            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700
            transition-all duration-300 backdrop-blur-sm"
      aria-label="切换暗色模式"
    >
      <span class="text-lg">{{ isDark ? '☀️' : '🌙' }}</span>
      <span class="hidden sm:inline">{{ isDark ? '亮色模式' : '暗色模式' }}</span>
    </button>
  </div>


    <!-- 页面容器 -->
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <main class="flex-grow">
        <router-view />
      </main>

      <!-- 全局页脚 -->
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
        构建 ｜ 当前版本 v0.2 
        <br />
        <a href="https://icp.gov.moe/?keyword=20250702"> 萌ICP备20250702号 </a>

      </footer>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('darkMode')
  isDark.value = saved !== null ? saved === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches
  document.documentElement.classList.toggle('dark', isDark.value)
})

watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val)
  localStorage.setItem('darkMode', val)
})

const toggleDark = () => {
  isDark.value = !isDark.value
}
</script>
