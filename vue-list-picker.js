import VueListPicker from './src/components/VueListPicker.vue'

// Export components
const Components = {
  VueListPicker
}

const VueListPickerPlugin = {
  install (Vue) {
    Object.keys(Components).forEach((name) => {
      Vue.component(name, Components[name])
    })
  }
}

// Export as a plugin
export default VueListPickerPlugin

// Export as individual components
export {
  VueListPicker
}
