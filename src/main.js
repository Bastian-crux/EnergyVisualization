import { createApp } from "vue";
import { TroisJSVuePlugin } from "troisjs-draco";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "./styles/style.css";
import "./styles/transition.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGauge,
  faBolt,
  faCalendar,
  faCircleInfo,
  faCoins,
  faClock,
  faSmog,
  faMoneyBillTrendUp,
  faStar,
  faChevronLeft,
  faChevronRight,
  faFire,
  faRadiation,
  faSun,
  faWind,
  faDroplet,
  faInfoCircle,
  faBullseye,
  faNoteSticky,
  faChartColumn,
  faChartLine,
  faRotateLeft,
  faArrowUp,
  faArrowLeft,
  faPersonWalking,
  faCamera,
  faOilWell,
  faGasPump,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import Index from "@/components/pages/index/Index.vue";
import Scene from "@/components/pages/index/Scene.vue";
import Surf from "@/components/pages/surf/Surf.vue";
import SurfScene from "@/components/pages/surf/SurfScene.vue";
import Game from "@/components/pages/game/Game.vue";
import GameScene from "@/components/pages/game/GameScene.vue";
import Chart from "@/components/pages/chart/Chart.vue";

import IndexModelTest from "@/components/pages/index/deprecated/IndexModelTest.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Index,
    },
    {
      path: "/scene",
      component: Scene,
    },
    {
      path: "/surf",
      component: Surf,
    },
    {
      path: "/surf-scene",
      component: SurfScene,
    },
    {
      path: "/game",
      component: Game,
    },
    {
      path: "/game-scene",
      component: GameScene,
    },
    {
      path: "/chart",
      component: Chart,
    },
  ],
});

const app = createApp(App);

// Add icon here
library.add(
  faGauge,
  faBolt,
  faCalendar,
  faCircleInfo,
  faCoins,
  faClock,
  faSmog,
  faMoneyBillTrendUp,
  faStar,
  faChevronLeft,
  faChevronRight,
  faFire,
  faRadiation,
  faSun,
  faWind,
  faDroplet,
  faInfoCircle,
  faBullseye,
  faNoteSticky,
  faDroplet,
  faChartColumn,
  faChartLine,
  faRotateLeft,
  faArrowUp,
  faArrowLeft,
  faPersonWalking,
  faCamera,
  faOilWell,
  faGasPump,
  faArrowRight
);

const vuetify = createVuetify({
  components,
  directives,
});

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(TroisJSVuePlugin);
app.use(vuetify);
app.mount("#app");
