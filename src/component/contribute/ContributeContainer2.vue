<template>
    <div class="container">
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
              <tr v-if="item.isRealease === 1" class="success">
                <td scope="row">{{ item.title }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.contributeTime }}</td>
                
                
                <td>
                  <span>已发布</span>&nbsp;
                  <router-link to="/">查看</router-link>
                  <a href="#" @click="deleteMyContribute($event,item.id)" class="purple">删除</a>
                </td>
              </tr>
              <!-- 待审核 -->
              <tr v-if="item.isRealease === 0">
                
                <td scope="row">{{ item.title }}</td>
                <td style="text-align: center;line-height: 280%">{{ item.type | typeFormat }}</td>
                <td style="text-align: center;">{{ item.contributeTime }}</td>
                
                <td style="text-align: center;">
                  <div style="text-align: center;">待审核</div>
                  <div style="text-align: center;">
                    <a href="#" @click="deleteMyContribute($event,item.id)" style="color: #3498DB;">发布</a>
                    <a href="#" @click="deleteMyContribute($event,item.id)" class="purple">驳回</a>
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
              <!-- 已驳回 -->
              <tr v-if="item.isRealease === -1">
                
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
        <div class="batchEdit" ref="batchEdit">
          <div class="span3">
            <div href="#" class="span3-title">
              <i class="fas fa-exclamation-triangle"></i>
              &nbsp;批量操作
            </div>
          </div>
          <div class="span3">
            <a href="#" class="btn btn-large btn-block btn-primary">发布所有</a>
          </div>
          <div class="span3">
            <a href="#" class="btn btn-large btn-block btn-danger">驳回所有</a>
          </div>
          <div class="span3">
            <a href="#" class="btn btn-large btn-block btn-primary">发布选中</a>
          </div>
          <div class="span3">
            <a href="#" class="btn btn-large btn-block btn-danger" @click="reject">驳回选中</a>
          </div>
         
        </div>
              <!-- <div ref="paginate" class="pageNav" id="pageNav">
                <paginate
                  :page-count="Math.ceil(contributePageCount / 10)"
                  :click-handler="contributePage"
                  :prev-text="'上一页'"
                  :next-text="'下一页'"
                  :container-class="'pagination'"
                  >
                </paginate>
              </div> -->

              <!-- <div class="pagination" style="text-align: center;width: 100%">
                <ul>
                  <li class="previous"><a href="#"><i class="fas fa-angle-left"></i></a></li>
                  <li v-for="item in PageCount" :key="item">
                    <a href="#" class="active">{{ item }}</a>
                  </li>
                  
                  
                  <li class="next"><a href="#"><i class="fas fa-angle-right"></i></a></li>
                </ul>
              </div> -->

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
export default {
    data() {
        return {
            userContribute:[],
            totalCount: 1,
            PageCount: 1,
            currentPage: this.$route.params.currentPage,
            batchId: [],
        }
    },
    mounted() {
      this.page(this.$route.params.currentPage)
    },
    methods: {
        reject() {
          axios.post('http://127.0.0.1:3001/batchReject',{batchId: this.batchId})
          .then((result) => {
            console.log(result)
            this.getMyContribute()
          })
          this.$router.push({path: `/contribute/`+this.currentPage, params:{currentPage: this.currentPage}})
        },
        page(e) {
          this.currentPage = e 
          this.getMyContribute()
        },
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
        getMyContribute() {
          console.log("=============")
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
            console.log(result)
            this.totalCount = result.data.count[0].count
            this.PageCount = Math.ceil(this.totalCount/10)
            console.log(this.PageCount)
            this.userContribute = result.data.pageData
            this.userContribute.forEach( item => {
              item.contributeTime = timestampToTime(parseInt(item.contributeTime))
            })
          })
        },
    },
    
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #34495e;
  border-radius: 8px;
  margin-top: 0;
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
  height: 240px;
  position: absolute;
  right: -156px;
  border-radius: 8px;
  top: 120px;
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
  height: 50px;
  line-height: 50px;
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
</style>
