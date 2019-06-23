<template>
  <div class="layout-item--3of12 sidebar">
    <ul>
      <li v-for="(route, index) in routes" :key="'sidebar-menu-' + index">
        <router-link :to="{name: route.url}">
          {{ route.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    routes () {
      return this.$router.options.routes.map((route) =>  ({ label: route.meta.label, url: route.name }))
    }
  }
}
</script>

<style>

</style>
