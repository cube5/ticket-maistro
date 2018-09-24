import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import EventDetail from "./views/EventDetail.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/events"
    },
    {
      path: "/events",
      name: "events",
      component: Home
    },
    {
      path: "/events/:id",
      name: "event",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/EventDetail.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
