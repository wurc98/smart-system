import { read, utils } from "xlsx";
import { ref, computed } from 'vue'
const tableAllData = ref([]);
export const useHome = () => {
    const fileList = ref([]);
    const uploadTrarnsform = (file) => {
        return new Promise((resolve) => {
            let reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = (ev) => {
                resolve(ev.target.result);
            };
        });
    };

    const handleChange = (file) => {
        fileList.value = file.fileList
        console.log("file", file);
    };
    const beforeUpload = async (file) => {
        let reader = await uploadTrarnsform(file);
        const worker = read(reader, { type: "binary" });
        reader = utils.sheet_to_json(worker.Sheets[worker.SheetNames[0]], {
            header: 1,
        });
        console.log("reader", reader);
        tableAllData.value = reader[0]
        return false;
    };
    const handleDrop = e => {
        console.log(e);
    }

    return {
        fileList,
        beforeUpload,
        handleChange,
        handleDrop
    }
}

export const useTable = () => {
    const current = ref(0)
    const pageSize = ref(20)
    const total = computed(() => tableAllData.value.length / pageSize.value)
    const tableData = computed(() => {
        const current_table = tableAllData.value.slice(current.value * pageSize.value, (current.value + 1) * pageSize.value)
        const result = current_table.map((item, index) => {
            return {
                id: current.value * pageSize.value + index + 1,
                value: item
            }
        })
        console.log('result', result)
        return result
    })
    const columns = [
        {
            title: "序号",
            dataIndex: "id",
        },
        {
            title: "诊断输出",
            className: "column-money",
            dataIndex: "value",
        },
    ];
    const onShowSizeChange = (cur, limit) => {
        console.log('cur,limit', cur, limit)
    }
    return {
        tableData, columns, total, current, pageSize, onShowSizeChange
    }
}