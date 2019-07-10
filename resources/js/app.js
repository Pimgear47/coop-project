require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'

Vue.use(Vuetify)
Vue.use(VeeValidate);

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('navbar', require('./components/navbar.vue').default);
Vue.component('carousel', require('./components/carousel.vue').default);


Vue.component('product', require('./components/page/product.vue').default);
Vue.component('user-manage', require('./components/page/staff/userManage.vue').default);
Vue.component('transaction', require('./components/page/staff/transaction.vue').default);
Vue.component('report-user', require('./components/page/user/reportforuser.vue').default);
Vue.component('sale-report', require('./components/page/staff/salereport.vue').default);
Vue.component('dividend-for-admin', require('./components/page/staff/dividendforadmin.vue').default);



const app = new Vue({
    el: '#app',
});