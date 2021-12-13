<template>
  <div class="login">
    <!-- 登录框 -->
    <div class="box">
      <div class="login-box">
        <div class="title">登录</div>
        <a-form
          ref="formRef"
          class="login-form"
          :model="formState"
          :rules="rules"
          :label-col="labelCol"
        >
          <a-form-item ref="account" label="用户名" name="account">
            <a-input v-model:value="formState.account"></a-input>
          </a-form-item>
          <a-form-item ref="password" label="密码" name="password">
            <a-input
              v-model:value="formState.password"
              type="password"
              @pressEnter="onLogin"
            ></a-input>
          </a-form-item>
        </a-form>
        <div class="operate-box">
          <a-checkbox v-model:checked="rememberMe">记住密码</a-checkbox>
          <!-- <a class="register" @click="goRegister" href="javascript:;"
            >立即注册</a
          > -->
        </div>
        <a-button
          style="width: 100%; height: 50px; font-size: 20px"
          type="primary"
          :loading="btnLoading"
          @click="onLogin"
          >登录</a-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { ref, reactive, UnwrapRef, toRaw } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useLogin } from '../modules/account.module';
interface FormState {
  account: string;
  password: string;
}
const user = JSON.parse(localStorage.getItem('user') || '{}');
console.log(user);
const formState: UnwrapRef<FormState> = reactive({
  account: user ? user.account : '',
  password: user ? user.password : '',
});
let rememberMe = ref<boolean>(localStorage.getItem('remember') == 'true');
let btnLoading = ref<boolean>(false);

const formRef = ref();
const labelCol = { span: 5 };
const router = useRouter();
const rules = {
  account: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }],
};

// 登录
const onLogin = (): void => {
  formRef.value
    .validate()
    .then(async () => {
      const formData = toRaw(formState);
      btnLoading.value = true;
      const { account } = await useLogin(formData);
      btnLoading.value = false;
      if (account.value) {
        message.success('登录成功');
        router.replace({ path: '/person' });
        if (rememberMe.value) {
          localStorage.setItem('user', JSON.stringify(toRaw(formState)));
        } else {
          localStorage.removeItem('user');
        }
        localStorage.setItem('remember', rememberMe.value.toString());
        localStorage.setItem('token', account.value.token);
      }
    })
    .catch((error: ValidateErrorEntity<FormState>) => {
      console.log('error', error);
    });
};

// 跳转注册
const goRegister = (): void => {
  router.push({ path: '/register' });
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url('../assets/login.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 500px;
    height: 400px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    padding: 20px 60px;
    .title {
      color: #333;
      font-size: 28px;
      font-weight: bold;
      text-align: center;
    }
    .login-form {
      margin-top: 50px;
    }
    .operate-box {
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
    }
  }
}
</style>
