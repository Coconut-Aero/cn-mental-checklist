<template>
  <div :class="{ dark: isDark }">
    <!-- 暗色模式切换按钮 -->
    <div class="fixed top-4 right-4 z-50">
      <button
        @click="toggleDark"
        class="px-3 py-1 rounded-xl text-sm border bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 transition"
      >
        {{ isDark ? '☀️ 亮色' : '🌙 暗色' }}
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
        构建 ｜ 当前版本 v0.1  |  <span class="font-medium text-indigo-600"> Insider Alpha Version </span>

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
