import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';

// 导入全局样式
import './styles/index.scss';

// 导入svgIcon
import installIcons from '@/icons';

// 导入路由鉴权
import './permission';

// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n';

// filter全局属性
import installFilter from '@/filters';

// 指令
import installDirective from './directives';

const app = createApp(App);
installFilter(app);
installElementPlus(app);
installIcons(app);
installDirective(app);

app.use(i18n);
app.use(store).use(router).mount('#app');
