import numeral from 'numeral'

export default {
  state: {
    companyData: {
      name: null,
      spend: null,
      spendAbility: {
        min: null,
        max: null
      },
      note: null
    }
  },
  mutations: {
    updateCompany (state, data) {
      state.companyData = {...state.companyData, ...data}
    }
  }
}