import { create } from '@storybook/theming/create'

export default create({
  base: 'light',

  colorPrimary: '#0052c0',
  colorSecondary: '#0052c0',

  // UI
  appBg: '#F7FAFC',
  appContentBg: '#EDF2F7',
  appBorderColor: '#CBD5E0',
  appBorderRadius: 4,

  // Typography
  fontBase: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#1A202C',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: '#FFFFFF',
  barBg: '#35495e',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: '#1A202C',
  inputBorderRadius: 4,

  brandTitle: 'Vue List Picker',
  brandUrl: 'https://github.com/guastallaigor/vue-list-picker',
  brandImage: 'https://github.com/guastallaigor/vue-list-picker/blob/master/.github/logo.png?raw=true'
})
