import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import Vant, { Toast as toast } from 'vant';

import VueClipboard from 'vue-clipboard2';

import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { time2 } from '@/api/autoRequest';

import './utils/Dayjs';

import 'vant/lib/index.less';
import 'amfe-flexible';

import plugin from '@/plugin';

import './style/index.css';
import './style/buysell-icons/iconfont.css';
import './style/font/iconfont.css'
import VueCanvasPoster from 'vue-canvas-poster';
import cookie from 'js-cookie';
import all from '@/js/all';
import { Lazyload } from 'vant';

import { i18n, vantLocales } from '../src/i18n';

vantLocales(i18n.locale);
Vue.use(Lazyload);
Vue.use(cookie);
Vue.use(all);

Vue.use(VueClipboard);

Vue.use(Vant);
Vue.use(plugin);
Vue.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.8,
  showCloseButtonOnHover: false, // 仅在悬停时显示关闭按钮
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
  maxToasts: 3
});
Vue.prototype.$cookie = cookie
Vue.prototype.$Toast = toast
Vue.prototype.$switch = function (msg, a, b, c, d, e) {
  switch (msg) {
    case "1":
      toast.fail(a)
      break;
    case "2":
      toast.fail(b)
      break
    case "3":
      toast.fail(c)
      break
    case "4":
      toast.fail(d)
      break
    case "5":
      toast.fail(e)
      break
  }
  return false;
}
Vue.use(VueCanvasPoster);

Vue.config.productionTip = false;
Vue.prototype.$Bus = new Vue()
Vue.config.errorHandler = function (err, vm, info) {
  // router.replace({
  // 	name: 'index'
  // });
};

new Vue({
  render: (h) => h(App),
  router,
  store,
  i18n,
  beforeCreate () {
    Vue.prototype.$bus = this;
    Vue.prototype.bug = time2;
  }
}).$mount('#app');
