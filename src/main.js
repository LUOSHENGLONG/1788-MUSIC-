// 入口文件
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueCropper from 'vue-cropper'
import VueCalendar from 'vue-calendar'
import vPage from 'v-page';
import {VTable,VPagination} from 'vue-easytable'

Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.component(VueCalendar)

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueCropper)
Vue.use(vPage);
Vue.use(VueCalendar);

// typeFormat
Vue.filter('typeFormat',(dataStr) => {
  if(dataStr === 'information') {
    return '资讯'
  }
  if(dataStr === 'synthesizer') {
    return '合成器'
  }
  if(dataStr === 'samplePack') {
    return '采样包'
  }
  if(dataStr === 'effects') {
    return '效果器'
  }
  if(dataStr === 'host') {
    return '宿主'
  }
  if(dataStr === 'tutorial') {
    return '教程'
  }
  return dataStr
})


//分页插件
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)




import App from './App.vue'

import './normalize.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'flat-ui/css/flat-ui.css'

import 'swiper/dist/css/swiper.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router.js'


const vm = new Vue({
  el: '#app',
  render: c => c(App),
  router
})