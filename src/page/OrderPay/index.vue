<template>
  <div>
  <!--container-->
		
		<div >
			<a class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<div>钱包余额</div>
					</div>
					<div class="mint-cell-value">
						<div class="gray">{{amountTotal}}</div>
					</div>
				</div>
			</a>
			<a class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<div>冻结金额</div>
					</div>
					<div class="mint-cell-value">
						<div class="gray">{{listFrozen}}</div>
					</div>
				</div>
			</a>
		</div>
		<div class="pay-order-box m-t-12">

			<a class="mint-cell">
				<span class="mint-cell-mask"></span> 
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<div class="hhxh-flex active">
							<img src="../../assets/wx-pay.png">
						</div>
					</div>
					
				</div>
			</a>
      <a class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<div>账户支付</div>
					</div>
					<div class="mint-cell-value">
						<input placeholder="请填写账户支付金额" type="number" step="0.01" class="mint-field-core text-right" v-model="amount" @input="limitAmount()">
					</div>
				</div>
			</a>

		</div>

		<!--container end-->

		<!--footer-->
		<div class="djkj-footer-empty" style="height: 48px;"></div>
		<div class="mint-tabbar is-fixed">
			<div class="p-footer-box hhxh-flex" style="width: 100%;">
				<div class="flex-1 text-center">实付：<span class="red">￥<i class="title-5">{{money}}</i></span><span class="title-small">（免运费）</span></div>
				<div class="flex-1 text-center buy-box1" id="upButton" style="padding: 0 15px;" @click="callpay">确认支付</div>
			</div>
		</div>
		<!--fonter end-->
  </div>
</template>
<script>
import OrderService from 'services/OrderService'
import IndexService from 'services/IndexService'
import MemberService from 'services/MemberService'
import OrderPayment from 'services/OrderPayment'
import {Toast} from 'mint-ui'
import wx from 'weixin-js-sdk'
export default {
  data: () => ({
    title: '',
    id: '',   // 订单Id
    amountTotal: 0,
    listFrozen: 0,
    actAmount: 0,
    amount: '',
    money: ''
  }),
  created () {
    if (this.$route.query.id !== undefined) {
      this.id = this.$route.query.id
    }
  },
  mounted () {
    this.share()
    this.directRightUrl()
    this.loadOrderPayDetail()
  },
  methods: {
    directRightUrl () {
      let paths = window.location.href.split('#')
      paths[1] = paths[1] || '/'
      if (paths[0].charAt(paths[0].length - 1) !== '?') {
        paths[0] = `${paths[0]}?`
      }
      if (paths[1].charAt(0) === '!') {
        paths[1] = paths[1].substr(1)
      }
      let url = `${paths[0]}#${paths[1]}`
      if (window.location.href !== url) {
        window.location.href = url
      }
    },
    loadOrderPayDetail () {
      OrderService.loadOrderPayDetail(this.id).then(res => {
        this.amountTotal = res.t.amountTotal.toFixed(2)
        this.listFrozen = res.t.listFrozen.toFixed(2)
        this.actAmount = res.t.actAmount.toFixed(2)
        this.money = this.actAmount
      })
    },
    limitAmount () {
      // 账户支付
      var amount = this.amount
      // 可用金额
      var limitprice = this.amountTotal - this.listFrozen
      // 小数点后面有几位长度
      var scaleLenth = 0
      var index = amount.indexOf('.')
      if (index !== -1) {
        scaleLenth = amount.substring(index + 1).length
      }
      amount = parseFloat(this.amount)
      if (amount === 0) {
        return
      }
      limitprice = parseFloat(limitprice)
      if (isNaN(amount)) {
        amount = 0
      }
      if (amount < 0) {
        amount = 0
      }
      if (amount > limitprice) {
        amount = limitprice
      }
      if (this.actAmount < amount) {
        amount = Number(this.actAmount)
      }
      let money = this.actAmount - amount
      if (money <= 0) {
        money = 0
      }
      this.amount = amount.toFixed(scaleLenth)
      this.money = money.toFixed(2)
    },
    goPaySuccess () {
      this.$router.push({
        name: 'PaySuccess'
      })
    },
    // onBridgeReady: function () {
    //   if (typeof this.amount === 'number') {
    //     this.amount = this.amount.toFixed(2)
    //   } else {
    //     this.amount = 0
    //   }
    //   IndexService.payWeixin(this.id, this.amount).then(rt => {
    //     let message = rt.t
    //     WeixinJSBridge.invoke(
    //          'getBrandWCPayRequest', {
    //            'appId': message.appId,
    //            'timeStamp': message.timeStamp,
    //            'nonceStr': message.nonceStr,
    //            'package': message.package,
    //            'signType': message.signType,
    //            'paySign': message.paySign
    //          },
    //       function (res) {
    //         console.log(res)
    //         if (res.err_msg === 'get_brand_wcpay_request:ok') {
    //            // Toast('微信支付成功')
    //           alert('微信支付成功')
    //           this.$router.push({
    //             name: 'PaySuccess'
    //           })
    //         } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
    //            // Toast('用户取消支付')
    //           // this.$router.push({
    //           //   name: 'OrderPay',
    //           //   query: {
    //           //     id: this.id
    //           //   }
    //           // })
    //         } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
    //            // Toast('网络异常，请重试')
    //         }
    //       }
    //     )
    //   })
    // },
    // callpay: function () {
    //   var vm = this
    //   if (typeof WeixinJSBridge === 'undefined') {
    //     if (document.addEventListener) {
    //       document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(), false)
    //     } else if (document.attachEvent) {
    //       document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady())
    //       document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady())
    //     }
    //   } else {
    //     this.onBridgeReady()
    //   }
    // },
    share () {
      let url = window.location.href.toString().split('#')[0]
      MemberService.getShareInfo(url).then(res => {
        this.wxInit(res.t)
      })
    },
    wxInit (sd) {
      wx.config({
        debug: false,
        appId: sd.appId,
        timestamp: sd.timestamp,
        nonceStr: sd.nonceStr,
        signature: sd.signature,
        jsApiList: [
          'chooseWXPay'
        ]
      })
    },
    callpay () {
      var _this = this
      if (this.amount === '') {
        this.amount = 0
      }
      this.money = Number(this.money)
      if (this.money === 0) {
        OrderPayment.toPayAmount(this.id, this.amount).then(res => {
          _this.$router.push({
            name: 'PaySuccess'
          })
        })
      } else if (this.money < 0) {
        Toast('请重新输入')
      } else {
        document.getElementById('upButton').disabled = true
        IndexService.payWeixin(this.id, this.amount).then(res => {
          wx.chooseWXPay({
            timestamp: res.t.timeStamp,
            nonceStr: res.t.nonceStr,
            package: res.t.package,
            signType: res.t.signType,
            paySign: res.t.paySign,
            success: function () {
              document.getElementById('upButton').disabled = false
              _this.$router.push({
                name: 'PaySuccess'
              })
            },
            cancel: function () {
              document.getElementById('upButton').disabled = false
            }
          })
        })
      }
    }
  }
}
</script>
