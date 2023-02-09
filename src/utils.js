import {createApp} from "vue";
import ToolTip from "@/components/pages/overview/ToolTip.vue";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'


export const statusChinese = (str) => {
  switch (str) {
    case 'announced':
      return '已启动';
    case 'construction':
      return '建设中';
    case 'development':
      return '规划中';
    case 'operating':
      return '运行中';
    case 'retired':
      return '已退役';
    case 'pre-construction':
      return '预建中';
    case 'shelved':
      return '已搁置';
  }
};

export const formatterHelper = (params) => {
  const dom = document.createElement('div');
  const MyComponent = createApp(ToolTip, {
    name: params.name,
    year: params.value[4],
    status: params.value[2],
    capacity: params.value[3]
  });
  MyComponent.use(ElementPlus);
  const instance = MyComponent.mount(dom);
  return instance.$el;
};