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
                <li><router-link to="/">新的评论</router-link></li>
               </ul>
               <form class="navbar-form form-inline my-2 my-lg-0" action="#" role="search">
                <div class="form-group">
                  <div class="input-group">
                    <input class="form-control" id="navbarInput-01" type="search" placeholder="Search">
                    <span class="input-group-btn">
                      <button type="submit" class="btn"><span class="fui-search"></span></button>
                    </span>
                  </div>
                </div>
              </form>
            </div><!-- /.navbar-collapse -->
          </nav><!-- /navbar -->
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

// .dropdown-toggle:after {
//     margin-left: 8px;
//     vertical-align: middle;
//     content: "";
//     border-top: 8px solid;
//     border-right: 6px solid transparent;
//     border-left: 6px solid transparent;
//     border-bottom: 0;
//     transition: border-color .25s, color .25s;
// }

// .dropdown-toggle::after {
//     display: inline-block;
//     width: 0;
//     height: 0;
//     margin-left: .255em;
//     vertical-align: .255em;
//     content: "";
//     border-top: .3em solid;
//     border-right: .3em solid transparent;
//     border-bottom: 0;
//     border-left: .3em solid transparent;
// }


</style>
