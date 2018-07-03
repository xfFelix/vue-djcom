<template>
  <div>
  <!--container-->
    <div class="code1-box" id="QRCode" v-if="url == ''">
      <div class="user-img">
        <img :src="makePhotoUrl(data.headimage)" >
        <div class="m-t-5 white text-center title-0">{{data.userName}}</div>
      </div>
      <div class="code-img">
        <i class="left-up"></i>
        <i class="left-down"></i>
        <i class="right-up"></i>
        <i class="right-down"></i>
        <img :src="makePhotoUrl(data.qrcode)">
      </div>
      <div class="m-t-12 white text-center title-1">长按识别二维码&nbsp;&nbsp;关注我们</div>
    </div>
    <div v-if="url != ''">
      <img :src="url">
    </div>
  <!--container end-->
  </div>
</template>
<script>
import helpers from 'utils/helpers'
import $ from 'jquery'
import html2canvas from 'html2canvas'
import MemberService from 'services/MemberService'
export default {
  data: () => ({
    title: '',
    data: {
      userName: '',
      headimage: '',
      qrcode: ''
    },
    url: ''
  }),
  created () {

  },
  mounted () {
    this.getShopkeeperInfo()
  },
  methods: {
    getShopkeeperInfo () {
      var _this = this
      MemberService.getShopkeeperInfo().then(res => {
        this.data = res.t
        this.$nextTick(function () {
          html2canvas($('#QRCode'), {
            onrendered: function (canvas) {
              _this.url = canvas.toDataURL()
              // alert(_this.url)
            }
          })
        })
      })
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    html_decode: function (str) {
      return helpers.html_decode(str)
    }
  }
}
</script>
