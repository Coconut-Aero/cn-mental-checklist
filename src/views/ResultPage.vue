<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const versionId = route.params.versionId as string;
const resultData = ref<Array<{ title: string; result: number; full_mark: number; status: string; }>>([]);

// 解析 scoresData 参数
try {
  const decoded = decodeURIComponent(route.query.result as string);
  resultData.value = JSON.parse(decoded);
} catch (error) {
  console.error("无法解析 result 参数：", error);
}

// 初始化 versionData
const versionData = ref(null);

onMounted(async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}json/${versionId}.json`);
  if (res.ok) {
    versionData.value = await res.json();
  } else {
    console.error('无法加载版本数据');
  }
});

const currentUrl = window.location.origin + `${import.meta.env.BASE_URL}`

const shareText = computed(() =>
  encodeURIComponent(`我刚完成了CN_Mental_Checklist 的 ${versionData.value?.title || ''} 测试！你也来试试看？`)
);

// Twitter、Telegram 分享链接
const twitterShareUrl = computed(() =>
  `https://twitter.com/intent/tweet?text=${shareText.value}${encodeURIComponent(currentUrl)}`
);

const telegramShareUrl = computed(() =>
  `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${shareText.value}`
);

const showToast = ref(false)
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl)
    showToast.value = true
    setTimeout(() => showToast.value = false, 1000)
  } catch (err) {
    alert('❌ 复制失败，请手动复制链接。')
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">
      测试结果：{{ versionData?.title_name }}
    </h1>

    <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-prose break-words mx-auto italic">
      {{ versionData?.desc || '无描述' }}
    </p>

    <!-- 返回首页按钮 -->
    <div class="w-full max-w-5xl mt-6 flex justify-between">
    <!-- 返回首页按钮 -->
    <router-link
      to="/"
      class="inline-flex items-center px-4 py-2 text-sm rounded-xl 
            bg-white border border-gray-300 text-gray-800 shadow 
            hover:bg-gray-50 transition dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 
            dark:hover:bg-gray-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      返回首页
    </router-link>

    <!-- 重新开始测试按钮 -->
    <router-link
      :to="`/test/${versionId}`"
      class="inline-flex items-center px-4 py-2 text-sm rounded-xl 
            bg-white border border-gray-300 text-gray-800 shadow 
            hover:bg-gray-50 transition dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 
            dark:hover:bg-gray-700"
    >
      重新开始测试
    </router-link>
  </div>

    <!-- 渲染结果 -->
    <div v-if="resultData.length > 0" class="mt-8">
      <div
        v-for="(item, index) in resultData"
        :key="index"
        class="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
      >
        <h2 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
          {{ item.title }}
        </h2>
        <div class="relative w-full h-6 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div
            class="absolute top-0 left-0 h-full transition-all duration-500"
            :style="{
              width: ((item.result / item.full_mark) * 100) + '%',
              background: 'linear-gradient(to right, #48c6ef, #6f86d6)',
              transform: 'translateX(0%)'
            }"
          ></div>
        </div>
        <p
          v-if="item.status"
          class="text-sm mt-2 text-gray-500 dark:text-gray-400"
        >
          得分：{{ item.result }} / {{ item.full_mark }}（{{ ((item.result / item.full_mark) * 100).toFixed(0) }}%），{{ item.status }}
        </p>
        <p
          v-else
          class="text-sm mt-2 text-gray-500 dark:text-gray-400"
        >
          得分：{{ item.result }} / {{ item.full_mark }}（{{ ((item.result / item.full_mark) * 100).toFixed(0) }}%）
        </p>
      </div>
    </div>
    <div v-else class="text-red-500">无法读取测试结果数据。</div>

    <!-- 分享区域 -->
    <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <!-- 复制链接按钮 -->
      <button
        @click="copyLink"
        class="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
      >
        📋 复制测试链接
      </button>

      <!-- Twitter 分享 -->
      <a
        :href="twitterShareUrl"
        target="_blank"
        class="px-4 py-2 bg-sky-500 text-white rounded-xl shadow hover:bg-sky-600 transition"
      >
        🐦 分享到 Twitter
      </a>

      <!-- Telegram 分享 -->
      <a
        :href="telegramShareUrl"
        target="_blank"
        class="px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
      >
        ✈️ 分享到 Telegram
      </a>
    </div>

    <Transition name="fade">
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg z-50 text-sm"
      >
        ✅ 已复制测试链接！
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
