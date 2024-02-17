<template>
    <el-container class="experiment-introduction-container">
        <el-main>
            <el-card class="experiment-info-card">
                <div class="experiment-header">
                    <el-row :gutter="20">
                        <el-col :span="15">
                            <h1 class="experiment-title">客货滚装码头前沿精细化布置实验系统</h1>
                            <div class="experiment-meta">
                                <div>作者:<em>Nue</em></div>
                                <div>上线时间:<em>2024/2/9</em></div>
                            </div>
                            <div class="experiment-categories">
                                <el-tag>所属专业类:船舶</el-tag>
                                <el-tag>所属课程:船舶</el-tag>
                            </div>
                            <p class="experiment-introduction">
                                模拟客货滚装码头前沿作业区行人流、车流的交通行为，支持实时显示交通流密度。利用实验教学平台，观测码头前沿作业状态，探究功能区划分以及交通组织形式对客货滚装码头交通流的影响，掌握客货滚装码头前沿装卸工艺流程，认识客货滚装码头的绿色评价指标
                            </p>
                            <el-button v-if="checkRole()" type="primary" icon="el-icon-edit"
                                @click="doExperiment()">我要做实验</el-button>
                            <el-button v-if="!checkRole()" type="primary" icon="el-icon-edit"
                                @click="doExperiment()">编辑实验</el-button>
                        </el-col>
                        <el-col :span="9">

                            <div class="image-container">
                                <el-image
                                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 300px; height: 200px; object-fit: cover;"
                                :src="imgurl"
                                :fit="fit">
                              </el-image>
                              

                            </div>

                        </el-col>

                    </el-row>

                </div>
            </el-card>


            <el-card class="rating-card">
                <el-row :gutter="20">

                    <div class="rating-overview">
                        <el-col :span="8">
                            <div class="rating-score">
                                <div class="score-big">4.7</div>
                                <el-rate v-model="rating" show-score disabled></el-rate>

                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="rating-details">
                                <div class="detail-item">浏览人数 43825</div>
                                <div class="detail-item">实验人数 14799</div>
                                <div class="detail-item">实验总数 4218</div>
                                <div class="detail-item">实验平均时长 35'</div>
                                <div class="detail-item">实验通过率 100%</div>
                            </div>
                        </el-col>
                        <el-col :span="8" style="border-left: 1px solid #EEE;">
                            <div class="rating-chart">
                                <div ref="pieChart" class="pie-chart-container"></div>
                            </div>
                        </el-col>

                    </div>
                </el-row>

            </el-card>





            <el-row :gutter="20" style="margin-top: 20px;">
                <el-col :span="16">
                    <el-card>
                        <div class="experiment-details">
                            模拟客货滚装码头前沿作业区行人流、车流的交通行为，支持实时显示交通流密度。利用实验教学平台，观测码头前沿作业状态，探究功能区划分以及交通组织形式对客货滚装码头交通流的影响，掌握客货滚装码头前沿装卸工艺流程，认识客货滚装码头的绿色评价指标
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="support-section">
                        <div class="support">
                            <h3>教学支持热线</h3>
                            <p>电话号码...</p>
                        </div>
                    </el-card>
                    <el-card class="team-section">
                        <div class="team-members">
                            <h3>团队成员</h3>
                            <!-- Team member details -->
                        </div>
                    </el-card>
                </el-col>
            </el-row>

        </el-main>
    </el-container>
    <el-dialog v-model="isNotLogin" title="请登录" width="30%" center>
        <span>
            本实验需要登录才能做实验,是否前往登录界面?
        </span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="isNotLogin = false">取消</el-button>
                <router-link to="/login" style="margin-left:20px">
                    <el-button type="primary" @click="isNotLogin = false">
                        确认
                    </el-button>
                </router-link>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="studentRouter" title="做实验" width="30%" center>
        <span>
            跳转到做实验页面
        </span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="studentRouter = false">取消</el-button>
                <router-link to="/student/StudentListMaintenance" style="margin-left:20px">
                    <el-button type="primary" @click="studentRouter = false">
                        确认
                    </el-button>
                </router-link>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="teacherRouter" title="编辑实验" width="30%" center>
        <span>
            跳转到编辑实验页面(未开放)
        </span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="teacherRouter = false">取消</el-button>

                <el-button type="primary" @click="teacherRouter = false">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'RatingCard',
    data() {
        return {
            imgurl: require('@/assets/Pages/port1.png'),
            isNotLogin: false,
            rating: 4.7,
            pieChartData: [
                { value: 1048, name: '优秀' },
                { value: 735, name: '良好' },
                { value: 580, name: '不及格' },
            ],
            studentRouter: false,
            teacherRouter: false
        };
    },
    mounted() {
        this.initPieChart();
    },
    computed: {

    },
    methods: {
        checkRole() {
            const loginData = JSON.parse(localStorage.getItem("loginData"))
            if (loginData && loginData.role == '1') {
                return false
            } else {
                return true
            }
        },

        doExperiment() {
            this.loginData = JSON.parse(localStorage.getItem("loginData"))

            if (this.loginData == null) {
                this.isNotLogin = true
            } else {
                if (this.loginData.role == '1') {
                    this.teacherRouter = true
                } else {
                    this.studentRouter = true
                }
                // this.$router.push({ name: 'Detail', params: { id: id } });
                return this.isNotLogin = false
            }
        },
        initPieChart() {
            const pieChartDom = this.$refs.pieChart;
            const pieChart = echarts.init(pieChartDom);
            const pieChartOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },

                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.pieChartData.map(data => data.name),
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data: this.pieChartData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },

                        label: {
                            show: false, // 不显示扇区上的文字标签
                        },
                        labelLine: {
                            show: false, // 不显示指示线
                        },
                    },
                ],
            };
            pieChart.setOption(pieChartOption);
        }

    },
};
</script>





<style scoped lang="less">
.image-container {
    position: relative;
    height: 300px;
}

.rating-card {
    height: auto;
    padding: 20px;
}

.rating-overview {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}


.score-big {
    font-size: 2.5em;
    color: #FF6A00;
    margin-right: 10px;
}

.el-rate {
    margin-bottom: 10px;
}


.detail-item {
    color: #999;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 0.9em;
    margin-bottom: 10px;
}

.rating-details {
    border-left: 1px solid #EEE;
    padding-left: 20px;
}

.rating-chart {
    flex-shrink: 0;
    margin-left: 0px;
    padding-right: 20px;
}

.pie-chart-container {
    width: 400px;
    height: 150px;
}

.experiment-introduction-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.experiment-details {
    text-indent: 2em;
    padding: 30px;
    background-color: #f7f7f7;

    font-family: 'Arial', sans-serif;
    /* 选择一个清晰易读的字体 */
    color: #333;
    /* 设置文本颜色为深灰色，提高可读性 */
    font-size: 1rem;
    /* 设置基础字体大小为1rem，通常相当于16px */
    line-height: 1.6;
    /* 行高设置为字体大小的1.6倍，提高可读性 */
    text-align: justify;
    /* 两端对齐可以让段落看起来更整洁，但要注意不要让行间距过大 */
    padding: 15px;
    /* 设置内边距，让文本不会直接贴近边框 */
    margin: 0 0 20px 0;
    /* 设置外边距，与其他元素保持距离 */
    max-width: 800px;
    /* 限制最大宽度，过宽的文本行不利于阅读 */
    border-radius: 5px;
    /* 可选的，为容器添加圆角 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* 可选的，为容器添加轻微的阴影以提升层次感 */


}

.experiment-info-card,
.support-section,
.team-section {
    margin-bottom: 20px;
}

.experiment-header {
    padding: 10px;
}



.experiment-introduction {
    text-indent: 2em;
    margin-bottom: 15px;
    font-family: 'Arial', sans-serif;
    color: #333;
    font-size: 1rem;
    line-height: 1.6;
    text-align: justify;
    max-width: 800px;
}


.views em,
.pass-rate em {
    font-style: normal;
    color: #333;
}

.experiment-categories {
    margin: 15px 0;
}

.experiment-meta {
    font-family: 'Arial', sans-serif;
    /* 使用清晰可读的字体 */
    color: #333;
    /* 字体颜色为深灰色，易于阅读 */
    margin-bottom: 20px;
    /* 和其他元素保持适当的距离 */
}

.experiment-meta div {
    margin-bottom: 10px;
    /* 每个元数据项之间的间距 */
}

.experiment-meta em {
    font-style: normal;
    /* 移除em默认的斜体样式 */
    font-weight: bold;
    /* 突出显示重要信息 */
    color: #555;
    /* 给元数据的值设置稍微深一点的颜色 */
    margin-right: 4px;
    /* 在标签和值之间设置一点间距 */
}

/* 响应式设计，根据屏幕宽度调整显示 */
</style>
