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
  getters: {
    buildedCompanyData (state) {
      const companyData = state.companyData
      return {
        name: companyData.name,
        note: {
          tmp: companyData.note,
          real: companyData.note
        },
        spend: {
          masked: companyData.spend ? numeral(companyData.spend).format('$0,0') : null,
          raw: companyData.spend
        },
        spendAbility: {
          min: {
            masked: companyData.spendAbility.min ? numeral(companyData.spendAbility.min).format('$0,0') : null,
            raw: companyData.spendAbility.min
          },
          max: {
            masked:companyData.spendAbility.max ? numeral(companyData.spendAbility.max).format('$0,0') : null,
            raw: companyData.spendAbility.max
          }
        }
      }
    }
  },
  mutations: {
    updateCompany (state, data) {
      state.companyData = {...state.companyData, ...data}
    }
  }
}