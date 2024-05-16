import {createApp, markRaw} from 'vue';
import {createPinia} from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import "@/assets/styles/app.scss";
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as labsComponents from 'vuetify/labs/components'
import {mdi, aliases} from "vuetify/iconsets/mdi";
import '@mdi/font/css/materialdesignicons.min.css';

const vuetify = createVuetify({
    components,
    ...directives,
    ...labsComponents,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});


const app = createApp(App)

const pinia = createPinia();
pinia.use(({ store }) => { store.router = markRaw(router) });

app
    .use(createPinia())
    .use(router)
    .use(pinia)
    .use(vuetify)
    .mount('#app')
