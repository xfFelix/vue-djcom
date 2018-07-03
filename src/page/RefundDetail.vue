<template>
  <div>
  <!--container-->
		<div class="order-steps-box">
			<div class="hhxh-flex">
				<div class="flex-1 item-box step1 active">
					<div class="img-box"></div>
					<div class="name-box m-top-30">已申请</div>
				</div>
				<div class="flex-1 item-box step2 active">
					<div class="img-box"></div>
					<div class="name-box m-top-30">处理中</div>
				</div>
				<div class="flex-1 item-box step3" :class="{active: refundDetail.returnStatus == 2}">
					<div class="img-box"></div>
					<div class="name-box m-top-30">退款成功</div>
				</div>
			</div>
		</div>
		<div class="hxg-container-box m-t-12">
			<div class="body-box m-t-8">
				<a class="mint-cell">
					<span class="mint-cell-mask"></span>
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="title-1">申请信息</div>
						</div>
						
					</div>
				</a>
				<a class="mint-cell">
					<span class="mint-cell-mask"></span>
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="hhxh-flex">
								<div class="flex-0 gray" style="width: 70px;">申请时间</div>
								<div class="flex-1">{{refundDetail.createDate}}</div>
							</div>
							<div class="hhxh-flex hhxh-vertical-top m-t-8">
								<div class=" flex-0 gray" style="width: 70px;">退款原因</div>
								<div class="flex-1">
									<p class="text-overflow3">{{refundDetail.applyExplain}}</p>
								</div>
							</div>
							<div class="hhxh-flex m-t-8">
								<div class="flex-0 gray" style="width: 70px;">订单金额</div>
								<div class="flex-1">￥{{refundDetail.amount}}</div>
							</div>
							<div class="hhxh-flex hhxh-vertical-top m-t-8" v-if="(refundDetail.applyVouchers).length != 0">
								<div class=" flex-0 gray" style="width: 70px;">凭证图片</div>
								<div class="flex-1">
									<img v-for="item in refundDetail.applyVouchers" :src="makePhotoUrl(item)" style="width: 80px;height: 80px;margin: 0 5px 5px 0;">
								</div>
							</div>

						</div>
						
					</div>
				</a>
				
			</div>
			<div class="body-box m-t-8" v-if="refundDetail.returnStatus != 1">
				<a class="mint-cell">
					<span class="mint-cell-mask"></span>
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="title-1">审核信息</div>
						</div>
						
					</div>
				</a>
				<a class="mint-cell">
					<span class="mint-cell-mask"></span>
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="hhxh-flex">
								<div class="flex-0 gray" style="width: 70px;">审核结果</div>
								<div class="flex-1" v-if="refundDetail.returnStatus == 1">申请</div>
								<div class="flex-1" v-else-if="refundDetail.returnStatus == 2">同意</div>
								<div class="flex-1" v-else-if="refundDetail.returnStatus == 3">拒绝</div>
							</div>
							<div class="hhxh-flex m-t-8">
								<div class="flex-0 gray" style="width: 70px;">审核时间</div>
								<div class="flex-1">{{refundDetail.updateDate}}</div>
							</div>
							<div class="hhxh-flex m-t-8" v-if="refundDetail.returnStatus != 2">
								<div class="flex-0 gray" style="width: 70px;">审核原因</div>
								<div class="flex-1">{{refundDetail.dealRefuseReason}}</div>
							</div>
							
							<div class="hhxh-flex m-t-8" v-if="refundDetail.returnStatus != 3">
								<div class="flex-0 gray" style="width: 70px;">退还积分</div>
								<div class="flex-1">{{refundDetail.integralPay}}积分</div>
							</div>
							<div class="hhxh-flex m-t-8" v-if="refundDetail.returnStatus != 3">
								<div class="flex-0 gray" style="width: 70px;">退还余额</div>
								<div class="flex-1">￥{{refundDetail.wxAmount}}</div>
							</div>
							<div class="hhxh-flex m-t-8" v-if="refundDetail.returnStatus != 3">
								<div class="flex-0 gray" style="width: 70px;">退还钱包</div>
								<div class="flex-1">￥{{refundDetail.payAmount}}</div>
							</div>

						</div>
						
					</div>
				</a>
				
			</div>

		</div>

		<!--container end-->
  </div>
</template>
<script>
import MaterialService from 'services/MaterialService'
import helpers from 'utils/helpers'
export default {
  data: () => ({
    title: '',
    id: '',
    refundDetail: {}
  }),
  created () {
    if (this.$route.query.id !== undefined) {
      this.id = this.$route.query.id
    }
  },
  mounted () {
    this.searchOrderRefund()
  },
  methods: {
    searchOrderRefund () {
      MaterialService.searchOrderRefund(this.id).then(res => {
        this.refundDetail = res.t
      })
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    }
  }
}
</script>
