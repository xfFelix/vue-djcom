<template>
  <div>
  <!-- <com-header :title="title"></com-header> -->
  <!--container-->
		<div class="mine-header-box">
			<div class="hhxh-flex">
				<div class="flex-0">
					<img :src="makePhotoUrl(headimage)" class="user-img">
				</div>
				<div class="flex-1 m-l-10">
					<div class="hhxh-flex">
						<div class="title-2 flex-1">{{userName}}</div>
						<div class="flex-0" @click="goMineInfo()">
							<img src="../assets/setting.png" style="height: 20px;">
						</div>
					</div>
					<div class="m-t-5 title-small">
						<span v-if="inviterName != null">推荐人：{{inviterName}}&nbsp;&nbsp;</span>
						<span>等级：{{levelName}}</span>
						<span class="up-btn" @click.stop="goMemberUp()">升级</span>
					</div>
					<div class="m-t-5" style="padding-top: 5px;border-top: 1px solid #fff;">
						<span class="title-1">余额：{{amountTotalScale}}</span>&nbsp;&nbsp;
						<span class="title-1">积分：{{integralTotalScale}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="hhxh-flex mine-top-btns">
			<div class="flex-1">
				<button class="mint-button mint-button--danger mint-button--large" @click="goToCash()">
					<label class="mint-button-text">提现</label>
				</button>
			</div>
			<div class="flex-1">
				<button class="mint-button mint-button--danger mint-button--large is-plain" @click="isSign = true" v-if="flag == false">
					<label class="mint-button-text">签到</label>
				</button>
				<button class="mint-button mint-button--danger mint-button--large is-plain" @click="isSign = true" v-else="flag == true" style="background-color: #DDDDDD;border-color: #DDDDDD">
					<label class="mint-button-text">签到</label>
				</button>
			</div>
		</div>
		<div class="m-t-12">
			<div class="m-header-box hhxh-flex">
				<div class="flex-0 icon-box"></div>
				<div class="flex-1 m-l-10">我的订单</div>
				<div class="gray flex-0 m-l-10" @click="goMineOrder()">全部订单</div>
				<div class="flex-0 m-l-10" style="width: 20px;"><i class="mint-cell-allow-right"></i></div>
			</div>
			<div class="m-body-box clearbox title-small">
				<div class="item-box">
					<img src="../assets/order-1.png" @click="payOrderList()">
					<div class="m-t-8 text-center">待付款</div>
					<i class="number-box" v-show="orderNumber.nonPaymentCount != 0">{{orderNumber.nonPaymentCount}}</i>
				</div>
				<div class="item-box">
					<img src="../assets/order-2.png" @click="sendOrderList()">
					<div class="m-t-8 text-center">待发货</div>
					<i class="number-box" v-show="orderNumber.havePayedCount != 0">{{orderNumber.havePayedCount}}</i>
				</div>
				<div class="item-box">
					<img src="../assets/order-3.png" @click="takeOrderList()">
					<div class="m-t-8 text-center">待收货</div>
					<i class="number-box" v-show="orderNumber.deliveredCount != 0">{{orderNumber.deliveredCount}}</i>
				</div>
				<div class="item-box">
					<img src="../assets/order-4.png" @click="evalOrderList()">
					<div class="m-t-8 text-center">待评价</div>
				</div>
				<div class="item-box">
					<img src="../assets/order-5.png" @click="goOrderService()">
					<div class="m-t-8 text-center">售后</div>
				</div>
			</div>
		</div>
		<div class="m-t-12">
			<div class="m-header-box hhxh-flex">
				<div class="flex-0 icon-box"></div>
				<div class="flex-1 m-l-10">我的资产</div>
			</div>
			<div class="m-body-box clearbox title-small">
				<div class="item-box" @click="goMineWallet()">
					<img src="../assets/property-1.png">
					<div class="m-t-8 text-center">我的钱包</div>
				</div>
				<div class="item-box" @click="goMinePoint()">
					<img src="../assets/property-2.png">
					<div class="m-t-8 text-center">我的积分</div>
				</div>
				<div class="item-box" @click="goCashRecord()">
					<img src="../assets/property-3.png">
					<div class="m-t-8 text-center">提现记录</div>
				</div>
				<div class="item-box" @click="goMineBonus()">
					<img src="../assets/property-4.png">
					<div class="m-t-8 text-center">我的红利</div>
				</div>
				<div class="item-box" @click="goMineRecommend()">
					<img src="../assets/property-5.png">
					<div class="m-t-8 text-center">推荐列表</div>
				</div>
			</div>
		</div>
		<div class="m-t-12 mine-rows-box">
			<a class="mint-cell" @click="goCart()">
				<span class="mint-cell-mask"></span> 
				<div class="mint-cell-wrapper">
					<div class="mint-cell-value">
						<img src="../assets/mine-cart.png" style="width: 20px;">
					</div>
					<div class="mint-cell-title m-l-10 is-link">
						我的购物车
					</div>
					<i class="mint-cell-allow-right"></i>
				</div>
			</a>
			<a class="mint-cell" @click="goMineCollection()">
				<span class="mint-cell-mask"></span> 
				<div class="mint-cell-wrapper">
					<div class="mint-cell-value">
						<img src="../assets/mine-collection.png" style="width: 20px;">
					</div>
					<div class="mint-cell-title m-l-10 is-link">
						我的收藏
					</div>
					<i class="mint-cell-allow-right"></i>
				</div>
			</a>
			<a class="mint-cell" @click="goMineAddress()">
				<span class="mint-cell-mask"></span> 
				<div class="mint-cell-wrapper">
					<div class="mint-cell-value">
						<img src="../assets/mine-address.png" style="width: 20px;">
					</div>
					<div class="mint-cell-title m-l-10 is-link">
						我的地址
					</div>
					<i class="mint-cell-allow-right"></i>
				</div>
			</a>
		</div>

		<!--删除购物车产品弹窗-->
		<div v-if="isSign == true">
		<div class="mint-msgbox-wrapper" style="position: absolute; z-index: 801;display: block;">
			<div class="mint-msgbox" style="border-radius: 7px;overflow: visible;">
				<div class="mint-msgbox-header" style="padding-top: 0;">
					<div class="mint-msgbox-title">
						<img src="../assets/sign-header.png" style="width: 100%;">
					</div>
				</div> 
				<div class="mint-msgbox-content" style="padding: 15px 0 0;border-bottom: 0;">
					<div class="mint-msgbox-message ">
						<div class="m-sign-box clearbox">
							<div class="item-box" :class="{active: continuousDays >= 1}">
								<div class="circle-box1">+{{signConfigList[0].integralSign}}</div>
								<div class="m-t-12">第1天</div>
							</div>
							<div class="item-box" :class="{active: continuousDays >= 2}">
								<div class="circle-box1">+{{signConfigList[1].integralSign}}</div>
								<div class="m-t-12">第2天</div>
							</div>
							<div class="item-box" :class="{active: continuousDays >= 3}">
								<div class="circle-box1">+{{signConfigList[2].integralSign}}</div>
								<div class="m-t-12">第3天</div>
							</div>
							<div class="item-box" :class="{active: continuousDays >= 4}">
								<div class="circle-box1">+{{signConfigList[3].integralSign}}</div>
								<div class="m-t-12">第4天</div>
							</div>
							<div class="item-box" :class="{active: continuousDays >= 5}">
								<div class="circle-box1">+{{signConfigList[4].integralSign}}</div>
								<div class="m-t-12">第5天</div>
							</div>
							<div class="item-box" :class="{active: continuousDays >= 6}">
								<div class="circle-box1">+{{signConfigList[5].integralSign}}</div>
								<div class="m-t-12">第6天</div>
							</div>
							<div class="item-box" :class="{active: continuousDays >= 7}">
								<div class="circle-box1">+{{signConfigList[6].integralSign}}</div>
								<div class="m-t-12">第7天</div>
							</div>
							<div class="item-box" :class="{active: continuousDays > 7}">
								<div class="circle-box1">+{{signConfigList[7].integralSign}}</div>
								<div class="m-t-12">第7+天</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="flag == false" class="mint-msgbox-btns" style="margin: 15px 0 20px;">
					<button @click="goSigned()" class="mint-msgbox-btn mint-msgbox-confirm white" style="background-color: #62cc94;width: 80%;margin: 0 25px;border-radius: 20px;">签到</button>
				</div>
				<div v-else="flag == true" class="mint-msgbox-btns" style="margin: 15px 0 20px;">
					<button class="mint-msgbox-btn mint-msgbox-confirm white" style="background-color: #ccc;width: 80%;margin: 0 25px;border-radius: 20px;">签到</button>
				</div>
				<div style="position: absolute;bottom: -60px;left: 50%;margin-left: -15px;">
					<img @click="isSign = false" src="../assets/sign-close.png" style="height: 30px;">
				</div>
			</div>
		</div>
		<div class="v-modal" style="z-index: 800;"></div>
		</div>
		<!--删除购物车产品结束-->

		<!--container end-->
		<end-header></end-header>
  </div>
</template>
<script>
import comHeader from '../components/ComHeader'
import endHeader from '../components/EndHeader'
import MemberService from 'services/MemberService'
import OrderService from 'services/OrderService'
import { Toast } from 'mint-ui'
import helpers from 'utils/helpers'
export default {
  components: {
    comHeader,
    endHeader
  },
  data: () => ({
    title: '个人中心',
    popupVisible: false,
    continuousDays: 0,
    flag: false,
    isSign: false,
    userName: '',
    headimage: '',
    inviterName: '',
    levelName: '',
    amountTotalScale: '',
    integralTotalScale: '',
    orderNumber: {}
  }),
  created () {
    this.$store.state.footer.point = '3'
  },
  mounted () {
    this.loadMineInfo()
    this.getSignConfig()
    this.loadSignList()
    this.statusCount()
  },
  methods: {
    statusCount () {
      OrderService.statusCount().then(res => {
        this.orderNumber = res.t
      })
    },
    loadMineInfo () {
      MemberService.loadMineInfo().then(res => {
        this.userName = res.t.userName
        this.headimage = res.t.headimage
        this.inviterName = res.t.inviterName
        this.levelName = res.t.levelName
        this.amountTotalScale = res.t.amountTotalScale
        this.integralTotalScale = res.t.integralTotalScale
      })
    },
    loadSignList () {
      MemberService.loadSignList().then(res => {
        this.continuousDays = res.t.continuousDays
        this.flag = res.t.flag
        // this.isSign = true
      })
    },
    getSignConfig () {
      MemberService.getSignConfig().then(res => {
        this.signConfigList = res.t
      })
    },
    goSigned () {
      if (this.flag === false) {
        MemberService.goSigned().then(res => {
          Toast({
            message: '签到成功',
            iconClass: 'icon icon-success'
          })
          this.continuousDays++
          this.flag = true
        })
      } else {
        this.isSign = false
        Toast({
          message: '签到失败,一天只能签到一次',
          iconClass: 'icon icon-no'
        })
      }
    },
    payOrderList () {
      let billStatus = 0
      let point = 2
      this.$router.push({
        name: 'MineOrder',
        query: {
          billStatus: billStatus,
          point: point
        }
      })
    },
    sendOrderList () {
      let billStatus = 1
      let point = 3
      this.$router.push({
        name: 'MineOrder',
        query: {
          billStatus: billStatus,
          point: point
        }
      })
    },
    takeOrderList () {
      let billStatus = 3
      let point = 4
      this.$router.push({
        name: 'MineOrder',
        query: {
          billStatus: billStatus,
          point: point
        }
      })
    },
    evalOrderList () {
      let billStatus = 4
      let point = 5
      let postFlag = 'NO'
      this.$router.push({
        name: 'MineOrder',
        query: {
          billStatus: billStatus,
          point: point,
          postFlag: postFlag
        }
      })
    },
    goOrderService () {
      this.$router.push({
        name: 'OrderService'
      })
    },
    goCart: function () {
      this.$router.push('MineCart')
    },
    goMemberUp: function () {
      this.$router.push('MemberUp')
    },
    goMineInfo: function () {
      this.$router.push('MineInfo')
    },
    goMineOrder: function () {
      this.$router.push('MineOrder')
    },
    goToCash: function () {
      this.$router.push('MineToCash')
    },
    goMineWallet: function () {
      this.$router.push('MineWallet')
    },
    goMineAddress () {
      this.$router.push('MineAddress')
    },
    goMineBonus () {
      this.$router.push('MineBonus')
    },
    goMinePoint () {
      this.$router.push('MinePoint')
    },
    goMineCollection () {
      this.$router.push('MineCollection')
    },
    goMineRecommend () {
      this.$router.push('MineRecommend')
    },
    goCashRecord () {
      this.$router.push('CashRecord')
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    }
  }
}
</script>
