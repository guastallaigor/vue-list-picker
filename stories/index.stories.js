// ! TODO
// ! Fix array of objects controls

import { action } from '@storybook/addon-actions'
import VueListPicker from '../src/components/VueListPicker'

export default {
  title: 'VueListPicker',
  component: VueListPicker,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      expanded: true
    },
    backgrounds: {
      default: 'White',
      values: [
        { name: 'Blue', value: 'blue' },
        { name: 'Green', value: 'green' },
        { name: 'Yellow', value: 'yellow' },
        { name: 'Orange', value: 'orange' },
        { name: 'Red', value: 'red' },
        { name: 'Purple', value: 'purple' },
        { name: 'Black', value: 'black' },
        { name: 'White', value: 'white' }
      ]
    }
  },
  argTypes: {
    leftItems: {
      control: 'array'
    },
    rightItems: {
      control: 'array'
    },
    movedItemLocation: {
      control: {
        type: 'inline-radio',
        options: ['top', 'bottom'],
      }
    },
    titleLeft: {
      control: 'text'
    },
    titleRight: {
      control: 'text'
    },
    titleCentered: {
      control: 'boolean'
    },
    titleClass: {
      control: 'text'
    },
    titleSubstr: {
      control: 'number'
    },
    buttonClass: {
      control: 'text'
    },
    contentKey: {
      control: 'text'
    },
    contentAttr: {
      control: 'text'
    },
    contentCentered: {
      control: 'boolean'
    },
    contentClass: {
      control: 'text'
    },
    contentSubstr: {
      control: 'number'
    },
    minHeight: {
      control: 'text'
    },
    height: {
      control: 'text'
    },
    minWidth: {
      control: 'text'
    },
    width: {
      control: 'text'
    }
  }
}

const example1 = {
  key: 1,
  content: 'Item 1'
}
const example2 = {
  key: 2,
  content: 'Item 2'
}
const example3 = {
  key: 3,
  content: 'Item 3'
}
const example4 = {
  key: 4,
  content: 'Item 4'
}

const leftItems = [example1, example2]
const rightItems = [example3, example4]

const actionsData = {
  moveLeft: action('move-left'),
  moveRight: action('move-right'),
  moveAllLeft: action('move-all-left'),
  moveAllRight: action('move-all-right'),
  unselectAll: action('unselect-all')
};

export const Default = () => ({
  components: { VueListPicker },
  methods: actionsData,
  props: {
    leftItems: {
      type: Array,
      default: leftItems
    },
    rightItems: {
      type: Array,
      default: rightItems
    },
    movedItemLocation: {
      type: String,
      default: 'top'
    },
    titleLeft: {
      type: String,
      default: 'Items available'
    },
    titleRight: {
      type: String,
      default: 'Items selected'
    },
    titleCentered: {
      type: Boolean,
      default: true
    },
    titleClass: {
      type: String,
      default: ''
    },
    titleSubstr: {
      type: Number,
      default: 20
    },
    buttonClass: {
      type: String,
      default: ''
    },
    contentKey: {
      type: String,
      default: 'key'
    },
    contentAttr: {
      type: String,
      default: 'content'
    },
    contentCentered: {
      type: Boolean,
      default: false
    },
    contentClass: {
      type: String,
      default: ''
    },
    contentSubstr: {
      type: Number,
      default: 23
    },
    minHeight: {
      type: String,
      default: '450px'
    },
    height: {
      type: String,
      default: ''
    },
    minWidth: {
      type: String,
      default: '220px'
    },
    width: {
      type: String,
      default: ''
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
})
