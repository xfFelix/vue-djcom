<template>
  <div>
  <!--container-->
		<div class="s-header-box">
			<div class="hhxh-flex">
				<div class="flex-0"><img src="../assets/gold.png" style="height: 35px;"></div>
				<div class="flex-1 m-l-10">
					<div>推客奖金：<span class="red title-1">￥{{commissionRatio.toFixed(2)}}</span></div>
					<div class="m-t-5">已销售<i class="red">{{salesQty}}</i>件</div>
				</div>
			</div>
		</div>

		<div class="m-t-12">
			<img :src="makePhotoUrl(sharePic)">
		</div>


		<!--container end-->

		<!--footer-->
		<div class="djkj-footer-empty" style="height: 44px;"></div>
		<div class="mint-tabbar is-fixed">
			<div class="s-footer-box hhxh-flex" style="width: 100%;">
				<div class="flex-1 text-center" @click="popWindow()">
					<img src="../assets/link.png">
					<span class="m-l-10">链接推广</span>
				</div>
				<div class="flex-1 text-center" @click="goSharePic()">
					<img src="../assets/pic-recommend.png">
					<span class="m-l-10">图片推广</span>
				</div>
			</div>
		</div>
		<!--fonter end-->

		<!--分享提示弹窗-->
		<div v-if="popwin == true" @click="cutWindow()">
		  <div class="v-modal" style="z-index: 2000;"></div>
		  <div class="share-msg-box" style="z-index: 20001;">
			  <img src="../assets/share-msg.png">
		  </div>
		</div>
		<!--分享提示弹窗结束-->
  </div>
</template>
<script>
import helpers from 'utils/helpers'
import MemberService from 'services/MemberService'
import MaterialService from 'services/MaterialService'
import IndexService from 'services/IndexService'
import wx from 'weixin-js-sdk'
import {Toast, Indicator} from 'mint-ui'
import ENV from 'services/xhr/config'
export default {
  data: () => ({
    title: '',
    popwin: false,
    id: '', // 商品Id
    url: '',
    memberId: '', // 用户Id
    userName: '',
    headimage: '',
    data: {
      name: '',
      price: 0,
      settlePrice: 0,
      logoImage: ''
    },
    commissionRatio: 0,
    salesQty: 0,
    sharePic: ''
  }),
  created () {
    this.id = this.$route.query.id
    this.url = this.$route.query.url
  },
  mounted () {
    this.genShareImage()
    this.searchRatio()
    this.sharePicture()
  },
  methods: {
    sharePicture () {
      MemberService.sharePicture(this.id).then(res => {
        this.userName = res.t.userName
        this.data.name = res.t.materialName
        this.data.logoImage = res.t.logoImage
        this.memberId = res.t.memberId
        this.share()
      })
    },
    searchRatio () {
      MaterialService.searchRatio(this.id).then(res => {
        this.commissionRatio = res.t.commissionRatio
        this.salesQty = res.t.salesQty
      })
    },
    genShareImage () {
      Indicator.open({
        text: '图片加载中...',
        spinnerType: 'fading-circle'
      })
      MemberService.genShareImage(this.id).then(res => {
        this.sharePic = res.t
        Indicator.close()
      })
    },
    popWindow: function () {
      this.popwin = true
    },
    cutWindow: function () {
      this.popwin = false
    },
    goSharePic () {
      this.$router.push({
        name: 'SharePic',
        query: {
          id: this.id
        }
      })
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    share () {
      let url = this.url.split('#')[0]
      MemberService.getShareInfo(url).then(res => {
        this.wxInit(res.t)
      })
    },
    wxInit (sd) {
      let links = `${ENV.httpUrl}#/MaterialDetail?id=${this.id}&inviter=${this.memberId}` // 分享出去的链接
      let title = this.data.name  // 分享的标题
      let desc = this.userName + '的生活馆' // 分享的详情介绍
      let imgUrl = this.makePhotoUrl(this.data.logoImage)
      wx.config({
        debug: false,
        appId: sd.appId,
        timestamp: sd.timestamp,
        nonceStr: sd.nonceStr,
        signature: sd.signature,
        jsApiList: [
          'onMenuShareTimeline', 'onMenuShareAppMessage' /* , 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone' */
        ]
      })
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            IndexService.getWxShareIntegral().then(res => {
              Toast({message: '成功分享到朋友圈'})
            })
          },
          cancel: function () {
            Toast({message: '分享失败,您取消了分享!'})
          }
        })
        // 微信分享菜单测试
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            IndexService.getWxShareIntegral().then(res => {
              Toast({message: '成功分享'})
            })
          },
          cancel: function () {
            Toast({message: '分享失败,您取消了分享!'})
          }
        })
        // wx.onMenuShareQQ({
        //   title: title, // 分享标题
        //   desc: desc, // 分享描述
        //   link: links, // 分享链接
        //   imgUrl: imgUrl, // 分享图标
        //   success: function () {
        //   // alert("成功分享给QQ")
        //     Toast({message: '成功分享到QQ'})
        //   },
        //   cancel: function () {
        //   // alert("分享失败,您取消了分享!")
        //     Toast({message: '分享失败,您取消了分享!'})
        //   }
        // })
        // wx.onMenuShareWeibo({
        //   title: title, // 分享标题
        //   desc: desc, // 分享描述
        //   link: links, // 分享链接
        //   imgUrl: imgUrl, // 分享图标
        //   success: function () {
        //   // alert("成功分享给朋友")
        //     Toast({message: '成功分享到腾讯微博'})
        //   },
        //   cancel: function () {
        //   // alert("分享失败,您取消了分享!")
        //     Toast({message: '分享失败,您取消了分享!'})
        //   }
        // })
        // wx.onMenuShareQZone({
        //   title: title, // 分享标题
        //   desc: desc, // 分享描述
        //   link: links, // 分享链接
        //   imgUrl: imgUrl, // 分享图标
        //   success: function () {
        //   // alert("成功分享给朋友")
        //     Toast({message: '成功分享到QQ空间'})
        //   },
        //   cancel: function () {
        //   // alert("分享失败,您取消了分享!")
        //     Toast({message: '分享失败,您取消了分享!'})
        //   }
        // })
      })
      wx.error(function (res) {
       // alert("error")
       // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    }
  }
}
</script>
