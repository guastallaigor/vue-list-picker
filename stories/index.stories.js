/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withKnobs, object, text, select, boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
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
    methods: {
      moveLeft: action('move-left'),
      moveRight: action('move-right'),
      moveAllLeft: action('move-all-left'),
      moveAllRight: action('move-all-right'),
      unselectAll: action('unselect-all')
    },
    props: {
      leftItems: {
        type: Array,
        default: [ ...leftItems.map(it => ({ ...it })) ]
      },
      rightItems: {
        type: Array,
        default: [ ...rightItems.map(it => ({ ...it })) ]
      },
      movedItemLocation: {
        type: String,
        default: select('Move item to top or bottom', { top: 'top', bottom: 'bottom' }, 'top')
      },
      titleLeft: {
        type: String,
        default: text('Title of the left column', 'Items available')
      },
      titleRight: {
        type: String,
        default: text('Title of the right column', 'Items selected')
      },
      titleCentered: {
        type: Boolean,
        default: boolean('Title centered text', true)
      },
      titleClass: {
        type: String,
        default: text('Title custom class', '')
      },
      titleSubstr: {
        type: Number,
        default: number('Title substring', 20)
      },
      buttonClass: {
        type: String,
        default: text('Button custom class', '')
      },
      contentKey: {
        type: String,
        default: text('Content attribute key', 'key')
      },
      contentAttr: {
        type: String,
        default: text('Content attribute text', 'content')
      },
      contentCentered: {
        type: Boolean,
        default: boolean('Content centered text', false)
      },
      contentClass: {
        type: String,
        default: text('Content custom class', '')
      },
      contentSubstr: {
        type: Number,
        default: number('Content substring', 23)
      },
      minHeight: {
        type: String,
        default: text('Min height of each column', '450px')
      },
      height: {
        type: String,
        default: text('Height of each column', '')
      },
      minWidth: {
        type: String,
        default: text('Min width of each column', '220px')
      },
      width: {
        type: String,
        default: text('Width of each column', '')
      }
    },
    template: `<vue-list-picker
      :left-items="leftItems"
      :right-items="rightItems"
      :moved-item-location="movedItemLocation"
      :title-left="titleLeft"
      :title-right="titleRight"
      :title-centered="titleCentered"
      :title-class="titleClass"
      :title-substr="titleSubstr"
      :button-class="buttonClass"
      :content-key="contentKey"
      :content-attr="contentAttr"
      :content-centered="contentCentered"
      :content-class="contentClass"
      :content-substr="contentSubstr"
      :min-height="minHeight"
      :height="height"
      :min-width="minWidth"
      :width="width"
      @move-left="moveLeft"
      @move-right="moveRight"
      @move-all-right="moveAllRight"
      @move-all-left="moveAllLeft"
      @unselect-all="unselectAll"
      />`
  }
})
