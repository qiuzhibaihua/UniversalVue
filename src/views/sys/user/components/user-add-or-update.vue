<template>
  <sides-lip ref="SidesLip">
    <div slot="soltForm">
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="80px"
        size="small"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="dataForm.userName" placeholder="登录帐号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
          <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
          <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色" size="mini" prop="roleIdList">
          <el-checkbox-group v-model="dataForm.roleIdList">
            <el-checkbox
              v-for="role in roleList"
              :key="role.roleId"
              :label="role.roleId"
            >{{ role.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态" size="mini" prop="isFreeze">
          <el-radio-group v-model="dataForm.isFreeze">
            <el-radio :label="1">禁用</el-radio>
            <el-radio :label="0">正常</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div slot="soltFooter">
      <el-button @click="sideClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click="dataFormSubmit()">确定</el-button>
    </div>
  </sides-lip>
</template>

<script>
import { isEmail, isMobile } from "@/utils/validate";
import { getRoleList, userDataFormSubmit, userUpdate } from "@/api/sys";
import SidesLip from "@/components/SidesLip";
// import "@/styles/sideslip.scss";
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    var validateComfirmPassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error("确认密码不能为空"));
      } else if (this.dataForm.password !== value) {
        callback(new Error("确认密码与密码输入不一致"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    var validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      visible: false,
      roleList: [],
      dataForm: {
        id: 0,
        userName: "",
        password: "",
        comfirmPassword: "",
        salt: "",
        email: "",
        mobile: "",
        roleIdList: [],
        isFreeze: 1
      },
      dataRule: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ validator: validatePassword, trigger: "blur" }],
        comfirmPassword: [
          { validator: validateComfirmPassword, trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: validateMobile, trigger: "blur" }
        ],
        roleIdList: [
          { required: true, message: "角色不能为空", trigger: "change" }
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
      const { data } = await getRoleList();
      if(data && data.code === 0 && data.list && data.list.length >0){
        this.roleList = data.list
      }else{
        this.$message.error("需先创立可用的角色");
        return '';
      }
      this.$refs.SidesLip.init(
        this.dataForm.id ? "修改" : "新增",
        "700px",
        "block"
      );
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
      if (this.dataForm.id) {
        const { data } = await userUpdate(`/sys/user/info/${this.dataForm.id}`);
        if (data && data.code === 0) {
          this.dataForm.userName = data.user.username;
          this.dataForm.salt = data.user.salt;
          this.dataForm.email = data.user.email;
          this.dataForm.mobile = data.user.mobile;
          this.dataForm.roleIdList = data.user.roleIdList;
          this.dataForm.isFreeze = Number.parseInt(data.user.isFreeze);
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
          this.loading = true;
          const params = {
            userId: this.dataForm.id || undefined,
            username: this.dataForm.userName,
            password: this.dataForm.password,
            salt: this.dataForm.salt,
            email: this.dataForm.email,
            mobile: this.dataForm.mobile,
            isFreeze: this.dataForm.isFreeze,
            roleIdList: this.dataForm.roleIdList
          };
          const { data } = await userDataFormSubmit(
            `/sys/user/${!this.dataForm.id ? "save" : "update"}`,
            params
          );
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.loading = false;
                this.sideClose();
                this.$emit("refreshDataList");
              }
            });
          } else {
            this.$message.error(data.msg);
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>


