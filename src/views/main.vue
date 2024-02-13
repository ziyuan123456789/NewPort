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
              <el-card @mouseenter="handleMouseEnter(experiment.id)" @mouseleave="handleMouseLeave(experiment.id)"
                @click="toDetailPageById(experiment.id)" :class="{ 'card-hover': experiment.hover }">
                <img :src="experiment.image" class="card-image" alt="实验图片">
                <div v-if="!experiment.hover" style="padding: 14px;">
                  <span>{{ experiment.title }}</span>
                  <div class="bottom clearfix">
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
          <div class="section-title">数据统计</div>
          <div class="charts">
            <div ref="pieChart" class="chart-container"></div>
          </div>
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
      experiments: [
        { id: 1, title: '海港航道数值仿真实验系统', image: 'https://www.ilab-x.com/imgview/92085_260x156.jpg', time: '5.0分', description: '学生自行设计航道设计方案，应用船舶交通流仿真模型，挖掘航道线数、航道长度、通航水位、船舶航速等与航道通航效率的定量关系，为合理规划航道提供依据', hover: false },
        { id: 2, title: '集装箱码头生产作业3D仿真实验', image: 'https://www.ilab-x.com/imgview/24601_260x156.jpg', time: '4.7分', description: '实验平台实现集装箱码头陆域装卸作业的3D仿真模拟，加深学生对集装箱码头装卸工艺的理解。应用实验教学平台，挖掘装卸机械配比及效率与港口作业效率的定量关系，掌握集装箱码头装卸工艺选择的量化指标与评价方法。', hover: false },
        { id: 3, title: '客货滚装码头前沿精细化布置实验系统', image: 'https://www.ilab-x.com/imgview/24601_260x156.jpg', time: '4.7分', description: '模拟客货滚装码头前沿作业区行人流、车流的交通行为，支持实时显示交通流密度。利用实验教学平台，观测码头前沿作业状态，探究功能区划分以及交通组织形式对客货滚装码头交通流的影响，掌握客货滚装码头前沿装卸工艺流程，认识客货滚装码头的绿色评价指标', hover: false },
      ],
      hover: false,
    };
  },
  mounted() {
    this.initPieChart();
  },
  methods: {
    toDetailPageById(id) {

      this.$router.push({ name: 'Detail', params: { id: id } });

    },
    initPieChart() {
      const chartDom = this.$refs.pieChart;
      const myChart = echarts.init(chartDom);
      const option = {
        // ECharts 配置项
      };
      myChart.setOption(option);
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

<style scoped>
.el-card {
  position: relative;
  /* 确保卡片使用相对定位 */
  overflow: hidden;
  /* 防止遮罩层溢出卡片 */
}

.card-description {
  position: absolute;
  /* 使用绝对定位 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  /* 半透明背景作为遮罩 */
  color: white;
  /* 遮罩内文字颜色 */
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

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
