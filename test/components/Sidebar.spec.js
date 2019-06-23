import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import routeConfig from 'Router/routes'
import Sidebar from 'Components/Sidebar'

describe('test Sidebar component', () => {
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

  test('sidebar to generate a correct menu', () => {
    const wrapper = shallowMount(Sidebar, baseConfig)
    expect(wrapper.vm.routes).toEqual([{
      "label": "Home", 
      "url": "indexPage"
    }, {
      "label": "Company Data",
      "url": "companyData",
    }])
  })
})