<template>
    <el-row :gutter="20">
        <!-- 信息卡片 -->
        <el-col :span="6" v-for="item in items" :key="item.id">
            <el-card>
                <img :src="item.image" class="image" alt="Card image">
                <div style="padding: 14px;">
                    <span>{{ item.title }}</span>
                    <div class="bottom clearfix">
                        <time class="time">{{ item.time }}</time>
                        <el-button type="text" class="button">操作按钮</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>

        <!-- 数据可视化图表 -->
        <el-col :span="6">
            <!-- 以 echart 为例 -->
            <!-- 确保你已经安装了 echarts 并在你的组件中引入了 -->
            <div ref="pieChart" class="chart-container"></div>
            <!-- 其他图表 -->
        </el-col>
    </el-row>
</template>
  
<script>
import * as echarts from 'echarts';

export default {
    data() {
        return {
            items: [
                // 假设的数据
                { id: 1, title: 'Card title 1', image: 'link-to-image-1.png', time: '3 mins ago' },
                { id: 2, title: 'Card title 2', image: 'link-to-image-2.png', time: '5 mins ago' },
                // ...更多卡片
            ]
        };
    },
    mounted() {
        this.initPieChart();
    },
    methods: {
        initPieChart() {
            const chartDom = this.$refs.pieChart;
            const myChart = echarts.init(chartDom);
            const option = {
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '搜索引擎' },
                            { value: 735, name: '直接访问' },
                            { value: 580, name: '邮件营销' },
                            { value: 484, name: '联盟广告' },
                            { value: 300, name: '视频广告' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            option && myChart.setOption(option);
        }
    }
}
</script>
  
<style lang="scss" scoped>
.image {
    width: 100%;
    display: block;
}

.chart-container {
    height: 400px;
    width: 100%;
}

/* 其他样式 */
</style>
  