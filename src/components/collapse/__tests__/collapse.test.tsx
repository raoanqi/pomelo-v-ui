import { describe, expect } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import Collapse from '@/components/collapse/collapse.vue'
import CollapseItem from '@/components/collapse/collapse-item.vue'

describe('Collapse test', () => {
  test('basic collapse', async () => {
    // mount中不仅可以直接写组件名称进行渲染，还可以像下面这样使用渲染函数来渲染组件
    const wrapper = mount(
      () => {
        return (
          <Collapse modelValue={['a']}>
            <CollapseItem name={'a'} title={'title a'}>
              content a
            </CollapseItem>
            <CollapseItem name={'b'} title={'title b'}>
              content a
            </CollapseItem>
            <CollapseItem name={'c'} title={'title b'} disabled>
              content a
            </CollapseItem>
          </Collapse>
        )
      },
      {
        props: {
          modelValue: ['a']
        },
        slots: {
          default: h(CollapseItem, { name: 'a', title: 'Title a' }, 'content a')
        },
        global: {
          stubs: ['Icon']
        },
        // 下面这行代码是为了应对jsdom的bug
        attachTo: document.body
      }
    )
    // 测试header,content是否渲染成功，上面的测试结构中写了3个item，所以header和content也应该是3个
    const headers = wrapper.findAll('.p-collapse-item__header')
    const contents = wrapper.findAll('.p-collapse-item__wrapper')
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // 测试header的文本是否为传入的内容
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')

    // 测试点击header是否切换content
    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]
    // modelValue是['a']，所以第一个item是可见的，第二个是不可见的
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    // 既然第一个是可见的，判断第一个的content是不是传入的内容
    expect(firstContent.text()).toBe('content a')

    // 点击行为测试，请注意这里因为点击会造成dom的更新，这个dom更新是异步行为，所以这里需要加上await，整个函数外部包裹async
    await firstHeader.trigger('click')
    // 点击第一个item之后，第一个的content应该隐藏
    expect(firstContent.isVisible()).toBeFalsy()
    // 点击第二个item之后，第二个的content应该显示
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()

    // disabled
    const disabledHeader = headers[2]
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
  })
})
