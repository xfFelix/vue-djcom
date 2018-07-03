<template>
  <div>
        <!--container-->
		<div class="m-order-list-box" v-if="orderlist.length != 0">
			<div class="m-t-12" v-for="(items, indexs) in orderlist">
				<a class="mint-cell">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="hhxh-flex">
								<div class="flex-0 m-r-10 gray">{{items.bizDate}}</div>

							</div>
						</div>
					</div>
				</a>
				<a class="mint-cell" v-for="(item, index) in items.list">
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
										<div class="flex-1 title-small1 red">
											￥<span class="title-4">{{item.price.toFixed(2)}}</span>
										</div>
										<!-- <div class="flex-0">
											<button class="mint-button mint-button--default mint-button--small is-plain">
												<label class="mint-button-text">评价</label>
											</button>
										</div> -->
										
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
								<div class="flex-0">
									<button class="mint-button mint-button--default mint-button--small" v-if="items.returnStatus == 0 && items.isHidden == false" @click="goRefundApply(items.salesOrderId, indexs)">
										<label class="mint-button-text">申请退款</label>
									</button>
									<button class="mint-button mint-button--default mint-button--small" v-if="items.returnStatus != 0" @click="goRefundDetail(items.salesOrderId, indexs)">
										<label class="mint-button-text">退款详情</label>
									</button>
									<button class="mint-button mint-button--danger mint-button--small m-l-10" v-if="items.afterStatus == 0" @click="goOtherService(items.salesOrderId, indexs)">
										<label class="mint-button-text">售后咨询</label>
									</button>
									<button class="mint-button mint-button--danger mint-button--small m-l-10" v-if="items.afterStatus != 0" @click="goOtherDetail(items.salesOrderId, indexs)">
										<label class="mint-button-text">咨询详情</label>
									</button>
								</div>
								
							</div>
							
						</div>
						
					</div>
				</a>
			</div>
		</div>
		<no-data v-else="orderlist.length == 0"></no-data>
		<!--container end-->

		
  </div>
</template>
<script>
import noData from 'components/NoData'
import OrderService from 'services/OrderService'
import helpers from 'utils/helpers'
export default {
  components: {
    noData
  },
  data: () => ({
    title: '',
    pageNo: 1,
    pageSize: 6,
    orderlist: []
  }),
  created () {

  },
  mounted () {
    this.searchSalesAfter()
  },
  methods: {
    searchSalesAfter () {
      OrderService.searchSalesAfter(this.pageNo, this.pageSize).then(res => {
        this.orderlist = res.t
      })
    },
    goOtherService (id, indexs) {
      this.$router.push({
        name: 'OtherService',
        query: {
          id: id
        }
      })
    },
    goOtherDetail (id, indexs) {
      this.$router.push({
        name: 'OtherDetail',
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
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    }
  }
}
</script>
