import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createHead} from "@unhead/vue/client";
import {createClient} from "./HttpClient";
import {getUserLocale, i18n, loadLocale} from "./i18n.ts";

const BASE_API_URL : string = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8080/api/v1";

createClient(BASE_API_URL);
const app = createApp(App);
const head = createHead();
app.use(i18n);

await loadLocale(getUserLocale());

app.use(head);
app.mount('#app')