<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px" size="small">
      <el-form-item label="bean名称" prop="beanName">
        <el-input v-model="dataForm.beanName" placeholder="spring bean名称, 如: testTask"></el-input>
      </el-form-item>
      <el-form-item label="方法名称" prop="methodName">
        <el-input v-model="dataForm.methodName" placeholder="方法名称"></el-input>
      </el-form-item>
      <el-form-item label="参数" prop="params">
        <el-input v-model="dataForm.params" placeholder="参数"></el-input>
      </el-form-item>
      <el-form-item label="cron表达式" prop="cronExpression">
        <el-input v-model="dataForm.cronExpression" placeholder="如: 0 0 12 * * ?"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false" size="small">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" size="small">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { jobInfo, jobDataFormSubmit } from "@/api/sys";
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        beanName: "",
        methodName: "",
        params: "",
        cronExpression: "",
        remark: "",
        status: 0
      },
      dataRule: {
        beanName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        methodName: [
          { required: true, message: "方法名称不能为空", trigger: "blur" }
        ],
        cronExpression: [
          { required: true, message: "cron表达式不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(async () => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          const { data } = await jobInfo(
            `/sys/schedule/info/${this.dataForm.id}`
          );
          if (data && data.code === 0) {
            this.dataForm.beanName = data.schedule.beanName;
            this.dataForm.methodName = data.schedule.methodName;
            this.dataForm.params = data.schedule.params;
            this.dataForm.cronExpression = data.schedule.cronExpression;
            this.dataForm.remark = data.schedule.remark;
            this.dataForm.status = data.schedule.status;
          }

          // this.$http({
          //   url: this.$http.adornUrl(`/sys/schedule/info/${this.dataForm.id}`),
          //   method: "get",
          //   params: this.$http.adornParams()
          // }).then(({ data }) => {
          //   if (data && data.code === 0) {
          //     this.dataForm.beanName = data.schedule.beanName;
          //     this.dataForm.methodName = data.schedule.methodName;
          //     this.dataForm.params = data.schedule.params;
          //     this.dataForm.cronExpression = data.schedule.cronExpression;
          //     this.dataForm.remark = data.schedule.remark;
          //     this.dataForm.status = data.schedule.status;
          //   }
          // });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(async valid => {
        if (valid) {
          const params = {
            jobId: this.dataForm.id || undefined,
            beanName: this.dataForm.beanName,
            methodName: this.dataForm.methodName,
            params: this.dataForm.params,
            cronExpression: this.dataForm.cronExpression,
            remark: this.dataForm.remark,
            status: !this.dataForm.id ? undefined : this.dataForm.status
          };
          const { data } = await jobDataFormSubmit(
            `/sys/schedule/${!this.dataForm.id ? "save" : "update"}`,
            params
          );
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.visible = false;
                this.$emit("refreshDataList");
              }
            });
          } else {
            this.$message.error(data.msg);
          }

          // this.$http({
          //   url: this.$http.adornUrl(
          //     `/sys/schedule/${!this.dataForm.id ? "save" : "update"}`
          //   ),
          //   method: "post",
          //   data: this.$http.adornData({
          //     jobId: this.dataForm.id || undefined,
          //     beanName: this.dataForm.beanName,
          //     methodName: this.dataForm.methodName,
          //     params: this.dataForm.params,
          //     cronExpression: this.dataForm.cronExpression,
          //     remark: this.dataForm.remark,
          //     status: !this.dataForm.id ? undefined : this.dataForm.status
          //   })
          // }).then(({ data }) => {
          //   if (data && data.code === 0) {
          //     this.$message({
          //       message: "操作成功",
          //       type: "success",
          //       duration: 1500,
          //       onClose: () => {
          //         this.visible = false;
          //         this.$emit("refreshDataList");
          //       }
          //     });
          //   } else {
          //     this.$message.error(data.msg);
          //   }
          // });
        }
      });
    }
  }
};
</script>
