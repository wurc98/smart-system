<template>
  <Header />
  <div class="form">
    <a-form
      ref="formRef"
      name="calculate"
      class="calculate-form"
      :model="formState"
      @finish="onFinish"
    >
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item
            name="sys_param"
            label="系统参数"
            :rules="[{ required: true, message: '系统参数必填' }]"
          >
            <a-input
              v-model:value="formState[`sys_param`]"
              placeholder="请填写系统参数"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            name="sample_fre"
            label="采样频率(hz)"
            :rules="[{ required: true, message: '采样频率必填' }]"
          >
            <a-input
              v-model:value="formState[`sample_fre`]"
              placeholder="请填写采样频率"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            name="motor_speed"
            label="电机转速"
            :rules="[{ required: true, message: '电机转速必填' }]"
          >
            <a-input
              v-model:value="formState[`motor_speed`]"
              placeholder="请填写电机转速"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            name="dia_error"
            label="诊断误差"
            :rules="[{ required: true, message: '诊断误差必填' }]"
          >
            <a-select v-model:value="formState[`dia_error`]">
              <a-select-option value="00">正常</a-select-option>
              <a-select-option value="01">内圈故障</a-select-option>
              <a-select-option value="10">外圈故障</a-select-option>
              <a-select-option value="11">滚动体故障</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" html-type="submit">计算</a-button>
        </a-col>
      </a-row>
    </a-form>
    <div class="main">
      <div class="left">
        <div class="left_line">
          <div id="echarts1"></div>
        </div>
        <div class="right_line">
          <div id="echarts2"></div>
        </div>
      </div>
      <div class="center">
        <a-upload
          v-model:file-list="fileList"
          :max-count="1"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
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
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { useHome } from "../composables/useHome";

const formState = ref({
  motor_speed: 600,
  sample_fre: 5000,
});
const initLine2 = () => {
  const chartDom = document.getElementById("echarts2");
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: "原始信号",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} °C",
      },
    },
    series: [
      {
        name: "Lowest",
        type: "line",
        data: [1, -2, 2, 5, 3, 2, 0],
        markPoint: {
          data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
        },
        markLine: {
          data: [
            { type: "average", name: "Avg" },
            [
              {
                symbol: "none",
                x: "90%",
                yAxis: "max",
              },
              {
                symbol: "circle",
                label: {
                  position: "start",
                  formatter: "Max",
                },
                type: "max",
                name: "最高点",
              },
            ],
          ],
        },
      },
    ],
  };
  myChart.setOption(option);
};
const initLine1 = () => {
  console.log(echarts);
  const chartDom = document.getElementById("echarts1");
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: "原始信号",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} °C",
      },
    },
    series: [
      {
        name: "Lowest",
        type: "line",
        data: [1, -2, 2, 5, 3, 2, 0],
        markPoint: {
          data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
        },
        markLine: {
          data: [
            { type: "average", name: "Avg" },
            [
              {
                symbol: "none",
                x: "90%",
                yAxis: "max",
              },
              {
                symbol: "circle",
                label: {
                  position: "start",
                  formatter: "Max",
                },
                type: "max",
                name: "最高点",
              },
            ],
          ],
        },
      },
    ],
  };
  myChart.setOption(option);
};
onMounted(() => {
  initLine1();
  initLine2();
});

//上传
const { fileList, beforeUpload, handleChange, handleDrop } = useHome();
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