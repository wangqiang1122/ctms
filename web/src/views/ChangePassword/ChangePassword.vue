<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules"  ref="ruleForm2">
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input v-model="formLabelAlign.oldpassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassWord">
        <el-input v-model="formLabelAlign.newPassWord" type="password"></el-input>
      </el-form-item>
      <el-form-item label="请再次输入新密码" prop="LnewPassWord">
        <el-input v-model="formLabelAlign.LnewPassWord" type="password"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button size="small"  @click="back">取 消</el-button>
        <el-button size="small" type="primary" @click="addVisitPost('ruleForm2')">确 定</el-button>
      </span>
  </div>
</template>

<script>
import validate from '@/utils/validation';
import changePassword from '@/service/changePassword';

export default {
  name: 'ChangePassword',
  data() {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        oldpassword: '',
        newPassWord: '',
        LnewPassWord: '',
      },
      rules: {
        oldpassword: [
          { validator: this.validatePassword, trigger: 'blur' },
        ],
        newPassWord: [
          { validator: this.validatePassword, trigger: 'blur' },
        ],
        LnewPassWord: [
          { validator: this.isPass, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    addVisitPost(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePassword.ChnagePassword({ newPwd: this.formLabelAlign.LnewPassWord, oldPwd: this.formLabelAlign.oldpassword });
          this.$alert('修改成功', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              this.back();
            },
          });
        } else {
          return false;
        }
      });
    },
    validatePassword(rule, value, callback) {
      const result = validate.isPasswordAvailable(value);
      if (result !== 'ok') {
        callback(new Error(result));
      } else {
        callback();
      }
    },
    isPass(rule, value, callback) {
      const result = validate.isPasswordAvailable(value);
      if (result !== 'ok') {
        callback(new Error(result));
        return;
      }
      if (this.formLabelAlign.newPassWord !== this.formLabelAlign.LnewPassWord) {
        callback('请两次密码输入一致');
      } else {
        callback();
      }
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
  .dialog-footer {
    float: right;
  }
</style>
