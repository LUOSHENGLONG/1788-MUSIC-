<template>
    <div class="container" v-if="show">
      <!-- 查询 -->
        <div class="search">
          <div class="todo mrm">
            
            <div class="todo-search">
              <select value="X-Men" class="span3" tabindex="1" name="herolist">
                <option value="0" selected="selected">所有</option>
                <option value="1">已发布</option>
                <option value="2">待审核</option>
                <option value="3">已驳回</option>
              </select>
              <select value="X-Men" class="span3" tabindex="1" name="herolist">
                <option value="0" selected="selected">所有</option>
                <option value="1">合成器</option>
                <option value="2">效果器</option>
                <option value="3">采样包</option>
                <option value="3">宿主</option>
                <option value="3">采样包</option>
              </select>
              <input class="todo-search-field" type="search" value="" placeholder="Search">
            </div>
          </div>
          <!-- <calendar :date.sync="dateString" :class-names="{panel: 'custom-panel'}"></calendar> -->
        </div>
        <div class="bs-example" data-example-id="hoverable-table">
          <table class="table table-hover">
            <thead>
              <tr>
                <th style="width: 50%">文章标题</th>
                <th style="width: 15%;text-align: center;">文章类型</th>
                <th style="width: 15%;text-align: center;">投稿时间</th>
                <th style="width: 15%;text-align: center;">状态、操作</th>
                <th style="width: 5%">批量</th>
              </tr>
            </thead>
            <tbody v-for="item in userContribute" :key="item.id">
              <!-- 已发布 -->
              <tr v-if="item.isRelease === 1">
                <td scope="row">{{ item.title }}</td>
                <td style="text-align: center;">{{ item.type | typeFormat }}</td>
                <td style="text-align: center;">{{ item.contributeTime }}</td>
                <td>
                  <div style="text-align: center;">已发布</div>
                  <div style="text-align: center;">
                    <a href="#" @click="checkArticle($event, item.id)" style="color: #8EE5EE;">查看</a>
                    <a href="#" @click="deleteMyContribute($event,item.id)" style="color: #FF6A6A;">删除</a>
                  </div>
                </td>
                <td class="checkBoxTd">
                  <input
                    type="checkbox"
                    style="display: none"
                    name="type"
                    :id="item.id"
                    class="contribute-title-input-radio"
                  >
                  <label :for="item.id" @click="check(item.id)">
                    <i class="far fa-check-circle"></i>
                  </label>
                </td>
              </tr>
              <!-- 待审核 -->
              <tr v-if="item.isRelease === 0">
                <td scope="row">{{ item.title }}</td>
                <td style="text-align: center;line-height: 280%">{{ item.type | typeFormat }}</td>
                <td style="text-align: center;">{{ item.contributeTime }}</td>
                <td style="text-align: center;">
                  <div style="text-align: center;">待审核</div>
                  <div style="text-align: center;">
                    <a href="#" @click="release($event,item.id)" style="color: #54FF9F;">发布</a>
                    <a href="#" @click="rejectMyContribute($event,item.id)" style="color: #FF6A6A;">驳回</a>
                    <a href="#" @click="checkArticle($event, item.id)" style="color: #8EE5EE;">查看</a>
                  </div>
                </td>
                <td class="checkBoxTd">
                  <input
                    type="checkbox"
                    style="display: none"
                    name="type"
                    :id="item.id"
                    class="contribute-title-input-radio"
                  >
                  <label :for="item.id" @click="check(item.id)">
                    <i class="far fa-check-circle" style="cursor: pointer"></i>
                  </label>
                </td>
              </tr>
              <!-- 已驳回 -->
              <tr v-if="item.isRelease === -1">
                <td scope="row">{{ item.title }}</td>
                <td style="text-align: center;line-height: 280%">{{ item.type | typeFormat }}</td>
                <td style="text-align: center;">{{ item.contributeTime }}</td>
                <td style="text-align: center;">
                  <div style="text-align: center;">已驳回</div>
                  <div style="text-align: center;">
                    <a href="#" @click="deleteMyContribute($event,item.id)" class="purple">删除</a>
                  </div>
                </td>
                <td class="checkBoxTd">
                  <input
                    type="checkbox"
                    style="display: none"
                    name="type"
                    :id="item.id"
                    class="contribute-title-input-radio"
                  >
                  <label :for="item.id" @click="check(item.id)">
                    <i class="far fa-check-circle"></i>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 批量处理 -->
        <div class="batchEdit" ref="batchEdit">
          <div class="span3">
            <div href="#" class="span3-title">
              <i class="fas fa-exclamation-triangle"></i>
              &nbsp;批量操作
            </div>
          </div>
          <div class="span3">
            <a href="javascript: void(0)" class="btn btn-large btn-block btn-primary" @click="allRelease">发布所有</a>
          </div>
          <div class="span3">
            <a href="javascript: void(0)" class="btn btn-large btn-block btn-danger" @click="allReject">驳回所有</a>
          </div>
          <div class="span3">
            <a href="javascript: void(0)" class="btn btn-large btn-block btn-primary" @click="batchRelease">发布选中</a>
          </div>
          <div class="span3">
            <a href="javascript: void(0)" class="btn btn-large btn-block btn-danger" @click="batchReject">驳回选中</a>
          </div>
         
        </div>
        <!-- 分页 -->
        <div ref="paginate" class="pageNav" id="pageNav">
          <paginate
            :page-count="Math.ceil(totalCount / 10)"
            :click-handler="page"
            :prev-text="'上一页'"
            :next-text="'下一页'"
            :container-class="'pagination'"
            >
          </paginate>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import calendar from 'vue-calendar'
export default {
    data() {
        return {
            userContribute:[],
            totalCount: 1,
            PageCount: 1,
            currentPage: 1,
            batchId: [],
            show: true,
            calendar4:{
                display:"2018/02/16 ~ 2019/02/16",
                show:false,
                range:true,
                zero:true,
                value:[[2018,2,16],[2019,2,16]], //默认日期
                lunar:true, //显示农历
                select:(begin,end)=>{
                    console.log(begin,end)
                    this.calendar4.show=false;
                    this.calendar4.value=[begin,end];
                    this.calendar4.display=begin.join("/")+" ~ "+end.join("/");
                }
            },
        }
    },
    mounted() {
      console.log("xxxxxxxxxxxx")
      this.page(this.currentPage)
    },
    methods: {
        // 查看文章
        checkArticle(e, id) {
          e.preventDefault();
          const {href} = this.$router.resolve({name: 'article', params: {id: id}})
          window.open(href,"_blank")
        },
        // 驳回所有
        allReject() {
          this.show = false
          axios.post('http://127.0.0.1:3001/allReject')
          .then((result) => {
          })
          setTimeout(() => {
            this.show = true
            this.page(this.currentPage)
          }, 100);
        },
        // 发布所有
        allRelease() {
          this.show = false
          axios.post('http://127.0.0.1:3001/allRelease')
          .then((result) => {
          })
          setTimeout(() => {
            this.show = true
            this.page(this.currentPage)
          }, 100);
        },
        // 发布单个
        release(e, id) {
          e.preventDefault();
          this.show = false
          let article = {}
          this.userContribute.forEach( item => {
            if(item.id === id) {
              article = item
              return
            }
          })
          axios.post('http://127.0.0.1:3001/releaseSingleArticle',{article: article})
          .then((result) => {
            console.log(result.data)
          })
          setTimeout(() => {
            this.show = true
            this.page(this.currentPage)
          }, 100);
        },
        // 驳回单个
        rejectMyContribute(e, id) {
          e.preventDefault();
          this.show = false
          axios.post('http://127.0.0.1:3001/batchReject',{batchId: id})
          .then((result) => {
          })
          setTimeout(() => {
            this.show = true
            this.page(this.currentPage)
          }, 100);
        },
        // 批量驳回
        batchReject() {
          this.show = false
          axios.post('http://127.0.0.1:3001/batchReject',{batchId: this.batchId})
          .then((result) => {
          })
          setTimeout(() => {
            this.show = true
            this.page(this.currentPage)
          }, 100);
        },
        // 批量发布
        batchRelease() {
          this.show = false
          axios.post('http://127.0.0.1:3001/batchRelease',{batchId: this.batchId})
          .then((result) => {
          })
          setTimeout(() => {
            this.show = true
            this.page(this.currentPage)
          }, 100);
        },
        // 分页
        page(e) {
          this.currentPage = e 
          this.getMyContribute()
        },
        // 批量选择
        check(id) {
          Array.prototype.remove = function(val) { 
            var index = this.indexOf(val); 
            if (index > -1) { 
            this.splice(index, 1); 
            } 
          };
          // 把伪数组转换为数组
          Array.prototype.slice.call($("input[id='"+ id +"']"))
          .forEach( item => {
            console.log(this.batchId.indexOf(id))
            if( this.batchId.indexOf(id) === -1) {
              this.batchId.push(id)
            }else {
              this.batchId.remove(id)
            }
            console.log(this.batchId)
          })
        },
        // 获取投稿数据
        getMyContribute() {
          function timestampToTime (cjsj) {
              var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + '-'
              var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
              var D = (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate() ) + ' '
              var h = (date.getHours() < 10 ? '0'+ date.getHours() : date.getHours()) + ':'
              var m = (date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes()) + ':'
              var s = date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds()
              return Y+M+D+h+m+s
              console.log(timestampToTime (1533293827000))
          }
          axios.post('http://127.0.0.1:3001/getContribute',{currentPage: this.currentPage})
          .then((result) => {
            this.totalCount = result.data.count[0].count
            this.PageCount = Math.ceil(this.totalCount/10)
            this.userContribute = result.data.pageData
            console.log(result.data)
            console.log(this.userContribute)
            this.userContribute.forEach( item => {
              item.contributeTime = timestampToTime(parseInt(item.contributeTime))
            })
          })
        },
        // 发布文章
        releaseSingleArticle(id) {
          this.show = false
          // axios.post('http://127.0.0.1:3001/releaseSingleArticle',{id: id})
          // .then((result) => {
          //   console.log(result)
          // })
          
        },
        // deleteMyContribute
        deleteMyContribute(e, id) {
          e.preventDefault()
          this.show = false
          axios.post('http://127.0.0.1:3001/deleteMyContribute',{id: id})
          .then((result) => {
            console.log(result)
          })
          setTimeout(() => {
            this.show = true
            this.page(this.currentPage)
          }, 100);

        },
        
    },
    components: {
      calendar
    }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #34495e;
  border-radius: 8px;
  margin-top: 0;
  padding-top: 10px;
  position: relative;
}
.bs-example {
  background-color: #34495e;
}
thead th{
  padding-top: 20px !important;
  padding-bottom: 20px !important;
}
th,tr,td {
  color: #fff;
}
tr:hover {
  background-color: rgba(26, 188, 156, 0.575) !important;
}
table thead tr:hover {
  background-color: #34495e !important;

}
.purple {
  color: #E74C3C;
}

.far,.fas, fa-square {
  font-size: 26px !important;
}
.checkBoxTd {
  position: relative;
}


input:checked + label {
  // background-color: #47b39d;
  // border: 1px solid #47b39d;
  // border-radius: 50%;
  cursor: pointer;
  color: #47b39d;
}

input:checked + label::after {
  
}

.batchEdit {
  background-color: #34495e;
  width: 150px;
  height: 224px;
  position: absolute;
  right: -156px;
  border-radius: 8px;
  top: 114px;
  transform: translateY(-50%);
  overflow: hidden;
}
.span3 {
  text-align: center;
  a {
    font-size: 18px;
    color: #fff;
    border-radius: 0;
    border: 0;
  }
}
.span3-title {
  height: 45px;
  line-height: 45px;
  color: #fff;
}

.pageNav {
  text-align: center;
  outline: none;
}
a:focus,a:active {
  outline: 0 !important;
  border: 0 !important;
}

tr:last-child {
  border-bottom: 2px solid #ddd;

}
.search {
  // position: absolute;
  padding: 10px 30%;
  width: 100%;
  left: -300px;
  top: 0;
  margin-right: 0 !important;
}
.todo-search {
  border-radius: 6px !important;
  padding: 4px 20px;
  background: #fff;
}

.todo-search:before {
    position: absolute;
    font-family: 'Flat-UI-Icons';
    content: "\E01C";
    font-size: 16px;
    line-height: 17px;
    display: inline-block;
    top: 78%;
    left: 96%;
    margin: -0.5em 0 0 -1em;
}
.todo-search-field {
  width: 100%;
  padding: 4px 10px;
  outline: 0;
}
select {
  width: 49%;
  display:inline-block;
  margin:10px 0;
  text-align: center;
}
select::-ms-expand { display: none; }
select,option {
  border-radius: 8px;
  padding: 2px 10px;
  border: 0;
  outline: 0;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
  padding-right: 14px;
}
option:focus {
    outline: 0;
}

option::-ms-expand{ display: none; }
option{
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari 和 Chrome */
    appearance:none;
    outline: 0;
    border-color: #fff;
}
/* --背景色字体颜色--*/
option:hover{
    background-color:#eee !important;
}
</style>
