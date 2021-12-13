<template>
  <div class="nav-bar-container">
    <a-row :gutter="15" style="width: 100%">
      <a-col :xs="15" :sm="15" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <slot name="left"></slot>
        </div>
      </a-col>
      <a-col :xs="9" :sm="9" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
          <slot name="right"></slot>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.nav-bar-container {
  z-index: 1;
  padding: 0 20px;
  position: relative;
  height: 64px;
  overflow: visible;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: 64px;
    min-height: 64px;
  }
  .right-panel {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-end;
    height: 64px;
  }
}
</style>
