<template>
    <div class="list-box clearbox">
      <div class="item-box hhxh-left" v-for="item in items">
        <div>
          <img :src="makePhotoUrl(item.logoImage)">
          <div class="txt-box text-center">
            <div>{{item.name}}</div>
            <div class="m-t-5 red">{{item.price}} 会员积分</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import helpers from '../../utils/helpers'
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
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
<style scoped>
.ecom-swipe-box img {
  height: 100%;
}
</style>
