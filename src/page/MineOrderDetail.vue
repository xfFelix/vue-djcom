<template>
  <div>
  <!--container-->
		<div class="m-order-detail-box">
			<a class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<div style="width: 100%;">
							<div class="hhxh-flex">
								<div class="flex-0"><img src="../assets/location.png" style="height: 30px;"></div>
								<div class="flex-1 m-l-10">
									<div>{{contractPerson}}&nbsp;&nbsp;&nbsp;{{contractTel}}</div>
									<div class="m-t-8 text-overflow2">{{address}}</div>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</a>
		</div>
		<div class="m-t-12 gray" style="padding: 7px 10px 12px;background-color: #fff;">
			<div class="m-t-5">订单编号：{{number}}</div>
			<div class="m-t-5" v-if="payway == 1">支付方式：微信</div>
			<div class="m-t-5" v-else="payway == 2">支付方式：支付宝</div>
			<div class="m-t-5">下单时间：{{bizDate}}</div>
			<div class="m-t-5" v-if="deliveryDate != ''">发货时间：{{deliveryDate}}</div>
			<div class="m-t-5" v-if="logistics != '' && logistics != null">快递方式：{{logistics}}</div>
			<div class="m-t-5" v-if="logisticsNum != '' && logisticsNum != null">快递单号：{{logisticsNum}}</div>
		</div>
		<div class="m-order-list-box">
			<div class="m-t-12">
				<a class="mint-cell">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title is-link">
							<div class="hhxh-flex">
								<div class="flex-0">
									<img :src="makePhotoUrl(inviterShopInfo.headimage)" style="width: 35px;height: 35px;">
								</div>
								<div class="flex-1 m-l-10 title-2">{{inviterShopInfo.realName}}</div>
							</div>
						</div>
					</div>
					<i class="mint-cell-allow-right"></i>
				</a>
				<a class="mint-cell" v-for="(item, index) in listEntry">
					<span class="mint-cell-mask"></span> 
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="hhxh-flex">
								<div class="flex-0 m-r-10"><img :src="makePhotoUrl(item.logoimage)" style="width: 80px;height: 80px;"></div>
								<div class="flex-1">
									<div class="text-overflow2">{{item.name}}</div>
									<div class="m-t-12 hhxh-flex">
										<div class="flex-1 gray">{{item.classify}}
										</div>
										<div class="flex-0 gray"><i class="title-small">Χ</i>&nbsp;&nbsp;<span class="title-0">{{item.qty}}</span></div>
									</div>
									<div class="m-t-8 title-small1 red">￥<span class="title-4">{{item.price.toFixed(2)}}</span></div>
								</div>
							</div>
						</div>
						
					</div>
				</a>
				<a class="mint-cell">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="text-right">实付：<span class="title-small red">￥<i class="title-4">{{payAmount.toFixed(2)}}</i></span>（免运费）</div>
						</div>
						
					</div>
				</a>
			</div>
		</div>

		<!--container end-->

		<!--footer-->
		<!-- <div class="djkj-footer-empty" style="height: 48px;"></div> -->
		<div class="mint-tabbar is-fixed" v-if="this.billStatus == 1 || this.billStatus == 3">
			<div class="p-footer-box hhxh-flex" style="width: 100%;height: 48px;">
				<div class="flex-1 text-right" style="margin-right: 10px;">
					<!-- &nbsp;<button class="mint-button mint-button--default mint-button--small is-plain">
							<label class="mint-button-text">查看物流</label>
						</button> -->
					&nbsp;<button v-if="this.billStatus == 1" class="mint-button mint-button--danger mint-button--small is-plain" @click="goRefundApply()">
						<label class="mint-button-text">申请退款</label>
					</button>
					&nbsp;<button v-if="this.billStatus == 3" class="mint-button mint-button--danger mint-button--small" @click="confirmRecive()">
						<label class="mint-button-text">确认收货</label>
					</button>
				</div>
			</div>
		</div>
		<!--fonter end-->
  </div>
</template>
<script>
import OrderService from 'services/OrderService'
import helpers from 'utils/helpers'
import {Toast, MessageBox} from 'mint-ui'
export default {
  data: () => ({
    title: '',
    id: '', // 订单Id
    billStatus: '',
    contractPerson: '',
    contractTel: '',
    address: '',
    number: '',
    payway: '',
    bizDate: '',
    deliveryDate: '',
    logistics: '',
    logisticsNum: '',
    inviterShopInfo: {},
    payAmount: 0,
    listEntry: []
  }),
  created () {
    if (this.$route.query.id !== undefined) {
      this.id = this.$route.query.id
    }
  },
  mounted () {
    this.findOrderDetail()
  },
  methods: {
    findOrderDetail () {
      OrderService.findOrderDetail(this.id).then(res => {
        this.contractPerson = res.t.contractPerson
        this.contractTel = res.t.contractTel
        this.address = res.t.address
        this.billStatus = res.t.billStatus
        this.number = res.t.number
        this.payway = res.t.payway
        this.bizDate = res.t.bizDate
        this.deliveryDate = res.t.deliveryDate
        this.logistics = res.t.logistics
        this.logisticsNum = res.t.logisticsNum
        this.inviterShopInfo = res.t.inviterShopInfo
        this.payAmount = res.t.actAmount
        this.listEntry = res.t.listEntry
      })
    },
    goRefundApply () {
      if (this.billStatus === 1 || this.billStatus === 4) {
        this.$router.push({
          name: 'RefundApply',
          query: {
            id: this.id
          }
        })
      } else {
        Toast('订单不符合退款条件')
      }
    },
    confirmRecive () {
      this.billStatus = Number(this.billStatus)
      if (this.billStatus === 3) {
        MessageBox.confirm('是否确认收货?').then(action => {
          OrderService.ConfirmOrder(this.id).then(res => {
            Toast('已确认收货')
            this.billStatus = 4
          })
        })
      } else {
        Toast('订单不符合收货条件')
      }
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    }
  }
}
</script>
