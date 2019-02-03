import VueRouter from 'vue-router'

import App from './App.vue'
import NavContainer from './component/nav/NavContainer.vue'
import LoginContainer from './component/login/LoginContainer.vue'
import ContributeContainer from './component/contribute/ContributeContainer.vue'
import CommentsContainer from './component/comments/CommentsContainer.vue'
import ArticleContainer from './component/article/ArticleContainer.vue'
import ImagesContainer from './component/images/ImagesContainer.vue'


 

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path: '/', component: ContributeContainer},
    {path: '/login', component: LoginContainer},
    {path: '/contribute', component: ContributeContainer},
    {path: '/comments', component: CommentsContainer},
    {path: '/images', component: ImagesContainer},
    {path: '/article/:id', component: ArticleContainer, name: 'article'},
   

  ]
})

// 把路由对象暴露出去
export default router