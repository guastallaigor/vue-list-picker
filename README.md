<p align="center">
  <img width="200px" src="./.github/logo.png"><br>
  Just a simple list picker component made with Vue.js.
</p>

<p align="center">
    <a href="https://circleci.com/gh/guastallaigor/vue-list-picker/tree/master"><img src="https://badgen.net/circleci/github/guastallaigor/vue-list-picker/master" alt="Build"></a>
    <a href="https://codecov.io/gh/guastallaigor/vue-list-picker"><img src="https://codecov.io/gh/guastallaigor/vue-list-picker/branch/master/graph/badge.svg" alt="Code Coverage"></a>
    <a href="https://www.npmjs.com/package/vue-list-picker"><img src="https://img.shields.io/npm/dt/vue-list-picker.svg" alt="Total Downloads"></a>
    <a href="https://github.com/guastallaigor/vue-list-picker/releases"><img src="https://img.shields.io/npm/v/vue-list-picker.svg" alt="Latest Release"></a>
    <a href="http://standardjs.com"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="Style standard"></a>
</p>

## Demo

Go to https://vuelistpicker.now.sh

## How to install

### npm

```bash
$ npm install vue-list-picker --save
```

### yarn

```bash
$ yarn add vue-list-picker
```

## Quick start
### Vue.js

You can import in your `main.js` file

```js
import Vue from 'vue'
import VueListPicker from 'vue-list-picker'

Vue.use(VueListPicker)
```

Or locally in any component

```js
import { VueListPicker } from 'vue-list-picker'

export default {
  components: {
    VueListPicker
  }
}
```

### Nuxt.js

You can import as a Nuxt.js plugin

`~/plugins/vue-list-picker.js`
```js
import Vue from 'vue'
import VueListPicker from 'vue-list-picker'

Vue.use(VueListPicker)
```

and then import it in your `nuxt.config.js` file
```js
plugins: [
    '~/plugins/vue-list-picker.js'
]
```

There's a window mouseup event listener so you should use the `<no-ssr>` tag

## Basic usage

```html
<template>
  <vue-list-picker 
    :left-items="leftItems"
    :right-items="rightItems"
    />
</template>

<script>
export default {  
  data() {
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

    return { leftItems, rightItems }
  }
}
</script>
```

## Props

| Property name       | Type    | Default           | Description                                                                                     |
|---------------------|---------|-------------------|-------------------------------------------------------------------------------------------------|
| left-items          | Array   | null              | Array of objects to be displayed in the left. Must have at least a key and content property     |
| right-items         | Array   | null              | Array of objects to be displayed in the right. Must have at least a key and content property    |
| moved-item-location | String  | 'top'             | After move a item, if this is set to top will move the item to the top, otherwise to the bottom |
| title-left          | String  | 'Items available' | Title name of the left column                                                                   |
| title-right         | String  | 'Items selected'  | Title name of the right column                                                                  |
| title-centered      | Boolean | true              | Centralizes the title text                                                                      |
| title-class         | String  | ''                | If you want to set a custom class to the columns title, set it here                             |
| title-substr        | String  | 20                | Number of characters to display inside the columns title. Above this, will set a '...' mask     |
| button-class        | String  | ''                | If you want to set a custom class to all the buttons in between the columns, set it here        |
| content-key         | String  | 'key'             | Property name inside the objects inside each items array, that will be used to move the object  |
| content-attr        | String  | 'content'         | Property name inside the objects inside each items array, that will set the text content        |
| content-centered    | Boolean | false             | Centralizes all the text content                                                                |
| content-class       | String  | ''                | If you want to set a custom class to the each content item, set it here                         |
| content-substr      | String  | 23                | Number of characters to display inside the content item. Above this, will set a '...' mask      |
| min-height          | String  | '450px'           | Min-height of each column                                                                       |
| height              | String  | ''                | Height of each column                                                                           |
| min-width           | String  | '220px'           | Min-width of each column                                                                        |
| width               | String  | ''                | Width of each column                                                                            |

## Events (optional usage)

| Event name     | Return type | Description          |
|----------------|-------------|----------------------|
| move-all-right | Array       | Array of items moved |
| move-right     | Object      | Item object moved    |
| move-left      | Object      | Item object moved    |
| move-all-left  | Array       | Array of items moved |
| unselect-all   | Array       | Empty array          |

## Slots (optional usage)

| Slot name    | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| moveAllRight | Use this to change the icon (chevrons-right) inside the first action button |
| moveRight    | Use this to change the icon (chevron-right) inside the second action button |
| moveLeft     | Use this to change the icon (chevron-left) inside the third action button   |
| moveAllLeft  | Use this to change the icon (chevrons-left) inside the fourth action button |
| unselectAll  | Use this to change the icon (x) inside the fifth action button              |

## Instructions

### Generics

1. Right now there's no draggable depency. But if you click and hold your mouse down and drag it into another itens in the same column, all of them it'll selected.
2. The title and content background are both blue (#0052c0), but you can change those using the `content-class` and `title-class` props.
3. By default the height isn't set, but it has an `overflow-y` CSS property, so if you use the height prop, you'll have a vertical scroll inside each panel.
4. If you pass anything other than `top` to `movedItemLocation`, the item after moved will go to the bottom.
5. The content key should be an unique key inside each array of objects (`left-items` / `right-items`).

### Actions

From top to bottom:

1. The first button moves all the left items to the right.
2. The second button moves all the **selected** left items to the right.
3. The third button moves all the right items to the left.
4. The fourth button moves all the **selected** right items to the left.
5. The fifth button unselect all the **selected** items from **all** columns (left and right).

## Development

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/guastallaigor/vue-list-picker/issues)

Fork the project and enter this commands in your terminal

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/vue-list-picker.git
cd vue-list-picker
yarn
```

### Storybook
For visual testing, this project contains storybook which you can run by doing the next command
```sh
$ yarn storybook
```

### Jest
Before making the PR, if you changed something that needs to be tested, please make the tests inside the `tests/unit` folder.

To run the tests, you can use the next command

```sh
$ yarn test:unit
```

### Commitlint
This project follows the [commitlint](https://github.com/conventional-changelog/commitlint) guidelines, with minor changes.

You can commit using `npm run commit` to help you with that.

There's a `pre-push` hook that runs all the unit tests before you can push it.

If an error occurs, you can use the `npm run commit:retry` command that runs the previous `npm run commit` that you already filled.

<a href="https://www.buymeacoffee.com/guastallaigor" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## License

MIT © [guastallaigor](https://github.com/guastallaigor/vue-list-picker/blob/master/LICENSE)
