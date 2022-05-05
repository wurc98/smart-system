import { read, utils } from 'xlsx'
import { ref, computed, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
const tableAllData = ref([])
const lineData = ref([])
const currentLine = ref(0)
const isShow = ref(false)

const initLine1 = () => {
  const chartDom = document.getElementById('echarts1')
  const myChart = echarts.init(chartDom)
  const option = {
    title: {
      text: '原始信号',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      // axisLabel: {
      //   formatter: '{value} °C',
      // },
    },
    series: [
      {
        name: 'Lowest',
        type: 'line',
        data: lineData.value,
      },
    ],
  }
  myChart.setOption(option)
}
export const useHome = () => {
  const fileList = ref([])
  const uploadTrarnsform = (file) => {
    return new Promise((resolve) => {
      let reader = new FileReader()
      reader.readAsBinaryString(file)
      reader.onload = (ev) => {
        resolve(ev.target.result)
      }
    })
  }

  const handleChange = (file) => {
    fileList.value = file.fileList
  }
  const beforeUpload = async (file) => {
    const path = file.path
    let reader = await uploadTrarnsform(file)
    const worker = read(reader, { type: 'binary' })
    const result_line = utils.sheet_to_json(
      worker.Sheets[worker.SheetNames[0]],
      { header: 1 }
    )
    const result_table = utils.sheet_to_json(
      worker.Sheets[worker.SheetNames[1]],
      { header: 1 }
    )
    const data = dataProcessing(result_line, result_table, path)
    tableAllData.value = [...tableAllData.value, ...data]
    console.log('tableAllData.value.length :>> ', tableAllData.value.length)
    lineData.value = data[currentLine.value].value
    initLine1()
    return false
  }
  const dataProcessing = (line_data, table_data, path) => {
    line_data = line_data.reduce(function (a, b) {
      return a.concat(b)
    })
    const n = line_data.length / 2400
    let arr = []
    for (let i = 0; i < n; i++) {
      arr.push({
        path,
        label: table_data[i][0],
        value: line_data.slice(i * 2400, (i + 1) * 2400),
      })
    }
    return arr
  }

  const handleDrop = (e) => {
    console.log(e)
  }

  onMounted(() => {
    initLine1()
  })

  const show = () => {
    isShow.value = true
  }

  return {
    fileList,
    beforeUpload,
    handleChange,
    handleDrop,
    show,
  }
}

export const useTable = () => {
  const current = ref(0)
  const pageSize = ref(20)
  const total = ref(tableAllData.value.length)
  const tableData = computed(() => {
    const current_table = tableAllData.value.slice(
      current.value * pageSize.value,
      (current.value + 1) * pageSize.value
    )
    const result = current_table.map((item, index) => {
      return {
        path: item.path,
        label: item.label,
        value: item.value,
      }
    })
    return result
  })
  const columns = ref([
    {
      title: '文件位置',
      dataIndex: 'path',
    },
  ])
  watch(isShow, (value) => {
    if (value) {
      columns.value.push({
        title: '诊断输出',
        dataIndex: 'label',
      })
      console.log('columns :>> ', columns.value)
    }
  })
  watch(tableAllData, (value) => {
    total.value = value.length
  })
  const onShowSizeChange = (cur, limit) => {
    pageSize.value = limit
    current.value = cur
    console.log('limit :>> ', limit, cur)
  }
  const changeSize = (cur, limit) => {
    console.log('cur :>> ', cur, limit)
    pageSize.value = limit
    current.value = cur
  }
  const handleClickRow = (record, index, row) => {
    return {
      onClick: () => {
        lineData.value = record.value
        initLine1()
      },
    }
  }
  return {
    tableData,
    columns,
    total,
    current,
    pageSize,
    changeSize,
    onShowSizeChange,
    handleClickRow,
  }
}
