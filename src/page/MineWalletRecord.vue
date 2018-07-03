<template>
  <div>
        <!--container-->
		<div class="m-t-12" v-if="recordlist.length != 0">
      <mt-loadmore :bottom-method="loadMoreGoodslist" :bottom-all-loaded="GoodsingallLoaded" ref="loadmore" :auto-fill="false">

  			<a class="mint-cell" v-for="(item, index) in recordlist">
  				<div class="mint-cell-wrapper">
  					<div class="mint-cell-title">
  						<div>
  							<div>{{item.amountTypeName}}</div>
  							<div class="m-t-5 gray">{{item.createDate}}</div>
  						</div>
  					</div>
  					<div class="mint-cell-value">
  						<div>
  							<div class="black" v-if="item.amount >= 0">+{{item.amountScale}}</div>
  							<div class="black" v-else="item.amount < 0">{{item.amountScale}}</div>
  						</div>
  					</div>
  				</div>
  			</a>
			</mt-loadmore>
		</div>
    <no-data v-else-if="recordlist.length == 0"></no-data>
		<!--container end-->
  </div>
</template>
<script>
import MemberService from 'services/MemberService'
import NoData from '../components/NoData'
export default {
  components: {
    NoData
  },
  data: () => ({
    title: '',
    pageNo: 1,
    pageSize: 12,
    recordlist: [],
    GoodsingallLoaded: false
  }),
  created () {

  },
  mounted () {
    this.findTransRecord()
  },
  methods: {
    findTransRecord () {
      MemberService.findTransRecord(this.pageNo, this.pageSize).then(res => {
        let list = res.t
        if (list === null) {
          this.GoodsingallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.recordlist.push(list[i])
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
      this.findTransRecord()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>
