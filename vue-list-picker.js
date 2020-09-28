// Import vue component
import component from './src/components/VueListPicker.vue'

// install function executed by Vue.use()
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('VueListPicker', component)
}

// Create module definition for Vue.use()
const plugin = {
  install
}

// To auto-install when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
let GlobalVue = null

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install

// Export component by default
export default component
