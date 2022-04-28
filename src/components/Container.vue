<template>
  <div class="container">
    <div class="left">
      <Left />
    </div>
    <div class="mian">
      <div class="main_top">
        <div class="mian-title">滚动轴承故障诊断记录</div>
        <Table />
      </div>
      <div class="main_bottom">
        <div class="mian_bottom_item">
          <div class="main_bottom_title">信号波形图</div>
          <div class="main_bottom_button">
            <a-button type="primary" class="top_bottom">信号波形图</a-button>
            <a-button type="primary">滤波后波形</a-button>
          </div>
        </div>
        <div class="mian_bottom_item">
          <div class="main_bottom_title">智能故障诊断</div>
          <div class="main_bottom_button">
            <a-button type="primary" class="top_bottom">基于TVAR模型</a-button>
            <a-button type="primary">基于GARCH模型</a-button>
          </div>
        </div>
        <div class="mian_bottom_item">
          <div class="main_bottom_title">在线诊断</div>
          <div class="main_bottom_button">
            <a-button type="primary" class="top_bottom">在线采集信号</a-button>
            <a-button type="primary">诊断结果保存</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Left from "./Left.vue";
import Table from "./table.vue";
</script>

<style scoped>
.container {
  display: flex;
}
.left {
  width: 50vw;
  height: 85vh;
  border-right: 2px solid black;
  padding: 2vh 0;
}
.mian {
  width: auto;
  padding: 2vh 5vw;
}
.mian-title {
  font-size: 2vw;
  font-weight: bold;
}
.main_bottom{
  display: flex;
  padding: 2vh 0;
}
.top_bottom{
  margin-bottom: 2vh;
}
</style>