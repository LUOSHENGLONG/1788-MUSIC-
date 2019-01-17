<template>
    <div class="container">
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
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>

.container {
    // background-color: #eee;
    padding: 0;
    text-align: center;
    margin: 0;
    width: 100%;
    height: 100%;
}
.login-container {
  padding: 0;
}
.login {
    text-align: center;
    background: none;
    background-color: #34495e;
    // padding: 100px 380px ;
    height: 500px;
    // border-radius: 8px;
}

.login-form {
    padding: 10% 42%;
    margin-right: 0 !important;
    text-align: center;
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    background-color: #34495e;;
    top: 50;
    height: 100%;
    width: 100%;
}

.login-form:before {
    content: '';
    border-style: solid;
    border-width: 0;
    // border-width: 12px 12px 12px 0;
    border-color: transparent #edeff1 transparent transparent;
    height: 0;
    position: absolute;
    left: -12px;
    top: 35px;
    width: 0;
    -webkit-transform: rotate(360deg);
}
</style>
