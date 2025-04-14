<template>
  <div class="flex flex-col flex-grow px-4 sm:px-6 lg:px-12 py-10 sm:py-12">
    <main class="flex-grow flex flex-col items-center">
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

        <p v-if="version?.questions_header && started && currentQuestion" 
          class="text-xl font-semibold text-center flex-1 hidden sm:block">
          {{ version?.questions_header }}
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

      <!-- 动画过渡：内容区域 -->
      <Transition name="fade-slide" mode="out-in">
        <!-- 测试说明 -->
        <div v-if="!started" key="intro" class="max-w-2xl mt-12 text-center">
          <h1 class="text-3xl font-bold mb-4">{{ version?.title_name || '未知测试' }}</h1>
          <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-prose break-words mx-auto">
            {{ version?.desc || '无描述' }}
            <a v-if="version?.refer_url" :href="version?.refer_url" target="_blank" class="text-blue-500 hover:underline">这个链接</a>
          </p>
            
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow text-left text-sm space-y-3 text-gray-700 dark:text-gray-200">
            <p>你将会看到一系列问题。请根据你的实际情况回答这些问题</p>
            <p><b>提示：</b>请跟随第一直觉作答。</p>
            <p> <b>声明：</b>本项目依靠前端实现，代码完全开源，不会收集和保存任何数据。</p>
            <p v-if="version?.warning" class="text-red-400">
              <b> {{ version?.warning }} </b>
            </p>
            <p v-if="version?.note" class="text-gray-500">
              <b> {{ version?.note }} </b>
            </p>
            
          </div>
          <button
            @click="startTest"
            class="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition active:scale-95"
          >
            开始测试
          </button>
        </div>

        <!-- 答题界面 -->
        <div v-else-if="currentQuestion" key="question" class="w-full max-w-5xl mt-6">
          <p v-if="version?.questions_header" 
            class="text-xl font-semibold text-center flex-1 block sm:hidden">
            {{ version?.questions_header }}
          </p>
          <!-- 进度条 -->
          <div class="mb-6">
            <div class="flex justify-between text-sm text-gray-500 mb-1">
              <span>第 {{ currentIndex + 1 }} / {{ totalQuestions }} 题</span>
              <span>{{ Math.round((currentIndex / totalQuestions) * 100) }}%</span>
            </div>
            <div class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div
                class="h-full bg-blue-500 transition-all duration-500"
                :style="{ width: (currentIndex / totalQuestions * 100) + '%' }"
              ></div>
            </div>

            

          </div>

          <!-- 返回上一题 -->
          <div class="mt-4 mb-6">
            
            <!-- 真实按钮 -->
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

            <!-- 占位符按钮 -->
            <button
              v-if="currentIndex == 0"
              class="py-2 px-4 rounded-xl 
                    bg-white dark:bg-gray-700 border 
                    text-sm shadow invisible"
            >
                返回上一题
            </button>
          
          </div>

          <!-- 题目 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div class="flex flex-col items-center">
              <img
                v-if="currentQuestion.image"
                :src="currentQuestion.image"
                alt="question"
                :class="[
                  'rounded-xl shadow object-cover',
                  currentQuestion.image_type === 'vertical'
                    ? 'h-96 w-auto max-w-full mx-auto'
                    : 'w-full max-h-64'
                ]"
              />
              <p class="text-xl mt-4 font-semibold text-center block-width">{{ currentQuestion.text }}</p>


              <p
                class="text-sm text-gray-400 dark:text-gray-500 mt-1 break-word"
                v-if="currentQuestion.comment"
              >
                {{ currentQuestion.comment }}
              </p>

            </div>
            <div class="flex flex-col gap-2" v-if ="!currentQuestion.special_choices">
              <button
                v-for="(label, index) in likertLabels"
                :key="index"
                :disabled="buttonPressCount >= totalQuestions"
                @click="answer(index)"
                class="py-2 px-4 sm:px-6 md:px-8 rounded-xl bg-white dark:bg-gray-700 border hover:bg-blue-50 dark:hover:bg-gray-600 transition text-sm sm:text-base md:text-lg shadow active:scale-95"
              >
                {{ label }}
              </button>
            </div>
            <div class="flex flex-col gap-2" v-else>
              <button
                v-for="(choice, index) in currentQuestion.special_choices"
                :key="index"
                @click="answer(index)"
                :disabled="buttonPressCount >= totalQuestions"
                class="py-2 px-4 sm:px-6 md:px-8 rounded-xl bg-white dark:bg-gray-700 border hover:bg-blue-50 dark:hover:bg-gray-600 transition text-sm sm:text-base md:text-lg shadow active:scale-95"
              >
                {{ choice.text }}
              </button>
            </div>

          </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const versionId = route.params.versionId

const versionData = ref(null)
const version = ref(null)

const started = ref(false)
const currentIndex = ref(0)
const answers = ref([])
const buttonPressCount = ref(0)

const totalQuestions = ref(0)
const shuffledQuestions = ref([])
const likertLabels = ref([])

const evaluate = ref(null)

onMounted(async () => {
  try {
    // ✅ 动态导入测试模块（路径基于 GitHub Pages）
    const module = await import(`../components/${versionId}.vue`)
    evaluate.value = module.evaluate
  } catch (err) {
    console.error("无法导入测试模块", err)
  }

  try {
    // ✅ 修改：构建相对路径，兼容 GitHub Pages 的子路径部署
    const jsonPath = `${import.meta.env.BASE_URL}json/${versionId}.json`
    const response = await fetch(jsonPath)
    const data = await response.json()

    versionData.value = data
    version.value = data

    shuffledQuestions.value = data.questions
    totalQuestions.value = data.questions.length
    likertLabels.value = data.choices.map(choice => choice.text)
  } catch (error) {
    console.error("Error loading JSON file:", error)
  }
})

const currentQuestion = computed(() => shuffledQuestions.value[currentIndex.value])

const startTest = () => {
  started.value = true
  currentIndex.value = 0
}

const answer = (userChoice) => {
  // 如果计数器未达到 totalQuestions，则允许操作
  if (buttonPressCount.value < totalQuestions.value) {
    answers.value.push(userChoice)
    currentIndex.value++
    buttonPressCount.value++ // 更新计数器
  }
}

const previousQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    answers.value.pop()
  }
}

const restartTest = () => {
  started.value = false
  currentIndex.value = 0
  answers.value = []
  buttonPressCount.value = 0 // 重置计数器
}

const navigateToResults = () => {
  if (!evaluate.value) {
    console.error("评估函数未加载")
    return
  }

  const result = evaluate.value(answers.value)

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

.break-word {
  word-wrap: break-word; /* 强制长单词或网址换行 */
  overflow-wrap: break-word; /* 确保长单词不溢出容器 */
}

.block-width {
  display: block;
  width: 100%;
}

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

/* 你可以放在组件 <style> 块中，建议加上 scoped */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


</style>
