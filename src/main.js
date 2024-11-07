import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleXmark, faFloppyDisk, faPlus, faTrashCan, faPenSquare,faSortDown } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(faCircleXmark)
library.add(far)
library.add(faFloppyDisk)
library.add(faPlus)
library.add(faPenSquare)
library.add(faTrashCan)
library.add(faSortDown)


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
