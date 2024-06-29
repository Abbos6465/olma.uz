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
        redirect: {name: 'products'},
        children: [
            {
                path: "/products",
                name: "products",
                alias: ["/", "/product"],
                component: () => import("@/pages/products/ProductsIndex.vue")
            },
            {
                path: "/product",
                children: [
                    {
                        path: ":id(\\d+)",
                        children: [
                            {
                                path: "",
                                name: "product.show",
                                component: () => import("@/pages/products/productId/ProductShow.vue"),
                            },
                            {
                                path: "update",
                                name: "product.update",
                                component: () => import("@/pages/products/productId/ProductUpdate.vue"),
                            }
                        ]
                    },
                    {
                        path: "create",
                        name: "product.create",
                        component: () => import("@/pages/products/ProductCreate.vue")
                    }
                ]
            },
        ]
    },
    {
        path: "/auth",
        name: "auth",
        component: () => import("@/layouts/AuthLayout.vue"),
        redirect: {name: 'login'},
        children: [
            {
                path: "/login",
                name: "login",
                alias: "",
                component: () => import("@/pages/Auth.vue"),
            },
            {
                path: "/register",
                name: "register",
                component: () => import("@/pages/Auth.vue")
            }
        ]
    },
    {
        path: `/:catchAll(.*)`,
        name: "notfound",
        component: () => import("@/pages/404.vue"),
    }
];

export default routes;
