<template>
  <div id="main" class="login animated fadeIn">
    <section id="content_wrapper">
      <div id="canvas-wrapper">
        <canvas id="demo-canvas"></canvas>
      </div>
      <section id="content">
        <div class="admin-form theme-info" id="login1">
          <div class="row mb15 table-layout">
            <div class="col-xs-6 va-m pln new-c">
              <a title="Return to Dashboard">
                <img src="./assets/img/logo.png" title="CTMS" class="img-responsive w250" width="300px" height="60px">
              </a>
              <span style="float: right;margin-top:30px;font-size: 18px;color: #4D8BD9;margin-right: 10px;font-weight: normal;font-family: SimSun">临床试验综合信息管理系统</span>
              <!--<div style="color: #242265;font-size: 32px; font-weight: bold; font-family: SimSun">临床试验管理系统</div>-->
            </div>
            <div class="col-xs-6 text-right va-b pr5">
              <div class="login-links">
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="panel-heading">
            </div>
            <!---->
            <div class="panel-body">
              <div class="center-con">
                <el-form :model="loginData" :rules="rules" ref="loginData">
                  <div class="section">
                    <label for="account" class="field-label">账&nbsp;&nbsp;&nbsp;&nbsp;号</label>
                    <el-form-item prop="userCode" required>
                      <label for="account" class="field prepend-icon">
                        <input type="text" name="account" id="account" v-model.trim="loginData.userCode" class="gui-input"
                               placeholder="输入邮箱或手机号" >
                        <label for="account" class="field-icon">
                          <i class="fa fa-user"></i>
                        </label>
                      </label>
                    </el-form-item>
                  </div>
                  <div class="section">
                    <label for="password" class="field-label">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                    <el-form-item prop="userPwd" required>
                      <label for="password" class="field prepend-icon">
                        <input type="password" name="userPwd" v-model="loginData.userPwd" id="password"
                               class="gui-input"
                               placeholder="输入密码"  @keyup.enter="loginRequest('loginData')">
                        <label for="password" class="field-icon">
                          <i class="fa fa-lock"></i>
                        </label>
                      </label>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
            </div>
            <div class="panel-footer clearfix p10 ph15">
              <button type="submit" class="button btn-primary" @click="loginRequest('loginData')">登 录</button>
              <span class="forget rememberMe"><el-checkbox v-model="rememberMe">记住我</el-checkbox></span>
              <span class="forget">忘记密码? 请联系管理员。</span>
            </div>
            <!---->
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
/* eslint-disable no-unused-expressions */

import canvasbg from '@/lib/canvasbg';
import validate from '@/utils/validation';
import Base64 from '@/utils/Base64';
import authService from '@/service/auth';

export default {
  name: 'login',
  data() {
    return {
      loginData: {
        userCode: '',
        userPwd: '',
      },
      rules: {
        userCode: [
          { required: true, validator: this.validateUserName, trigger: 'blur' },
        ],
        userPwd: [
          { required: true, validator: this.validatePassword, trigger: 'blur' },
        ],
      },
      rememberMe: true,
    };
  },
  mounted() {
    this.getClient();
    this.canvas();
  },
  methods: {
    canvas() {
      canvasbg.init({
        Loc: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 3.3,
        },
      });
    },
    validateUserName(rule, value, callback) {
      const result1 = validate.isPhoneAvailable(value);
      const result2 = validate.isEmailAvailable(value);
      if (result1 !== 'ok' && result2 !== 'ok') {
        callback(new Error('电话或邮箱格式错误'));
      } else {
        callback();
      }
    },
    validatePassword(rule, value, callback) {
      const result = validate.isPasswordAvailable(value);
      if (result !== 'ok') {
        callback(new Error(result));
      } else {
        callback();
      }
    },
    loginRequest(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          authService.login(this.loginData);
          this.setClient();
        }
      });
    },
    setClient() {
      if (!this.rememberMe) {
        localStorage.removeItem('_client');
        return;
      }
      const clientInfo = { ...this.loginData };
      const b = new Base64.Base64();
      clientInfo.userPwd = b.encode(clientInfo.userPwd);
      localStorage.setItem('_client', JSON.stringify(clientInfo));
    },
    getClient() {
      const b = new Base64.Base64();
      const clientInfo = JSON.parse(localStorage.getItem('_client'));
      if (clientInfo) {
        clientInfo.userPwd = b.decode(clientInfo.userPwd);
        this.loginData = clientInfo;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    font-weight: 300;
  }
  #main {
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.49;
    color: #666;
    overflow: hidden;
    position: relative;
    min-height: 100%;
    background: url("./assets/img/login-bg.jpg") no-repeat top center #2d494d;
    background-size: 100%
  }

  #content_wrapper {
    position: relative;
    left: 0;
    margin: 0 auto;
  }

  #content {
    position: absolute;
    top: 16%;
    width: 800px;
    left: 50%;
    margin-left: -400px;
  }

  #content .panel {
    box-shadow: 0 1px 40px 0 rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    background: #fff;
  }

  .panel-heading {
    overflow: hidden;
    position: relative;
    height: auto;
    padding: 29px 22px 18px;
    color: #999;
    border-radius: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid #DDD;
    border-top:10px solid #4fc1e9;
  }

  .panel-body {
    padding: 35px 25px 25px 25px;
    border: 0;
    overflow: hidden;
  }

  .center-con {
    width: 500px;
    margin: 0 auto;
  }

  .section {
    margin-bottom: 10px;
    overflow: hidden;
  }

  .field-label {
    float: left;
    height: 40px;
    line-height: 40px;
    width: 70px;
    font-size: 14px;
    color: #999;
  }

  .admin-form .prepend-icon {
    float: right;
    width: 400px;
    position: relative;
  }

  .admin-form label {
    margin: 0;
    font-size: 14px;
    outline: none;
  }

  .admin-form .prepend-icon  input {
    padding-left: 36px;
  }

  .gui-input {
    position: relative;
    vertical-align: top;
    border: 1px solid #DDD;
    display: -moz-inline-stack;
    display: inline-block;
    outline: none;
    height: 42px;
    width: 100%;
    padding: 10px;
  }

  .gui-input:focus {
    color: #3C3C3C;
    border: 1px solid #4fc1e9;
    outline: none;
  }

  .gui-input:focus + .field-icon i {
    color: #3bafda;
  }

  .field-icon {
    top: 0;
    left: 0;
    z-index: 4;
    width: 42px;
    height: 42px;
    color: inherit;
    line-height: 42px;
    position: absolute;
    text-align: center;
    -webkit-transition: all 0.5s ease-out;
    -moz-transition: all 0.5s ease-out;
    -ms-transition: all 0.5s ease-out;
    -o-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;
    pointer-events: none;
  }

  .field-icon i {
    color: #bbb;
  }

  .admin-form .panel-footer {
    padding: 12px 13px;
    border: 0;
    border-top: 1px solid #DDD;
    background: #f2f2f2;
    overflow: hidden;
  }

  .btn-primary {
    color: #fff;
    text-shadow: 0 1px rgba(0, 0, 0, 0.08);
    background-color: #4a89dc;
    border: 0;
    height: 42px;
    line-height: 42px;
    font-size: 15px;
    cursor: pointer;
    padding: 0 18px;
    text-align: center;
    vertical-align: top;
    display: inline-block;
    -webkit-user-drag: none;
    border-radius: 0;
    float: right;
    margin-right: 10px;
  }

  #main:before {
    display: none;
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .fadeIn {
    animation-name: fadeIn;
  }

  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  .forget {
    float: left;
    margin-left: 30px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }

  .rememberMe {
    float: right;
    margin-right: 20px;
  }
</style>
