<template>
  <Header />
  <div class="form">
    <a-form ref="formRef" name="calculate" class="calculate-form" :model="formState" @finish="onFinish">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item name="sample_fre" label="采样频率(hz)">
            <a-input v-model:value="formState[`sample_fre`]" placeholder="请填写采样频率"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item name="motor_speed" label="电机转速">
            <a-input v-model:value="formState[`motor_speed`]" placeholder="请填写电机转速"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" html-type="submit" @click="show">计算</a-button>
        </a-col>
      </a-row>
    </a-form>
    <div class="main">
      <div class="left">
        <div class="left_line">
          <div id="echarts1"></div>
        </div>
      </div>
      <div class="center">
        <a-upload v-model:file-list="fileList" :max-count="100" :before-upload="beforeUpload" @change="handleChange">
          <a-button>
            <upload-outlined></upload-outlined>
            上传文件
          </a-button>
        </a-upload>
      </div>
      <div class="right">
        <div class="table">
          <Table />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Header from "./header/index.vue";
import Table from "../components/table.vue";
import { ref, onMounted } from "vue";
import { useHome } from "../composables/useHome";

const formState = ref({
  motor_speed: 600,
  sample_fre: 5000,
});

//上传
const { fileList, beforeUpload, handleChange, handleDrop, show } = useHome();
</script>

<style>
.form {
  padding: 20px;
}
.left {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.left_line > #echarts1 {
  width: 400px;
  height: 300px;
}

.right_line > #echarts2 {
  width: 400px;
  height: 300px;
}
.main {
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
  align-items: center;
}
.left,
.right {
  width: 500px;
}
.center {
  display: flex;
  min-width: 300px;
  height: 200px;
  justify-content: center;
  align-items: center;
}
.table {
}
</style>