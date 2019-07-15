import { mount } from '@vue/test-utils'
import VueListPicker from '../../src/components/VueListPicker'

describe('When I create the VueListPicker component', () => {
  const value1 = {
    key: 1,
    content: 'Item 1'
  }
  const value2 = {
    key: 2,
    content: 'Item 2'
  }
  const value3 = {
    key: 3,
    content: 'Item 3'
  }
  const value4 = {
    key: 4,
    content: 'Item 4'
  }
  const value5 = {
    key: 5,
    content: 'Item 5'
  }
  const value6 = {
    key: 6,
    content: 'Item 6'
  }
  const leftItems = [value1, value2, value3]
  const rightItems = [value4, value5, value6]
  const createListPickerWrapper = (propsData = {}, slot) => {
    return mount(VueListPicker, {
      propsData,
      slots: {
        default: slot || 'VueListPicker'
      }
    })
  }

  it('should be a Vue instance', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems })
    expect(wrapper.find(VueListPicker).isVueInstance()).toBe(true)
  })

  it('should add a text-center class inside the title', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems, titleCentered: true })
    const listPickerLeft = wrapper.find('.vue-list-picker>.list-picker-left>.list-picker-title')
    expect(listPickerLeft.exists()).toBe(true)
    expect(listPickerLeft.classes().length).toBe(2)
    expect(listPickerLeft.classes()).toContainEqual('text-center')
    const listPickerRight = wrapper.find('.vue-list-picker>.list-picker-right>.list-picker-title')
    expect(listPickerRight.exists()).toBe(true)
    expect(listPickerRight.classes().length).toBe(2)
    expect(listPickerRight.classes()).toContainEqual('text-center')
  })

  it('should change the left title', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems, titleLeft: 'Items left changed' })
    const titleLeft = wrapper.find('.vue-list-picker>.list-picker-left>.list-picker-title')
    expect(titleLeft.exists()).toBe(true)
    expect(titleLeft.text()).toBe('Items left changed')
  })

  it('should change the right title', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems, titleRight: 'Items right changed' })
    const titleLeft = wrapper.find('.vue-list-picker>.list-picker-right>.list-picker-title')
    expect(titleLeft.exists()).toBe(true)
    expect(titleLeft.text()).toBe('Items right changed')
  })

  it('should validate leftItems and rightItems required props', () => {
    const consoleLog = console.error
    console.error = jest.fn()
    const wrapper = createListPickerWrapper({})
    const leftItems = wrapper.vm.$options.props.leftItems
    const rightItems = wrapper.vm.$options.props.rightItems
    expect(leftItems.required).toBeTruthy()
    expect(rightItems.required).toBeTruthy()
    expect(leftItems.type).toBe(Array)
    expect(rightItems.type).toBe(Array)
    const component = wrapper.find('.vue-list-picker')
    expect(component.exists()).toBe(true)
    console.error = consoleLog
  })

  it('should validate all the other default props', () => {
    const consoleLog = console.error
    console.error = jest.fn()
    const wrapper = createListPickerWrapper({ leftItems, rightItems })
    const movedItemLocation = wrapper.vm.$options.props.movedItemLocation
    expect(movedItemLocation.required).toBeFalsy()
    expect(movedItemLocation.type).toBe(String)
    expect(movedItemLocation.default).toBe('top')
    const titleLeft = wrapper.vm.$options.props.titleLeft
    expect(titleLeft.required).toBeFalsy()
    expect(titleLeft.type).toBe(String)
    expect(titleLeft.default).toBe('Items available')
    const titleRight = wrapper.vm.$options.props.titleRight
    expect(titleRight.required).toBeFalsy()
    expect(titleRight.type).toBe(String)
    expect(titleRight.default).toBe('Items selected')
    const component = wrapper.find('.vue-list-picker')
    expect(component.exists()).toBe(true)
    const leftTitle = wrapper.find('.vue-list-picker>.list-picker-left>.list-picker-title')
    expect(leftTitle.exists()).toBe(true)
    expect(leftTitle.text()).toBe('Items available')
    const rightTitle = wrapper.find('.vue-list-picker>.list-picker-right>.list-picker-title')
    expect(rightTitle.exists()).toBe(true)
    expect(rightTitle.text()).toBe('Items selected')
    console.error = consoleLog
  })

  it('should add html inside the slot moveAllRight', () => {
    const moveAllRight = '<p id="find-this-id">moveAllRight</p>'
    const propsData = { leftItems, rightItems }
    const wrapper = mount(VueListPicker, {
      propsData,
      slots: { moveAllRight }
    })
    const slot = wrapper.find('p#find-this-id')
    expect(wrapper.exists()).toBe(true)
    expect(slot.exists()).toBe(true)
    expect(slot.html()).toBe(moveAllRight)
  })

  it('should add html inside the slot moveAllLeft', () => {
    const moveAllLeft = '<p id="find-this-id">moveAllLeft</p>'
    const propsData = { leftItems, rightItems }
    const wrapper = mount(VueListPicker, {
      propsData,
      slots: { moveAllLeft }
    })
    const slot = wrapper.find('p#find-this-id')
    expect(wrapper.exists()).toBe(true)
    expect(slot.exists()).toBe(true)
    expect(slot.html()).toBe(moveAllLeft)
  })

  it('should add html inside the slot moveRight', () => {
    const moveRight = '<p id="find-this-id">moveRight</p>'
    const propsData = { leftItems, rightItems }
    const wrapper = mount(VueListPicker, {
      propsData,
      slots: { moveRight }
    })
    const slot = wrapper.find('p#find-this-id')
    expect(wrapper.exists()).toBe(true)
    expect(slot.exists()).toBe(true)
    expect(slot.html()).toBe(moveRight)
  })

  it('should add html inside the slot moveLeft', () => {
    const moveLeft = '<p id="find-this-id">moveLeft</p>'
    const propsData = { leftItems, rightItems }
    const wrapper = mount(VueListPicker, {
      propsData,
      slots: { moveLeft }
    })
    const slot = wrapper.find('p#find-this-id')
    expect(wrapper.exists()).toBe(true)
    expect(slot.exists()).toBe(true)
    expect(slot.html()).toBe(moveLeft)
  })

  it('should add html inside the slot unselectAll', () => {
    const unselectAll = '<p id="find-this-id">unselectAll</p>'
    const propsData = { leftItems, rightItems }
    const wrapper = mount(VueListPicker, {
      propsData,
      slots: { unselectAll }
    })
    const slot = wrapper.find('p#find-this-id')
    expect(wrapper.exists()).toBe(true)
    expect(slot.exists()).toBe(true)
    expect(slot.html()).toBe(unselectAll)
  })

  it('should change the min-height to 900px', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems, minHeight: '900px' })
    const panels = wrapper.findAll('.list-picker-panel')
    expect(panels.at(0).exists()).toBe(true)
    expect(panels.at(1).exists()).toBe(true)
    expect(panels.at(0).attributes().style).toBe('min-height: 900px; min-width: 220px;')
    expect(panels.at(1).attributes().style).toBe('min-height: 900px; min-width: 220px;')
  })

  it('should change the min-width to 500px', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems, minWidth: '500px' })
    const panels = wrapper.findAll('.list-picker-panel')
    expect(panels.at(0).exists()).toBe(true)
    expect(panels.at(1).exists()).toBe(true)
    expect(panels.at(0).attributes().style).toBe('min-height: 450px; min-width: 500px;')
    expect(panels.at(1).attributes().style).toBe('min-height: 450px; min-width: 500px;')
  })

  it('should change the height to 900px', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems, height: '900px' })
    const panels = wrapper.findAll('.list-picker-panel')
    expect(panels.at(0).exists()).toBe(true)
    expect(panels.at(1).exists()).toBe(true)
    expect(panels.at(0).attributes().style).toBe('height: 900px; min-height: 450px; min-width: 220px;')
    expect(panels.at(1).attributes().style).toBe('height: 900px; min-height: 450px; min-width: 220px;')
  })

  it('should change the width to 500px', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems, width: '500px' })
    const panels = wrapper.findAll('.list-picker-panel')
    expect(panels.at(0).exists()).toBe(true)
    expect(panels.at(1).exists()).toBe(true)
    expect(panels.at(0).attributes().style).toBe('min-height: 450px; min-width: 220px; width: 500px;')
    expect(panels.at(1).attributes().style).toBe('min-height: 450px; min-width: 220px; width: 500px;')
  })

  it('should add a custom-class to the items content', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems, contentClass: 'custom-class' })
    const items = wrapper.findAll('.list-picker-item')
    for (let i = 0; i < items.length; i++) {
      expect(items.at(i).exists()).toBe(true)
      expect(items.at(i).classes().length).toBe(2)
      expect(items.at(i).classes()).toContainEqual('custom-class')
    }
  })

  it('should add text-center class to the items content', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems, contentCentered: true })
    const items = wrapper.findAll('.list-picker-item')
    for (let i = 0; i < items.length; i++) {
      expect(items.at(i).exists()).toBe(true)
      expect(items.at(i).classes().length).toBe(2)
      expect(items.at(i).classes()).toContainEqual('text-center')
    }
  })

  it('should change the content attribute key', () => {
    const anotherValue = {
      id: 1,
      content: 'Lorem ipsum dolor'
    }
    const anotherItems = [anotherValue]
    const wrapper = createListPickerWrapper({ leftItems: anotherItems, rightItems: [], contentKey: 'id' })
    const content = wrapper.find('.vue-list-picker>.list-picker-left>.list-picker-panel>.list-picker-item:nth-child(1)')
    expect(content.exists()).toBe(true)
    expect(content.text()).toBe('Lorem ipsum dolor')
  })

  it('should change the content attribute text', () => {
    const anotherValue = {
      key: 1,
      test: 'Lorem ipsum dolor'
    }
    const anotherItems = [anotherValue]
    const wrapper = createListPickerWrapper({ leftItems: anotherItems, rightItems: [], contentAttr: 'test' })
    const content = wrapper.find('.vue-list-picker>.list-picker-left>.list-picker-panel>.list-picker-item:nth-child(1)')
    expect(content.exists()).toBe(true)
    expect(content.text()).toBe('Lorem ipsum dolor')
  })

  it('should wrap the content when it is above 50 characters', () => {
    const anotherValue = {
      key: 1,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing...'
    }
    const anotherItems = [anotherValue]
    const wrapper = createListPickerWrapper({ leftItems: anotherItems, rightItems: [], contentSubstr: 50 })
    const content = wrapper.find('.vue-list-picker>.list-picker-left>.list-picker-panel>.list-picker-item:nth-child(1)')
    expect(content.exists()).toBe(true)
    expect(content.text()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing...')
  })

  it('should wrap the title when it is above 50 characters', () => {
    const wrapper = createListPickerWrapper({
      leftItems,
      rightItems,
      titleLeft: 'Lorem ipsum dolor sit amet, consectetur adipiscing...',
      titleSubstr: 50
    })
    const title = wrapper.find('.vue-list-picker>.list-picker-left>.list-picker-title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing...')
  })

  it('should be able to select and unselect an item', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems })
    wrapper.setMethods({ selectUnselectItem: jest.fn(), setItem: jest.fn() })
    const firstItem = wrapper.findAll('.vue-list-picker>.list-picker-left>.list-picker-panel>.list-picker-item')
    firstItem.at(0).trigger('click')
    expect(firstItem.exists()).toBe(true)
    expect(wrapper.vm.selectUnselectItem).toHaveBeenCalledTimes(1)
  })

  it('should be able to select and unselect an item calling method directly', () => {
    const left = leftItems.map(it => ({ ...it, isSelected: false }))
    const wrapper = mount(VueListPicker, {
      propsData: { leftItems: left, rightItems: [] },
    })
    wrapper.setMethods({ setItem: jest.fn() })
    wrapper.vm.selectUnselectItem(left[0], left)
    expect(wrapper.vm.setItem).toHaveBeenCalledTimes(1)
  })

  it('should be able to move all the left items to the right (mock)', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems: [] })
    wrapper.setMethods({ moveAllRight: jest.fn() })
    const firstButton = wrapper.find('.list-picker-actions>button:nth-child(1)')
    firstButton.trigger('click')
    expect(firstButton.exists()).toBe(true)
    expect(wrapper.vm.moveAllRight).toHaveBeenCalledTimes(1)
  })

  it('should be able to move all the left items to the right calling the method directly', async () => {
    const expected = leftItems.map(it => ({ ...it, isSelected: false })).sort((a,b) => b.key - a.key)
    const wrapper = createListPickerWrapper({ leftItems, rightItems: [] })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.unselectedItems).toEqual(leftItems)
    expect(wrapper.vm.selectedItems).toEqual([])
    await wrapper.vm.$nextTick()
    wrapper.vm.moveAllRight()
    expect(wrapper.emitted()['move-all-right']).toBeTruthy()
    expect(wrapper.emitted()['move-all-right'][0]).toEqual([expected])
    // WIP
    // expect(wrapper.vm.).toBe(rightItems)
    // const firstButton = wrapper.find('.list-picker-actions>button:nth-child(1)')
    // firstButton.trigger('click')
    // expect(firstButton.exists()).toBe(true)
    // expect(wrapper.vm.moveAllRight).toHaveBeenCalledTimes(1)
  })

  // it('should emit a click event when clicked on any timeline card', () => {
  //   const wrapper = createListPickerWrapper({ items })

  //   const time = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child>.time')
  //   time.trigger('click')
  //   time.trigger('click')
  //   time.trigger('click')

  //   expect(wrapper.emitted('click')).toBeTruthy()
  //   expect(wrapper.emitted('click').length).toBe(3)
  // })

  // it('should change the color of the line inside the timeline to black when the prop lineColor is set to black', () => {
  //   const wrapper = createListPickerWrapper({ items, lineColor: 'black' })

  //   const lis = wrapper.findAll('.vue-list-picker>section.timeline>ol>li')
  //   const li1 = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child')
  //   const li2 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(2)')
  //   const li3 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(3)')

  //   // one more is created empty
  //   expect(lis.length).toBe(4)
  //   expect(li1.attributes().style).toBe('background: black;')
  //   expect(li2.attributes().style).toBe('background: black;')
  //   expect(li3.attributes().style).toBe('background: black;')
  //   expect(wrapper.props().lineColor).toBe('black')
  //   expect(wrapper.vm.setLineColor).toBe('background: black')
  // })

  // it('should add a custom-class to the cards title when titleClass prop is set to custom-class', () => {
  //   const wrapper = createListPickerWrapper({ items, titleClass: 'custom-class' })

  //   const title1 = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child>.time>span.title')
  //   const title2 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(2)>.time>span.title')
  //   const title3 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(3)>.time>span.title')
  //   const arr = [title1, title2, title3]

  //   for (var i = 0; i < 3; i++) {
  //     expect(arr[i].exists()).toBe(true)
  //     expect(arr[i].classes().length).toBe(2)
  //     expect(arr[i].classes()).toContainEqual('custom-class')
  //   }
  // })

  // it('should have a blue border when itemUniqueKey and itemSelected is passed and a card is clicked', (done) => {
  //   const itemSelected = items[0]
  //   const wrapper = createListPickerWrapper({ items, itemSelected, itemUniqueKey: 'title', clickable: true })
  //   const time = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child>.time:first-child')
  //   time.trigger('click')
  //   const expected = {
  //     title: 'Title example 1',
  //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ex dolor, malesuada luctus scelerisque ac, auctor vitae risus. Vivamus risus dolor, faucibus a bibendum quis, facilisis eget odio. Nullam non condimentum orci, a cursus magna. Suspendisse tempor rutrum eros, non pellentesque odio commodo eu. Donec at volutpat enim. Vivamus mattis volutpat urna, sit amet vulputate mauris sollicitudin et. Proin consequat at dolor in sodales. Vestibulum vel porta turpis. Pellentesque sollicitudin justo est, ut dapibus felis luctus mollis. Suspendisse feugiat, metus ut auctor dictum, nulla dui fringilla nisl, a pulvinar ipsum justo non lacus. Integer vestibulum sapien metus, et congue felis efficitur iaculis. Aliquam et mi quis nulla molestie elementum. Vestibulum in nibh nibh.'
  //   }
  //   expect(time.exists()).toBe(true)
  //   expect(wrapper.emitted('click')).toBeTruthy()
  //   expect(wrapper.emitted('click')).toEqual([[expected]])
  //   setTimeout(() => {
  //     expect(time.classes().length).toBe(2)
  //     expect(time.classes()).toContainEqual('border-blue')
  //     done()
  //   })
  // })

  // it('should match snapshot', () => {
  //   const itemSelected = {
  //     title: 'title',
  //     content: 'content'
  //   }
  //   const wrapper = createListPickerWrapper({
  //     items,
  //     itemSelected,
  //     itemUniqueKey: 'title',
  //     titleAttr: 'title',
  //     titleCentered: false,
  //     titleClass: '',
  //     titleSubstr: 18,
  //     contentAttr: 'content',
  //     contentCentered: false,
  //     contentClass: '',
  //     contentSubstr: 250,
  //     hasSlot: false,
  //     minWidth: '200px',
  //     minHeight: '',
  //     timelinePadding: '',
  //     timelineBackground: '',
  //     lineColor: '#03A9F4',
  //     clickable: true
  //   })

  //   expect(wrapper.html()).toMatchSnapshot()
  // })
})
