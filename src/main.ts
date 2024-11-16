import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

// import './assets/main.css'
import 'vuetify/dist/vuetify.min.css'

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light', // or 'dark'
    },
  })

 
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
