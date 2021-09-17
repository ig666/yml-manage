<template>
  <div class="login">
    <!-- 登录框 -->
    <div class="box">
      <div class="login-box">
        <div class="title">登录</div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;
  background-image: url("../assets/login.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box{
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 255, .5);
    border-radius: 10px;
    .title{
      color: #333;
      font-size: 28px;
      font-weight: bold;
    }
  }
}
</style>
