# Project Polishing Plan: cn-mental-checklist

## 1. Overview
The `cn-mental-checklist` project is a Vue 3 and Vite-based web application providing psychological and mental health assessments. It utilizes a dynamic data-driven architecture, pulling questions from JSON files and executing calculation logic via dynamically imported modules. While the core functionality is robust, the codebase has architectural leaks, monolithic views, and lacks UX safeguards for non-ideal conditions (like network errors). 

## 2. Key Issues Identified
- **Architectural Anti-Pattern:** Pure scoring algorithms (like `ces_d.vue`, `epq_85.vue`) are improperly stored within `.vue` Single File Components instead of pure Javascript/Typescript utility scripts.
- **Monolithic Code Formats:** Primary views (`App.vue` and `TestPage.vue`) contain rigid, bloated templates holding global layouts, sidebars, progress bars, and logic within the same file.
- **Reinventing the Wheel:** Native browser APIs (`window.matchMedia`, `localStorage`) are used imperatively to handle Dark Mode, ignoring the declarative power of the installed `@vueuse/core` library.
- **Silent Failures:** The application uses simple `try...catch` wrapping around fetch requests for the JSON payload and dynamically loaded modules without displaying any Error or Skeleton/Loading UI to the user when it fails or delays.
- **Testing Void:** Essential mathematical and clinical logic to calculate a user's psychological well-being lacks protective unit tests.

## 3. Improvement Plan

### 3.1. Fix Architectural Anti-Patterns
- **Problem:** Files evaluating clinical outcomes are `.vue` components (e.g. `src/components/ces_d.vue`) rather than raw scripts, injecting Vue SFC compiler overhead for 0 UI output.
- **Proposed Solution:** Migrate all logic files into a dedicated `src/evaluators/` or `src/utils/scoring/` folder as pristine `.js` files. Update `TestPage.vue` dynamically to fetch these standard script files.
- **Expected Impact:** Improves separation of concerns (UI vs Business Logic), removes Vite/Vue compilation overhead for those files, and significantly boosts testability.
- **Priority:** High

### 3.2. Break Down Monolithic Components
- **Problem:** `App.vue` stores the complete navigation schema, theme toggle, footer, and router-view. `TestPage.vue` spans nearly 400 lines controlling test intros, question cards, constraints, and transition lifecycles.
- **Proposed Solution:** 
  - Extract reusable `.vue` chunks: Create `Header.vue`, `SidebarMenu.vue`, `GlobalFooter.vue` for `App.vue`.
  - Create `QuestionDisplay.vue`, `ProgressBar.vue`, and `TestIntro.vue` for `TestPage.vue`.
- **Expected Impact:** Minimizes cognitive overload, fosters component reuse, and streamlines future scale-ups.
- **Priority:** High

### 3.3. Enhance State Management and Reactivity
- **Problem:** Dark mode and persistent theme switching are managed by manual DOM manipulations (`document.documentElement.classList.toggle`).
- **Proposed Solution:** Utilize VueUse's `useDark()` and `useToggle()` since `@vueuse/core` operates natively within Vue's reactive ecosystem and is already installed in `package.json`.
- **Expected Impact:** Decreases bugs regarding UI desynchronization and cleans up the script portion in `App.vue`.
- **Priority:** Medium

### 3.4. Handle Data Lifecycles and UX Deficits
- **Problem:** Layout structures rely on hacky workarounds (e.g., relying on invisible "return" buttons just to balance standard CSS flex alignments in `TestPage.vue`) and APIs will silently crash on the frontend if `fetch()` fails.
- **Proposed Solution:** 
  - Refactor data fetching mechanisms to wrap them in an `isLoading` and `error` reactive state. Show a skeleton UI during `isLoading` and a friendly prompt during `error`.
  - Implement optimal `justify-between` and nested flex-box CSS logic rather than invisible DOM nodes.
- **Expected Impact:** App feels dramatically more premium, polished, resilient, and user-centric. 
- **Priority:** Medium

### 3.5. Introduce Safety with Testing
- **Problem:** Given that this app acts as a diagnostic/checklist screener, faulty scoring logic is heavily detrimental and untested.
- **Proposed Solution:** Add `vitest` into the repository and construct unit tests testing boundary bounds, inverse questions, and thresholds specifically on the evaluators.
- **Expected Impact:** Guaranteed security against regressions on the most critical facet of the app.
- **Priority:** Medium

## 4. Suggested Roadmap

- **Step 1: Code Decoupling (Architecture Base)**
  - Move logic `.vue` inside `src/components/` into `src/evaluators/*.js`.
  - Adapt dynamic imports inside `TestPage.vue` to `.js` paths.
- **Step 2: Micro-Component Breakdown**
  - Break `App.vue` into structural shell views (`MainLayout`, `Navigation`, `Footer`).
  - Extract sub-components belonging exclusively to the test runner (`TestPage`).
- **Step 3: State & Reactivity Modernization**
  - Refactor theming usage in `App.vue` replacing vanilla JS queries with `@vueuse/core`.
  - Delete structural ghost elements (invisible buttons padding out rows) through better atomic Tailwind classes.
- **Step 4: Error Scaffolding**
  - Implement a `useTestSchema` standard composable function handling `data`, `pending`, and `error` states to wrap `fetch()`.
  - Link UI Loading/Error cards to the new states.
- **Step 5: Testing & QA**
  - Install `vitest`.
  - Write test specs mapping out evaluation branches for tests like `phq_9.js`, `gad_7.js`, etc.
