import { shallowMount, createLocalVue } from '@vue/test-utils'
import Modal from 'Components/Modal'

describe('test Modal component', () => {
  let baseConfig;

  function initializeInstance () {
    const localVue = createLocalVue()

    baseConfig = {
      localVue,
      propsData: {
        displayed: false
      }
    };
  }

  beforeEach(() => {
    initializeInstance();
  });

  test('modal should only show default template', () => {
    const wrapper = shallowMount(Modal, baseConfig)

    const mainElement = wrapper.find('.modal-container')
    const headerElement = wrapper.find('.modal-header')
    const bodyElement = wrapper.find('.modal-body')
    const footerElement = wrapper.find('.modal-footer')

    expect(mainElement.element).toHaveStyle('display: none')
    expect(headerElement.element).toBeUndefined()
    expect(bodyElement.element).toBeEmpty()
    expect(footerElement.element).toHaveTextContent('Yes')
    expect(footerElement.element).toHaveTextContent('No')
  })

  test('action would be emitted correctly', () => {
    const wrapper = shallowMount(Modal, baseConfig)

    wrapper.vm.yesAction()
    wrapper.vm.noAction()
    wrapper.vm.closeModal()

    expect(wrapper.emitted('yesAction')).toEqual([[]])
    expect(wrapper.emitted('noAction')).toEqual([[]])
    expect(wrapper.emitted('update:displayed')).toEqual([[false]])
  })

  test('modal should show title', () => {
    const wrapper = shallowMount(Modal, Object.assign(baseConfig, {
      propsData: {
        displayed: true,
        title: 'This is modal header'
      }
    }))

    const mainElement = wrapper.find('.modal-container')
    const headerElement = wrapper.find('.modal-header')
    const bodyElement = wrapper.find('.modal-body')
    const footerElement = wrapper.find('.modal-footer')

    expect(mainElement.element).not.toHaveStyle('display: none')
    expect(headerElement.element).not.toBeUndefined()
    expect(bodyElement.element).toBeEmpty()
    expect(footerElement.element).toHaveTextContent('Yes')
    expect(footerElement.element).toHaveTextContent('No')


    const titleElement = wrapper.find('.modal-title')
    expect(titleElement.element).toHaveTextContent('This is modal header')
  })

  test('modal should change buttons text', () => {
    const wrapper = shallowMount(Modal, Object.assign(baseConfig, {
      propsData: {
        displayed: true,
        yesButtonText: 'Save',
        noButtonText: 'Cancel'
      }
    }))

    const mainElement = wrapper.find('.modal-container')
    const headerElement = wrapper.find('.modal-header')
    const bodyElement = wrapper.find('.modal-body')
    const footerElement = wrapper.find('.modal-footer')

    expect(mainElement.element).not.toHaveStyle('display: none')
    expect(headerElement.element).toBeUndefined()
    expect(bodyElement.element).toBeEmpty()
    expect(footerElement.element).toHaveTextContent('Save')
    expect(footerElement.element).toHaveTextContent('Cancel')
  })

  test('modal should not generate \'noButton\'', () => {
    const wrapper = shallowMount(Modal, Object.assign(baseConfig, {
      propsData: {
        displayed: true,
        yesButtonText: 'Save',
        yesOnly: true
      }
    }))

    const mainElement = wrapper.find('.modal-container')
    const headerElement = wrapper.find('.modal-header')
    const bodyElement = wrapper.find('.modal-body')
    const footerElement = wrapper.find('.modal-footer')

    expect(mainElement.element).not.toHaveStyle('display: none')
    expect(headerElement.element).toBeUndefined()
    expect(bodyElement.element).toBeEmpty()
    expect(footerElement.element).toHaveTextContent('Save')
    expect(footerElement.element).not.toHaveTextContent('No')
  })
})