import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// Создаем экземпляр приложения Vue
const app = createApp(App);

// Устанавливаем Ant Design Vue
app.use(Antd);

// Монтируем приложение в элемент с id="app"
app.mount('#app');
