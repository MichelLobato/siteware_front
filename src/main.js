import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';

const app = createApp(App);

app.config.globalProperties.$ipAddress = '172.16.4.63';

app.use(router).mount('#app');