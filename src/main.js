import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Index from "@/components/pages/index/Index.vue";
import Overview from "@/components/pages/overview/Overview.vue";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faGauge, faBolt, faCalendar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

const router = createRouter({
  history: createWebHistory(), routes: [{
    path: '/', component: Index,
  }, {
    path: '/overview', component: Overview,
  }]
});

const app = createApp(App);
library.add(faGauge, faBolt, faCalendar);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(ElementPlus);

app.mount('#app');
