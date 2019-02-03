<template>
    <div class="images container" v-if="isShow">
        <div class="swiper-model" ref="swiperModel">
            <p>
                轮播图
                <button class="add btn btn-primary" @click="add('swiper')">添加</button>
            </p>
            <div class="image" ref="image"  v-for="item of swiperData" :key="item.id">
                <div class="image-div-first">
                    <img :src="item.img" alt="">
                </div>
                <div class="image-div-second">
                    <!-- <button class="change btn btn-primary" @click="change(item.id)">更换</button> -->
                    <button class="del btn btn-danger" @click="del(item.id)">删除</button>
                </div>
            </div>
        </div>

        <div class="contribute-imgLink" style="display: none;">
              
              <!-- 设置textarea高度自动化 隐藏右侧滚动条 -->
              <div class="currentAvatar">
                <div class="uploadAvatar">
                  <label for="examplexxxs" ref="clickLabel">
                    <i class="fas fa-images"></i>
                    <i class="fas fa-plus"></i>
                    <span>选择图片</span>
                  </label>
                  <input
                    type="file"
                    class="form-control"
                    id="examplexxxs"
                    name="file"
                    @change="imgChange('swiper')"
                    
                    placeholder="Email"
                    accept="image/*"
                  >
                </div>
                
              </div>
              
            </div>
        
        <div class="ad-model">
            <p>
                广告
                <button class="add btn btn-primary" @click="add('swiper')">添加</button>
            </p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            swiperData: [],
            adData: [],
            formData: new FormData(),
            isShow: true
        }
    },
    mounted() {
        this.getData();
        
    },
    
    methods: {
        // 提交图片
        imgChange(type) {
            this.formData = new FormData()
            this.formData.append("type", type.toString())
            // 获取file元素数组 把伪数组转换成数组
            let fileList = Array.prototype.slice.call($("#examplexxxs")[0].files);
            fileList.forEach((item, index) => {
                this.formData.append("file", item)
            });
            let that = this
            $.ajax({
                url: "http://localhost:3001/addImg",
                async: false,
                type: "POST",
                data: this.formData,
                processData: false,
                contentType: false,
                success: function(ret) {
                    console.log(ret)
                    if( ret.code === 1) {
                        that.isShow = false
                        that.getData()
                        setTimeout(() => {
                            that.isShow = true
                        }, 1);
                    }
                },
                error: function(ret) {
                    console.log(ret)
                }
            });
        },
        // 添加图片
        add() {
            $(this.$refs.clickLabel).click()
            window.scrollTo(0,0)
        },
        // 获取网站 图片
        getData() {
            axios.post("http://localhost:3001/imagesData")
            .then( result => {
                if( result.data.code > 0) {
                    this.swiperData = []
                    this.adData = []
                    result.data.imagesData.forEach( item => {
                        item.img = "http://localhost:3001" + item.img
                        if( item.type === "swiper") {
                            this.swiperData.push(item)
                        }
                        if( item.type === "ad") {
                            this.adData.push(item)
                        }
                    })
                }
            })
        },
        // 删除图片
        del(id) {
            axios.post("http://localhost:3001/deleteImage",{id: id})
            .then( result => {
                console.log(result.data)
                if( result.data.code === 1 ) {
                    this.isShow = false
                    this.getData()
                    setTimeout(() => {
                        this.isShow = true
                    }, 1);
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    
}
.swiper-model {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    padding-bottom:80px;
    margin-bottom: 60px;
    min-height: 980px;
    height: 100%;
    background-image: url(../../asset/images/bg2.gif);
    p {
        height: 60px;
        line-height: 60px;
        font-weight: 700;
        font-size: 22px;
        margin: 2% 1%;
        color: #fff;
    }
    .image {
        margin-bottom: 3%;
        background-color: #fdfdfd;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        display: flex;
        width: 48%;
        float: left;
        margin: 1%;
        height: 245px;
        background-image: url(../../asset/images/bg.gif);
        opacity: 0.98;
        .image-div-first {
            width: 80%;
        }
        .image-div-second {
            width: 20%;
        }
        button {
            width: 100%;;
            height: 100%;
            border-radius: 0;
            display: block;
        }
        .change {
            top: 10%;;
        }
        .del {
            top: 30%;
        }
        box-shadow: 0 6px 23px #eee;
    }
    
    img {
        width: 100%;
        border-radius: 10px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
}
.btn, .btn-success, .btn-danger,
.btn:active, .btn-success:active, .btn-danger:active
.btn:focus, .btn-success:focus, .btn-danger:focus {
    outline: 0;
}

.add {
    width: 30%;;
    height: 60px;
    // border-radius: 60px;
    float: right;
    font-size: 18px;
}

.ad-model {
    width: 100%;
    height: 800px;
    padding: 20px;
    background-image: url(../../asset/images/bg5.gif);
    
    margin-bottom: 60px;
    border-radius: 8px;
    p {
        height: 60px;
        line-height: 60px;
        font-weight: 700;
        font-size: 22px;
        margin: 2% 1%;
        color: #fff;
    }
}
</style>
