<template>
    <div class="scroll-box">
        <div class="list-container-box">
          <a class="mint-cell" v-for="item in items">
            <span class="mint-cell-mask"></span>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <div class="hhxh-flex item-box">
                  <div class="flex-0 m-r-10"><img :src="makePhotoUrl(itme.logoImage)"></div>
                  <div class="flex-1">
                    <div>{{item.name}}</div>
                    <div class="m-t-8 red"><span>￥<i class="title-3">{{item.price}}</i>.00</span>&nbsp;&nbsp;现金积分</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
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
