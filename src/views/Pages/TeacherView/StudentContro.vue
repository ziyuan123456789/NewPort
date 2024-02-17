<template>
    <el-card class="containner">
        <div>
            <el-button style="height:40px;margin-right:40px" size="middle" type="success">下载生成模板</el-button>
            <el-button style="height:40px;margin-right:40px" size="middle" type="warning"
                @click="openUpload()">上传生成名单</el-button>
        </div>
    </el-card>

    <el-card class="containner">
        <div>
            <el-select style="margin-right:40px" v-model="selectSemester" @change="changeSemester()" placeholder="请选择学年学期"
                size="large" no-data-text="服务器异常">
                <el-option v-for="item in selectClassInfo" :key="item.key" :label="item.value" :value="item.value" />
            </el-select>
            <el-input @input="selectStudentName()" v-model="inputName" placeholder="输入学生姓名" size="large"
                style="width:222.2px;margin-right:40px" />
        </div>
        <div>
            <el-table :data="backupStudentsHomeworkInfo" :row-class-name="tableRowClassName">
                <el-table-column type="index" label="序号" width="60" align="center">
                </el-table-column>
                <el-table-column prop="id" label="学号" align="center">
                </el-table-column>
                <el-table-column prop="sname" label="学生姓名" align="center">
                </el-table-column>
                <el-table-column prop="starttime" label="开课时间" align="center">
                </el-table-column>

                <el-table-column align="center" label="操作">
                    <template #default="scope">
                        <div class="button-group" style="text-align:center">

                            <el-button class="action-button" type="warning" @click="rating(scope.row)">重置密码</el-button>
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
    <el-dialog v-model="openUploadMark" title="名单上传" width="50%">
        <div style="text-align:center">
            <el-upload class="upload-demo" drag action="" multiple :before-upload="beforeUpload">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">拖拽 <em>点击以上传</em></div>
                <template #tip>
                    <div class="el-upload__tip">只接受CSV/EXCEL文件</div>
                </template>
            </el-upload>
        </div>
    </el-dialog>
</template>
        
<script>
import { ElMessage } from 'element-plus'
import * as echarts from "echarts";
import axios from 'axios'

export default {
    data() {
        return {
            inputName:'',
            selectSemester: '',
            backupStudentsHomeworkInfo: [],
            openUploadMark: false,
            selectClassInfo: [
                { key: 0, value: '全部' },
                { key: 1, value: '2023年春季' },
                { key: 2, value: '2023年秋季' },
                { key: 3, value: '2024年秋季' },
            ],
            studentsHomeworkInfo: [
                {
                    id: '20006380202',
                    sname: 'test',
                    grade: '',
                    class: "医工20002",
                    starttime: "2023年春季",
                },
                {
                    id: '20006380203',
                    sname: 'test',
                    grade: '',
                    class: "医工20002",
                    starttime: "2023年秋季",
                },
                {
                    id: '20006380203',
                    sname: 'test',
                    grade: '',
                    class: "医工20002",
                    starttime: "2023年秋季",
                },
                {
                    id: '20006380204',
                    sname: 'test',
                    grade: '',
                    class: "医工20002",
                    starttime: "2023年秋季",
                },
                {
                    id: '20006380205',
                    sname: 'test',
                    grade: '',
                    class: "医工20002",
                    starttime: "2023年秋季",
                }
            ],
        };
    },
    methods: {
        dataChange() {
            let res = this.studentsHomeworkInfo;
            if (this.selectSemester !== '全部') {
                res = res.filter(item => item.starttime.includes(this.selectSemester));
            }
            if (this.selectState !== '') {
                res = res.filter(item => item.sname.includes(this.inputName));
            }
            this.backupStudentsHomeworkInfo = res;
        },
        changeSemester() {
            this.dataChange()
        },
        selectStudentName() {
            this.dataChange()
        },
        beforeUpload(file) {
            const isCSV = file.type === 'text/csv';
            const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isCSV && !isExcel) {
                ElMessage({
                    message: '上传文件只能是 CSV 或 Excel 格式!',
                    type: 'error'
                })
                return false;
            }
            if (!isLt2M) {
                ElMessage({
                    message: '上传文件超过2MB大小',
                    type: 'error'
                })
                return false;
            }
            return true;
        },
        openUpload() {
            this.openUploadMark = true
        },
        tableRowClassName({ row, rowIndex }) {
            return '';
        },

        handleSelect(row) {
            this.currentTable = row;
        },
    },
    mounted() {
        this.backupStudentsHomeworkInfo = JSON.parse(JSON.stringify(this.studentsHomeworkInfo));
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
        