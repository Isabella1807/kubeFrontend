import './assets/main.scss'
import './assets/darkmode.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleXmark, faFloppyDisk, faPlus, faTrashCan, faPenSquare,faSortDown } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import ApiService from './services/apiService';

library.add(faCircleXmark)
library.add(far)
library.add(faFloppyDisk)
library.add(faPlus)
library.add(faPenSquare)
library.add(faTrashCan)
library.add(faSortDown)


// Set the API base URL
ApiService.init('http://localhost:3000');


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
