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


Vue.component('product', require('./page/product.vue').default);
Vue.component('user-manage', require('./page/userManage.vue').default);
Vue.component('transaction', require('./page/transaction.vue').default);
Vue.component('report-user', require('./page/reportforuser.vue').default);
Vue.component('sale-report', require('./page/salereport.vue').default);
Vue.component('dividend-for-admin', require('./page/dividendforadmin.vue').default);



const app = new Vue({
    el: '#app'
});