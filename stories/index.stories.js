/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withKnobs, object, text, select } from '@storybook/addon-knobs'
// import { action } from '@storybook/addon-actions'
import VueListPicker from '../src/components/VueListPicker'

const listpickerStory = storiesOf('VueListPicker', module)
  .addParameters({ backgrounds: [
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Yellow', value: 'yellow' },
    { name: 'Orange', value: 'orange' },
    { name: 'Red', value: 'red' },
    { name: 'Purple', value: 'purple' },
    { name: 'Black', value: 'black' },
    { name: 'White', value: 'white', default: true }
  ] })
  .addDecorator(withKnobs)

listpickerStory.add('Default', () => {
  const label1 = 'Object 1'
  const defaultValue1 = {
    key: 1,
    content: 'Item 1'
  }
  const value1 = object(label1, defaultValue1)

  const label2 = 'Object 2'
  const defaultValue2 = {
    key: 2,
    content: 'Item 2'
  }
  const value2 = object(label2, defaultValue2)

  const label3 = 'Object 3'
  const defaultValue3 = {
    key: 3,
    content: 'Item 3'
  }
  const value3 = object(label3, defaultValue3)

  const leftItems = [value1, value2, value3]
  const rightItems = []

  return {
    components: { VueListPicker },
    props: {
      titleLeft: {
        type: String,
        default: text('Title of the left column', 'Items available')
      },
      titleRight: {
        type: String,
        default: text('Title of the right column', 'Items selected')
      },
      movedItemLocation: {
        type: String,
        default: select('Move item to top or bottom', { top: 'top', bottom: 'bottom' }, 'top')
      },
      leftItems: {
        type: Array,
        default: [ ...leftItems.map(it => ({ ...it })) ]
      },
      rightItems: {
        type: Array,
        default: [ ...rightItems.map(it => ({ ...it })) ]
      },
      attrKey: {
        type: String,
        default: text('Attribute key', 'key')
      },
      attrContent: {
        type: String,
        default: text('Attribute content', 'content')
      }
    },
    template: `<vue-list-picker
      :title-left="titleLeft"
      :title-right="titleRight"
      :moved-item-location="movedItemLocation"
      :left-items="leftItems"
      :right-items="rightItems"
      :attr-key="attrKey"
      :attr-content="attrContent"
      />`
  }
})
