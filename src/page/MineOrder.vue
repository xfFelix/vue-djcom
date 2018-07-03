<template>
  <div>
  <!--container-->
		<div class="m-order-header-box hhxh-flex" style="top:0px;">
			<div class="flex-1 text-center">
				<div class="item-box" :class="{active: point == 1}" @click="allOrderList()">全部</div>
			</div>
			<div class="flex-1 text-center">
				<div class="item-box" :class="{active: point == 2}" @click="payOrderList()">待付款</div>
			</div>
			<div class="flex-1 text-center">
				<div class="item-box" :class="{active: point == 3}" @click="sendOrderList()">待发货</div>
			</div>
			<div class="flex-1 text-center">
				<div class="item-box" :class="{active: point == 4}" @click="takeOrderList()">待收货</div>
			</div>
			<div class="flex-1 text-center">
				<div class="item-box" :class="{active: point == 5}" @click="evalOrderList()">待评价</div>
			</div>
		</div>
		<div class="header-empty"></div>
		<div class="m-order-list-box" v-if="orderlist.length != 0">
      <mt-loadmore :bottom-method="loadMoreGoodslist" :bottom-all-loaded="GoodsingallLoaded" ref="loadmore" :auto-fill="false">

			<div class="m-t-12" v-for="(items, indexs) in orderlist">
				<a class="mint-cell">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="hhxh-flex">
								<div class="flex-0 m-r-10 gray">{{items.bizDate}}</div>
								<div class="flex-1 text-right">
									<span class="red" v-if="items.billStatus == -1">已取消</span>
									<span class="red" v-if="items.billStatus == 0">未付款</span>
									<span class="blue" v-else-if="items.billStatus == 1">待发货</span>
									<span class="blue" v-else-if="items.billStatus == 3">待收货</span>
									<span class="yellow" v-else-if="items.billStatus == 4 && items.postFlag == 'NO'">待评价</span>
                  <span class="yellow" v-else-if="items.billStatus == 4 && items.postFlag == 'YES'">已评价</span>
									<span class="blue" v-else-if="items.billStatus == 11">待退款</span>
									<span class="red" v-else-if="items.billStatus == 12">退款成功</span>
									<span class="red" v-else-if="items.billStatus == 13">退款拒绝</span>
								</div>
							</div>
						</div>
					</div>
				</a>
				<a class="mint-cell" v-for="(item, index) in items.list" @click="goMineOrderDetail(items.salesOrderId)">
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
									<div class="hhxh-flex m-t-8">
									  <div class="flex-1 title-small1 red">￥
										<span class="title-4">
										{{item.price.toFixed(2)}}
										</span>
									  </div>
									  <div class="flex-0" v-if="items.billStatus == 4 && item.postFlag == 'NO'">
											<button class="mint-button mint-button--default mint-button--small is-plain" @click.stop="goAddComment(items.salesOrderId, item.id, item.materialId, item.name, item.logoimage)">
												<label class="mint-button-text">评价</label>
											</button>
									  </div>
								    </div>
								</div>
							</div>
						</div>
						
					</div>
				</a>
				<a class="mint-cell">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="hhxh-flex">
								<div class="flex-1 red">
									总计：<span class="title-small"><i class="title-4">{{items.amount}}</i></span>
								</div>

								<div class="flex-0" v-if="items.billStatus == 0">
									<button class="mint-button mint-button--default mint-button--small" @click="cancelOrder(items.salesOrderId, indexs)">
										<label class="mint-button-text">取消</label>
									</button>
									<button class="mint-button mint-button--danger mint-button--small m-l-10" @click="getPayDetail(items.salesOrderId, indexs)">
										<label class="mint-button-text">支付</label>
									</button>
								</div>
								<div class="flex-0" v-else-if="items.billStatus == -1">
									<button class="mint-button mint-button--default mint-button--small" @click="deleteOrder(items.salesOrderId, indexs)">
										<label class="mint-button-text">删除</label>
									</button>
								</div>
								<div class="flex-0" v-else-if="items.billStatus == 1">
									<button class="mint-button mint-button--danger mint-button--small m-l-10" @click="goRefundApply(items.salesOrderId, indexs)">
										<label class="mint-button-text">退款申请</label>
									</button>
								</div>
                <div class="flex-0" v-else-if="items.billStatus == 3">
                  <button class="mint-button mint-button--danger mint-button--small m-l-10" @click="confirmOrder(items.salesOrderId, indexs)">
                    <label class="mint-button-text">确认收货</label>
                  </button>
                </div>
                <div class="flex-0" v-else-if="items.billStatus == 11 || items.billStatus == 12 || items.billStatus == 13">
                  <button class="mint-button mint-button--danger mint-button--small m-l-10" @click="goRefundDetail(items.salesOrderId, indexs)">
                    <label class="mint-button-text">退款详情</label>
                  </button>
                </div>

							</div>
							
						</div>
						
					</div>
				</a>
			</div>

         </mt-loadmore>
		</div>
    <no-data v-else-if="orderlist.length == 0"></no-data>
		<!--container end-->
  </div>
</template>
<script>
import OrderService from 'services/OrderService'
import helpers from 'utils/helpers'
import {Toast, MessageBox} from 'mint-ui'
import NoData from '../components/NoData'
export default {
  components: {
    NoData
  },
  data: () => ({
    title: '',
    pageNo: 1,
    pageSize: 6,
    billStatus: null,
    orderlist: [],
    point: 1,
    GoodsingallLoaded: false,
    postFlag: ''
  }),
  created () {
    if (this.$route.query.billStatus !== undefined) {
      this.billStatus = this.$route.query.billStatus
    }
    if (this.$route.query.point !== undefined) {
      this.point = this.$route.query.point
    }
    if (this.$route.query.postFlag !== undefined) {
      this.postFlag = this.$route.query.postFlag
    }
  },
  mounted () {
    this.loadOrderList()
  },
  methods: {
    loadOrderList () {
      OrderService.loadOrderList(this.pageNo, this.pageSize, this.billStatus, this.postFlag).then(res => {
        let list = res.t
        if (list === null) {
          this.GoodsingallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.orderlist.push(list[i])
          }
          if (list.length === this.pageSize) { // 长度达到每页的最大长度，说明后面可能还有数据
            this.pageNo += 1
          } else { // 没有更多的数据了
            this.GoodsingallLoaded = true
          }
        }
      })
    },
    loadMoreGoodslist: function () {
      // 加载更多数据
      this.loadOrderList()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    getPayDetail (id) {
      this.$router.push({
        name: 'OrderPay',
        query: {
          id: id
        }
      })
    },
    cancelOrder (id, indexs) {
      MessageBox.confirm('确定取消订单?').then(action => {
        OrderService.cancelOrder(id).then(res => {
          Toast('订单取消成功!')
          this.orderlist[indexs].billStatus = -1
        })
      })
    },
    deleteOrder (id, indexs) {
      MessageBox.confirm('是否删除订单?').then(action => {
        OrderService.deleteOrder(id).then(res => {
          Toast('订单删除成功!')
          this.orderlist.splice(indexs, 1)
        })
      })
    },
    confirmOrder (id, indexs) {
      OrderService.ConfirmOrder(id).then(res => {
        Toast('收货成功')
        this.orderlist[indexs].billStatus = 4
      })
    },
    allOrderList () {
      this.billStatus = null
      this.point = 1
      this.postFlag = ''
      this.initPage()
      this.loadOrderList()
    },
    payOrderList () {
      this.billStatus = 0
      this.point = 2
      this.postFlag = ''
      this.initPage()
      this.loadOrderList()
    },
    sendOrderList () {
      this.billStatus = 1
      this.point = 3
      this.postFlag = ''
      this.initPage()
      this.loadOrderList()
    },
    takeOrderList () {
      this.billStatus = 3
      this.postFlag = ''
      this.point = 4
      this.initPage()
      this.loadOrderList()
    },
    evalOrderList () {
      this.billStatus = 4
      this.postFlag = 'NO'
      this.point = 5
      this.initPage()
      this.loadOrderList()
    },
    initPage () {
      this.pageNo = 1
      this.pageSize = 6
      this.orderlist = []
    },
    goMineOrderDetail (id) {
      this.$router.push({
        name: 'MineOrderDetail',
        query: {
          id: id
        }
      })
    },
    goRefundApply (id, indexs) {
      this.$router.push({
        name: 'RefundApply',
        query: {
          id: id
        }
      })
    },
    goRefundDetail (id, indexs) {
      this.$router.push({
        name: 'RefundDetail',
        query: {
          id: id
        }
      })
    },
    goAddComment (orderId, orderDetailId, materialId, materialName, logoimage) {
      this.$router.push({
        name: 'AddComment',
        query: {
          orderId: orderId,
          orderDetailId: orderDetailId,
          materialId: materialId,
          materialName: materialName,
          logoimage: logoimage
        }
      })
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    }
  }
}
</script>
