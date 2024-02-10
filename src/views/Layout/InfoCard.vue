<template>
    <el-card class="outer-card">
        <el-row :gutter="40">
            <el-col :span="8">
                <div class="image-container">
                    <img src="https://lab.huaweicloud.com/static/img/_20190520143516.c063972c.png" alt="描述性文本" />
                </div>
            </el-col>
            <el-col :span="16">
                <div class="content-container">
                    <div class="centered-content">
                        <h2 class="h2dev">开发者实验室</h2>
                        <p class="pdev">
                            秉持引导性实验教学理念，以培养学生实验设计能力、工程分析能力以及创新思维能力为目标，结合国家自然科学基金项目等科研成果，本专业在国内率先开设集综合性、设计性及系统性为一体的“港口航道与海岸工程专业港口数值仿真实验”。该实验综合利用互联网、系统仿真、3D建模、数据库等技术，实现“互联网+数值仿真实验教学平台”，覆盖港口水、陆域生产作业的三维仿真模拟，打破时间、空间限制，为学生实验提供开放、安全的实验平台，以加深对《港口规划与布置》等专业核心课程理解，使本科生实验教学与本行业新的就业需求和前沿技术相适应，提高学生解决复杂工程问题的能力。
                        </p>
                        <el-link type="primary">了解更多</el-link>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>
  
<script>
export default {
    name: 'InfoCard'
};
</script>
  
<style scoped>
.pdev {
    margin: 12px 0;
    font-size: 16px;
    color: #575d6c;
    line-height: 24px;

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
    padding: 15px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .1);
    display: flex;

}

.image-container img {
    width: 100%;
    /* 图片宽度 */
    height: auto;
    /* 图片高度自动 */

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
