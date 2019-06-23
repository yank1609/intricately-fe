<template>
  <ul class="container breadcrumb-container">
    <li v-for="(breadcrumb, index) in breadcrumbs" :key="'breadcrumb-link-' + index">
      <router-link :to="breadcrumb.url"  v-if="!breadcrumb.current">
        {{ breadcrumb.label }}
      </router-link>
      <span v-else>{{ breadcrumb.label }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    breadcrumbs () {
      if (this.links.length) {
        return this.links;
      } else {
        let prevs = [];

        if (this.$route.meta.prevKeys !== null) {
          this.$route.meta.prevKeys.split(',').forEach(key => {
            let routeTmp = this.$router.options.routes.filter(route => route.name === key)

            if (routeTmp.length) {
              let route = routeTmp[0]
              prevs.push({label: route.meta.label, url: route.name})
            }
          })
        }
        return prevs.concat(
          [{ label: this.$route.meta.label, url: this.$route.name, current: true }]
        )
      }
    }
  }
}
</script>
