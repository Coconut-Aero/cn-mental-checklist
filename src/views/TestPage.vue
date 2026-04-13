<template>
  <div class="flex flex-col flex-grow px-4 sm:px-6 lg:px-12 py-10 sm:py-12">
    <main class="flex-grow flex flex-col items-center w-full">
      <!-- 顶部操作栏 -->
      <div class="w-full max-w-5xl mt-6 flex justify-between items-center">
        <!-- 返回首页 -->
        <router-link
          to="/"
          class="inline-flex items-center px-4 py-2 text-sm rounded-xl 
                bg-white border border-gray-300 text-gray-800 shadow 
                hover:bg-gray-50 transition
                dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 
                dark:hover:bg-gray-700 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </router-link>

        <p v-if="versionData?.questions_header && started && currentQuestion" 
          class="text-xl font-semibold text-center flex-1 hidden sm:block">
          {{ versionData?.questions_header }}
        </p>

        <!-- 重新开始按钮 -->
        <div v-if="started && currentIndex > 0">
          <button
            @click="restartTest"
            class="inline-flex items-center px-4 py-2 text-sm rounded-xl 
                    bg-white border border-gray-300 text-gray-800 shadow 
                    hover:bg-gray-50 transition
                    dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 
                    dark:hover:bg-gray-700 active:scale-95"
          >
            重新开始测试
          </button>
        </div>
        <div v-else class="invisible">
          <button
            class="inline-flex items-center px-4 py-2 text-sm rounded-xl 
                    bg-white border border-gray-300 text-gray-800 shadow
                    dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          >
            重新开始测试
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="mt-20 text-center text-gray-500">
        正在加载测试资源，请稍候...
      </div>
      <div v-else-if="isError" class="mt-20 text-center text-red-500">
        加载失败，请检查网络连接或稍后重试。
      </div>

      <!-- 动画过渡：内容区域 -->
      <Transition v-else name="fade-slide" mode="out-in">
        <!-- 测试说明 -->
        <TestIntro 
          v-if="!started" 
          key="intro" 
          :version="versionData" 
          @start="startTest" 
        />

        <!-- 答题界面 -->
        <div v-else-if="currentQuestion" key="question" class="w-full max-w-5xl mt-6">
          <p v-if="versionData?.questions_header" 
            class="text-xl font-semibold text-center flex-1 block sm:hidden mb-4">
            {{ versionData?.questions_header }}
          </p>

          <ProgressBar 
            :currentIndex="currentIndex" 
            :totalQuestions="totalQuestions" 
          />

          <!-- 返回上一题 -->
          <div class="mt-4 mb-6 min-h-[40px] flex justify-start">
            <transition name="fade">
              <button
                v-if="currentIndex > 0"
                @click="previousQuestion"
                class="py-2 px-4 rounded-xl 
                      bg-white dark:bg-gray-700 border 
                      hover:bg-blue-50 dark:hover:bg-gray-600 transition 
                      text-sm shadow active:scale-95"
              >
                返回上一题
              </button>
            </transition>
          </div>

          <QuestionDisplay 
            :question="currentQuestion"
            :likertLabels="likertLabels"
            :buttonPressCount="buttonPressCount"
            :totalQuestions="totalQuestions"
            @answer="answer"
          />
        </div>

        <!-- 结果页 -->
        <div v-else key="done" class="mt-20 text-center text-xl text-green-600">
          🎉 你已完成所有题目，点击下方按钮即可查看测试结果
          <div class="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              @click="navigateToResults"
              class="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition active:scale-95"
            >
              查看结果
            </button>
            <button
              @click="restartTest"
              class="px-6 py-2 bg-gray-200 text-gray-800 rounded-xl shadow hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 active:scale-95"
            >
              重新开始测试
            </button>
          </div>
        </div>
      </Transition>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTestSchema } from '../composables/useTestSchema'
import ProgressBar from '../components/test/ProgressBar.vue'
import TestIntro from '../components/test/TestIntro.vue'
import QuestionDisplay from '../components/test/QuestionDisplay.vue'

const route = useRoute()
const router = useRouter()
const versionId = route.params.versionId

const { data: versionData, isLoading, isError, fetchSchema } = useTestSchema()

const started = ref(false)
const currentIndex = ref(0)
const answers = ref([])
const buttonPressCount = ref(0)
const evaluateFn = ref(null)

onMounted(async () => {
  await fetchSchema(versionId)
  try {
    const module = await import(`../evaluators/${versionId}.js`)
    evaluateFn.value = module.evaluate
  } catch (err) {
    console.error("无法导入测试模块", err)
  }
})

const shuffledQuestions = computed(() => versionData.value?.questions || [])
const totalQuestions = computed(() => shuffledQuestions.value.length)
const likertLabels = computed(() => versionData.value?.choices?.map(c => c.text) || [])
const currentQuestion = computed(() => shuffledQuestions.value[currentIndex.value])

const startTest = () => {
  started.value = true
  currentIndex.value = 0
}

const answer = (userChoice) => {
  if (buttonPressCount.value < totalQuestions.value) {
    answers.value.push(userChoice)
    currentIndex.value++
    buttonPressCount.value++
  }
}

const previousQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    buttonPressCount.value--
    answers.value.pop()
  }
}

const restartTest = () => {
  started.value = false
  currentIndex.value = 0
  answers.value = []
  buttonPressCount.value = 0
}

const navigateToResults = () => {
  if (!evaluateFn.value) {
    console.error("评估函数未加载")
    return
  }
  const result = evaluateFn.value(answers.value)
  router.push({
    name: 'result',
    params: { versionId },
    query: {
      result: encodeURIComponent(JSON.stringify(result))
    }
  })
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  @apply transition-opacity duration-500 ease-in-out;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  @apply opacity-0 translate-y-2;
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  @apply opacity-100 translate-y-0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
