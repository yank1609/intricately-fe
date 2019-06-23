import Index from 'Pages/Index'
import CompanyData from 'Pages/CompanyData'
import CompanyPage from 'Pages/CompanyPage'
import CompanyTable from 'Pages/CompanyTable'

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
    },
    {
      path: '/company-page',
      component: CompanyPage,
      name: 'companyPage',
      meta: {
        label: 'Company Page',
        prevKeys: 'indexPage'
      }
    },
    {
      path: '/company-table',
      component: CompanyTable,
      name: 'companyTable',
      meta: {
        label: 'Company Table',
        prevKeys: 'indexPage'
      }
    }
  ]
}