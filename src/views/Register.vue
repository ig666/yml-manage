<template>
  <div class="register">
    <!-- 登录框 -->
    <div class="box">
      <div class="login-box">
        <div class="title">注册</div>
        <a-form
          ref="formRef"
          class="login-form"
          :model="formState"
          :rules="rules"
          :labelCol="labelCol"
        >
          <a-form-item ref="account" label="用户名" name="account">
            <a-input v-model:value="formState.account"></a-input>
          </a-form-item>
          <a-form-item ref="gender" label="性别" name="gender">
            <a-radio-group v-model:value="formState.gender">
              <a-radio :value="1">男</a-radio>
              <a-radio :value="2">女</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item ref="password" label="密码" name="password">
            <a-input
              type="password"
              v-model:value="formState.password"
            ></a-input>
          </a-form-item>
          <a-form-item ref="rePassword" label="确认密码" name="rePassword">
            <a-input
              type="password"
              v-model:value="formState.rePassword"
            ></a-input>
          </a-form-item>
        </a-form>
        <a-button
          @click="onRegister"
          style="width: 100%; height: 50px; font-size: 20px"
          type="primary"
          :loading="btnLoading"
          >立即注册</a-button
        >
        <div @click="goBack" style="text-align: center; margin-top: 6px">
          <a href="javascript:;">返回登陆</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  RuleObject,
  ValidateErrorEntity,
} from 'ant-design-vue/es/form/interface';
import { message } from 'ant-design-vue';
import { ref, reactive, UnwrapRef, toRaw } from 'vue';
import { useRegister } from '../modules/account.module';
import { useRouter } from 'vue-router';
enum Gender {
  man = 1,
  woman = 2,
}
interface FormState {
  account: string;
  gender: Gender;
  password: string;
  rePassword: string;
}

const formState: UnwrapRef<FormState> = reactive({
  account: '',
  gender: Gender.man,
  password: '',
  rePassword: '',
});
let btnLoading = ref<boolean>(false)
const formRef = ref();
// 密码验证
let validatePass = async (rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('请输入密码');
  } else if (value.length < 6) {
    return Promise.reject('密码长度至少6位');
  } else {
    if (formState.rePassword !== '') {
      formRef.value.validateFields('rePassword');
    }
    return Promise.resolve();
  }
};
// 重复密码验证
const validateRePass = async (rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('请重复密码');
  } else if (value.length < 6) {
    return Promise.reject('密码长度至少6位');
  } else if (value !== formState.password) {
    return Promise.reject('两此输入密码不匹配');
  } else {
    return Promise.resolve();
  }
};
const labelCol = { span: 5 };
const router = useRouter();
const rules = {
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, validator: validatePass, trigger: 'change' }],
  rePassword: [
    { required: true, validator: validateRePass, trigger: 'change' },
  ],
};

// 注册
const onRegister = (): void => {
  formRef.value
    .validate()
    .then(async () => {
      const formData = toRaw(formState);
      const { rePassword, ...param } = formData;
      btnLoading = true
      const { account } = await useRegister(param);
      btnLoading = false
      if (account.value) {
        console.log(account);
        message.success('注册成功');
        router.replace({ path: '/login' });
      }
    })
    .catch((error: ValidateErrorEntity<FormState>) => {
      console.log('error', error);
    });
};

// 返回
const goBack = (): void => {
  router.back();
};
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100%;
  background-image: url('../assets/login.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 500px;
    height: 440px;
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
