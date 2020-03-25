<template>
  <sides-lip ref="SidesLip">
    <div slot="soltForm">
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="80px"
      ></el-form>
    </div>
    <div slot="soltFooter">
      <el-button @click="sideClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click="dataFormSubmit()">确定</el-button>
    </div>
  </sides-lip>
</template>

<script>
import SidesLip from "@/components/SidesLip";
export default {
  data() {
    return {
      loading: false,
      dataForm: {},
      dataRule: {}
    };
  },
  components: {
    SidesLip
  },
  /**
   * 侧滑
   * 1、参数：标题
   * 2、参数：侧滑宽度
   * 3、参数：是否显示遮罩'none':不显示,'block'：显示
   */
  methods: {
    async init(id) {
      //   this.dataForm.id = id || 0;
      this.$refs.SidesLip.init(
        this.dataForm.id ? "修改" : "新增",
        "85%",
        "block"
      );
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
      if (this.dataForm.id) {
      }
    },
    sideClose() {
      this.$refs.SidesLip.sideClose();
    },
    // 表单提交
    dataFormSubmit() {}
  }
};
</script>

