<template>
  <div>
   <!--container-->
   <mt-loadmore :bottom-method="loadMoreGoodslist" :bottom-all-loaded="GoodsingallLoaded" ref="loadmore" :auto-fill="false">
		<div class="djkj-swipe-box" id="djkj-swipe-box" >
			<mt-swipe :auto="4000">
				<mt-swipe-item v-for="item in swipeItems">
          <router-link v-show="item.type == 2" :to="{name:'SwipeInfo', query: {content:item.content}}">
            <img :src="makePhotoUrl(item.picture)"  class="page-lazyload-image">
          </router-link>
				  <a :href="item.url" v-show="item.type == 1">
				  	<img :src="makePhotoUrl(item.picture)">
				  </a>
          <img v-show="item.type == 0" :src="makePhotoUrl(item.picture)">
				</mt-swipe-item>
			</mt-swipe>   
		</div>

		<div class="home-nav-box hhxh-flex">
			<div class="item-box flex-1 text-center" v-for="item in firstEntry">
			    <div @click="goTotalMaterial(item.id, item.name)">
				<img :src="makePhotoUrl(item.logoImage)">
				<div class="m-t-5 title-small">{{item.name}}</div>
				</div>
			</div>
		</div>

		<div class="hhxh-flex home-header m-t-12">
			<div class="flex-1 title-0">全部商品</div>
			<div class="flex-0">
				<div class="hhxh-flex" @click="$router.push('/TotalMaterial')">
					<div class="gray">分类查看&nbsp;</div>
					<img src="../assets/arrow-right-gray.png" style="height: 16px;">
				</div>
			</div>
		</div>
        
		<div class="home-product-box clearbox">
          
			<div class="item-box hhxh-left" v-for="(item, index) in hotMaterial">
				<div :class="isHot(item.ishot)" @click="goMaterialDetail(item.id)">
					<div class="text-center">
						<img :src="makePhotoUrl(item.logoImage)">
					</div>
					<div class="name text-overflow2">{{item.name}}</div>
					<div class="m-t-5 hhxh-flex price">
						<div class="flex-1">￥<span class="title-5">{{item.price.toFixed(2)}}</span></div>
						<div>
							<span class="collection-box" :class="{active: item.buyLike}" @click.stop="saveBuyLike(item.buyLike, item.id, index)"></span>
						</div>
					</div>
				</div>
			</div>
          
		</div>
        </mt-loadmore>
		<end-header></end-header>
  </div>
</template>
<script>
import comHeader from '../components/ComHeader'
import endHeader from '../components/EndHeader'
import IndexService from 'services/IndexService'
import helpers from '../utils/helpers'
import CollectService from 'services/CollectService'
import { Toast } from 'mint-ui'
// import ENV from '../services/xhr/config'
export default {
  components: {
    comHeader,
    endHeader
  },
  data: () => ({
    title: '首页',
    swipeItems: [],
    firstEntry: [],
    hotMaterial: [],
    pageNo: 1,
    pageSize: 6,
    GoodsingallLoaded: false
  }),
  created () {
    this.$store.state.footer.point = '1'
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'TotalMaterial') {
      from.meta.keepAlive = false
      sessionStorage.removeItem('scrollTop')
    }
    next()
  },
  mounted () {
    this.loadSwipeItems()
    this.loadFirstEntry()
    this.loadHotMaterial()
  },
  methods: {
    loadSwipeItems: function () {
      IndexService.loadSwipeItems().then(res => {
        this.swipeItems = res.t
      })
    },
    loadFirstEntry: function () {
      let model = 'homepage'
      IndexService.loadFirstEntry(model).then(res => {
        this.firstEntry = res.t
      })
    },
    loadHotMaterial: function () {
      let isIndex = 1
      IndexService.loadHotMaterial(this.pageNo, this.pageSize, isIndex).then(res => {
        let list = res.t.hotMaterial
        if (list === null) {
          this.GoodsingallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.hotMaterial.push(list[i])
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
      this.loadHotMaterial()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    goMaterialDetail: function (id) {
      this.$router.push({
        name: 'MaterialDetail',
        query: {
          id: id
        }
      })
    },
    goTotalMaterial: function (id, name) {
      this.$router.push({
        name: 'TotalMaterial',
        query: {
          id: id,
          name: name
        }
      })
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
    saveBuyLike (buyLike, id, index) {
      if (buyLike === false) {
        CollectService.saveBuyLike(id).then(res => {
          if (res.code === 200) {
            Toast(res.msg)
            this.hotMaterial[index].buyLike = true
          }
        })
      } else {
        CollectService.deleteBuyLikeOne(id).then(res => {
          Toast(res.msg)
          this.hotMaterial[index].buyLike = false
        })
      }
    }
  }
}
</script>
