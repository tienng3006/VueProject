import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "/node_modules/primeflex/primeflex.css";

const store = createStore(storeConfigs);

const app = createApp(App);

import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import Ripple from "primevue/ripple";

import storeConfigs from "./store/index";

app.component("InputText", InputText);
app.component("Password", Password);
app.component("Button", Button);
app.component("Menubar", Menubar);
app.component("Toast", Toast);
app.component("Dialog", Dialog);
app.directive("ripple", Ripple);

app.use(ToastService);

app.use(store).use(router).use(PrimeVue, { ripple: true }).mount("#app");
