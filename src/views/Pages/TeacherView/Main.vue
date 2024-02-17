<template>
  <el-card class="containner">
    <el-tabs type="border-card">
      <div v-for="(value, key, index) in experimentList">
        <el-tab-pane :label="value.name">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-select v-model="selectSemester" @change="changeSemester()" placeholder="请选择学年学期" size="large"
                no-data-text="服务器异常">
                <el-option v-for="item in selectClassInfo" :key="item.key" :label="item.value" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="selectState" @change="changeStateClass()" placeholder="请选择状态" size="large"
                no-data-text="服务器异常">
                <el-option v-for="item in selectStateInfo" :key="item.key" :label="item.value" :value="item.value" />
              </el-select>
            </el-col>

            <el-col :span="4">
              <el-button style="height:40px" size="middle" type="warning"
                @click="downloadAllHomework()">下载全部实验</el-button>
            </el-col>
          </el-row>
          <el-table :data="pagedTableData" :row-class-name="tableRowClassName">
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column prop="id" label="学号" align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="sname" label="学生姓名" align="center" min-width="50">
            </el-table-column>
            <el-table-column prop="starttime" label="学年学期" align="center">
            </el-table-column>
            <el-table-column prop="score" label="成绩" align="center">
            </el-table-column>
            <el-table-column label="评分" align="center" min-width="60">
              <template #default="scope">
                <el-input v-model="scope.row.score" :disabled="checkCss(scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="220">
              <template #default="scope">
                <div class="button-group" style="text-align:center">
                  <el-button class="action-button" type="primary" @click="rating(scope.row)">查看实验结果</el-button>
                  <el-button class="action-button" type="success"
                    @click="downloadHomeworkById(scope.row)">下载实验</el-button>
                  <el-button class="action-button" :type="isInt(scope.row.score) ? 'danger' : 'warning'"
                    @click="submit(scope.row)"> {{ isInt(scope.row.score) ? '重新评分' : '保存评分' }}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="studentsHomeworkInfo.length">
          </el-pagination>
        </el-tab-pane>
      </div>
    </el-tabs>
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
// import * as echarts from "echarts";
import axios from 'axios'

export default {
  data() {
    return {
      selectState: '',
      selectSemester: '',
      selectClassInfo: [
        { key: 0, value: '全部' },
        { key: 1, value: '2023年春季' },
        { key: 2, value: '2023年秋季' },
        { key: 3, value: '2024年秋季' },
      ],
      selectStateInfo: [
        { key: 3, value: '全部' },
        { key: 0, value: '已评分' },
        { key: 1, value: '未评分' },
        { key: 2, value: '待提交' },

      ],
      currentPage: 1,
      pageSize: 10,
      experimentList: [
        { id: 1, name: '客货滚装码头前沿精细化布置实验系统' },
        { id: 2, name: '海港航道数值仿真实验系统' },
        { id: 3, name: '集装箱码头生产作业3D仿真实验' },
      ],
      studentsHomeworkInfo: [
        {
          id: '20006380201',
          sname: 'test',
          grade: '',
          class: "医工20002",
          starttime: "2023年秋季",
          filehome: '数学实验',
          score: '95',
          endtime: '2022-10-05',
          reload: '1',
          isopen: false,
        },

      ],
      backupStudentsHomeworkInfo: '',
    };
  },
  computed: {
    pagedTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.backupStudentsHomeworkInfo.slice(start, end);
    },


  },
  methods: {
    筛选数据() {
      let res = this.studentsHomeworkInfo;

      if (this.selectSemester !== '全部') {
        res = res.filter(item => item.starttime.includes(this.selectSemester));
      }

      if (this.selectState !== '全部') {
        if (this.selectState == '已评分') {
          res = res.filter(item => this.isInt(item.score));
        } else {
          res = res.filter(item => item.score.includes(this.selectState));
        }

      }

      this.backupStudentsHomeworkInfo = res;
    },
    changeStateClass() {
      this.筛选数据()
    },
    changeSemester() {
      this.筛选数据()
    },
    submit(scope) {
      scope.isopen = true
    },
    isInt(value) {
      return /^-?\d+(\.\d+)?$/.test(value);
    },
    checkCss(data) {
      if (data.isopen == true) {
        return false
      } else {
        if (data.score == '未评分') {
          return false
        } else {
          return true
        }

      }
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1;
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.score == '未评分') {
        return 'warning-row';
      } else if (row.score == '待提交') {
        return 'error-row';
      }
      return '';
    },

    handleSelect(row) {
      this.currentTable = row;
    },
  },
  mounted() {

    const scores = ['95', '未评分', '待提交'];
    const semester = ['2023年春季', '2024年秋季', '2023年秋季'];
    for (let i = 1; i < 20; i++) {
      const newStudent = JSON.parse(JSON.stringify(this.studentsHomeworkInfo[0]));
      newStudent.id = (parseInt(newStudent.id) + i).toString();
      newStudent.score = scores[i % scores.length];
      newStudent.starttime = semester[i % semester.length];
      this.studentsHomeworkInfo.push(newStudent);
    }
    this.backupStudentsHomeworkInfo = JSON.parse(JSON.stringify(this.studentsHomeworkInfo));
    console.log(this.backupStudentsHomeworkInfo)
  },
  created() {

  },

};
</script>
      
<style lang="scss" scoped>
.containner {
  margin-top: 20px;
}

.el-table ::v-deep .warning-row td {
  background: rgba(204, 224, 255, 0.477) !important;

}



.el-table ::v-deep .error-row {
  background: #fae9e4 !important;
}
</style>
      