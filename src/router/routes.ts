import type {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "main.layout",
        components: {
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
                component: () => import("@/pages/Main.vue")
            }
        ]
    },
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
    {
        path: "/test",
        component: () => import("@/pages/Test.vue")
    }
];

export default routes;
