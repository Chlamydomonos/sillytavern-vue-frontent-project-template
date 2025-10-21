import { createApp } from 'vue';
import App from './App.vue';
import { ProjectHelper } from '@sillytavern-vue-frontend/project-helper';

const init = () => {
    const app = createApp(App);

    // 如果需要添加Vue插件（如Element Plus，Vue Router，Pinia等），在此添加

    return app;
};

// 不要删除以下代码
if (import.meta.env.DEV) {
    const app = init();
    app.provide('initialMessage', await (await fetch('/message.txt')).text());
    app.mount('#app');
} else {
    ProjectHelper.acceptVueApp(init);
}
