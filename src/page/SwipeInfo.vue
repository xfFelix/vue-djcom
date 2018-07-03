<template>
    <div v-html="html_decode(content)"></div>
</template>
<script>
import helpers from 'utils/helpers'
export default {
  data: () => ({
    title: '',
    content: ''
  }),
  created () {
    if (this.$route.query.content !== undefined) {
      this.content = this.$route.query.content
    }
  },
  methods: {
    html_decode: function (str) {
      return helpers.html_decode(str)
    }
  }
}
</script>
