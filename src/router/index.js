import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TestPage from '../views/TestPage.vue'
import ResultPage from '../views/ResultPage.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/test/:versionId', component: TestPage },
  { 
    path: '/result/:versionId',  // 仅传递 versionId 作为路径参数
    name: 'result',  // 确保 name 为 "result"
    component: ResultPage,
    props: route => ({
      versionId: route.params.versionId,
      scoresData: route.query.scoresData,  // 获取查询参数 scoresData
      full_mark: route.query.full_mark // 获取查询参数 full_mark
    })
  },
];

export default createRouter({
  history: createWebHistory('/cn-mental-checklist/'),
  routes
})