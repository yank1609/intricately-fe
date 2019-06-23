export default {
  methods: {
    isBlank (val) {
      return [null, undefined, ''].includes(val)
    }
  }
}