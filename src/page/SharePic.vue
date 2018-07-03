<template>
  <div>
  <!--container-->
		<div class="m-t-12 hhxh-flex s-user-info">
			<img :src="makePhotoUrl(headimage)" style="height: 65px;width: 65px;border-radius: 100%;" class="flex-0">
			<div class="flex-1 m-l-10">
				<div>我是&nbsp;<span class="red">{{userName}}</span></div>
				<div class="m-t-5">我要为&nbsp;<span class="red">电精科技</span>&nbsp;代言</div>
			</div>
		</div>
		<div class="s-product-box m-t-12">
			<img :src="makePhotoUrl(data.logoImage)" id="djkj-swipe">
			<div class="bottom-box">
				<div>
					<div class="white text-overflow1">{{data.name}}</div>
					<div class="m-t-5">
						<span class="red">￥{{data.price}}</span>&nbsp;&nbsp;
						<span class="gray original-price">市场价：￥{{data.settlePrice}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="s-code-box">
			<div class="code-box">
				<div class="hhxh-flex text-center">
					<div class="flex-1">
						<img :src="makePhotoUrl(qrcode)" style="width: 100px;">
            <div class="m-t-5 red title-small">—&nbsp;&nbsp;长按二维码，关注我们&nbsp;&nbsp;—</div>
					</div>
				</div>
			</div>
			<div class="m-t-12 gray text-center">加入有好礼&nbsp;&nbsp;购买有惊喜</div>
		</div>


		<!--container end-->

  </div>
</template>
<script>
import helpers from 'utils/helpers'
import MemberService from 'services/MemberService'
export default {
  data: () => ({
    title: '',
    id: '', // 商品Id
    memberId: '', // 用户Id
    userName: '',
    headimage: '',
    data: {
      name: '',
      price: 0,
      settlePrice: 0,
      logoImage: ''
    },
    qrcode: ''
  }),
  created () {
    this.id = this.$route.query.id
  },
  mounted () {
    document.getElementById('djkj-swipe').style.cssText = 'height: ' + document.documentElement.clientWidth + 'px;width: 100%;'
    this.sharePicture()
  },
  methods: {
    sharePicture () {
      MemberService.sharePicture(this.id).then(res => {
        this.userName = res.t.userName
        this.headimage = res.t.headimage
        this.data.name = res.t.materialName
        this.data.price = res.t.price
        this.data.settlePrice = res.t.settlePrice
        this.data.logoImage = res.t.logoImage
        this.qrcode = res.t.qrcode
      })
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    }
  }
}
</script>
