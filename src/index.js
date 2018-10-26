import Vue from 'vue'
import VueSocketIo from "vue-socket.io"
import socketio from 'socket.io-client';
import App from './App.vue'
import VueRouter from "vue-router"
import routes from "./router.js"
import  "./public/css/common.css"


Vue.use(VueRouter);
Vue.use(VueSocketIo,'http://10.103.25.9:4000');
//Vue.use(socketio("http://10.103.25.9:4000"))

var router = new VueRouter({
    routes
});
new Vue({
    el: "#root",
    render:h=>h(App),
    router:router
})