import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import routeConfig from 'Router/routes'
import Breadcrumb from 'Components/Breadcrumb'

describe('test Breadcrumb component', () => {
  let baseConfig;

  function initializeInstance () {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
   
    const router = new VueRouter(routeConfig)
    const $route = {
      path: "/",
      name: "indexPage",
      meta: {
        label: "Home",
        prevKeys: null
      }
    }

    baseConfig = {
      localVue,
      router,
      mocks: {
        $route
      }
    };
  }

  beforeEach(() => {
    initializeInstance();
  });

  test('basic usage for breadcrumb with default value', () => {
    const wrapper = shallowMount(Breadcrumb, baseConfig)
    expect(wrapper.vm.breadcrumbs).toEqual([{"current": true, "label": "Home", "url": "indexPage"}])
  })

  test('sending props will use props instead of generating automatically from routes', () => {
    const baseConfigLinks = Object.assign(baseConfig, {
      propsData: {
        links: [
          {
            label: 'Example Name',
            url: 'exampleURL'
          }
        ]
      }
    })
    const wrapper = shallowMount(Breadcrumb, baseConfigLinks)

    expect(wrapper.vm.breadcrumbs).toEqual(
      [
        {
          label: 'Example Name',
          url: 'exampleURL'
        }
      ]
    )
  })
})