<template>
  <el-container>

    <el-main>
      <InfoCard>
      </InfoCard>

      <el-row :gutter="20">
        <el-col :span="18">
          <div class="section-title">热门实验</div>
          <el-row :gutter="20">
            <el-col :span="8" v-for="experiment in experiments" :key="experiment.id">
              <!-- <el-card @mouseenter="handleMouseEnter(experiment.id)" @mouseleave="handleMouseLeave(experiment.id)" -->
              <el-card :bordered="false" @click="toDetailPageById(experiment.id)"
                :class="{ 'card-hover': experiment.hover }">
                <img :src="experiment.image" class="card-image" alt="实验图片">
                <div v-if="!experiment.hover" class="experiment-container">
                  <span class="experiment-text">{{ experiment.title }}</span>
                  <div class="bottom clearfix">
                    <p class="info">
                      <span class="author-name">晁耐霞</span>
                      <span class="institution">广西医科大学</span>
                    </p>
                    <time class="time">{{ experiment.time }}</time>
                  </div>
                </div>
                <div v-if="experiment.hover" class="card-description">
                  {{ experiment.description }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <!-- <div class="section-title">数据统计</div>
          <div class="charts">
            <div ref="pieChart" class="chart-container"></div>
          </div> -->
          <el-row>
            <el-col :span="24">
              <div class="data-statistics">
                <div class="section-title">数据统计</div>
                <el-card style="height:300px">
                  <div class="statistics-list">
                    <div class="stat-item" v-for="(item, index) in statistics" :key="index">
                      <i class="stat-icon" :style="{ backgroundColor: item.color }"></i>
                      <span class="stat-text">{{ item.text }}</span>
                      <span class="stat-number">{{ item.number }}</span>
                    </div>
                  </div>
                  <div class="statistics-list" style="margin-top:20px">
                    <div class="stat-item" v-for="(item, index) in visits" :key="index">
                      <i class="stat-icon" :style="{ backgroundColor: item.color }"></i>
                      <span class="stat-text">{{ item.text }}</span>
                      <span class="stat-number">{{ item.number }}</span>
                    </div>
                  </div>
                </el-card>

              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import * as echarts from 'echarts';
import InfoCard from './Layout/InfoCard.vue'
export default {
  components: {
    InfoCard,
  },
  data() {
    return {
      statistics: [
        { color: '#666', text: '教师数', number: 3 },
        { color: '#014DA6', text: '学生数', number: 32 },
        { color: '#E74400', text: '高校数', number: 3 },
      ],
      visits:[
        { color: '#fbcf7c', text: '本月访问量', number: 3231 },
        { color: '#566', text: '本周访问量', number: 32 },
        { color: '#E74400', text: '今日访问量', number: 3 },
      ],
      experiments: [
        { id: 1, title: '海港航道数值仿真实验系统', image: require('@/assets/Exp/沿海.png'), time: '5.0分', description: '学生自行设计航道设计方案，应用船舶交通流仿真模型，挖掘航道线数、航道长度、通航水位、船舶航速等与航道通航效率的定量关系，为合理规划航道提供依据', hover: false },
        { id: 2, title: '集装箱码头生产作业3D仿真实验', image: require('@/assets/Exp/集装箱.png'), time: '4.7分', description: '实验平台实现集装箱码头陆域装卸作业的3D仿真模拟，加深学生对集装箱码头装卸工艺的理解。应用实验教学平台，挖掘装卸机械配比及效率与港口作业效率的定量关系，掌握集装箱码头装卸工艺选择的量化指标与评价方法。', hover: false },
        { id: 3, title: '客货滚装码头前沿精细化布置实验系统', image: require('@/assets/Exp/码头.png'), time: '4.7分', description: '模拟客货滚装码头前沿作业区行人流、车流的交通行为，支持实时显示交通流密度。利用实验教学平台，观测码头前沿作业状态，探究功能区划分以及交通组织形式对客货滚装码头交通流的影响，掌握客货滚装码头前沿装卸工艺流程，认识客货滚装码头的绿色评价指标', hover: false },
      ],
      hover: false,
    };
  },
  mounted() {
  },
  methods: {
    toDetailPageById(id) {

      this.$router.push({ name: 'Detail', params: { id: id } });

    },
    handleMouseEnter(id) {
      this.experiments = this.experiments.map(experiment => ({
        ...experiment,
        hover: experiment.id === id ? true : experiment.hover
      }));
    },
    handleMouseLeave(id) {
      this.experiments = this.experiments.map(experiment => ({
        ...experiment,
        hover: experiment.id === id ? false : experiment.hover
      }));
    }

  }
}
</script>

<style lang="scss" scoped>
.el-card {
  position: relative;
  overflow: hidden;
}

.experiment-container {
  margin-top: 10px;
}

.data-statistics {
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .statistics-list {
    .stat-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .stat-icon {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .stat-text {
        flex: 1;
        font-size: 16px;
        color: #333;
      }

      .stat-number {
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }
    }
  }
}

.experiment-text {
  text-align:center;
  color: #444444; 
  font-size: 14px; 
  font-family: "Helvetica Neue", Arial, sans-serif; 
  height: 50px; 
  display: flex; 
  align-items: center;
  overflow: hidden; 
}


.experimentText {
  margin: 12px 0;
  font-size: 10px;
  font: 14px;
  color: #444444;
  line-height: 20px;
  font-family: 'Arial', sans-serif;
  font-size: 1rem;
  line-height: 1.4;
  text-align: justify;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.info {
  display: flex;
  align-items: center;
  color: #999999;
  font-size: 14px;
}

.author-name {
  /* 右侧间隔 */
  position: relative;
  padding-right: 10px;
  /* 与竖线的间隔 */
}

.author-name::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 80%;
  width: 1px;
  background-color: #999999;
}

.institution {
  margin-left: 10px;
}

.time {
  margin-left: auto;
}

.card-description {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: opacity 0.3s ease;
  /* 平滑过渡效果 */
  opacity: 0;
  /* 默认不显示遮罩 */
  border-radius: 4px;
  /* 可选：如果卡片有圆角，让遮罩也有相同的圆角 */
}

.card-hover .card-description {
  opacity: 1;
  /* 当.card-hover类激活时显示遮罩 */
}

.time {
  font-size: 12px;
  color: #999;
}




.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  /* 下划线位置 */
  left: 0;
  width: 100%;
  /* 下划线宽度 */
  height: 2px;
  /* 下划线厚度 */
  background-color: #3498db;
  /* 下划线颜色，根据需求调整 */
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-image {
  width: 100%;
  display: block;
  border-radius: 4px;
}


.chart-container {
  height: 300px;
}

.charts {
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  margin-bottom: 20px;
}

/* 更多样式... */
</style>
