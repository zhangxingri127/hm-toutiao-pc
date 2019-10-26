<template>
  <div class="container">
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:0">
          <el-input v-model="form.name" style="width:200px;margin-right:8px" placeholder="请输入验证码"></el-input>
          <el-button class="testCode">获取验证码</el-button>
          <el-checkbox :value="true">备选项</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: { name: '' }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  .el-card {
    width: 350px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 20px;
    }
  }
  .testCode {
    padding: 12px 15px;
  }
}
</style>
