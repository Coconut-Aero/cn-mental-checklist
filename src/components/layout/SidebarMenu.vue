<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-40 z-40"
      @click.self="emit('close')"
    >
      <div class="fixed top-16 right-2 w-90 p-4 rounded-xl shadow-lg border 
         bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
         transition-all z-50 space-y-4">
        <h2 class="text-lg font-bold">🌸 菜单</h2>

        <!-- 电脑端滑块 -->
        <div class="flex justify-center items-center">
          <label class="flex items-center cursor-pointer select-none">
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

        <div class="flex gap-3">
          <a
            href="https://github.com/Coconut-Aero/cn-mental-checklist"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 flex-1 px-4 py-2 rounded-lg 
                 shadow transition text-sm font-medium text-center bg-white dark:bg-gray-700 border 
                      hover:bg-blue-50 dark:hover:bg-gray-600"
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
                 shadow transition text-sm font-medium text-center bg-white dark:bg-gray-700 border 
                      hover:bg-blue-50 dark:hover:bg-gray-600"
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
        <div class="flex justify-center items-center">
          <div>
              <img src="https://img.shields.io/github/last-commit/Coconut-Aero/cn-mental-checklist?color=green&logo=github&style=for-the-badge" alt="Last Commit" class="h-5 inline" />
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            <p>当前版本 {{ version }} </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useDark } from '@vueuse/core'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  version: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])
const isDark = useDark()
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
