<template>
    <div class="login-container">
        <div class="login-form-layout">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
                     label-position="left">
                <div class="title-container">
                    <h3 class="title">
                        网关治理平台
                    </h3>
                    <!--<lang-select class="set-language"/>-->
                </div>

                <el-form-item prop="username">
                    <span class="svg-container">
                      <svg-icon icon-class="user"/>
                    </span>
                    <el-input
                            v-model="loginForm.username"
                            placeholder="请输入用户名"
                            name="username"
                            type="text"
                            auto-complete="on"
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <span class="svg-container">
                      <svg-icon icon-class="password"/>
                    </span>
                    <el-input
                            v-model="loginForm.password"
                            :type="passwordType"
                            placeholder="请输入密码"
                            name="password"
                            auto-complete="on"
                            @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
                </el-form-item>

                <el-form-item prop="captcha">
        <span class="svg-container">
          <span class="el-icon-picture"/>
        </span>
                    <el-input
                            name="captcha"
                            type="text"
                            @keyup.enter.native="handleLogin"
                            v-model="loginForm.captcha"
                            autocomplete="on"
                            placeholder="请输入验证码"
                    />
                    <img :src="imgUrl" @click="vCode" class="vcode">
                </el-form-item>
                <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                           @click.native.prevent="handleLogin">
                    登录
                </el-button>

            </el-form>
        </div>
        <!--<particles></particles>-->
    </div>
</template>
<script>
    import { isvalidUsername, guid } from "@/utils/validate";
    import { Message } from "element-ui";

    export default {
        name: "login",
        data() {
            // const validateUsername = (rule, value, callback) => {
            //   if (value) {//isvalidUsername
            //     callback(new Error("请输入正确的用户名"));
            //   } else {
            //     callback();
            //   }
            // };
            const validatePassword = (rule, value, callback) => {
                if (value.length < 4) {
                    callback(new Error("密码不能少于4位数"));
                } else {
                    callback();
                }
            };
            return {
                loginForm: {
                    username: "",
                    password: "",
                    uuid: "",
                    captcha: ""
                },
                loginRules: {
                    username: [
                        { required: true, trigger: "blur", message: "请输入用户名" } //validator: validateUsername
                    ],
                    password: [
                        { required: true, trigger: "blur", validator: validatePassword }
                    ],
                    captcha: [{ required: true, trigger: "blur", message: "请输入验证码" }]
                },
                passwordType: "password",
                loading: false,
                showDialog: false,

                imgUrl: ""
            };
        },
        created() {
            this.loginForm.uuid = guid();
            this.imgUrl = process.env.VUE_APP_BASE_API+`captcha.jpg?uuid=${
                this.loginForm.uuid
                }`;
        },
        methods: {
            showPwd() {
                if (this.passwordType === "password") {
                    this.passwordType = "text";
                } else {
                    this.passwordType = "password";
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store
                            .dispatch("Login", this.loginForm)
                            .then(res => {
                                if (!res.code) {
                                    this.$router.push({ path: "/" });
                                } else {
                                    Message.error(res.msg);
                                }
                                this.loading = false;
                                this.vCode();
                            })
                            .catch(err => {
                                Message.error(err);
                                this.loading = false;
                            });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            // 点击更新验证码
            vCode() {
                const uuid = guid();
                this.loginForm.uuid = uuid;
                this.imgUrl = process.env.VUE_APP_BASE_API+ `captcha.jpg?uuid=${uuid}`;
            }
        }
    };
</script>
<!--@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {-->
<!--.login-container .el-input input {-->
<!--color: red;-->
<!--&::first-line {-->
<!--color: $light_gray;-->
<!--}-->
<!--}-->
<!--}-->
<style rel="stylesheet/scss" lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg: #283443;
    $light_gray: #eee;
    $cursor: #fff;



    /* reset element-ui css */
    .login-container {
        // background: url('../../assets/bg.jpg') center center no-repeat;
        background-size: cover;
        .login-form-layout {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #FFF;
            box-shadow: 0px 9px 18px rgba(9, 109, 146, 0.2);
            border-radius: 10px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: #C8CACE!important;
                height: 47px;
                caret-color: $cursor;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid rgba(84,198,172,1);
            background: #FFF;
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    // $bg:#2d3a4b;
    $bg: transparent;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .login-container {
        min-height: 100%;
        width: 100%;
        overflow: hidden;
        .vcode {
            position: absolute;
            width: 100px;
            top: 50%;
            transform: translateY(-50%);
            right: 10px;
        }
        .login-form {
            position: relative;
            width: 420px;
            height: 494px;
            max-width: 100%;
            /*padding: 160px 35px 0;*/
            margin: 0 auto;
            overflow: hidden;
            padding: 0 33px;
            box-sizing: border-box;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }
        .title-container {
            position: relative;
            .title {
                font-size: 31px;
                color: #54C6AC;
                margin: 44px auto 34px auto;
                text-align: center;
                font-weight: bold;
            }
            .set-language {
                color: #fff;
                position: absolute;
                top: 3px;
                font-size: 18px;
                right: 0px;
                cursor: pointer;
            }
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
    }
</style>
