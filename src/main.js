import Vue from "vue";
import App from "./App.vue";
import Cloudbase from "@cloudbase/vue-provider";
import config from "../cloudbaserc";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false;

Vue.use(Cloudbase, {
  env: config.envId,
});
Vue.use(ElementUI);
Vue.use(VueClipboard)

new Vue({
  render: (h) => h(App),
}).$mount("#app");
