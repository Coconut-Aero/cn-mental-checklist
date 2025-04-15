<h1 align="center"> CN_Mental_Checklist 心理量表测试平台 </h1>

<p align="center">
  <!-- License -->
  <img src="https://img.shields.io/github/license/Coconut-Aero/cn-mental-checklist?style=for-the-badge&logo=github" alt="License" height="30px">
  
  <!-- 技术栈 -->
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge" alt="Vite" height="30px">
  <img src="https://img.shields.io/badge/Vue-3.x-42b883?logo=vue.js&style=for-the-badge&logoColor=white" alt="Vue 3" height="30px">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" height="30px">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" height="30px">


  <!-- 项目信息 -->
  <img src="https://img.shields.io/github/last-commit/Coconut-Aero/cn-mental-checklist?style=for-the-badge" alt="Last Commit" height="30px">
  <img src="https://img.shields.io/badge/Deployed-GitHub%20Pages-blue?style=for-the-badge&logo=github" alt="GitHub Pages" height="30px">

  <img src="https://forthebadge.com/images/badges/built-with-love.svg" alt="Built with love" height="30px">
</p>


一个面向公众的心理自评工具集合，包含常见的心理量表测试（如 SCL-90、MBTI 等），目标是提供简洁、可用、持续扩展的量表测试体验。

> 🔗 在线访问地址（部署中）：[https://coconut-aero.github.io/cn-mental-checklist/](https://coconut-aero.github.io/cn-mental-checklist/)

---


## ✅ 当前已实现功能

- ✅ SCL-90 综合症状自评量表（Symptom Checklist-90）
- ✅ PHQ-9 患者健康问卷（Patient Health Questionnaire）
- ✅ GAD-7 广泛性焦虑症量表（General Anxiety Disorder）
- ✅ EPQ-88 艾森克人格问卷 龚耀先版本 （Eysenck Personality Questionnaire）
- ✅ EPQ-85 艾森克人格问卷 陈仲庚版本 （Eysenck Personality Questionnaire）

---

## 🚧 计划功能

- 🔜 MBTI 性格类型测试
- 🔜 更多心理学量表
- 🔜 测评结果导出与分析
- 🔜 响应式移动端优化

---

## 🧪 本地部署指南

确保已安装 [Node.js](https://nodejs.org/) 和 [Git](https://git-scm.com/)。

### 📥 1. 克隆项目

```bash
git clone https://github.com/Coconut-Aero/cn-mental-checklist.git
cd cn-mental-checklist
```

### 📦 2. 安装依赖

```bash
npm install
```

### 🚀 3. 启动开发服务器

```bash
npm run dev
```

启动后访问：http://localhost:5173（默认端口）

---

## 📦 项目构建与部署

### 🔨 生产构建

```bash
npm run build
```

### 🌐 预览构建结果

```bash
npm run preview
```

### 🛠️ 技术栈

- ⚡ [Vite](https://vitejs.dev/)
- 🖼️ [Vue 3](https://vuejs.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🚀 GitHub Pages 自动部署（GitHub Actions）

---

## 🔈 安全声明

本项目完全由前端实现，不存储任何用户信息。


⚠️ **本项目测试的任何内容仅供娱乐和参考，不能代替专业医生或心理健康学者的意见。如有任何异常症状，请务必及时咨询心理咨询师，必要时寻求医生的帮助。**

---

## 🙌 贡献与支持

欢迎 Issue、PR、建议或扩展量表加入！

如你希望贡献新量表，请在 `/public/json/` 下添加量表定义 JSON，在`/src/components/`完成计算逻辑，并在页面逻辑中引用即可。

---

## 📄 许可

本项目遵循 [GPL v3 协议](https://github.com/Coconut-Aero/cn-mental-checklist/blob/main/LICENSE) 开源。


