<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{current:item.current}"
          v-for="(item,index) in menuTab"
          :key="index"
          @click="toggleClass(item)"
        >{{item.txt}}</li>
        <!-- <li>注册</li> -->
      </ul>
      <!-- 表单开始 -->

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
         <!-- 邮箱 -->
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

       <!-- 确认密码 -->
          <el-form-item prop="comfirmPassword" class="item-form"  v-show="model==='register'">
          <label>确认密码</label>
          <el-input
            type="password"
            v-model="ruleForm.comfirmPassword"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>
      <!-- 验证码 -->
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <!--  maxlength="6"   minlength="6"-->
              <el-input v-model="ruleForm.code"    maxlength="6"   minlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn block" type="danger" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  stripscript,
  filterUsername,
  filterPassword,
  filterCode
} from "@/utils/validator";

export default {
  name: "login",
  props: {},
  data() {
    // 验证用户名邮箱
    var validatorUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (filterUsername(value)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };

    // 验证密码
    var validatorPassword = (rule, value, callback) => {
      // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/

      this.ruleForm.password=stripscript(value)
      value=this.ruleForm.password
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (filterPassword(value)) {
        callback(new Error("密码需要在6-20数字加字母"));
      } else {
        callback();
      }
    };

    //   验证验证码
    var checkCode = (rule, value, callback) => {
      this.ruleForm.code=stripscript(value)
      // console.log(this.ruleForm.code);
      // console.log(value);
      value=this.ruleForm.code
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (filterCode(value)) {
        callback(new Error("验证码需要6位"));
      } else {
        callback();
      }
    };

    //验证确认密码 
      var validatorcomfirmPassword = (rule, value, callback) => {
        if(this.model==='login') {callback()}
      this.ruleForm.comfirmPassword=stripscript(value)
      value=this.ruleForm.comfirmPassword
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value!=this.ruleForm.password) {
        callback(new Error("确认密码输入不正确"));
      } else {
        callback();
      }
    };




    return {
      model:'login',
      menuTab: [
        { txt: "登录", current: true,type:'login' },
        { txt: "注册", current: false ,type:'register'}
      ],
      ruleForm: {
        username: "",
        password: "",
        code: "",
        comfirmPassword:''
      },
      rules: {
        username: [{ validator: validatorUsername, trigger: "blur" }],
        password: [{ validator: validatorPassword, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
         comfirmPassword: [{ validator: validatorcomfirmPassword, trigger: "blur" }],
      }
    };
  },

  methods: {
    toggleClass(item) {
      this.menuTab.forEach(item => {
        item.current = false;
      });

      item.current = true;
      this.model=item.type
    },
    //表单验证方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
#login {
  background-color: #344a5f;
  height: 100vh;
}

.login-wrap {
  width: 330px;
  margin: auto;
}

.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
}
.current {
  background: rgba(0, 0, 0, 0.1);
}

.login-form {
  margin-top: 30px;
  label {
    display: block;
    width: 100%;
    font-size: 14px;
    color: #fff;
    margin-bottom: 3px;
  }
  .item-form {
    margin-bottom: 14px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 20px;
  }
}
</style>
