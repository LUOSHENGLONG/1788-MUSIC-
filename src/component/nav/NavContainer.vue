<template>
  <div class="container">
    <div class="row demo-row">
        <div class="col">
          <nav class="navbar navbar-inverse navbar-embossed navbar-expand-lg" role="navigation">
            <a class="navbar-brand" href="#">1788 MUSIC</a>
            <!-- <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse-01"></button> -->
            <div class="collapse navbar-collapse" id="navbar-collapse-01">
              <ul class="nav navbar-nav mr-auto">
                <li><router-link to="/login">首页</router-link></li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">消息<span class="navbar-unread">1</span></a>
                  <span class="dropdown-arrow"></span>
                  <ul class="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li class="divider"></li>
                    <li><a href="#">Separated link</a></li>
                  </ul>
                </li>
                <li><router-link to="/contribute">投稿审核</router-link></li>
                <li><router-link to="/comments">新的评论</router-link></li>
                <li><router-link to="/images">图片管理</router-link></li>
                <li><router-link to="/">反馈</router-link></li>
               </ul>
              
            </div>
          </nav>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      
      
    }
  },
  mounted() {
    
  }
  
}


</script>



<style lang="scss" scoped>
.container {
  padding: 0 15px;
}
.row {
  
}

.navbar-brand {
  height: 53px;
}
.navbar-form {
  padding-top: 5px !important;
  float: right;
  height: 53px;
  border-color: #fff;
}
.dropdown-menu {
  margin-top: 0 !important;
}

li {
  letter-spacing: 1px;
  a {
    font-weight: 400 !important;
  }
}



.navbar.navbar-inverse .navbar-form .form-control:focus + span{
    border-color: #1abc9c;
}

.input-group .form-control:first-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
}

</style>
