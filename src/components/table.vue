<template>
  <div>
    <a-table :dataSource="tableData" :columns="columns" :pagination="false" :customRow="handleClickRow" :scroll="{ y: 450 }" />
    <a-pagination v-model:current="current" v-model:pageSize="pageSize" show-size-changer :total="total" @change="changeSize" @showSizeChange="onShowSizeChange" />
  </div>
</template>
<script setup>
import { useTable } from "../composables/useHome";
const {
  total,
  tableData,
  columns,
  current,
  pageSize,
  changeSize,
  onShowSizeChange,
  handleClickRow,
} = useTable();
</script>
<style>
.ant-table-container {
  min-height: 500px !important;
  max-height: 500px !important;
}
.ant-pagination {
  margin-top: 20px !important;
  text-align: right;
}
</style>