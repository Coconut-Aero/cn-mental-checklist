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

  <!-- 左上角汉堡按钮 -->
  <button
    @click="isMenuOpen = !isMenuOpen"
    class="fixed top-2 left-2 z-50 w-12 h-12 flex items-center justify-center 
         rounded-lg border shadow-lg transition 
         bg-white text-gray-800 border-gray-300 
         hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"

    aria-label="打开菜单"
  >
    ☰
  </button>

  <!-- 侧边栏 -->
  <transition name="fade" mode="out-in">
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-40 z-40"
      @click.self="isMenuOpen = false"
    >
      <div class="fixed top-16 left-2 w-90 p-4 rounded-xl shadow-lg border 
         bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
         transition-all z-50 space-y-4">
        <h2 class="text-lg font-bold">🌸 菜单</h2>

        <div class="space-y-2">
          <h3 class="font-medium text-gray-700 dark:text-gray-300">设置主题色（测试阶段） 🎨</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="theme in themes"
              :key="theme.name"
              @click="setTheme(theme.color)"
              :style="{ backgroundColor: theme.color }"
              class="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
            ></button>
          </div>
          <button
            @click="clearTheme"
            class="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-sm"
          >
            🗑️
          </button>
        </div>


        <div class="flex gap-3">
          <a
            href="https://github.com/Coconut-Aero/cn-mental-checklist"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 flex-1 px-4 py-2 rounded-lg 
                 shadow transition text-sm font-medium text-center"
            :style="{
              backgroundColor: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              color: 'var(--primary-text-color)'
            }"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.11.82-.258.82-.577
                0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756
                -1.09-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997
                .108-.776.418-1.305.76-1.604-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22
                -.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404
                1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23 .655 1.653.243 2.874.12 3.176
                .77.84 1.234 1.91 1.234 3.22 0 4.61-2.803 5.624-5.475 5.922.43.37.814 1.102.814 2.222
                0 1.606-.015 2.896-.015 3.286 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12
                24 5.373 18.627 0 12 0z"
              />
            </svg>
            仓库
          </a>

          <a
            href="https://github.com/Coconut-Aero/cn-mental-checklist/issues"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 flex-1 px-4 py-2 rounded-lg 
                 shadow transition text-sm font-medium text-center"
            :style="{
              backgroundColor: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              color: 'var(--primary-text-color)'
            }"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.11.82-.258.82-.577
                0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756
                -1.09-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997
                .108-.776.418-1.305.76-1.604-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22
                -.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404
                1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23 .655 1.653.243 2.874.12 3.176
                .77.84 1.234 1.91 1.234 3.22 0 4.61-2.803 5.624-5.475 5.922.43.37.814 1.102.814 2.222
                0 1.606-.015 2.896-.015 3.286 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12
                24 5.373 18.627 0 12 0z"
              />
            </svg>
            Issue
          </a>
        </div>

        <div>
            <img src="https://img.shields.io/github/last-commit/Coconut-Aero/cn-mental-checklist?color=green&logo=github&style=for-the-badge" alt="Last Commit" class="h-5 inline" />
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <p>当前版本 {{ version }} </p>
        </div>
      </div>
    </div>
  </transition>


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
        构建 ｜ 当前版本 {{ version }} 
        <br />
        <a href="https://icp.gov.moe/?keyword=20250702"> 萌ICP备20250702号 </a>

      </footer>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed, watchEffect } from 'vue'

const version = 'v0.2'

const isMenuOpen = ref(false)


const themes = [
  { name: '蓝色', color: '#3b82f6' },
  { name: '红色', color: '#ef4444' },
  { name: '粉色', color: '#ec4899' },
  { name: '紫色', color: '#8b5cf6' },
  { name: '绿色', color: '#22c55e' },
]

const setTheme = (color) => {
  console.log('设置主题色:', color)
  document.documentElement.style.setProperty('--primary-color', color)
  document.documentElement.style.setProperty('--primary-text-color', '#ffffff')
}

const clearTheme = () => {
  console.log('清除主题色')
  // 移除 primary-color，或者设回默认色
  document.documentElement.style.removeProperty('--primary-color')
  document.documentElement.style.removeProperty('--primary-text-color')
}

const badgeKey = ref(0)

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

[data-theme='light'] {
  --primary-color: #f0f0f0;
  --primary-text-color: #4b5563;
}

[data-theme='dark']{
  --primary-color: #111827;
  --primary-text-color: #f0f0f0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
