<template>
    <el-card class="box-card">
        <div style="text-align:center">
            <iframe width="1200" height="650" allow="fullscreen"
                src="http://120.25.213.148:8888/#/face?ticket=vB5K03JzUsSf65XxEJx5ahYL1hVPOh8iuXTMYZW0u%2BfkwH2E%2FFpDhgtT5d0IajbgrXED4%2FXmlWkUuQTV5a7XzK1Z0AeJAbksTMk7HuhKwYw%3D&token=AAABiLlUu14BAAAAAAABly4%3D.wsVEuNZ26YG%2FPm9rrW6eBOjlPf1%2FC2o%2FprwIgpLkiNX5SUnZjaJefsbzySoj03J3TmUwXztSOWvhE%2BlDqfWZPO3lKvfCpks9Q6Lk2aMgu%2Fw%3D.3Blo05JGhQF%2B0VFkSgGHRMh%2B7It5IUP44OLacgNvCV0%3D"></iframe>
        </div>
        <el-form>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="序号" type="index" width="100" align="center">
                </el-table-column>
                <el-table-column prop="numqc" label="numqc" align="center">
                    <template #default="scope">
                        <el-input v-model="scope.row.numqc" type="text"
                            @change="onChange(scope.$index, scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="numit" label="numit" align="center">
                    <template #default="scope">
                        <el-input v-model="scope.row.numit" type="text"
                            @change="onChange(scope.$index, scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="qqct1" label="qqct1" align="center">
                    <template #default="scope">
                        <el-input v-model="scope.row.qqct1" type="text"
                            @change="onChange(scope.$index, scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="qqct2" label="qqct2" align="center">
                    <template #default="scope">
                        <el-input v-model="scope.row.qqct2" type="text"
                            @change="onChange(scope.$index, scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="bst" label="bst" align="center">
                    <template #default="scope">
                        <el-input v-model="scope.row.bst" type="text"
                            @change="onChange(scope.$index, scope.row)"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align:center;margin-top:10px">
                <el-button type="success" style="margin-right:20px">提交</el-button>
                <el-button type="success" style="margin-right:20px">提交报告</el-button>
            </div>

        </el-form>
    </el-card>
</template>
  
<script>
export default {
    data() {
        return {
            // 假数据初始化
            tableData: [
                { numqc: '12', numit: '2', qqct1: '1', qqct2: '1', bst: '' },
                // 根据需要增加更多行
            ],
        };
    },
    methods: {
        onChange(index, row) {
            console.log(`Row ${index + 1} changed`, row);
            // 在这里实现数据更新到后台的逻辑
            // 可以使用 axios 或其他 HTTP 库发送更新请求
        },
    },
};
</script>
  
<style scoped>
.box-card {
    margin: 20px;
    padding: 20px;
}</style>
  