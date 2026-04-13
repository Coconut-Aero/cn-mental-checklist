import { ref } from 'vue'

export function useTestSchema() {
  const data = ref(null)
  const isLoading = ref(true)
  const isError = ref(null)

  const fetchSchema = async (versionId) => {
    isLoading.value = true
    isError.value = null
    try {
      const jsonPath = `${import.meta.env.BASE_URL}json/${versionId}.json`
      const response = await fetch(jsonPath)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
    } catch (error) {
      console.error("Error loading JSON file:", error)
      isError.value = error
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, isError, fetchSchema }
}
