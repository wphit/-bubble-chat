import VueRouter from "vue-router"
import Header from "./components/header"
import Footer from "./components/footer"
import Login from "./page/login"
import Index from "./page/index"


export default [
    {
        name:"/",
        path:"/",
        component:Index
    },
    {
        name:"header",
        path:"/header",
        component:Header
    },
    {
        path:"/footer",
        component:Footer
    },
    {
        path:"/login",
        component:Login
    },
    {
        name:"index",
        path:"/index",
        component:Index
    }
]