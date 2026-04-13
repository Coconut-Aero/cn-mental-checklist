<template>
  <div>
    <Header @toggle-menu="isMenuOpen = !isMenuOpen" />

    <SidebarMenu 
      :isOpen="isMenuOpen" 
      :version="version" 
      @close="isMenuOpen = false" 
    />

    <!-- 页面容器 -->
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <main class="flex-grow">
        <router-view />
      </main>

      <GlobalFooter :version="version" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/layout/Header.vue'
import SidebarMenu from './components/layout/SidebarMenu.vue'
import GlobalFooter from './components/layout/GlobalFooter.vue'
import { useDark } from '@vueuse/core'

/**
 * useDark automatically toggles 'dark' class on <html> based on user preference and local storage.
 * It's imported here to ensure it binds to the app lifecycle globally if needed.
 */
useDark()

const version = 'v0.2.1'
const isMenuOpen = ref(false)
</script>

<style>
[data-theme='light'] {
  --primary-color: #f0f0f0;
  --primary-text-color: #4b5563;
}

[data-theme='dark']{
  --primary-color: #111827;
  --primary-text-color: #f0f0f0;
}
</style>
