import { createApp } from 'vue';
import App from './App.vue';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import './assets/css/main.css';

import router from './routes.js';
import store from './store/index.js';

import BaseCard from './components/UI/BaseCard.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import ImageView from './components/UI/ImageView.vue';
import BaseSpinner from './components/UI/BaseSpinner.vue';
import BaseImage from './components/UI/BaseImage.vue';

const app = createApp(App);


app.use(router);
app.use(store);
app.use(BootstrapIconsPlugin);

app.component('base-card',BaseCard);
app.component('base-dialog',BaseDialog);
app.component('image-view',ImageView);
app.component('base-spinner',BaseSpinner);
app.component('base-image',BaseImage);

app.mount('#app')
