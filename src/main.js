import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import ElementPluse from "element-plus";
import "./assets/main.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import ru from "element-plus/es/locale/lang/ru";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia).use(ElementPluse, { locale: ru }).mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
