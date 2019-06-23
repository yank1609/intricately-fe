<template>
  <div>
    <nav-header />
    <breadcrumb />
    <div class="container">
      <div class="layout-container">
        <sidebar />
        <div class="layout-item--9of12">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from 'Components/Header'
import Breadcrumb from 'Components/Breadcrumb'
import Sidebar from 'Components/Sidebar'

export default {
  components: {
    NavHeader,
    Breadcrumb,
    Sidebar
  },
  data () {
    return {
      links: [
        {
          label: 'Home',
          url: {
            name: 'indexPage'
          }
        },
        {
          label: 'Company Data',
          url: '/company-data',
          current: true
        }
      ]
    }
  }
};
</script>
