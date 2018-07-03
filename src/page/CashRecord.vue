<template>
  <div>
  <!--container-->
		<div v-if="recordList.length != 0">
      	  <mt-loadmore :bottom-method="loadMoreGoodslist" :bottom-all-loaded="GoodsingallLoaded" ref="loadmore" :auto-fill="false">
      <div class="m-t-12" v-for="(item, index) in recordList">
        <a class="mint-cell">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <div class="w-100">
                <div class="gray">{{item.bizDate}}</div>
                <div class="m-t-10 hhxh-flex">
                  <div class="flex-1 w-33 text-center">
                    <div>{{item.amount}}</div>
                    <div class="gray m-t-5">提现金额</div>
                  </div>
                  <div class="flex-1 w-33 text-center">
                    <div>{{item.actPayAmount}}</div>
                    <div class="gray m-t-5">实得金额</div>
                  </div>
                  <div class="flex-1 w-33 text-center">
                    <div class="red" v-if="item.status == 0">未到账</div>
                    <div class="red" v-if="item.status == 1">已到账</div>
                    <div class="red" v-if="item.status == 2">已取消</div>
                    <div class="gray m-t-5">到账状态</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
		  </mt-loadmore>
		</div>
    <no-data v-else-if="recordList.length == 0"></no-data>
		<!--container end-->

  </div>
</template>
<script>
import WithdrawDepositService from 'services/WithdrawDepositService'
import NoData from '../components/NoData'
export default {
  components: {
    NoData
  },
  data: () => ({
    title: '',
    pageNo: 1,
    pageSize: 12,
    recordList: [],
    GoodsingallLoaded: false
  }),
  created () {

  },
  mounted () {
    this.loadWithdrawDepositRecord()
  },
  methods: {
    loadWithdrawDepositRecord () {
      WithdrawDepositService.loadWithdrawDepositRecord(this.pageNo, this.pageSize).then(res => {
        let list = res.t.list
        for (let i = 0; i <= list.length - 1; i++) {
          this.recordList.push(list[i])
        }
        if (this.pageNo === res.t.pageCount) {
          this.GoodsingallLoaded = true
        } else {
          this.pageNo ++
        }
      })
    },
    loadMoreGoodslist: function () {
      // 加载更多数据
      this.loadWithdrawDepositRecord()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>
