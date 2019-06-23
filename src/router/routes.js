import Index from 'Pages/Index'
import CompanyData from 'Pages/CompanyData'

export default {
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: Index,
      name: 'indexPage',
      meta: {
        label: 'Home',
        prevKeys: null
      }
    },
    {
      path: '/company-data',
      component: CompanyData,
      name: 'companyData',
      meta: {
        label: 'Company Data',
        prevKeys: 'indexPage'
      }
    }
  ]
}