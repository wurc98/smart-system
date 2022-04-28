import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { Upload, Table, Pagination,Form,Input } from 'ant-design-vue';
const app = createApp(App)
app.use(Upload).use(Table).use(Pagination).use(Form).use(Input);

app.use(Antd).mount('#app')
