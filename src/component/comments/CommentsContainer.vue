<template>
    <div class="comment container" >
        <div class="bs-example" data-example-id="hoverable-table">
          <table class="table table-hover" v-if="isShow">
            <thead>
              <tr style="color: #fff;">
                <th style="width: 6%;text-align: center;">序号</th>
                <th style="width: 31%;padding-left: 20px;">评论内容</th>
                <th style="width: 20%;text-align: left;">评论文章</th>
                <th style="width: 15%;text-align: center;">评论用户</th>
                <th style="width: 18%;text-align: center;">发表时间</th>
                <th style="width: 5%;text-align: center;">操作</th>
                <th style="width: 5%">批量</th>
              </tr>
            </thead>
            <tbody v-for="(item,index) in commentData" :key="item.id">
              <!-- 已发布 -->
              <tr style="color: #fff;">
                <td style="text-align: center;">{{ index + 1 }}</td>
                <td scope="row" style="padding-left: 20px;">
                  <a href="#" @click="checkArticle($event, item.topic_id)" style="color: #fff;"><span>{{ item.content }}</span></a>
                </td>
                <td style="text-align: left;"><span>{{ item.title }}</span></td>
                <td style="text-align: center;">{{ item.nickname }}</td>
                <td style="text-align: center;">{{ item.createTime | commentDateFormat }}</td>
                <td>
                  <div style="text-align: center;">
                    <a href="#" @click="deleteComment($event,item.id)" style="color: #FF6A6A;">删除</a>
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
                    &nbsp;&nbsp;<i class="far fa-check-circle"  style="cursor: pointer"></i>
                  </label>
                </td>
              </tr>
              
              
            </tbody>
          </table>
          <!-- 批量处理 -->
          <div class="batchEdit" ref="batchEdit">
            <div class="span3">
              <div href="#" class="span3-title">
                <i class="fas fa-exclamation-triangle"></i>
                &nbsp;批量操作
              </div>
            </div>
            
            
            <div class="span3">
              <a href="javascript: void(0)" class="btn btn-large btn-block btn-danger" @click="deleteBatch">删除选中</a>
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
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            commentData: [],
            totalCount: 1,
            currentPage: 1,
            isShow: true,
            batchId: [],
        }
    },
    mounted() {
      this.getCommentData()
    },
    methods: {
        checkArticle(e,id) {
          e.preventDefault();

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
        deleteBatch() {
          axios.post("http://localhost:3001/deleteComment",{id: this.batchId})
          .then( result => {
            this.isShow = false
            this.getCommentData()
            setTimeout(() => {
              this.isShow = true
            }, 1);
          })
        },
        page(e) {
          this.currentPage = e
          this.getCommentData()
        },
        // 获取评论回复数据
        getCommentData() {
            axios.post("http://localhost:3001/getCommentData",{currentPage: this.currentPage})
            .then( result => {
                this.totalCount = result.data.totalCount.count
                this.commentData = result.data.comments
                console.log(result.data)
            })
        },
        // 删除评论 回复
        deleteComment(e, id) {
          e.preventDefault();
          axios.post("http://localhost:3001/deleteComment",{id: id})
          .then( result => {
            this.isShow = false
            this.getCommentData()
            setTimeout(() => {
              this.isShow = true
              console.log(this.currentPage)
              console.log($("#pageNav li"))
              
            }, 1);
          })
        }
    }
}
</script>
<style lang="scss" scoped>
.comment {
  background-color: #34495e;
  border-radius: 8px;
  position: relative;
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
.far,.fas, fa-square {
  font-size: 26px !important;
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
input:checked + label {
  cursor: pointer;
  color: #47b39d;
}

span{
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

table thead tr:hover {
  background-color: #34495e !important;
}
</style>
