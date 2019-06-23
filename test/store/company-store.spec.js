import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from 'Store/company-store'

describe("test company-store vuex store", () => {
  let store;
  let baseSkeleton = {
    name: null,
    spend: null,
    spendAbility: {
      min: null,
      max: null
    },
    note: null
  }

  function initializeVuexStore () {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store(storeConfig)
  }

  beforeEach(() => {
    initializeVuexStore();
  });

  test('state to show correct skeleton', () => {
    expect(store.state.companyData).toEqual(baseSkeleton)
  })

  test('mutation to do correct job', () => {
    store.commit('updateCompany', {
      name: 'halo'
    })
    expect(store.state.companyData).toEqual(Object.assign(baseSkeleton, {name: 'halo'}))

    store.commit('updateCompany', {
      spend: 10000
    })
    expect(store.state.companyData).toEqual(Object.assign(baseSkeleton, {name: 'halo', spend: 10000}))

    store.commit('updateCompany', {
      spendAbility: {
        min: 100,
        max: 200
      }
    })
    expect(store.state.companyData).toEqual(Object.assign(baseSkeleton, {
      name: 'halo', 
      spend: 10000,
      spendAbility: {
        min: 100,
        max: 200
      }
    }))
  })
})