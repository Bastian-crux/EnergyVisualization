import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';
import Index from "@/components/Index/Index.vue";
import Overview from "@/components/Overview/Overview.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Index,
        },
        {
            path: '/overview',
            component: Overview,
        }
    ]
});

const app = createApp(App);

app.use(router);

app.mount('#app');
