<template>
  <div class="flex-grow flex flex-col px-4 sm:px-6 lg:px-12 py-10 sm:py-12">
    <main class="flex-grow flex flex-col items-center">
      <h1 class="text-3xl sm:text-5xl font-extrabold mb-4 text-center text-gray-900 dark:text-white drop-shadow">
        CN_Mental_Checklist
      </h1>
      <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 text-center max-w-2xl italic">
        一个简单的心理测试系统，帮助你了解自己的心理状态。
      </p>

      <!-- 卡片区域 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl">
        <router-link
          v-for="version in versions"
          :key="version.name"
          :to="`/test/${version.id}`"
          class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-2xl hover:scale-[1.02] hover:border-indigo-400 transition duration-300 cursor-pointer flex flex-col"
        >
        <div class="text-2xl sm:text-3xl mb-3">
            <!-- 如果是图片，则显示图片 -->
            <img v-if="version.icon.startsWith('http')" :src="version.icon" alt="Flag" class="w-8 h-8 sm:w-10 sm:h-10" />
            <!-- 否则显示emoji -->
            <span v-else>{{ version.icon }}</span>
          </div>
          <h2 class="text-lg sm:text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{{ version.name }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-300 flex-grow">{{ version.desc }}</p>
        </router-link>
      </div>
    </main>
  </div>
</template>


<script setup>
const versions = [
  { id: 'scl_90', name: 'SCL-90 测试', icon: '🧠', desc: 'SCL-90 症状自评表' },

]
</script>
