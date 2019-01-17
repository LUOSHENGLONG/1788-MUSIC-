<template>
    <div class="container">
      
      <!-- 详细内容 -->
      <div class="left col-sm-12 col-md-12 col-lg-12" >
       
        <section class="main-content">
          <div class="main-title">
            <h2>{{ articleData.title}}</h2>
          </div>
          <div class="main-info">
            <ul class="message">
              <li><span class="fas fa-user-edit"></span>{{ articleData.userId }}</li> 
              <li><span class="fas fa-clock"></span>{{ articleData.contributeTime }}</li>
              <li><span class="fas fa-eye"></span>{{ articleData.look }}浏览</li>
              <li>
              </li>
            </ul>
          </div>
          <div class="post-content mdf_connect">
            
            <div class="post-content-img" v-for="item of articleData.img" :key="item">
              <br>
              <img class="content-img" 
                alt="" 
                :data-original="item" 
                :src="item" 
                style="display: inline;">
                <div class="topShade"></div>
                <div class="bottomShade"></div>
                <div class="leftShade"></div>
                <div class="rightShade"></div>
              <br>
            </div>

            <p class="post-content-text">
              <!-- <span class="intexthighlight">Kenny Chesney</span> -->
              <br>
              &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;
              {{ articleData.content }}
              <br><br>
            </p>
            
            <!-- <p class="post-content-text">Kenny Chesney此次巡演舞台工程师Chris Rabold：</p> -->
            <blockquote>
              <pre class="post-content-text">{{ articleData.description }}</pre>
            </blockquote>
            <div class="video-responsive">
              <iframe :src="articleData.videoLink" frameborder="0" allowfullscreen="true"> </iframe>
              <br>
              <hr>
            </div>
            <div class="download">
              <blockquote>
                <p class="post-content-text"> 
                  下载地址：
                  <a :href="articleData.downloadLink" target="_blank">
                    {{ articleData.downloadLink }}
                  </a>
                  <br>
                  提取码: <span ref="tqm" id="tqm">{{ articleData.downloadPassword }}</span>&nbsp;&nbsp;
                  <button 
                    id="btnTips1" type="button" 
                    class="tqm btn btn-success" 
                    data-toggle="popover" 
                    title="" data-content="已复制"
                    ref="btnTips1"
                    data-clipboard-target="#tqm"
                  >复制提取码</button>
                   &nbsp;&nbsp;&nbsp;
                   解压密码: <span ref="jymm" id="jymm">{{ articleData.downloadUnzip }}</span>  &nbsp;&nbsp;

                  <button 
                    id="btnTips2" type="button" 
                    class="jymm btn btn-success" 
                    data-toggle="popover" title="" 
                    data-content="已复制"
                    ref="btnTips2"
                    data-clipboard-target="#jymm"
                  >复制解压密码</button>

                </p>
              </blockquote>
            </div>
            <div class="description">
              <blockquote>
                <p class="post-content-text"> 
                  1788 Music
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        <div class="edit" ref="edit">
          <p>操作</p>
          <button class="btn btn-small btn-block btn-primary">发布</button>
          <button class="btn btn-small btn-block btn-danger">驳回</button>
        </div>
      </div>
      
    </div>
</template>
<script>

import axios from 'axios'

  export default {
    data() {
      return {
        infoData: {
            title: "title",
            issuer: "issuer",
            releaseTime: "releaseTime",
            look: "look",
            content: "content",
            description: "description",
            downloadPassword: "downloadPassword",
            downloadLink: "downloadLink",
            
        },
        articleId: this.$route.params.id,
        articleData: {},
        img: []
      }
    },
    
    mounted() {
      this.getArticleById()
      window.onscroll = () => {
        // 浏览器滚动时 登陆 注册 DIV left top 值改变是其在整个窗口保持居中
        let divlogin = this.$refs.edit
        // div宽度
        let divWidth = divlogin.offsetWidth
        // 浏览器宽度
        let docWidth = document.documentElement.clientWidth
        // 设置left
        // this.$refs.edit.style.left = docWidth/2 - divWidth + "px"

        // div高度
        let divHeight = divlogin.offsetHeight
        // 屏幕滚出高度
        let srcollHeight = $('html,body').scrollTop()
        // 浏览器高度
        let docHeight = document.documentElement.clientHeight
        // 设置left
        this.top = srcollHeight+docHeight/2-divHeight
        
        this.$refs.edit.style.top = this.top + "px"
      }
    },
    methods: {
        getArticleById() {
            axios.post('http://localhost:3001/getArticleById',{id: this.articleId})
            .then( result => {
                
                
               
                console.log(this.articleData)
                this.articleData = result.data.Article[0]
            
                String.prototype.replaceAll = function(s1,s2){ 
                    return this.replace(new RegExp(s1,"gm"),s2); 
                }

                let test = /(\")|(\])|(\[)/
                // test = /\[\]\"/
                this.articleData.img = this.articleData.img.replaceAll(test,"")
                this.articleData.img.split(",").forEach( item => {
                    this.img.push("http://localhost:3001" + item)
                })
                this.articleData.img = this.img
                let videoStart = this.articleData.videoLink.toString().indexOf("/av") + 3

                console.log(this.articleData.description)

                this.articleData.videoLink = "//player.bilibili.com/player.html?aid=" + this.articleData.videoLink.substring(videoStart,videoStart+8)
            })
        }
    }
  }
</script>
<style lang="scss" scoped>

.red {
  color: #d9534f !important; 
}

a {
  text-decoration: none;
}

body, textarea, input, select, section, li, p {
    color: rgb(68, 68, 68);
    font-size: 14px;
    line-height: 1.8;
    font-weight: normal;
    font-family: "Open Sans", Arial, "Hiragino Sans GB", "Microsoft YaHei", STHeiti, "WenQuanYi Micro Hei", SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    margin: 0px;
    padding: 0px;
}

.Glyphicons {
  font-family: "Glyphicons Halflings" !important;
}
//去除点击button outline轮廓
button, 
button:focus, 
button.active {
    outline: none;
}

.container {
  padding: 0;
  .main-content {
    width: 100%;
    box-shadow: 0 6px 23px rgba(0, 0, 0, 0.094);
    background-color: #fff;
    border: 1px solid #eee;
    padding: 20px 40px 65px 40px;
    .main-title {
      text-align: left;
      border-bottom: 1px solid #eee;
      h2 {
            font-size: 30px;
            border-bottom: 2px solid #7645b8;
            padding-bottom: 18px;
            margin-bottom: -2px;
            font-weight: 700;
            white-space: pre-line;
      }
    }
    .main-info {
      .message {
        text-align: left;
        vertical-align: middle;
        padding: 0;
        margin: 10px 0;
        display: inline-block;
        
        
        li {
          margin-right: 10px;
          list-style: none;
          display: inline-block;
          height: 25px;
          text-align: left;
          color: rgba(0, 0, 0, 0.5);
          font-size: 16px;
          
          a {
            display: inline-block;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.7);
            
            span {
              font-size: 20px;
              padding-left: 5px;
              padding-right: 3px;
              color: rgba(0, 0, 0, 0.5);
            }
          }
          span {
            font-size: 20px;
            padding-left: 5px;
            padding-right: 3px;
          }
          .qrcode {
            color: #337AB7;
          }
        }
        
      } 
      
    }
    .post-content {
      .post-content-text {
        font-size: 18px;
        .intexthighlight {
          color: rgb(26, 117, 255);
          line-height: 32.4px;
        }
      }
      .post-content-img {
        text-align: center;
        .content-img {
          width: 100%;
        }
      }
      blockquote {
        background-color: rgba(238, 238, 238, 0.4);
        p {
          color: rgba(0, 0, 0, 0.9);
        }
      }
      .video-responsive {
        iframe {
          width: 100%;
          height: 720px;
        }
      }
      .download {
        blockquote {
          background-color: #dff0d8;
          border-color: #449d44;
          p {
            color: #3c763d;
          }
          // .tqm:hover,.jymm:hover {
          //   color: #449d44;
          //   background-color: #fff;
          //   border-color: #fff;
          // }
        }
      }
      .description {
        blockquote {
          background-color: #f7f7f9;
          border-color: #337ab7;
          p {
            color: rgba(0, 0, 0, 0.801);
          }
        }
      }
    }
  }
  //广告内容
  .ad-container {
    padding: 0;
    .ad {
      width: 100%;
      height: 100px;
      background-color: #aaa;
      margin:15px 0;
      box-shadow: 0 6px 23px rgba(0, 0, 0, 0.094);
      
    }
  }
  
  //页面左边 显示数据
  .left {
    padding: 0;
    position: relative;
    .breadcrumb {
      width: 100%;
        height: 100%;
      white-space: nowrap;
      overflow: hidden;
      margin: 0;
      border: 1px solid #eee;
      border-bottom: 0;
      border-radius: 0;
      position: relative;
      
      li {
        font-size: 20px;
        line-height: 42px;
      }
    }
    .mediaLeft {
      .media {
        background-color: #eee;
        padding-bottom: 0;
        border-radius: 5px;
        border: 1px solid #eee;
        margin-bottom: 10px;
        .media-body {
          position: relative;
          .media-left {
            padding: 0;
            .Content:hover {
              .media-heading {
                color: rgb(43, 101, 151);
              }
            }
            //发布内容详细信息 发布标题 内容 图片
            .Content {
              width: 100%;
              height: 100%;
              text-decoration: none;
              color: rgba(0, 0, 0, 0.664);
              .media-heading {
                width: 100%;
                padding: 8px;
                padding-bottom: 4px;
                color: #337AB7;
                background-color: rgba(238, 238, 238, 0.303);
                margin-bottom: 0;
                font-size: 16px;
                font-weight: 700;
                line-height: 20px;
                .label {
                  background-color: #C71D24;
                  display: inline-block;
                  color: #fff;
                  position: absolute;
                  width: 50px;
                  height: 20px;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 16px;
                  text-align: center;
                  padding: 2px;
                  border: 0;
                }
                .label:hover {
                  background-color: rgb(221, 40, 46);

                }
                a {
                  text-decoration: none;
                }
              }
              .xhx {
                width: 100%;
                height: 3px;
              }
              
            }
            //发布详细信息 发布人 发布时间 收藏数 
            .info {
              .message {
                text-align: right;
                vertical-align: middle;
                padding: 0 10px;
                padding-bottom: 0;
                margin-bottom: 0;
                position: absolute;
                right: 15px;
                bottom: 0px;
                li {
                  list-style: none;
                  display: inline-block;
                  width: 80px;
                  height: 25px;
                  text-align: center;
                  color: rgba(0, 0, 0, 0.5);
                  font-size: 14px;
                  a {
                    display: inline-block;
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.5);
                    span {
                      font-size: 14px;
                      padding-left: 5px;
                      padding-right: 3px;
                      color: rgba(0, 0, 0, 0.5);
                    }
                  }
                  
                  span {
                    font-size: 14px;
                    padding-left: 5px;
                    padding-right: 3px;
                  }
                  .QR-Code {
                    font-size: 20px;
                    color: #337AB7;
                  }
                  
                }
              }             
            }
            p {
              margin: 10px;
              padding-left: 200px;
              color: rgba(0, 0, 0, 0.664);
            }
            img {
              float: left;
              width: 180px;
              height: 110px;
              margin: 10px;
              vertical-align: middle;
            }
          }  
        }
        
      }
      // 焦点hover 过渡效果 
      .media:hover {
        box-shadow: 0 0 10px #eee inset, 0 0 10px #ccc;
        background-color: #fff;
        .xhx {
          background-color: #337ab7;
          transform: translate(0);
          transition: all .8s linear;
        }
        h4{
          background-color: #fff;
        }
        img {
          transform: scale(1.03,1.03);
          transition: all 1s ease;
        }
      }
      

    }
  }
  //页面左边显示排行情况
  .right {
    padding: 0;
    .mediaRight{
      box-shadow: 5px 6px 23px rgba(0, 0, 0, 0.094);
      background-color: #fefefe;
      border-radius: 5px;
      .list-group {
        border: 1px solid #eee;
        padding-left: 0;
        margin-bottom: 15px;
        background-color: #fff;
        .right-title {
          background-color: #fdfdfd;
          border-bottom: 1px solid #eaeaea;
          .hot-logo, .hot-title,.last-article {
            font-size: 22px;
            margin: 10px 20px;
          }
          .hot-logo {
            color: #d9534f;
            margin-right: 0;
          }
          .last-article {
            color: #337ab7;
            margin-right: 0;
          }
          .hot-title {
            margin-left: 10px;
            font-weight: 700;
            color: rgba(0, 0, 0, 0.7);
          }
        }
        
        p {
          margin-bottom: 0;
        }
        .hot-title {
          display: inline-block;
          font-size: 24px;
          font-weight: 700;
        }
        .rightUl {
          padding: 0 15px 0px 10px;
          margin-bottom: 15px;
          li:last-child a{
            border-bottom: 1px solid #fff;
          }
          li:hover {
            .zhx {
              background-color: #337ab7;
            }
            
          }
          li {
            display: inline-block;
            border: none;
            padding-top: 0px;
            width: 100%;
            height: 100%;
            position: relative;
            .zhx {
              position: absolute;
              left: -2px;
              top: 20px;
              height: 22px;
              width: 5px;
              border-radius: 5px;
              background-color: #fff;
            }
            a:hover {
              box-shadow: 0 5px 10px rgba(238, 238, 238, 0.295),0 5px 10px rgba(238, 238, 238, 0.295) inset;
              .rank-logo {
                font-size: 28px;
                color: #337AB7;
                transition: all .3s ease;
                
              }
              .rank-title {
                font-size: 20px;
                color: rgba(0, 0, 0, 0.7);
                box-shadow: 0px 10px 40px #f8f8f8;
                transition: all .3s ease-out;
                
              }
             
            }
            .rank-num {
                font-size: 26px;
                color: #337ab7;
                font-weight: 700;
                display: inline-block;
                background-color: #fff;
                left: 10px;
              }
            
            a {
              display: inline-block;
              border: none;
              padding: 5px;
              border-radius: 3px;
              position: relative;
              line-height: 20px;
              left: 5px;
              top: 10px;
              width: 100%;
              height: 40px;;
              overflow:hidden;
              background-color: #fff;
              .rank-title {
                color: rgba(0, 0, 0, 0.8);
                font-size: 18px;
                word-wrap: none;
                white-space:pre;
                position: absolute;
                left: 0px;
                top:0px;
                overflow: hidden;
                height: 40px;
                line-height: 40px;
              }
              .rank-logo {
                position: absolute;
                right: 0;
                font-size: 24px;
                border: none;
                background-color: rgba(0,0,0,0);
              }
            }
            .a.active, .a.active:focus, .a.active:hover {
                z-index: 2;
                color: rgba(0, 0, 0, 0.664);
                background-color: #fff; 
                border: none;
            }
            a:hover {
              background-color: #fff;
            }
            h4 {
              text-align: left;
              font-size: 18px;
            }
            p {
              text-align: left;
            }
          }
        }
      }
    }
  }
}


div.mdf_connect {
    font-size: 18px;
    height: 100%;
}
.post-content {
    margin: 7px 0 35px 0;
    font-size: 18px;
}








img {
    border: none;
    vertical-align: middle;
}


.text {
    line-height: 20px;
    padding: 2px 0;
    font-size: 16px !important;
    text-shadow: none;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word;
}

 p {
    margin: 0;
    padding: 0;
}

 a {
    outline: none;
    color: #337ab7;
    text-decoration: none;
    cursor: pointer;
}

.reply-face {
  text-align: center;
  margin: 0 10px 0 0;
  float: left;
}


 a {
    outline: none;
    color: #337ab7;
    text-decoration: none;
    cursor: pointer;
}
.con {
  .user {
    .name {
      font-size: 14px;
    }
  }
}

.active {
  font-size: 18px !important;
}


.fa {
  font: normal normal normal 16px/1 FontAwesome;
}

.wrap{
  position: fixed;
  left: 50%;
  top:50%;
  background: rgba(0,0,0,.35);
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%,-50%);
  color:#fff;
  display: none;
}

.emptyStar {
  float: right;
  margin: 10px;
  margin-left: 0;
  font-size: 30px;
  background: none;
  border: none;
}

.fullStar {
  float: right;
  margin: 10px;
  margin-left: 0;
  font-size: 30px;
  color: #337ab7;
  background: none;
  border: none;
}

.post-content-img {
    position: relative;
    .topShade {
        position: absolute;
        width: 100%;
        height: 15%;
        left: 0;
        top: 0;
        background-image: -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0) 0%, white 500%);
        background-repeat: repeat-x;
    }
    .bottomShade {
        position: absolute;
        width: 100%;
        height: 15%;
        left: 0;
        bottom: 0%;
        background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, white 500%);
        background-repeat: repeat-x;
    }
    .leftShade {
        position: absolute;
        width: 8%;
        height: 100%;
        left: 0;
        top: 0;
        background-image: -webkit-linear-gradient(right, rgba(255, 255, 255, 0) 0%, white 500%);
        background-repeat: repeat-y;
    }
    .rightShade {
        position: absolute;
        width: 8%;
        height: 100%;
        right: 0;
        top: 0;
        background-image: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, white 500%);
        background-repeat: repeat-y;
    }
}

pre {
    padding: 8px;
    margin: 0 0 15px;
    font-size: 13px;
    line-height: 1.72222;
    color: inherit;
    background-color: rgba(255, 255, 255, 0);
    border: 0;
    border-radius: 6px;
    white-space: pre;
}

p{
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}

.edit {
  background-color: #34495e;
  text-align: center;
  width: 160px;
  height: 150px;
  position: absolute;
  right: -168px;;
  color: #fff;
  border-radius: 8px;
  overflow: hidden;
  top: 0;
  .btn {
    width: 160px;
    margin-top: 0 !important;
    border-radius: 0;
    height: 50px;;
    font-size: 18px;
  }
  p {
    color: #fff;
    font-size: 18px;
    height: 50px;
    line-height: 50px;
  }
}

</style>


