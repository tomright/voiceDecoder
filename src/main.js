import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import ElementPluse from "element-plus";
import "./assets/main.css";

import * as ElementPluseIconVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import ru from "element-plus/es/locale/lang/ru";

const app = createApp(App);
app.use(ElementPluse, { locale: ru }).mount("#app");

for (const [key, component] of Object.entries(ElementPluseIconVue)) {
  app.component(key, component);
}
