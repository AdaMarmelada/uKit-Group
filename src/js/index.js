import '../../dist/css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.min.css'
import catsState from './state/cats'
import VueRouter from 'vue-router'
import { RouterComponents, routerData } from './routes'


window.Vue = require('vue')
window.Vue.use(VueRouter)

// Vue.component('cats', require('./components/routes/cats.vue').default)
Vue.component('modal', require('./components/modal.vue').default)

const router = new VueRouter({mode: 'history'});

let componentConfig,
    app;

//подключение компонентов
Object.keys(RouterComponents).forEach((componentName) => {
  componentConfig = RouterComponents[componentName];
  Vue.component(componentName, componentConfig.default || componentConfig);
});
//end

//регистрация маршрутов
router.addRoutes(routerData);
//end


app = new Vue({
  router,
  data: {
    navigation: routerData
  },
  computed: {
    cats() {
      return catsState.getters.cats;
    }
  },
  methods: {
    load() {
      return catsState.dispatch('load')
    }
  }
}).$mount("#app");
