<template>
  <div class="container">
    <div class="left">
      <Left />
    </div>
    <div class="mian">
      滚动轴承故障诊断记录
      <Table />
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
  width: 30vw;
  height: 85vh;
}
</style>