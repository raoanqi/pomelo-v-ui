import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/button/button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '@/components/icon/icon.vue'

describe('Button test', () => {
  // 基础测试
  test('basic button', () => {
    // 这个wrapper就是Button组件的实例
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })
    console.log(wrapper.html())
    // 是否包含对应的class
    expect(wrapper.classes()).toContain('p-button--primary')
    // 是否包含默认slot内容
    // 有两个方法可以使用：get，find
    // get：返回第一个匹配的元素，如果没有匹配的元素，直接throw，会中断代码
    // find：返回所有匹配的元素，如果没有匹配的元素，返回一个空的WrapperArray
    // 这里使用text方法获取wrapper中的文本内容，判断是不是button
    expect(wrapper.get('button').text()).toBe('button')
    // 测试点击事件
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  // disabled测试
  test('disabled button', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled button'
      }
    })
    // 测试wrapper上是否定义了disabled属性，这种方式获取的是wrapper上的属性
    expect(wrapper.attributes('disabled')).toBeDefined()
    // 也可以采用另一种方式验证属性是否定义，这种方式获取的是dom的button元素上的属性
    expect(wrapper.find('button').element.disabled).toBeDefined()
    // disabled状态下click事件需要失效
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  // icon测试
  test('icon button', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon button'
      },
      // 测试第三方组件时，为了不实际引入第三方组件，使用stubs来代替
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    console.log(wrapper.html())
    // 测试是否渲染了icon
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    // 测试icon是否正确
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })

  // loading测试
  test('loading button', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading button'
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
