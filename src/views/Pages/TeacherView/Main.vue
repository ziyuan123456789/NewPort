<template>
  <el-card class="containner">
    <!-- <h1 style="text-align:center">案例港区</h1>
      <el-select v-model="selectTeachPortId" @change="changeTeachPort()" placeholder="请选择湾区" size="large">
        <el-option v-for="item in TeachPortKinds" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">港口规模及设计船型
        </el-menu-item>
        <el-menu-item index="2">
          气/海象及地质等
        </el-menu-item>
        <el-menu-item index="3"> 乘潮水位累积频率曲线
        </el-menu-item>
        <el-menu-item index="4">
          手工仿真
        </el-menu-item>
        <el-menu-item index="5">航道主尺寸</el-menu-item>
        <el-menu-item index="6">航道仿真实验
        </el-menu-item>
  
      </el-menu>
      <div v-if="currentTable == 1">
        <el-table :data="tableDataPortScale" style="width: 100%">
          <el-table-column prop="tonnage" label="泊位吨级DWT(吨)" align="center"></el-table-column>
          <el-table-column prop="type" label="货种" align="center"></el-table-column>
          <el-table-column prop="number" label="数量" align="center"></el-table-column>
          <el-table-column prop="tonnage" label="备注" align="center"></el-table-column>
        </el-table>
      </div>
      <el-divider />
      <br>
      <br> -->
    <!-- <el-page-header v-if="classInfo && classInfo.classid"> -->
    <!-- <el-select v-model="selectStudentClassGroupId" @change="changeStudentClassGroup()" placeholder="请选择课程" size="large">
        <el-option v-for="item in studentClassGroup" :key="item.value" :label="item.label" :value="item.value" />
      </el-select> -->
    <!-- <el-select v-model="selectClassGroupId" @change="changeClassGroup()" placeholder="请选择专业" size="large">
      <el-option v-for="item in ClassGroup" :key="item.id" :label="item.groupname" :value="item.id" />
    </el-select> -->
    <el-select v-model="selectClassId" @change="changeClass()" placeholder="请选择班级" size="large"
      no-data-text="请先选择专业才可选择课程">
      <el-option v-for="item in selectClassInfo" :key="item.id" :label="item.classname" :value="item.id" />
    </el-select>
    <el-select v-model="selectHomeworkId" @change="changeHomework()" placeholder="请选择实验" size="large"
      no-data-text="请先选择课程才可选择实验">
      <el-option v-for="item in selectHomeworkInfo" :key="item.id" :label="item.homeworkname" :value="item.id" />
    </el-select>
    <el-button size="middle" type="warning" @click="downloadAllHomework()">下载全部实验</el-button>
    <div>
      <el-table :data="studentsHomeworkInfo" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column label="序号" type="index" width="10" align="center">
        </el-table-column>
        <el-table-column prop="sname" width="150" label="学生姓名" align="center">
        </el-table-column>
        <el-table-column prop="starttime" width="100" label="开课时间" align="center">
        </el-table-column>
        <el-table-column prop="class" width="200" label="班级" align="center">
        </el-table-column>
        <el-table-column prop="filehome" width="200" label="实验名" align="center">
        </el-table-column>
        <el-table-column prop="score" label="成绩" width="100" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button size="middle" type="success" @click="rating(scope.row)">查看实验结果</el-button>
            <el-button size="middle" type="success" @click="downloadHomeworkById(scope.row)">下载实验</el-button>
            <el-button size="middle" type="success" @click="rating(scope.row)">评分</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </el-card>
  <el-dialog v-model="updateFalg" title="上传文件" width="50%">
    <el-upload class="avatar-uploader el-upload--text" :drag="{ Plus }" action="http://localhost:8089/upload" multiple
      :show-file-list="false" :data="this.updateParm" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo"
      :on-progress="uploadVideoProcess">

      <i v-if="Plus" class="el-icon-upload"></i>
      <div v-if="Plus" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent"
        style="margin-top:30px;"></el-progress>
      <div v-if="Plus" class="el-upload__tip" slot="tip">什么都能上传</div>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="(updateFalg = false)">取消</el-button>
        <el-button type="primary" @click="(updateFalg = false)" v-model="dialogVisible">完成</el-button>
      </span>
    </template>
  </el-dialog>

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
      selectStudentClassGroupId: '',
      studentClassGroup: [],
      progressBar: 0,
      dialogVisibledownload: false,
      socket: null,
      messages: [],
      // studentsHomeworkInfo: [

      // ],
      selectHomeworkInfo: [

      ],
      selectHomeworkId: '',
      classInfoShowLabel: {

      },
      selectClassInfo: [

      ],
      selectClassId: '',
      selectClassGroupId: '',
      updateParm: { stuId: 1, taskId: '' },
      classInfo: [],
      studentsHomeworkInfo: [
        {
          sname: 'test',
          class:"医工20002",
          starttime:"2023/12",
          filehome: '数学实验',
          state: '实验已提交',
          score: '95',
          endtime: '2022-10-05',
          reload: '1'
        },
        {
          sname: 'test',
          class:"医工20002",
          starttime:"2023/12",
          filehome: '物理实验',
          state: '实验已经过期',
          score: '未评分',
          endtime: '2022-09-20',
          reload: '0'
        },
        {
          sname: 'test',
          class:"医工20002",
          starttime:"2023/12",
          filehome: '化学实验',
          state: '实验进行中',
          score: '待提交',
          endtime: '2022-11-01',
          reload: '0'
        },
        {
          sname: 'test',
          class:"医工20002",
          starttime:"2023/12",
          filehome: '生物实验',
          state: '实验已提交',
          score: '88',
          endtime: '2022-10-12',
          reload: '0'
        },
        {
          sname: 'test',
          class:"医工20002",
          starttime:"2023/12",
          filehome: '地理实验',
          state: '实验进行中',
          score: '待提交',
          endtime: '2022-12-15',
          reload: '0'
        }
      ],
      updateFalg: false,
      Plus: true,
      videoUploadPercent: 0,
      ClassGroup: [],
      TeachPortKinds: [],
      selectTeachPortId: '',
      currentTable: 1,
      tableDataPortScale: [],

    };
  },
  methods: {
    changeStudentClassGroup() {

      axios.get('http://localhost:8089/getHomeworkInfoByClassId', {
        params: {
          studentid: 1,
          classid: this.selectStudentClassGroupId
        }
      }).then((res) => {
        // this.homeworkInfo = res.data.data
      }).catch((err) => {
        console.log(err);
      });
    },
    onOpen(event) {
      console.log('WebSocket 连接已打开');
    },
    onMessage(event) {

      this.progressBar = parseInt(event.data)
      console.log(this.progressBar)
    },
    onClose(event) {
      console.log('WebSocket 连接已关闭');
    },
    onError(event) {
      console.error('WebSocket 错误:', event);
    },
    sendMessage() {
      // 发送消息到服务器端
      const message = {
        content: 'Hello, server!'
      };
      this.socket.send(JSON.stringify(message));
    },




    downloadAllHomework() {
      this.dialogVisibledownload = !this.dialogVisibledownload
      const token = localStorage.getItem("token");
      console.log(token)
      axios.get('http://localhost:8089/files', {
        params: {
          homeworkId: this.selectHomeworkId
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'download.zip');
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(error => {
          console.error(error);
        });
    },
    rating(row) {
      this.$router.push('/teacher/CourseMain');

    },
    downloadHomeworkById(row) {
      const token = localStorage.getItem("token");
      axios.get('http://localhost:8089/downloadfileByTaskId', {
        params: {
          taskid: row.id
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', row.filehome.substring(row.filehome.indexOf('-') + 1));
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(error => {
          console.error(error);
        });

    },
    downloadHomework(row) {
      alert(row.id)
    },
    changeHomework() {
      axios.get('http://localhost:8089/getFinishedHomeworkListByHomeworkId', {
        params: {
          homeworkId: this.selectHomeworkId
        }
      }).then((res) => {
        // this.studentsHomeworkInfo = res.data.data

      }).catch((err) => {
        console.log(err);
      });
    },
    changeClass() {

      axios.get('http://localhost:8089/getHomeworkListByClassId', {
        params: {
          classId: this.selectClassId
        }
      }).then((res) => {
        // this.selectHomeworkInfo = []
        this.selectHomeworkId = ''
        for (var i = 0; i < res.data.data.length; i++) {
          this.selectHomeworkInfo.push({
            id: res.data.data[i].id,
            homeworkname: res.data.data[i].homeworkname
          })
        }
        console.log(this.selectHomeworkInfo)

      }).catch((err) => {
        console.log(err);
      });
    },
    changeClassGroup() {
      axios.get('http://localhost:8089/getClassesListByTeacherIdClassGroupId', {
        params: {
          classGroupId: this.selectClassGroupId,
          teacherId: 1
        }
      }).then((res) => {
        this.selectClassInfo = []
        this.selectClassId = ''
        for (var i = 0; i < res.data.data.length; i++) {
          this.selectClassInfo.push({
            id: res.data.data[i].id,
            classname: res.data.data[i].classname
          })
        }
        console.log(this.selectClassInfo)

      })
        .catch((err) => {
          console.log(err);
        });
    },


    beforeUploadVideo(file) {
      const isLt300M = file.size / 1024 / 1024 < 300
      if (0) {
        // if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLt300M) {
        this.$message.error('上传视频大小不能超过300MB哦!')
        return false
      }
    },
    uploadVideoProcess(event, file, fileList) {
      this.Plus = false
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0)
    },
    handleVideoSuccess(res, file) {
      this.Plus = false
      this.videoUploadPercent = 100
      console.log(res.url)
      console.log(this.goodsid)
      this.$message.success('视频上传成功！')
    },
    goToDoHomework(row) {
      this.updateFalg = true,
        console.log(row.id)
      this.updateParm.taskId = row.id
      row.state = "实验已提交"
    },
    handleSelect(row) {
      this.currentTable = row;
    },
    changeTeachPort() {
      axios.get('http://localhost:8089/getBerthsByPort', {
        params: {
          portId: this.selectTeachPortId

        }
      }).then((res) => {
        this.tableDataPortScale = res.data.data
        this.classname = res.data.data[0]
      })
        .catch((err) => {
          console.log(err);
        });
    }



  },
  mounted() {

    axios.get('http://localhost:8089/getClassInfoByTeacherId', {
      params: {
        teacherId: 1

      }
    }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        this.ClassGroup.push({
          id: res.data.data[i].id,
          groupname: res.data.data[i].groupname
        })
      }
    })
      .catch((err) => {
        console.log(err);
      });





    axios.get('http://localhost:8089/getClassInfoByStudentsId?id=1', {
      params: {


      }
    }).then((res) => {
      for (var i = 0; i < res.data.data.length; i++) {
        this.studentClassGroup.push({ label: res.data.data[i].classname, value: res.data.data[i].keyclassid })
      }
    })
      .catch((err) => {
        console.log(err);
      });








    axios.get('http://localhost:8089/selectAllTeachInfo', {
      params: {

      }
    }).then((res) => {
      console.log(res.data.data)
      for (var i = 0; i < res.data.data.length; i++) {
        this.TeachPortKinds.push({
          id: res.data.data[i].id,
          name: res.data.data[i].name
        })
      }

    })
      .catch((err) => {
        console.log(err);
      });
  },
  created() {
    this.socket = new WebSocket('ws://localhost:8089/websocket/wzy');
    this.socket.onopen = this.onOpen;
    this.socket.onmessage = this.onMessage;
    this.socket.onclose = this.onClose;
    this.socket.onerror = this.onError;
  },

};
</script>
      
<style>
.containner {
  margin-top: 20px
}
</style>
      