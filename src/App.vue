<template>
  <div ref="all" class="all">
    <Nav v-if="isLogin"></Nav>
    <router-view v-if="isLogin"></router-view>

    <!-- <div class="container login-container">
        <div class="login">

          <div class="login-form">
            
            <div class="form-group">
              <input type="text" class="form-control login-field" value="" placeholder="Enter your name" id="login-name">
              <label class="login-field-icon fui-user" for="login-name"></label>
            </div>

            <div class="form-group">
              <input type="password" class="form-control login-field" value="" placeholder="Password" id="login-pass">
              <label class="login-field-icon fui-lock" for="login-pass"></label>
            </div>

            <a class="btn btn-primary btn-lg btn-block" href="#">登录</a>
            <a class="login-link" href="#">忘记密码?</a>
          </div>
      </div>
    </div> -->
    <Login v-if="!isLogin"></Login>
  </div> 

</template>

<script>

import Nav from './component/nav/NavContainer.vue'
import Login from './component/login/LoginContainer.vue'


export default {
  
  data() {
    return {
     isLogin: true,
    };
  },
  components: {
    Nav,
    Login
  }
};


</script>


<style lang="scss" scoped>
.container {
  padding: 0;
}

</style>
