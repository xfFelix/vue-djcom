<template>
  <div>
  <!--container-->
		<div class="m-t-12" v-if="collectList.length != 0">
      <mt-loadmore :bottom-method="loadMoreGoodslist" :bottom-all-loaded="GoodsingallLoaded" ref="loadmore" :auto-fill="false">

    			<a class="mint-cell" v-for="(item, index) in collectList">
    				<div class="mint-cell-wrapper">
    					<div class="mint-cell-title">
    						<div class="hhxh-flex" @click="goMaterialDetail(item.materialId)">
    							<div class="flex-0 m-r-10"><img :src="makePhotoUrl(item.image)" style="width: 80px;height: 80px;"></div>
    							<div class="flex-1">
    								<div class="text-overflow2">{{item.name}}</div>
    								<div class="m-t-12 hhxh-flex">
    									<div class="title-small1 red flex-1">￥<span class="title-4">{{item.price}}</span></div>
    									<div>
    									<img src="../assets/del-icon.png" style="height: 20px;" @click.stop="deleteBuyLikeOne(item.materialId, index)">
    									</div>
    								</div>
    								
    							</div>
    						</div>
    					</div>
    					
    				</div>
    			</a>
			</mt-loadmore>
		</div>
		<no-data v-else="collectList.length == 0"></no-data>
		<!--container end-->

  </div>
</template>
<script>
import noData from 'components/NoData'
import CollectService from 'services/CollectService'
import helpers from 'utils/helpers'
import {Toast} from 'mint-ui'
export default {
  components: {
    noData
  },
  data: () => ({
    title: '',
    collectList: [],
    GoodsingallLoaded: false,
    pageNo: 1,
    pageSize: 6
  }),
  created () {

  },
  mounted () {
    this.loadCollectList()
  },
  methods: {
    loadCollectList () {
      CollectService.loadCollectList(this.pageNo, this.pageSize).then(res => {
        let list = res.t
        if (list === null) {
          this.GoodsingallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.collectList.push(list[i])
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
      this.loadCollectList()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    deleteBuyLikeOne (id, index) {
      CollectService.deleteBuyLikeOne(id).then(res => {
        Toast('商品已从收藏列表中删除')
        this.collectList.splice(index, 1)
      })
    },
    goMaterialDetail (id) {
      this.$router.push({
        name: 'MaterialDetail',
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
