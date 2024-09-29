import VueRouter from "vue-router";
import HomePage from "@/pages/Home.vue";
import RepositoryPage from "@/pages/Repository.vue";
import Vue from "vue";
import Router from "vue-router"

Vue.use(Router)
export const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomePage,

        },
        {
            path: "/repo/:id",
            component: RepositoryPage,
        }
    ]
})