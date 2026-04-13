<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
    <div class="flex flex-col items-center">
      <img
        v-if="question?.image"
        :src="question.image"
        alt="question"
        :class="[
          'rounded-xl shadow object-cover',
          question.image_type === 'vertical'
            ? 'h-96 w-auto max-w-full mx-auto'
            : 'w-full max-h-64'
        ]"
      />
      <p class="text-xl mt-4 font-semibold text-center block-width">{{ question?.text }}</p>

      <p
        class="text-sm text-gray-400 dark:text-gray-500 mt-1 break-word"
        v-if="question?.comment"
      >
        {{ question?.comment }}
      </p>
    </div>
    
    <div class="flex flex-col gap-2" v-if ="!question?.special_choices">
      <button
        v-for="(label, index) in likertLabels"
        :key="index"
        :disabled="buttonPressCount >= totalQuestions"
        @click="emit('answer', index)"
        class="py-2 px-4 sm:px-6 md:px-8 rounded-xl bg-white dark:bg-gray-700 border hover:bg-blue-50 dark:hover:bg-gray-600 transition text-sm sm:text-base md:text-lg shadow active:scale-95"
      >
        {{ label }}
      </button>
    </div>
    <div class="flex flex-col gap-2" v-else>
      <button
        v-for="(choice, index) in question?.special_choices"
        :key="index"
        @click="emit('answer', index)"
        :disabled="buttonPressCount >= totalQuestions"
        class="py-2 px-4 sm:px-6 md:px-8 rounded-xl bg-white dark:bg-gray-700 border hover:bg-blue-50 dark:hover:bg-gray-600 transition text-sm sm:text-base md:text-lg shadow active:scale-95"
      >
        {{ choice.text }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: { type: Object, required: true },
  likertLabels: { type: Array, required: true },
  buttonPressCount: { type: Number, required: true },
  totalQuestions: { type: Number, required: true }
})
const emit = defineEmits(['answer'])
</script>

<style scoped>
.break-word { word-wrap: break-word; overflow-wrap: break-word; }
.block-width { display: block; width: 100%; }
</style>
