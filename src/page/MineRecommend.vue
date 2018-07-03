<template>
  <div>
  <!--container-->
		<div class="m-t-12" v-if="inviterList.length != 0">
      <mt-loadmore :bottom-method="loadMoreGoodslist" :bottom-all-loaded="GoodsingallLoaded" ref="loadmore" :auto-fill="false">

  			<a class="mint-cell" v-for="(item, index) in inviterList">
  				<div class="mint-cell-wrapper">
  					<div class="mint-cell-title">
  						<div>{{item.userName}}</div>
  					</div>
  					<div class="mint-cell-value">
  						<div class="black">{{item.createDate}}</div>
  					</div>
  				</div>
  			</a>

			</mt-loadmore>
		</div>
    <no-data v-else-if="inviterList.length == 0"></no-data>
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
    inviterList: [],
    GoodsingallLoaded: false
  }),
  created () {

  },
  mounted () {
    this.findInvitee()
  },
  methods: {
    findInvitee () {
      MemberService.findInvitee(this.pageNo, this.pageSize).then(res => {
        let list = res.t
        if (list === null) {
          this.GoodsingallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.inviterList.push(list[i])
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
      this.findInvitee()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>
