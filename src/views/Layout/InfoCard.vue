<template>
  <el-card class="outer-card" v-if="info!=null">
    <el-row :gutter="40">
      <el-col :span="8">
        <div class="image-container">
          <img :src="info.picUrl" alt="展示图片" />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="content-container">
          <div>
            <h2 class="h2dev">{{ info.title }}</h2>
            <p class="pdev">
              {{ info.content }}
            </p>
            <el-link type="primary">了解更多</el-link>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <div v-else class="error-container">
    <h2>页面暂时不可用</h2>
    <p>请稍后再试或联系网站管理员。</p>
  </div>
</template>

<script>
import { get } from '@/utils/request'
import { ElMessage } from 'element-plus'

export default {
  name: 'InfoCard',
  data() {
    return {
      info: null
    }
  },
  methods: {
    init() {
      get('/announcements/', {}, true).then(res => {
        if (res.data.success === true) {
          this.info = res.data.data
          console.log(this.info)
        } else {
          ElMessage({
            message: res.data.message,
            type: 'error'
          })
        }
      }).catch(err => {
        ElMessage({
          message: '服务器通讯异常',
          type: 'error',
          duration: 5000
        })
      })
    }

  },
  mounted() {
    this.init()
  }
};
</script>
  
<style lang="scss" scoped>
.pdev {
    margin: 12px 0;
    font-size: 16px;
    color: #575d6c;
    line-height: 20px;
    font-family: 'Arial', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    text-align: justify;
}

.h2dev {
    font-size: 24px;
    font-weight: inherit;
    color: #252b3a;
    line-height: 36px;
}

.outer-card {
    height: auto;
    margin-bottom: 20px;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .1);
    display: flex;

}


.image-container {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 300px; 
  }
  
  .image-container img {
    max-width: 100%; 
    max-height: 100%; 
    object-fit: contain; 
  }
  

.content-container {
    height: 100%;
    /* 设置高度以便于内容垂直居中 */
    display: flex;
    /* 使用flex布局 */
    justify-content: center;
    /* 水平居中内容 */
    align-items: center;
    /* 垂直居中内容 */
}
</style>
