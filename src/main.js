import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import {library} from '@fortawesome/fontawesome-svg-core';
import {faGauge, faBolt, faCalendar, faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

import Index from "@/components/pages/index/Index.vue";
import Overview from "@/components/pages/overview/Overview.vue";
import Statistic from "@/components/pages/statistic/Statistic.vue";
import HeatMapIndex from "@/components/pages/heatmap/HeatMapIndex.vue";

const router = createRouter({
  history: createWebHistory(), routes: [{
    path: '/', component: Index,
  }, {
    path: '/overview', component: Overview,
  }, {
    path: '/statistic', component: Statistic,
  }, {
    path: '/heatmap', component: HeatMapIndex,
  }]
});

const app = createApp(App);

// Add icon here
library.add(faGauge, faBolt, faCalendar, faCircleInfo);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount('#app');
