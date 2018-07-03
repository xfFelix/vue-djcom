<template>
    <div class="ecom-swipe-box">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in items">
            <img v-lazy="makePhotoUrl(item.picture)" :onerror="defaultImg">
        </mt-swipe-item>
      </mt-swipe>
    </div>
</template>
<script>
import helpers from '../../utils/helpers'
export default {
  data: () => ({
    defaultImg: 'this.src="' + require('../../assets/banner_default.png') + '"',
    items: []
  }),
  mounted () {
    this.items = this.$store.state.swipeItems
    alert(this.items[0].picture)
  },
  methods: {
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    }
  }
}
</script>
