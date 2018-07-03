<template>
    <div class="list-box clearbox">
      <div class="item-box hhxh-left" v-for="item in items" @click="goInfo(item)">
        <div>
          <img :src="makePhotoUrl(item.logoImage)" :onerror="defaultImg">
          <div class="txt-box text-center">
            <div class="text-overflow">{{item.name}}</div>
            <div class="m-t-5 red text-overflow">{{item.price +' '+ item.scoreType}}</div>
          </div>
        </div>
      </div>
      <div v-if="items.length <= 0 && !isShow" style="padding: 20px 0;text-align: center;">暂时没有数据哦！</div>
    </div>
</template>
<script>
import helpers from '../../utils/helpers'
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    isShow: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    defaultImg: 'this.src="' + require('../../assets/product-default.png') + '"'
  }),
  methods: {
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    },
    goInfo: function (item) {
      if (item.url) {
        window.location.href = item.url
      } else {
        this.$router.push({path: '/GoodsDetail', query: {id: item.id}})
      }
    }
  }
}
</script>
