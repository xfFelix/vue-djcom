<template>
  <div>
  <!--container-->
		<div>
			<a class="mint-cell" @click="goMineAddress()">
				<span class="mint-cell-mask"></span>
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<div style="width: 100%;">
							<div class="hhxh-flex">
								<div class="flex-0"><img src="../assets/location.png" style="height: 30px;"></div>
								<div class="flex-1 m-l-10" v-if="Object.keys(address).length != 0">
									<div>{{address.contractPerson}}&nbsp;&nbsp;&nbsp;{{address.contractTel}}</div>
									<div class="m-t-8 text-overflow2">{{address.proviceName}}&nbsp;{{address.cityName}}&nbsp;{{address.address}}</div>
								</div>
								<div class="flex-1 m-l-10" v-else="Object.keys(address).length != 0">
									<div>请选择地址</div>
								</div>
							</div>
						</div>
					</div> 
					<div class="mint-cell-value is-link"></div>
				</div>
				<i class="mint-cell-allow-right"></i>
			</a>
		</div>
		<div class="do-order-box m-t-12">
			<a class="mint-cell" v-for="(item, index) in orderMessage.list">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="hhxh-flex">
								<div class="flex-0 m-r-10"><img :src="makePhotoUrl(item.logoImage)" style="width: 80px;height: 80px;"></div>
								<div class="flex-1">
									<div class="text-overflow2">{{item.name}}</div>
									<div class="m-t-12 hhxh-flex">
										<div class="flex-1 gray">{{item.classify}}
										</div>
										<div class="flex-0 gray"><i class="title-small">Χ</i>&nbsp;&nbsp;<span class="title-0">{{item.qty}}</span></div>
									</div>
									<div class="m-t-8 title-small1 red">￥{{item.price.toFixed(2)}}</div>
								</div>
							</div>
						</div>
						
					</div>
				</a>
		</div>
		<div class="m-t-12">
			<a class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<div>积分支付</div>
					</div>
					<div class="mint-cell-value">
						<div class="mint-cell-value">
							<input :placeholder="'余额积分:' + orderMessage.integralTotal" type="number" class="mint-field-core text-right" v-model.number="payPoints" @input="linkMoney()">
						</div>
					</div>
				</div>
			</a>
		</div>
		<!-- <div style="margin: 12px 10px;" class="red">剩余积分：{{orderMessage.integralTotal}}</div> -->
		<div style="margin: 12px 10px;" class="hhxh-flex">
      <div class="flex-1">商品限用积分：{{orderMessage.integralMaxLimit}}</div>
      <div class="flex-0 red">100积分&nbsp;=&nbsp;1元</div>
    </div>

		<!--container end-->

		<!--footer-->
		<div class="djkj-footer-empty" style="height: 48px;"></div>
		<div class="mint-tabbar is-fixed">
			<div class="p-footer-box hhxh-flex" style="width: 100%;">
				<div class="flex-1 text-center">合计：<span class="red">￥<i class="title-5">{{amountTotal}}</i></span><span class="title-small">（免运费）</span></div>
				<div class="flex-1 text-center buy-box1" style="padding: 0 15px;" @click="checkPayOrder()">立即支付</div>
			</div>
		</div>
		<!--fonter end-->
  </div>
</template>
<script>
import helpers from 'utils/helpers'
import AddressService from 'services/AddressService'
import OrderService from 'services/OrderService'
import {MessageBox, Toast} from 'mint-ui'
export default {
  data: () => ({
    title: '',
    orderMessage: {},
    address: {},
    materialParamter: {},
    ids: [],
    payPoints: sessionStorage.payPoints || ''
  }),
  created () {
    if (Object.keys(this.$store.state.orderMessage).length !== 0) {
      this.orderMessage = this.$store.state.orderMessage
      this.amountTotal = Number(this.orderMessage.amount).toFixed(2)
      this.orderMessage.integralTotal = Number(this.orderMessage.integralTotal)
      this.orderMessage.integralMaxLimit = Number(this.orderMessage.integralMaxLimit)
    }
    if (Object.keys(this.$store.state.address).length !== 0) {
      this.address = this.$store.state.address
    }
    if (Object.keys(this.$store.state.materialParamter).length !== 0) {
      this.materialParamter = this.$store.state.materialParamter
    }
    if (this.$route.query.ids !== undefined) {
      this.ids = this.$route.query.ids
    }
  },
  mounted () {
    if (Object.keys(this.$store.state.orderMessage).length === 0) {
      this.orderMessage = sessionStorage.orderMessage
      this.payPoints = sessionStorage.payPoints
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'MineCart' || from.name === 'MaterialDetail') {
      next(vm => {
        vm.getDefaultAddress()
      })
    } else {
      next(vm => {
        if (Object.keys(this.$store.state.address).length === 0) {
          vm.getDefaultAddress()
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.state.address = this.address
    if (Object.keys(this.orderMessage).length !== 0) {
      this.$store.state.orderMessage = this.orderMessage
    }
    sessionStorage.orderMessage = this.orderMessage
    sessionStorage.payPoints = this.payPoints
    next()
  },
  methods: {
    getDefaultAddress () {
      AddressService.getDefaultAddress().then(res => {
        if (res.t !== null) {
          this.address = res.t
        }
      })
    },
    goMineAddress () {
      this.$router.push('MineAddress')
    },
    checkPayOrder () {
      if (this.payPoints === '') {
        this.payPoints = 0
      }
      if (Object.keys(this.address).length === 0) {
        Toast('请选择地址')
        return
      }
      MessageBox.confirm(`您输入的积分为${this.payPoints}</br>是否支付？`).then(action => {
        this.payOrder()
      })
    },
    payOrder () {
      if (this.ids.length !== 0) {
        let buyCarList = this.ids
        let addressId = this.address.id
        let integralPay = this.payPoints
        if (integralPay === '' || integralPay === null) {
          integralPay = 0
        }
        OrderService.cartSaveOrder(integralPay, addressId, buyCarList).then(res => {
          let id = res.t
          this.$router.replace({
            name: 'OrderPay',
            query: {
              id: id
            }
          })
        })
      } else {
        let addressId = this.address.id
        let integralPay = this.payPoints
        if (integralPay === '' || integralPay === null) {
          integralPay = 0
        }
        let materialId = this.materialParamter.materialId
        let qty = this.materialParamter.qty
        let attrs = this.materialParamter.attrs.join(',')
        let listPartsParam = this.materialParamter.listPartsParam
        OrderService.saveOrderHxg(integralPay, addressId, materialId, qty, attrs, listPartsParam).then(res => {
          let id = res.t
          this.$router.replace({
            name: 'OrderPay',
            query: {
              id: id
            }
          })
        })
      }
    },
    linkMoney () {
      this.payPoints = Number(this.payPoints)
      if (this.orderMessage.integralTotal >= this.orderMessage.integralMaxLimit) {
        if (this.payPoints > this.orderMessage.integralMaxLimit) {
          this.payPoints = this.orderMessage.integralMaxLimit
        }
      } else {
        if (this.payPoints > this.orderMessage.integralTotal) {
          this.payPoints = this.orderMessage.integralTotal
        }
      }
      if (typeof this.payPoints !== 'number') {
        this.payPoints = 0
      }
      this.amountTotal = (this.orderMessage.amount - this.payPoints / 100).toFixed(2)
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    }
  }
}
</script>
