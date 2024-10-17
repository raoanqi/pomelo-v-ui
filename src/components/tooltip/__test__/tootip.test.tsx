import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from '@/components/tooltip/tooltip.vue'

const onVisibleChange = vi.fn()

describe('Tooltip test', () => {
  beforeEach(() => {
    // 生成一个假的定时器
    vi.useFakeTimers()
  })
  test('basic tooltip', async () => {
    const wrapper = mount(
      () => (
        <Tooltip
          content={'hello tooltip'}
          trigger={'click'}
          onVisible-change={onVisibleChange}
        >
          <button id={'trigger'}>Trigger</button>
        </Tooltip>
      ),
      {
        attachTo: document.body
      }
    )
    /**
     * 测试弹出层是否存在
     * 首先找到wrapper中的trigger区域，就是button
     */
    const triggerArea = wrapper.find('#trigger')
    // 首先确保button这个触发区域是有的
    expect(triggerArea.exists()).toBeTruthy()
    // 此时还没有点击触发区域，因此popper应该是不存在的
    expect(wrapper.find('.p-tooltip__popper').exists()).toBeFalsy()
    // 因为tooltip中触发之后存在一个延时
    await triggerArea.trigger('click')
    // 代码内部的定时器全部运行完毕
    await vi.runAllTimers()
    expect(wrapper.find('.p-tooltip__popper').exists()).toBeTruthy()
    // 测试popper中的内容是否符合预期
    expect(wrapper.get('.p-tooltip__popper').text()).toBe('hello tooltip')
    // 测试点击弹出层是否会触发visible-change事件，并且参数为true
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    // 再次点击进行测试
    await triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.p-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})
