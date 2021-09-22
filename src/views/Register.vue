<template>
  <div class="register">
    <!-- 登录框 -->
    <div class="box">
      <div class="login-box">
        <div class="title">注册</div>
        <a-form class="login-form" :model="formState" :rules="rules" :labelCol="labelCol">
          <a-form-item ref="userName" label="用户名" name="userName">
            <a-input v-model="formState.userName"></a-input>
          </a-form-item>
          <a-form-item ref="password" label="密码" name="password">
            <a-input type="password" v-model="formState.password"></a-input>
          </a-form-item>
          <a-form-item ref="rePassword" label="确认密码" name="rePassword">
            <a-input type="rePassword" v-model="formState.rePassword"></a-input>
          </a-form-item>
        </a-form>
        <a-button @click="onRegister" style="width: 100%; height: 50px;font-size: 20px" type="primary">立即注册</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, UnwrapRef, toRaw } from 'vue'
import { useRouter } from 'vue-router';
interface FormState {
  userName: String;
  password: String;
  rePassword: String
}

const formState: UnwrapRef<FormState> = reactive({
  userName: '',
  password: '',
  rePassword: ''
})
const labelCol = { span:5 }
const router = useRouter()
const rules = {
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
}

// 注册
const onRegister = (): void => {
  const formData = toRaw(formState)
  console.log(formData)
}
</script>

<style lang="less" scoped>
.register{
    width: 100%;
  height: 100%;
  background-image: url("../assets/login.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box{
    width: 500px;
    height: 400px;
    background: rgba(255, 255, 255, .5);
    border-radius: 10px;
    padding: 20px 60px;
    .title{
      color: #333;
      font-size: 28px;
      font-weight: bold;
      text-align: center;
    }
    .login-form{
      margin-top: 50px;
    }
    .operate-box{
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      .register{

      }
    }
  }
}
</style>