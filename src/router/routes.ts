import type {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "main.layout",
        components: {
            default: () => import("@/layouts/MainLayout.vue"),
            Header: () => import("@/components/layouts/Header.vue"),
            Footer: () => import("@/components/layouts/Footer.vue")
        },
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
                component: () => import("@/pages/main/MainIndex.vue")
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
