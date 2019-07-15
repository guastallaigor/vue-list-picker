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
  const createEvent = (type, props = {}) => {
    const event = new Event(type)
    Object.assign(event, props)
    return event
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
    const titleCentered = wrapper.vm.$options.props.titleCentered
    expect(titleCentered.required).toBeFalsy()
    expect(titleCentered.type).toBe(Boolean)
    expect(titleCentered.default).toBe(true)
    const titleSubstr = wrapper.vm.$options.props.titleSubstr
    expect(titleSubstr.required).toBeFalsy()
    expect(titleSubstr.type).toBe(Number)
    expect(titleSubstr.default).toBe(20)
    const contentKey = wrapper.vm.$options.props.contentKey
    expect(contentKey.required).toBeFalsy()
    expect(contentKey.type).toBe(String)
    expect(contentKey.default).toBe('key')
    const contentAttr = wrapper.vm.$options.props.contentAttr
    expect(contentAttr.required).toBeFalsy()
    expect(contentAttr.type).toBe(String)
    expect(contentAttr.default).toBe('content')
    const contentSubstr = wrapper.vm.$options.props.contentSubstr
    expect(contentSubstr.required).toBeFalsy()
    expect(contentSubstr.type).toBe(Number)
    expect(contentSubstr.default).toBe(23)
    const minHeight = wrapper.vm.$options.props.minHeight
    expect(minHeight.required).toBeFalsy()
    expect(minHeight.type).toBe(String)
    expect(minHeight.default).toBe('450px')
    const minWidth = wrapper.vm.$options.props.minWidth
    expect(minWidth.required).toBeFalsy()
    expect(minWidth.type).toBe(String)
    expect(minWidth.default).toBe('220px')
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

  it('should add a custom-class to both the columns title', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems, titleClass: 'custom-class' })
    const items = wrapper.findAll('.list-picker-title')
    for (let i = 0; i < items.length; i++) {
      expect(items.at(i).exists()).toBe(true)
      expect(items.at(i).classes().length).toBe(2)
      expect(items.at(i).classes()).toContainEqual('custom-class')
    }
  })

  it('should add a custom-class to all the action buttons', () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems, buttonClass: 'custom-class' })
    const items = wrapper.findAll('button')
    for (let i = 0; i < items.length; i++) {
      expect(items.at(i).exists()).toBe(true)
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
      propsData: { leftItems: left, rightItems: [] }
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
    const expected = leftItems.map(it => ({ ...it, isSelected: false })).sort((a, b) => b.key - a.key)
    const copyLeft = leftItems.map(it => ({ ...it }))
    const wrapper = createListPickerWrapper({ leftItems: copyLeft, rightItems: [] })
    expect(wrapper.vm.unselectedItems).toEqual(copyLeft)
    expect(wrapper.vm.selectedItems).toEqual([])
    wrapper.vm.moveAllRight()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()['move-all-right']).toBeTruthy()
    expect(wrapper.emitted()['move-all-right'][0]).toEqual([expected])
    expect(wrapper.emitted()['unselect-all']).toBeTruthy()
    expect(wrapper.emitted()['unselect-all'][0]).toEqual([])
    expect(copyLeft).toEqual([])
    expect(wrapper.vm.unselectedItems).toEqual([])
    expect(wrapper.vm.selectedItems).toEqual(expected)
  })

  it('should be able to move all the right items to the left calling the method directly', async () => {
    const expected = rightItems.map(it => ({ ...it, isSelected: false })).sort((a, b) => b.key - a.key)
    const copyRight = rightItems.map(it => ({ ...it }))
    const wrapper = createListPickerWrapper({ leftItems: [], rightItems: copyRight })
    expect(wrapper.vm.unselectedItems).toEqual([])
    expect(wrapper.vm.selectedItems).toEqual(copyRight)
    wrapper.vm.moveAllLeft()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()['move-all-left']).toBeTruthy()
    expect(wrapper.emitted()['move-all-left'][0]).toEqual([expected])
    expect(wrapper.emitted()['unselect-all']).toBeTruthy()
    expect(wrapper.emitted()['unselect-all'][0]).toEqual([])
    expect(copyRight).toEqual([])
    expect(wrapper.vm.unselectedItems).toEqual(expected)
    expect(wrapper.vm.selectedItems).toEqual([])
  })

  it('should be able to move items using the moveAll method directly', async () => {
    const expected = [
      ...rightItems.map(it => ({ ...it, isSelected: false })).sort((a, b) => a.key - b.key),
      ...leftItems.map(it => ({ ...it, isSelected: false })).sort((a, b) => b.key - a.key)
    ]
    const copyLeft = leftItems.map(it => ({ ...it }))
    const copyRight = rightItems.map(it => ({ ...it }))
    const wrapper = createListPickerWrapper({ leftItems: copyLeft, rightItems: copyRight })
    wrapper.vm.moveAll(copyLeft, copyRight)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()['unselect-all']).toBeTruthy()
    expect(wrapper.emitted()['unselect-all'][0]).toEqual([])
    expect(copyLeft).toEqual([])
    expect(wrapper.vm.unselectedItems).toEqual([])
    expect(wrapper.vm.selectedItems).toEqual(expected)
  })

  it('should be able to move one select item from the left to the right', async () => {
    const copyLeft = leftItems.map(it => ({ ...it }))
    const copyRight = rightItems.map(it => ({ ...it }))
    const wrapper = createListPickerWrapper({ leftItems: copyLeft, rightItems: copyRight })
    const firstItemSelector = '.vue-list-picker>.list-picker-left>.list-picker-panel>.list-picker-item:nth-child(1)'
    const firstItem = wrapper.find(firstItemSelector)
    firstItem.trigger('click')
    expect(firstItem.exists()).toBe(true)
    expect(firstItem.classes()).toContainEqual('list-picker-selected')
    expect(wrapper.vm.unselectedItems[0].isSelected).toBeTruthy()
    wrapper.vm.moveRight()
    await wrapper.vm.$nextTick()
    const firstObj = { ...leftItems[0], isSelected: false }
    expect(wrapper.emitted()['move-right']).toBeTruthy()
    expect(wrapper.emitted()['move-right'][0]).toEqual([firstObj])
    await wrapper.vm.$nextTick()
    const firstItemAfter = wrapper.find(firstItemSelector)
    expect(firstItemAfter.classes()).not.toContainEqual('list-picker-selected')
    expect(wrapper.vm.unselectedItems[0].isSelected).toBeFalsy()
  })

  it('should be able to move one select item from the right to the left', async () => {
    const copyLeft = leftItems.map(it => ({ ...it }))
    const copyRight = rightItems.map(it => ({ ...it }))
    const wrapper = createListPickerWrapper({ leftItems: copyLeft, rightItems: copyRight })
    const firstItemSelector = '.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(1)'
    const firstItem = wrapper.find(firstItemSelector)
    firstItem.trigger('click')
    expect(firstItem.exists()).toBe(true)
    expect(firstItem.classes()).toContainEqual('list-picker-selected')
    expect(wrapper.vm.selectedItems[0].isSelected).toBeTruthy()
    wrapper.vm.moveLeft()
    await wrapper.vm.$nextTick()
    const firstObj = { ...rightItems[0], isSelected: false }
    expect(wrapper.emitted()['move-left']).toBeTruthy()
    expect(wrapper.emitted()['move-left'][0]).toEqual([firstObj])
    await wrapper.vm.$nextTick()
    const firstItemAfter = wrapper.find(firstItemSelector)
    expect(firstItemAfter.classes()).not.toContainEqual('list-picker-selected')
    expect(wrapper.vm.unselectedItems[0].isSelected).toBeFalsy()
    expect(wrapper.vm.selectedItems[0].isSelected).toBeFalsy()
  })

  it('should be able to unselect all', async () => {
    const copyLeft = leftItems.map(it => ({ ...it }))
    const copyRight = rightItems.map(it => ({ ...it }))
    const wrapper = createListPickerWrapper({ leftItems: copyLeft, rightItems: copyRight })
    const firstItemSelector = '.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(1)'
    const firstItem = wrapper.find(firstItemSelector)
    firstItem.trigger('click')
    expect(firstItem.exists()).toBe(true)
    expect(firstItem.classes()).toContainEqual('list-picker-selected')
    expect(wrapper.vm.selectedItems[0].isSelected).toBeTruthy()
    wrapper.vm.unselectAll()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()['unselect-all']).toBeTruthy()
    expect(wrapper.emitted()['unselect-all'][0]).toEqual([])
    await wrapper.vm.$nextTick()
    const firstItemAfter = wrapper.find(firstItemSelector)
    expect(firstItemAfter.classes()).not.toContainEqual('list-picker-selected')
    expect(wrapper.vm.selectedItems[0].isSelected).toBeFalsy()
    expect(wrapper.vm.selectedItems[0].isSelected).toBeFalsy()
  })

  it('should move an item to the bottom of the other column', async () => {
    const copyLeft = leftItems.map(it => ({ ...it }))
    const copyRight = rightItems.map(it => ({ ...it }))
    const wrapper = createListPickerWrapper({ leftItems: copyLeft, rightItems: copyRight, movedItemLocation: 'bottom' })
    const firstItemSelector = '.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(1)'
    const firstItem = wrapper.find(firstItemSelector)
    firstItem.trigger('click')
    expect(firstItem.exists()).toBe(true)
    expect(firstItem.classes()).toContainEqual('list-picker-selected')
    expect(wrapper.vm.selectedItems[0].isSelected).toBeTruthy()
    const copy = { ...wrapper.vm.selectedItems[0], isSelected: false }
    wrapper.vm.moveLeft()
    await wrapper.vm.$nextTick()
    const firstItemAfter = wrapper.find(firstItemSelector)
    expect(firstItemAfter.classes()).not.toContainEqual('list-picker-selected')
    expect(wrapper.vm.selectedItems[0].isSelected).toBeFalsy()
    expect(wrapper.vm.unselectedItems[0].isSelected).toBeFalsy()
    expect(wrapper.vm.unselectedItems[wrapper.vm.unselectedItems.length - 1]).toEqual(copy)
  })

  it('should move an item to the top of the other column', async () => {
    const copyLeft = leftItems.map(it => ({ ...it }))
    const copyRight = rightItems.map(it => ({ ...it }))
    const wrapper = createListPickerWrapper({ leftItems: copyLeft, rightItems: copyRight, movedItemLocation: 'top' })
    const firstItemSelector = '.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(1)'
    const firstItem = wrapper.find(firstItemSelector)
    firstItem.trigger('click')
    expect(firstItem.exists()).toBe(true)
    expect(firstItem.classes()).toContainEqual('list-picker-selected')
    expect(wrapper.vm.selectedItems[0].isSelected).toBeTruthy()
    const copy = { ...wrapper.vm.selectedItems[0], isSelected: false }
    wrapper.vm.moveLeft()
    await wrapper.vm.$nextTick()
    const firstItemAfter = wrapper.find(firstItemSelector)
    expect(firstItemAfter.classes()).not.toContainEqual('list-picker-selected')
    expect(wrapper.vm.selectedItems[0].isSelected).toBeFalsy()
    expect(wrapper.vm.unselectedItems[0].isSelected).toBeFalsy()
    expect(wrapper.vm.unselectedItems[0]).toEqual(copy)
  })

  it('should hold mouse down to start drag and up to stop drag', async () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems })
    const firstItemSelector = '.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(1)'
    const firstItem = wrapper.find(firstItemSelector)
    expect(firstItem.exists()).toBe(true)
    firstItem.trigger('mousedown')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.dragging).toBeTruthy()
    window.document.dispatchEvent(
      createEvent('mouseup', { clientX: 0, clientY: 0 })
    )
    firstItem.trigger('mouseup')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.dragging).toBeFalsy()
  })

  it('should hold mouse down to start drag and select items when is dragging', async () => {
    const copyLeft = leftItems.map(it => ({ ...it, isSelected: false }))
    const wrapper = createListPickerWrapper({ leftItems: copyLeft, rightItems })
    const firstItemSelector = '.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(1)'
    const firstItem = wrapper.find(firstItemSelector)
    expect(firstItem.exists()).toBe(true)
    firstItem.trigger('mousedown')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.dragging).toBeTruthy()
    const cells = Array.from(wrapper.vm.$el.querySelectorAll('.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(1)'))
    cells[0].dispatchEvent(
      createEvent('dragstart', { clientX: 0, clientY: 0 })
    )
    cells[0].dispatchEvent(
      createEvent('drop', { clientX: 0, clientY: 15 })
    )
    await wrapper.vm.$nextTick()
    const copy = { ...value2, isSelected: false }
    wrapper.vm.selectItem(copy, copyLeft)
    const secondItemSelector = '.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(2)'
    const secondItem = wrapper.find(secondItemSelector)
    expect(secondItem.exists()).toBe(true)
    expect(copy.isSelected).toBeTruthy()
  })

  it('should remove event listener global', async () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems })
    const firstItemSelector = '.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(1)'
    const firstItem = wrapper.find(firstItemSelector)
    expect(firstItem.exists()).toBe(true)
    firstItem.trigger('mousedown')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.dragging).toBeTruthy()
    window.document.dispatchEvent(
      createEvent('mouseup', { clientX: 0, clientY: 0 })
    )
    firstItem.trigger('mouseup')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.dragging).toBeFalsy()
    wrapper.destroy()
    window.document.dispatchEvent(
      createEvent('mouseup', { clientX: 0, clientY: 0 })
    )
    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBeFalsy()
    expect(wrapper.vm.dragging).toBeFalsy()
  })

  it('should select the first item if the item passed to it is invalid', async () => {
    const copyLeft = leftItems.map(it => ({ ...it, isSelected: false }))
    const wrapper = createListPickerWrapper({ leftItems: copyLeft, rightItems })
    const firstItemSelector = '.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(1)'
    const firstItem = wrapper.find(firstItemSelector)
    expect(firstItem.exists()).toBe(true)
    wrapper.vm.setItem(null, copyLeft, true)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.unselectedItems[0].isSelected).toBeTruthy()
  })

  it('should do nothing if no first item and no item is passed', async () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems })
    const firstItemSelector = '.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(1)'
    const firstItem = wrapper.find(firstItemSelector)
    expect(firstItem.exists()).toBe(true)
    const items = null
    wrapper.vm.setItem(null, null, true)
    await wrapper.vm.$nextTick()
    expect(items).toBeFalsy()
  })

  it('should start drag calling the method directly', async () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems })
    const firstItemSelector = '.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(1)'
    const firstItem = wrapper.find(firstItemSelector)
    expect(firstItem.exists()).toBe(true)
    firstItem.trigger('mousedown')
    await wrapper.vm.$nextTick()
    const copyLeft = leftItems.map(it => ({ ...it, isSelected: false }))
    const copy = { ...value1, isSelected: false }
    wrapper.vm.selectItem(copy, copyLeft)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.dragging).toBeTruthy()
  })

  it('should do nothing when trying to selectItem without starting mouse drag first', async () => {
    const wrapper = createListPickerWrapper({ leftItems, rightItems })
    const firstItemSelector = '.vue-list-picker>.list-picker-right>.list-picker-panel>.list-picker-item:nth-child(1)'
    const firstItem = wrapper.find(firstItemSelector)
    expect(firstItem.exists()).toBe(true)
    const copyLeft = leftItems.map(it => ({ ...it, isSelected: false }))
    const copy = { ...value1, isSelected: false }
    wrapper.vm.selectItem(copy, copyLeft)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.dragging).toBeFalsy()
  })

  it('should match snapshot', () => {
    const wrapper = createListPickerWrapper({
      leftItems,
      rightItems,
      movedItemLocation: 'top',
      titleLeft: 'Items available',
      titleRight: 'Items selected',
      titleCentered: true,
      titleClass: '',
      titleSubstr: 20,
      buttonClass: '',
      contentKey: 'key',
      contentAttr: 'content',
      contentCentered: false,
      contentClass: '',
      contentSubstr: 23,
      minHeight: '450px',
      height: '',
      minWidth: '220px',
      width: ''
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
