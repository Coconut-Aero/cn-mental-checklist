<template>
  <div :class="{ dark: isDark }">
  <!-- 暗色模式切换按钮 -->
  <div class="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
  <!-- 移动端按钮 -->
  <button
    @click="toggleDark"
    class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
          border shadow-lg bg-white hover:bg-gray-100 text-gray-800
          dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700
          transition-all duration-300 backdrop-blur-sm sm:hidden"
    aria-label="切换暗色模式"
  >
    <span class="text-lg">{{ isDark ? '☀️' : '🌙' }}</span>
    <span class="hidden sm:inline">{{ isDark ? '亮色模式' : '暗色模式' }}</span>
  </button>

  <!-- 电脑端滑块 -->
  <label class="hidden sm:flex items-center cursor-pointer select-none">
    <div class="relative w-32 h-12">
      <input type="checkbox" class="sr-only" v-model="isDark" />

      <!-- 滑槽 -->
      <div
        class="block w-full h-full rounded-full transition-all duration-300
               bg-gray-300 dark:bg-gray-600"
      ></div>

      <!-- 文字放上层 -->
      <transition name="fade" mode="out-in">
        <div
          :key="isDark"  
          class="absolute inset-0 flex items-center text-sm font-medium
                text-gray-800 dark:text-gray-100 z-20 pointer-events-none"
          :class="isDark ? 'justify-start pl-4' : 'justify-end pr-4'"
        >
          {{ isDark ? '暗色模式' : '亮色模式' }}
        </div>
      </transition>

      <!-- 小圆球 -->
      <div
        class="absolute top-1 left-1 w-10 h-10 rounded-full flex items-center justify-center text-lg
              bg-white text-yellow-500 transition-all duration-300 transform z-10"
        :class="{ 'translate-x-20': isDark }"
      >
        {{ isDark ? '🌙' : '☀️' }}
      </div>
    </div>
  </label>
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


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
