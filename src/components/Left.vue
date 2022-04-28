<template>
  <div class="left_top">
    <a-upload
      v-model:file-list="fileList"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        上传文件
      </a-button>
    </a-upload>
  </div>
  <div class="systom_params">
    <div class="title">系统参数</div>
    <div class="input">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="采样频率"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item
          label="采样点数"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <div class="title" style="border-top: 1px solid gray">信号参数</div>
        <a-form-item
          style="margin-top: 24px"
          label="均值"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item
          style="margin-top: 20px"
          label="方差"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item
          label="标准偏差"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item style="margin-bottom:0">
          <a-button type="primary" html-type="submit">参数计算</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHome } from "../composables/useHome";
const formState = ref({
  password: "",
  name: "",
});
const onFinishFailed = () => {};
const onFinish = () => {};
const { fileList, beforeUpload, handleChange } = useHome();
</script>

<style>
.left_top {
  height: 10vh;
  border-bottom: 2px solid black;
}
.systom_params {
}
.systom_params .title {
  font-weight: bold;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid gray;
}
.ant-form {
  padding: 20px 4px !important;
}
</style>