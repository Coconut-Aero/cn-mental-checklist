# Implementation Plan

## 1. File-Level Changes

- **Type**: Move
- **From**: `src/components/ces_d.vue`
- **To**: `src/evaluators/ces_d.js`
- **Description**: Extract pure scoring logic into JS module.
- **Reason**: Fix architectural anti-pattern (UI/business logic coupling).

- **Type**: Move
- **From**: `src/components/epq_85.vue`, `src/components/epq_88.vue`, `src/components/gad_7.vue`, `src/components/pcl_5.vue`, `src/components/phq_9.vue`, `src/components/scl_90.vue`
- **To**: `src/evaluators/*.js` (corresponding filenames)
- **Description**: Repackage all remaining psychological evaluators as pure JavaScript modules.
- **Reason**: Fix architectural anti-pattern and remove Vue SFC compiler overhead for logic scripts.

- **Type**: Modify
- **File Path**: `src/views/TestPage.vue`
- **Description**: Change `import('../components/${versionId}.vue')` to pull from `../evaluators/`. Add loading and error boundaries for `fetch()`. Extract UI code to smaller components.
- **Reason**: Avoid silent failures, improve resilience, and break down monolithic file structure.

- **Type**: Modify
- **File Path**: `src/App.vue`
- **Description**: Replace imperative `localStorage` dark mode logic with `@vueuse/core` natively. Remove bloated sidebar, header, and footer HTML.
- **Reason**: Enhance state management reactivity; break down monolithic components.

- **Type**: Create
- **File Path**: `src/composables/useTestSchema.js`
- **Description**: A wrapper for the native `fetch` capable of tracking `isLoading` and `isError`.
- **Reason**: Handle data lifecycles gracefully without silent failures.

- **Type**: Create
- **File Path**: `src/components/layout/Header.vue`, `src/components/layout/SidebarMenu.vue`, `src/components/layout/GlobalFooter.vue`
- **Description**: Extracted presentation layers previously hosted globally in `App.vue`.
- **Reason**: Break down monolithic components.

- **Type**: Create
- **File Path**: `src/components/test/ProgressBar.vue`, `src/components/test/QuestionDisplay.vue`, `src/components/test/TestIntro.vue`
- **Description**: Extracted independent presentation features of the testing phase previously hosted natively in `TestPage.vue`.
- **Reason**: Break down monolithic components and clarify data props.

---

## 2. New File Definitions

### `src/evaluators/*.js`
- **Responsibility**: Perform mathematical calculations relying on user choices against predefined weights/rulesets.
- **Key Exports**: `export function evaluate(answers: number[])` returning an array of results `[{ title, result, full_mark, status, caption }]`.

### `src/composables/useTestSchema.js`
- **Responsibility**: Fetching the target `json/${versionId}.json`, storing it, and handling API lifecycle conditions.
- **Key Interfaces**: 
  - `const data = ref(null)`
  - `const isLoading = ref(true)`
  - `const isError = ref(null)`
  - `const fetchSchema = async (versionId) => void`
- **Key Exports**: `{ data, isLoading, isError, fetchSchema }`

### `src/components/test/QuestionDisplay.vue`
- **Responsibility**: Renders a single testing question image, text, and answer buttons. Emits the user's choice to the parent.
- **Key Interfaces**: 
  - Props: `question` (Object), `likertLabels` (Array), `buttonPressCount` (Number), `totalQuestions` (Number).
  - Emits: `@answer="handleAnswer"`

### `src/components/test/ProgressBar.vue`
- **Responsibility**: Renders purely the visual completion state of the user.
- **Key Interfaces**: 
  - Props: `currentIndex` (Number), `totalQuestions` (Number).

---

## 3. Refactoring Steps (Ordered)

- **Step 1: Script Repackaging & Import Patch**
  - **Action**: Rename all `<script>` payloads in `src/components/*.vue` evaluating tests into their respective `src/evaluators/*.js` homes.
  - **Action**: In `TestPage.vue`, alter `await import('../components/${versionId}.vue')` to `await import('../evaluators/${versionId}.js')`.
  - **Goal**: Isolate business logic with zero visual or state breakage.

- **Step 2: Theme State Overhaul (`useDark`)**
  - **Action**: In `App.vue`, remove `.classList.toggle` and manual local storage variables. Replace with `const isDark = useDark()` and `const toggleDark = useToggle(isDark)`.
  - **Goal**: Maintain visual parity of current color schemes using standard responsive libraries.

- **Step 3: App Layout Decomposition**
  - **Action**: Slice template chunk from `App.vue` for Header and Sidebar into `layout/SidebarMenu.vue` and `layout/Header.vue`. Pass down `isDark` and `toggleDark` as props or rely on the global `@vueuse/core` hook naturally across components. Move Footer chunk into `layout/GlobalFooter.vue`.
  - **Goal**: Simplify `App.vue` to mostly layout shells `<SidebarMenu />`, `<router-view />`, `<GlobalFooter />`.

- **Step 4: Composable Scaffolding & Error UX**
  - **Action**: Create `src/composables/useTestSchema.js` containing robust `try-catch` structures. 
  - **Action**: Import module directly into `TestPage.vue`, overriding raw HTTP hooks and leveraging `v-if="isLoading"` to show a placeholder div and `v-if="isError"` to flash a friendly offline banner.
  - **Goal**: Stop users from crashing onto blank pages without contexts if connection drops.

- **Step 5: Test UI Decomposition**
  - **Action**: Slice `TestPage.vue` into atomic blocks (`TestIntro`, `QuestionDisplay`, `ProgressBar`). Reconnect child properties. Ensure `TestPage.vue` solely handles router navigation logic, orchestrating state down. Replace invisible "previous button" trick with solid flex-box (`justify-between`).

- **Step 6: Unit Test Installation**
  - **Action**: Add `vitest` configuration. Outline a simple `.test.js` specification checking boundaries for one basic evaluator explicitly to establish ground truth structure.

---

## 4. Code Migration Details

### Architectural Move (Evaluating Scripts)
**BEFORE (`src/components/ces_d.vue`)**:
```vue
<script>
export function evaluate(answers) {
    // Logic
}
</script>
```

**AFTER (`src/evaluators/ces_d.js`)**:
```javascript
export function evaluate(answers) {
    // Logic isolated completely from vue execution blocks
}
```

### Route Resolving Updates (TestPage.vue)
**BEFORE (`src/views/TestPage.vue`)**:
```javascript
const module = await import(`../components/${versionId}.vue`)
evaluate.value = module.evaluate
```

**AFTER (`src/views/TestPage.vue`)**:
```javascript
const module = await import(`../evaluators/${versionId}.js`)
evaluate.value = module.evaluate
```

### Application State & Reactivity
**BEFORE (`src/App.vue`)**:
```javascript
const isDark = ref(false)
onMounted(() => {
  const saved = localStorage.getItem('darkMode')
  isDark.value = saved !== null ? saved === 'true' : window.matchMedia('(prefers...
  document.documentElement.classList.toggle('dark', isDark.value)
})
```

**AFTER (`src/App.vue` / any split components)**:
```javascript
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark() 
const toggleDark = useToggle(isDark)
// Binds universally across components, no manual DOM sync required.
```

---

## 5. Risk & Compatibility Notes

- **Vite Dynamic Import Breaching**: Changing `import()` paths might break Vite's chunk generator if paths misalign with standard URL specifications. **Testing Needed**: Build output verification via `npm run build` is required immediately following Step 1.
- **VueUse Collision Risks**: `useDark()` operates by adding `dark` explicitly to the `<html class="...">` base class. Manual overrides existing within App.vue css variables need parity checks in Step 2 to ensure Tailwind captures them efficiently.
- **State Prop Drilling Risks**: Step 5's test UI decomposition splits major variables (`currentIndex`, `answers`) off the parent `TestPage`. Heavy vigilance on emitting correct reactive parameters back to the parent component is required to not introduce data freezing into the tests.
- **Regression Target**: Specifically test navigating between `ces_d` and `gad_7` variations using browser navigation history hooks, confirming evaluating paths bind actively to dynamically replaced script addresses without crashing or utilizing legacy DOM trees.
