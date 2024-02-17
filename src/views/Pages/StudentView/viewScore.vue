<template>
    <el-card class="containner">

        <div>
            <el-table :data="studentsHomeworkInfo" :row-class-name="tableRowClassName">
                <el-table-column type="index" label="序号" width="60" align="center">
                </el-table-column>
                <el-table-column prop="id" label="作业编号" align="center">
                </el-table-column>
                <el-table-column prop="sname" label="实验名" align="center">
                </el-table-column>
                <el-table-column prop="score" label="分数" align="center">
                </el-table-column>

                <el-table-column align="center" label="操作">
                    <template #default="scope">
                        <div class="button-group" style="text-align:center">
                            <el-button :disabled="!(scope.row.score !== '待提交')" class="action-button" type="warning"
                                @click="rating(scope.row)">下载附件</el-button>
                            <el-button :disabled="!(scope.row.score !== '待提交')" class="action-button" type="success"
                                @click="rating(scope.row)">查看实验</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

        </div>

    </el-card>
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
                    sname: '海港航道数值仿真实验系统',
                    score: '89',
                },
                {
                    id: '2',
                    sname: '集装箱码头生产作业3D仿真实验',
                    score: '待提交',
                },
                {
                    id: '3',
                    sname: '客货滚装码头前沿精细化布置实验系统',
                    score: '未评分',
                },
            ],
        };
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
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
        
<style lang="scss" scoped>
.containner {
    margin-top: 20px
}

.el-table ::v-deep .warning-row td {
    background: rgba(204, 224, 255, 0.477) !important;

}

.el-table ::v-deep .error-row {
    background: #fae9e4 !important;
}
</style>
        