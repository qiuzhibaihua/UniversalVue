<template>
    <sides-lip ref="SidesLip">
        <div slot="soltForm">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px" size="small">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="授权">
          <el-tree
            :data="menuList"
            :props="menuListTreeProps"
            node-key="menuId"
            ref="menuListTree"
            :default-expand-all="true"
            show-checkbox>
          </el-tree>
        </el-form-item>
      </el-form>
      </div>
      <div slot="soltFooter">
        <el-button @click="sideClose" size="small">取消</el-button>
        <el-button type="primary" :loading="loading" @click="dataFormSubmit()" size="small">确定</el-button>
      </div>
    </sides-lip>
</template>

<script>
import { treeDataTranslate } from "@/utils";
import { menuList, roleDataFormSubmit, roleInfo } from "@/api/sys";
import SidesLip from "@/components/SidesLip";
export default {
  data() {
    return {
      loading: false,
      visible: false,
      menuList: [],
      menuListTreeProps: {
        label: "name",
        children: "children"
      },
      dataForm: {
        id: 0,
        roleName: "",
        remark: ""
      },
      dataRule: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    SidesLip
  },
  methods: {
    async init(id) {
      this.dataForm.id = id || 0;
      const { data } = await menuList();
      this.menuList = treeDataTranslate(data, "menuId");
      this.$refs.SidesLip.init(this.dataForm.id?"修改":"新增", "700px", "block");
      await this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.$refs.menuListTree.setCheckedKeys([]);
      });
      if (this.dataForm.id) {
        const { data } = await roleInfo(`/sys/role/info/${this.dataForm.id}`);
        if (data && data.code === 0) {
          this.dataForm.roleName = data.role.roleName;
          this.dataForm.remark = data.role.remark;
          this.$refs.menuListTree.setCheckedKeys(data.role.menuIdList);
        }
      }
    },
    sideClose() {
      this.$refs.SidesLip.sideClose();
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(async valid => {
        if (valid) {
          const params = {
            roleId: this.dataForm.id || undefined,
            roleName: this.dataForm.roleName,
            remark: this.dataForm.remark,
            menuIdList: [].concat(
              this.$refs.menuListTree.getCheckedKeys(),
              this.$refs.menuListTree.getHalfCheckedKeys()
            )
          };
          const { data } = await roleDataFormSubmit(
            `/sys/role/${!this.dataForm.id ? "save" : "update"}`,
            params
          );
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.sideClose();
                this.$emit("refreshDataList");
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        }
      });
    }
  }
};
</script>
