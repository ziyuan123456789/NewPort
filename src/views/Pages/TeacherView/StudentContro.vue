<template>
    <el-card class="containner">
        <el-row :gutter="20">
            <el-col :span="4"><el-select v-model="selectClassId" @change="changeClass()" placeholder="选择入学年份" size="large"
                    no-data-text="请先选择专业才可选择课程">
                    <el-option v-for="item in selectClassInfo" :key="item.id" :label="item.classname" :value="item.id" />
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select v-model="selectHomeworkId" @change="changeHomework()" placeholder="选择学期" size="large"
                    no-data-text="请先选择课程才可选择实验">
                    <el-option v-for="item in selectHomeworkInfo" :key="item.id" :label="item.homeworkname"
                        :value="item.id" />
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-button style="height:40px" size="middle" type="warning"
                    @click="downloadAllHomework()">上传生成名单</el-button>
            </el-col>
        </el-row>

        <div>
            <el-table :data="studentsHomeworkInfo" :row-class-name="tableRowClassName">
                <el-table-column type="index"  label="序号" width="60" align="center">
                </el-table-column>
                <el-table-column prop="id" label="学号" align="center" min-width="50">
                </el-table-column>
                <el-table-column prop="sname" label="学生姓名" align="center" min-width="50">
                </el-table-column>
                <el-table-column prop="starttime" label="开课时间" align="center">
                </el-table-column>

                <el-table-column align="center" label="操作" min-width="220">
                    <template #default="scope">
                        <div class="button-group" style="text-align:center">
                            <el-button class="action-button" type="primary" @click="rating(scope.row)">查看实验结果</el-button>
                            <el-button class="action-button" type="success"
                                @click="downloadHomeworkById(scope.row)">下载实验</el-button>
                            <el-button class="action-button" type="warning" @click="rating(scope.row)">保存评分</el-button>
                        </div>
                    </template>


                </el-table-column>
            </el-table>

        </div>

    </el-card>


    <el-dialog v-model="dialogVisibledownload" title="打包进度" width="30%">
        <div style="text-align:center">
            <el-progress type="circle" :percentage="progressBar" status="success" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="dialogVisibledownload = false">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
        
<script>
import { ElMessage } from 'element-plus'
import * as echarts from "echarts";
import axios from 'axios'

export default {
    data() {
        return {
            studentsHomeworkInfo: [
                {
                    id: '1',
                    sname: 'test',
                    grade: '',
                    class: "医工20002",
                    starttime: "2023/12",
                    filehome: '数学实验',
                    state: '实验已提交',
                    score: '95',
                    endtime: '2022-10-05',
                    reload: '1'
                },
                {
                    id: '2',
                    sname: 'test',
                    grade: '',
                    class: "医工20002",
                    starttime: "2023/12",
                    filehome: '物理实验',
                    state: '实验已经过期',
                    score: '未评分',
                    endtime: '2022-09-20',
                    reload: '0'
                },
                {
                    id: '3',
                    sname: 'test',
                    grade: '',
                    class: "医工20002",
                    starttime: "2023/12",
                    filehome: '化学实验',
                    state: '实验进行中',
                    score: '待提交',
                    endtime: '2022-11-01',
                    reload: '0'
                },
                {
                    id: '4',
                    sname: 'test',
                    grade: '',
                    class: "医工20002",
                    starttime: "2023/12",
                    filehome: '生物实验',
                    state: '实验已提交',
                    score: '88',
                    endtime: '2022-10-12',
                    reload: '0'
                },
                {
                    id: '5',
                    sname: 'test',
                    grade: '',
                    class: "医工20002",
                    starttime: "2023/12",
                    filehome: '地理实验',
                    state: '实验进行中',
                    score: '待提交',
                    endtime: '2022-12-15',
                    reload: '0'
                }
            ],
        };
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            if (row.score == '未评分') {
                console.log('未评分')
                return 'warning-row';
            } else if (row.score == '待提交') {
                console.log('待提交')
                return 'error-row';
            }
            return '';
        },

        handleSelect(row) {
            this.currentTable = row;
        },
    },
    mounted() {

    },
    created() {

    },

};
</script>
        
<style scoped>
.containner {
    margin-top: 20px
}

.el-table /deep/ .warning-row td {
    background: rgba(204, 224, 255, 0.477) !important;

}



.el-table /deep/ .error-row {
    background: #fae9e4 !important;
}
</style>
        