import VueRouter from 'vue-router'

import App from './App.vue'
import NavContainer from './component/nav/NavContainer.vue'
import LoginContainer from './component/login/LoginContainer.vue'
import ContributeContainer from './component/contribute/ContributeContainer.vue'
import ArticleContainer from './component/article/ArticleContainer.vue'




// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    // {path: '/', component: NavContainer},
    {path: '/login', component: LoginContainer},
    {path: '/contribute', component: ContributeContainer},
    {path: '/article/:id', component: ArticleContainer, name: 'article'},
   

  ]
})

// 把路由对象暴露出去
export default router