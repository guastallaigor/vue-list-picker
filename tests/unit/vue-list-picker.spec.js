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

  // it('should remove the lineColor', () => {
  //   const wrapper = createListPickerWrapper({ items, lineColor: '' })

  //   const lis = wrapper.findAll('.vue-list-picker>section.timeline>ol>li')
  //   const li1 = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child')
  //   const li2 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(2)')
  //   const li3 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(3)')

  //   // one more is created empty
  //   expect(lis.length).toBe(4)
  //   expect(li1.attributes().style).toBe(undefined)
  //   expect(li2.attributes().style).toBe(undefined)
  //   expect(li3.attributes().style).toBe(undefined)
  //   expect(wrapper.props().lineColor).toBe('')
  //   expect(wrapper.vm.setLineColor).toBe('')
  // })

  // it('should change the background color of the timeline to black when the prop timelineBackground is set to black', () => {
  //   const wrapper = createListPickerWrapper({ items, timelineBackground: 'black' })

  //   const timeline = wrapper.find('.vue-list-picker')

  //   expect(timeline.exists()).toBe(true)
  //   expect(timeline.attributes().style).toBe('background: black;')
  // })

  // it('should wrap the content when it has above 50 characters and the contentSubstr prop is set to 50', () => {
  //   const wrapper = createListPickerWrapper({ items, contentSubstr: 50 })
  //   const html = `<span class="content">
  //           Lorem ipsum dolor sit amet, consectetur adipiscing...
  //         </span>`

  //   const content1 = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child>.time>span.content')
  //   const content2 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(2)>.time>span.content')
  //   const content3 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(3)>.time>span.content')

  //   expect(content1.exists()).toBe(true)
  //   expect(content2.exists()).toBe(true)
  //   expect(content3.exists()).toBe(true)
  //   expect(content1.html()).toBe(html)
  //   expect(content2.html()).toBe(html)
  //   expect(content3.html()).toBe(html)
  // })

  // it('should add a custom-class to the cards content when contentClass prop is set to custom-class', () => {
  //   const wrapper = createListPickerWrapper({ items, contentClass: 'custom-class' })

  //   const content1 = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child>.time>span.content')
  //   const content2 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(2)>.time>span.content')
  //   const content3 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(3)>.time>span.content')
  //   const arr = [content1, content2, content3]

  //   for (var i = 0; i < 3; i++) {
  //     expect(arr[i].exists()).toBe(true)
  //     expect(arr[i].classes().length).toBe(2)
  //     expect(arr[i].classes()).toContainEqual('custom-class')
  //   }
  // })

  // it('should add text-center class to all cards content when contentCentered prop is set to true', () => {
  //   const wrapper = createListPickerWrapper({ items, contentCentered: true })

  //   const content1 = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child>.time>span.content')
  //   const content2 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(2)>.time>span.content')
  //   const content3 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(3)>.time>span.content')
  //   const arr = [content1, content2, content3]

  //   for (var i = 0; i < 3; i++) {
  //     expect(arr[i].exists()).toBe(true)
  //     expect(arr[i].classes().length).toBe(2)
  //     expect(arr[i].classes()).toContainEqual('text-center')
  //   }
  // })

  // it('should change the content attribute key that is being used from content to test if contentAttr prop is set to test', () => {
  //   const anotherValue = {
  //     title: 'Title example 1',
  //     test: 'Lorem ipsum dolor sit amet'
  //   }
  //   const anotherItems = [anotherValue]
  //   const wrapper = createListPickerWrapper({ items: anotherItems, contentAttr: 'test' })
  //   const content1 = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child>.time>span.content')
  //   expect(content1.exists()).toBe(true)
  //   expect(content1.html()).toBe(`<span class="content">
  //           Lorem ipsum dolor sit amet
  //         </span>`)
  // })

  // it('should wrap the title when it has above 50 characters and the titleSubstr prop is set to 50', () => {
  //   const wrapper = createListPickerWrapper({ items, titleSubstr: 50 })
  //   const html1 = `<span class="title">
  //           Title example 1
  //         </span>`
  //   const html2 = `<span class="title">
  //           Title example 2
  //         </span>`
  //   const html3 = `<span class="title">
  //           Title example 3
  //         </span>`

  //   const title1 = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child>.time>span.title')
  //   const title2 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(2)>.time>span.title')
  //   const title3 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(3)>.time>span.title')

  //   expect(title1.exists()).toBe(true)
  //   expect(title2.exists()).toBe(true)
  //   expect(title3.exists()).toBe(true)
  //   expect(title1.html()).toBe(html1)
  //   expect(title2.html()).toBe(html2)
  //   expect(title3.html()).toBe(html3)
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

  // it('should add text-center class to all cards title when titleCentered prop is set to true', () => {
  //   const wrapper = createListPickerWrapper({ items, titleCentered: true })

  //   const title1 = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child>.time>span.title')
  //   const title2 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(2)>.time>span.title')
  //   const title3 = wrapper.find('.vue-list-picker>section.timeline>ol>li:nth-child(3)>.time>span.title')
  //   const arr = [title1, title2, title3]

  //   for (var i = 0; i < 3; i++) {
  //     expect(arr[i].exists()).toBe(true)
  //     expect(arr[i].classes().length).toBe(2)
  //     expect(arr[i].classes()).toContainEqual('text-center')
  //   }
  // })

  // it('should change the title attribute key that is being used from title to test if titleAttr prop is set to test', () => {
  //   const anotherValue = {
  //     test: 'Title example 1',
  //     content: 'Content'
  //   }
  //   const anotherItems = [anotherValue]
  //   const wrapper = createListPickerWrapper({ items: anotherItems, titleAttr: 'test' })
  //   const title1 = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child>.time>span.title')
  //   expect(title1.exists()).toBe(true)
  //   expect(title1.html()).toBe(`<span class="title">
  //           Title example 1
  //         </span>`)
  // })

  // it('should have a two way data bind when itemSelected is passed and a card is clicked', () => {
  //   const itemSelected = {
  //     title: '',
  //     content: ''
  //   }
  //   const wrapper = createListPickerWrapper({ items, itemSelected })
  //   const time = wrapper.find('.vue-list-picker>section.timeline>ol>li:first-child>.time')
  //   time.trigger('click')
  //   const expected = {
  //     title: 'Title example 1',
  //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ex dolor, malesuada luctus scelerisque ac, auctor vitae risus. Vivamus risus dolor, faucibus a bibendum quis, facilisis eget odio. Nullam non condimentum orci, a cursus magna. Suspendisse tempor rutrum eros, non pellentesque odio commodo eu. Donec at volutpat enim. Vivamus mattis volutpat urna, sit amet vulputate mauris sollicitudin et. Proin consequat at dolor in sodales. Vestibulum vel porta turpis. Pellentesque sollicitudin justo est, ut dapibus felis luctus mollis. Suspendisse feugiat, metus ut auctor dictum, nulla dui fringilla nisl, a pulvinar ipsum justo non lacus. Integer vestibulum sapien metus, et congue felis efficitur iaculis. Aliquam et mi quis nulla molestie elementum. Vestibulum in nibh nibh.'
  //   }
  //   expect(time.exists()).toBe(true)
  //   expect(wrapper.emitted('click')).toBeTruthy()
  //   expect(wrapper.emitted('click')).toMatchObject([[expected]])
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
