<template>
 <div>
      <!-- <com-header :title="title"></com-header> -->
        <!--container-->
    <div class="top-menu-box classfy" v-if="isClassify==true" style="top:40px;z-index: 2001">
      <a class="mint-cell" :class="{active: entryName == '全部'}" @click="findAllList()">
        <span class="mint-cell-mask"></span>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">全部</span>
          </div>
          <div class="mint-cell-value">
            
          </div>
        </div>
      </a>
			<a class="mint-cell" :class="{active: entryName == item.name}" v-for="item in firstEntry" @click="findListById(item.id, item.name)">
				<span class="mint-cell-mask"></span>
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="mint-cell-text">{{item.name}}</span>
					</div>
					<div class="mint-cell-value">
						
					</div>
				</div>
			</a>
		</div>
    <div v-if="isClassify==true || isSort== true" class="v-modal" style="z-index: 2000;display: block;top: 80px;" @click="reservePage()"></div>
		<div class="top-menu-box filter" v-if="isSort==true" style="top:40px;z-index: 2001">
		    <a class="mint-cell" :class="IsOrder2()" @click="findSortByPrice()">
				<span class="mint-cell-mask"></span>
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="mint-cell-text">价格</span>
					</div>
					<div class="mint-cell-value">
						
					</div>
				</div>
			</a>
			<a class="mint-cell" :class="IsOrder()" @click="findSortBySale()">
				<span class="mint-cell-mask"></span>
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="mint-cell-text">销量</span>
					</div>
					<div class="mint-cell-value">
						
					</div>
				</div>
			</a>
			
		</div>
		<div class="list-product-box" style="top:0px;">
			<div class="hhxh-flex">
				<div class="item-box flex-1 gray text-center" @click="QSClassify()">{{entryName}}&nbsp;<span class="triangle-down"></span></div>
				<div class="item-box flex-1 gray text-center" @click="QSSort()">智能排序&nbsp;<span class="triangle-down"></span></div>
			</div>
		</div>
		<div class="list-product-empty"></div>
    <mt-loadmore :bottom-method="loadMoreGoodslist" :bottom-all-loaded="GoodsingallLoaded" ref="loadmore" :auto-fill="false" v-if="materialList.length != 0">
		<div class="home-product-box clearbox">
			<div class="item-box hhxh-left" v-for="(item,index) in materialList">
				<div :class="isHot(item.ishot)" @click="goMaterialDetail(item.materialId, index)">
					<div class="text-center">
						<img :src="makePhotoUrl(item.logoimage)">
					</div>
					<div class="name text-overflow2">{{item.name}}</div>
					<div class="m-t-5 hhxh-flex price">
						<div class="flex-1">￥<span class="title-5">{{item.price.toFixed(2)}}</span></div>
						<div>
							<span class="collection-box" :class="{active: item.buyLike}" @click.stop="saveBuyLike(item.buyLike, item.materialId, index)"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
    </mt-loadmore>
    <no-data v-else-if="materialList.length == 0"></no-data>
		<!--container end-->

		<!--footer-->
		
		<!--fonter end-->
 </div>
</template>
<script>
import comHeader from '../components/ComHeader'
import MaterialService from '../services/MaterialService'
import IndexService from 'services/IndexService'
import CollectService from 'services/CollectService'
import helpers from '../utils/helpers'
import {Toast} from 'mint-ui'
import NoData from '../components/NoData'
export default {
  components: {
    comHeader,
    NoData
  },
  data: () => ({
    title: '产品列表页',
    id: '',
    sort: 1,
    entryName: '全部分类',
    isClassify: false,
    isSort: false,
    materialList: [],
    firstEntry: [],
    pageNo: 1,
    pageSize: 8,
    GoodsingallLoaded: false
  }),
  beforeRouteEnter (to, from, next) {
    if (from.name === 'Index') {
      next(vm => {
        vm.$route.meta.keepAlive = true
      })
    } else {
      next()
    }
  },
  created () {
    this.id = this.$route.query.id
    this.entryName = this.$route.query.name
    if (this.entryName === undefined) {
      this.entryName = '全部分类'
    }
  },
  activated () {
    let index = this.$store.state.totalMaterial.index
    if (this.$store.state.totalMaterial.buyLike !== undefined) {
      this.materialList[index].buyLike = this.$store.state.totalMaterial.buyLike
    }
    document.documentElement.scrollTop = sessionStorage.scrollTop
  },
  mounted () {
    this.loadMaterialList()
    this.loadFirstEntry()
  },
  methods: {
    loadMaterialList: function () {
      MaterialService.loadMaterialList(this.id, this.sort, this.pageNo, this.pageSize).then(res => {
        let list = res.t
        if (list === null) {
          this.GoodsingallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.materialList.push(list[i])
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
      this.loadMaterialList()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    loadFirstEntry: function () {
      let model = 'all'
      IndexService.loadFirstEntry(model).then(res => {
        this.firstEntry = res.t
      })
    },
    findListById (id, name) {
      this.materialList = []
      this.pageNo = 1
      this.entryName = name
      this.id = id
      this.isClassify = false
      this.loadMaterialList()
    },
    findAllList () {
      this.materialList = []
      this.pageNo = 1
      this.entryName = '全部'
      this.isClassify = false
      this.id = ''
      this.loadMaterialList()
    },
    findSortBySale () {
      if (this.sort === 1 || this.sort === 2) {
        this.sort = 3
      }
      this.materialList = []
      this.pageNo = 1
      this.findListBySort()
    },
    findSortByPrice () {
      if (this.sort === 3 || this.sort === 4) {
        this.sort = 1
      }
      this.materialList = []
      this.pageNo = 1
      this.findListBySort()
    },
    findListBySort () {
      if (this.sort === 1 || this.sort === 2) {
        if (this.sort === 1) {
          this.sort = 2
          this.isSort = false
          this.loadMaterialList()
        } else {
          this.sort = 1
          this.isSort = false
          this.loadMaterialList()
        }
      } else if (this.sort === 3 || this.sort === 4) {
        if (this.sort === 3) {
          this.sort = 4
          this.isSort = false
          this.loadMaterialList()
        } else {
          this.sort = 3
          this.isSort = false
          this.loadMaterialList()
        }
      }
    },
    saveBuyLike (buyLike, id, index) {
      if (buyLike === false) {
        CollectService.saveBuyLike(id).then(res => {
          if (res.code === 200) {
            Toast(res.msg)
            this.materialList[index].buyLike = true
          }
        })
      } else {
        CollectService.deleteBuyLikeOne(id).then(res => {
          Toast(res.msg)
          this.materialList[index].buyLike = false
        })
      }
    },
    QSClassify: function () {
      this.isClassify = !this.isClassify
      this.isSort = false
    },
    QSSort: function () {
      this.isSort = !this.isSort
      this.isClassify = false
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    isHot: function (res) {
      if (res === 2) {
        return 'hot'
      } else if (res === 3) {
        return 'tehui'
      } else {
        return ''
      }
    },
    IsOrder () {
      if (this.sort === 3) {
        return 'order-up'
      } else if (this.sort === 4) {
        return 'order-down'
      }
    },
    IsOrder2 () {
      if (this.sort === 1) {
        return 'order-up'
      } else if (this.sort === 2) {
        return 'order-down'
      }
    },
    goMaterialDetail: function (id, index) {
      this.$store.state.totalMaterial.index = index
      this.$store.state.totalMaterial.buyLike = this.materialList[index].buyLike
      let scrollTop = document.documentElement.scrollTop
      sessionStorage.scrollTop = scrollTop
      this.$router.push({
        name: 'MaterialDetail',
        query: {
          id: id
        }
      })
    },
    reservePage () {
      this.isSort = false
      this.isClassify = false
    }
  }
}
</script>
