import type {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "main.layout",
        component:  () => import("@/layouts/MainLayout.vue"),
        meta: {
            middleware: {
                auth: true
            }
        },
        redirect: {name: 'main'},
        children: [
            {
                path: "/",
                name: "main",
                component: () => import("@/pages/MainIndex.vue")
            }
        ]
    },
    {
        path: "/auth",
        name: "login.layout",
        component: () => import("@/layouts/AuthLayout.vue"),
        redirect: {name: 'login'},
        children: [
            {
                path: "/login",
                name: "login",
                component: () => import("@/pages/Auth.vue"),
            },
            {
                path: "/register",
                name: "register",
                component: () => import("@/pages/Auth.vue")
            },
        ]
    },
    {
        path: "/test",
        component: () => import("@/pages/Test.vue")
    }
];

export default routes;
