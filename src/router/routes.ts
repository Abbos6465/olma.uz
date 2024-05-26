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
                alias: "/",
                component: () => import("@/pages/products/ProductsIndex.vue")
            },
            {
                path: "/product/:id(\\d+)",
                name: "product",
                component: () => import("@/pages/products/ProductIdIndex.vue"),
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
                path: "/product/create",
                name: "product.create",
                component: () => import("@/pages/products/productId/ProductCreate.vue")
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
                alias: "",
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
        name: "test",
        component: () => import("@/pages/Test.vue")
    }
];

export default routes;
