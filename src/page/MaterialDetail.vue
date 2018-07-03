<template>
  <div>
  <!-- <com-header :title="title"></com-header> -->
        <!--container-->
        <div @click="popwin = false">
		<div class="cart-pic-box" @click="goCart()" style="top: 10px;">
			<img src="../assets/cart-pic.png">
		</div>
		<div class="djkj-swipe-box" id="djkj-swipe-box" >
      <!-- 轮播图 -->
			<mt-swipe :auto="4000">
        <!-- 需要轮播的图片 -->
				<mt-swipe-item v-for="item in pics">
				  	<img :src="makePhotoUrl(item)">
				</mt-swipe-item>
        <!-- 需要轮播的图片结束 -->
			</mt-swipe>
      <!-- 轮播图结束 -->
		</div>
		<div class="p-title-box">
			<div class="hhxh-flex">
				<div class="flex-1 text-overflow2">{{name}}</div>
				<div class="flex-0" style="margin-left: 10px;" @click="goShare()">
					<button class="mint-button mint-button--danger mint-button--small">
						<label class="mint-button-text">我要分享</label>
					</button>
				</div>
			</div>
			<div class="m-t-8">
				<span class="red">￥<i class="title-5">{{prices.toFixed(2)}}</i></span>&nbsp;&nbsp;
				<span class="gray original-price" v-if="settlePrice != 0">市场价：￥<i class="title-2">{{settlePrice.toFixed(2)}}</i></span>
			</div>
		</div>
		<!-- <div class="m-t-10">
      <a  class="mint-cell" style="background-size: 0;">
        <span class="mint-cell-mask"></span>
        <div class="mint-cell-wrapper" style="background-size: 0;">
          <div class="mint-cell-title">
            <div>{{parameter}}</div>
          </div> 
          <div class="mint-cell-value is-link"></div>
        </div>
        <i class="mint-cell-allow-right"></i>
      </a>
    </div> -->
		<div class="m-t-10">
			<a  class="mint-cell" style="background-size: 0;" v-if="Object.keys(this.inviter).length == 0">
				<div class="mint-cell-wrapper" style="background-size: 0;">
					<div class="mint-cell-title">
						<div style="width: 100%;">
							<div class="hhxh-flex">
								<div class="flex-0">
									<img src="../assets/banner.png" style="height: 60px;width: 60px;border-radius: 100%;">
								</div>
								<div class="flex-1" style="margin-left: 10px;">
									<div class="title-3">电精科技</div>
									<div class="m-t-8 gray">全部商品17</div>
								</div>
							</div>
						</div>
					</div> 
					<div class="mint-cell-value">
						<button class="mint-button mint-button--default mint-button--small" @click="goIndex()">
							<label class="mint-button-text">进店逛逛</label>
						</button>
					</div>
				</div>
			</a>
      <a  class="mint-cell" style="background-size: 0;" v-else-if="Object.keys(this.inviter).length != 0">
        <div class="mint-cell-wrapper" style="background-size: 0;">
          <div class="mint-cell-title">
            <div style="width: 100%;">
              <div class="hhxh-flex">
                <div class="flex-0">
                  <img :src="makePhotoUrl(inviter.headimage)" style="height: 60px;width: 60px;border-radius: 100%;">
                </div>
                <div class="flex-1" style="margin-left: 10px;">
                  <div class="title-3">{{inviter.realName}}</div>
                  <div class="m-t-8 gray">全部商品({{inviter.materialCount}})</div>
                </div>
              </div>
            </div>
          </div> 
          <div class="mint-cell-value">
            <button class="mint-button mint-button--default mint-button--small" @click="goIndex()">
              <label class="mint-button-text">进店逛逛</label>
            </button>
          </div>
        </div>
      </a>
		</div>
		<div class="p-detail-box m-t-10">
			<div class="p-nav-box hhxh-flex" id="p-nav-box">
				<div class="flex-1 text-center" :class="{active : point == '1'}" @click="selectPic()">图文详情</div>
				<div class="flex-1 text-center" :class="{active : point == '2'}" @click="selectProdu()">产品参数</div>
				<div class="flex-1 text-center" :class="{active : point == '3'}" @click="selectEval()">用户评价</div>
				<div class="flex-1 text-center" :class="{active : point == '4'}" @click="selectShop()">店铺推荐</div>
			</div>
			<div class="p-contcainer-box"  v-html="html_decode(contents)" v-show="point == '1'">
      </div>
			<div class="p-contcainer-box" v-show="point == '2'" v-html="html_decode(productStandard)">
				
			</div>
			<eval-list v-show="point == '3'"></eval-list>
			<shop-recommend v-show="point == '4'" @getNewId="getNewId"></shop-recommend>
		</div>


		

		<!--container end-->

		<!--footer-->
		<div class="djkj-footer-empty" style="height: 48px;"></div>
		<div class="mint-tabbar is-fixed" style="z-index: 700">
			<div class="p-footer-box hhxh-flex" style="width: 100%;">
				<div class="flex-1 gray text-center">
					<span @click="saveBuyLike()" class="collection-box" :class="{active: IsActive == true}" style="margin: 0 auto;"></span>
					<div class="gray">收藏</div>
				</div>
				<div class="flex-1 text-center red cart-box1" @click.stop="popWindow()">加入购物车</div>
				<div class="flex-1 text-center buy-box1" @click.stop="popTrue()">立即购买</div>
			</div>
		</div>
		</div>
		<!--fonter end-->

		<!--购买弹窗开始-->
		<div v-if="popwin == true">
		<div class="mint-actionsheet product-detail-msg" style="z-index: 801;display: block;">
			<ul class="mint-actionsheet-list">
				<li class="mint-actionsheet-listitem text-left">
					<div class="hhxh-flex">
						<div class="flex-0 img-box"><img :src="makePhotoUrl(logoImage)"></div>
						<div class="flex-1 m-l-10">
							<div class="red"><span>￥<i class="title-4">{{prices.toFixed(2)}}</i></span></div>
							<div class="m-t-5 gray">库存：<span class="gray">{{remainqty}}</span>件</div>
						</div>
					</div>
				</li>
				<li class="mint-actionsheet-listitem">
					<div class="text-left" style="min-height: 120px;max-height: 320px;overflow-y: auto;" >
						<div class="hhxh-flex hhxh-vertical-top" v-for="items in attrs">

							<div class="gray flex-0 m-t-10" style="line-height: 25px;">{{items[0]}}</div>
							<div class="flex-1 m-l-10">
								<a @click="AColorClass(items,item)" v-for="(item, index) in items" v-if="index != 0" :class="{active : item.check}">{{item.value}}</a>
							</div>

						</div>
						
						<div class="m-t-12 hhxh-flex">
							<div class="flex-0 gray">数量</div>
							<div class="flex-1 m-l-10">
								<div class="mui-numbox">
									<button class="mui-btn mui-btn-numbox-minus" type="button" @click="depressNum(number)">-</button>
									<input class="mui-input-numbox" type="number" v-model="number">
									<button class="mui-btn mui-btn-numbox-plus" type="button" @click="pressNum()">+</button>
								</div>
							</div>
							
						</div>
            <div v-if="materialParts.length != 0">
						<div class="m-t-12" style="border-top: #d9d9d9 1px solid;padding-top: 12px;">更多配件</div>
						<div class="product-recommend-box">
							<a class="mint-cell" v-for="(item, index) in materialParts" style="width:100%">
								<div class="mint-cell-wrapper" style="padding: 0;">
									<div class="mint-cell-title">
										<div style="width: 100%;" >
											<div class="hhxh-flex">
												<img :src="makePhotoUrl(item.logoimage)"  class="flex-0 product">
												<div class="flex-1">
													<div class="m-l-10">
														<div class="text-overflow1">{{item.partsName}}</div>
														<div class="red m-t-8">
															<span>￥<i class="title-3">{{item.price.toFixed(2)}}</i></span>&nbsp;&nbsp;
															<span v-if="item.settleprice != 0" class="gray original-price">￥<i class="title-2">{{item.settleprice.toFixed(2)}}</i></span>
														</div>
													</div>
												</div>
												<div class="flex-0 m-l-10">
													<div class="mui-numbox">
														<button class="mui-btn mui-btn-numbox-minus" @click="deepNum(item.qty, index)" type="button">-</button>
														<input class="mui-input-numbox" type="number" v-model="item.qty">
														<button class="mui-btn mui-btn-numbox-plus" @click="addNum(index)" type="button">+</button>
													</div>
												</div>
											</div>
											
										</div>
									</div>
								</div>
							</a>
						</div>
						</div>
					</div>
				</li>
			</ul>
			<a class="mint-actionsheet-button"  @click="initPop()">确认</a>
		</div>
    <div class="v-modal" style="z-index: 800;display: block;" @click="popwin = false"></div>
		</div>
		<!--购买弹出窗结束-->
  </div>
</template>
<script>
import comHeader from '../components/ComHeader'
import EvalList from '../components/EvalList'
import ShopRecommend from '../components/ShopRecommend'
import MaterialService from 'services/MaterialService'
import CollectService from 'services/CollectService'
import CartService from 'services/CartService'
import OrderService from 'services/OrderService'
import helpers from '../utils/helpers'
import { Toast, Indicator } from 'mint-ui'
export default {
  components: {
    comHeader,
    EvalList,
    ShopRecommend
  },
  data: () => ({
    title: '商品详情',
    point: '1',
    id: '',
    name: '',
    price: 0,
    prices: 0,
    settlePrice: 0,
    pics: [],
    sqPostList: [],
    contents: '',
    productStandard: '',
    popwin: false,
    IsActive: false,
    attrs: [],
    logoImage: '',
    remainqty: 0,
    number: 1,
    parameter: '请选择产品规格和参数',
    names: [],
    ids: [],
    materialParts: [],
    partNum: 1,
    inviter: {},
    isgo: 1
  }),
  beforeRouteEnter (to, from, next) {
    if (from.name === 'OrderDo') {
      sessionStorage.clear()
    }
    next()
  },
  created () {
    this.id = this.$route.query.id
    if (this.$route.query.inviter !== undefined) {
      let inviter = this.$route.query.inviter
      sessionStorage.inviter = inviter
    }
  },
  mounted () {
    document.getElementById('djkj-swipe-box').style.cssText = 'height: ' + document.documentElement.clientWidth + 'px'
    if (sessionStorage.inviter !== undefined) {
      this.getInviterInfo()
    } else {
      this.getAllMaterial()
    }
    this.loadMaterialDetail()
    this.selectMaterialId()
    this.getMaterialParts()
  },
  methods: {
    getInviterInfo () {
      let inviter = sessionStorage.inviter
      this.getInviterShopInfo(inviter)
    },
    getAllMaterial () {
      let inviter = null
      this.getInviterShopInfo(inviter)
    },
    getInviterShopInfo (inviter) {
      MaterialService.getInviterShopInfo(inviter).then(res => {
        this.inviter = res.t
      })
    },
    selectMaterialId () {
      CollectService.selectMaterialId(this.id).then(res => {
        this.IsActive = res
      })
    },
    getMaterialParts () {
      MaterialService.getMaterialParts(this.id).then(res => {
        this.materialParts = res.t
      })
    },
    loadMaterialDetail: function () {
      MaterialService.loadMaterialDetail(this.id).then(res => {
        this.name = res.t.name
        this.price = res.t.price
        this.prices = this.price
        this.settlePrice = res.t.settlePrice
        if (this.settlePrice === null) {
          this.settlePrice = 0
        }
        this.pics = res.t.pics
        this.contents = res.t.contents
        this.productStandard = res.t.productStandard
        this.attrs = res.t.attrs
        this.logoImage = res.t.logoImage
        this.remainqty = res.t.remainqty
        Indicator.close()
      })
    },
    getNewId (id) {
      Indicator.open({
        text: '请稍后...',
        spinnerType: 'fading-circle'
      })
      this.id = id
      this.loadMaterialDetail()
      this.selectMaterialId()
      this.getMaterialParts()
    },
    saveBuyLike () {
      if (this.IsActive === false) {
        CollectService.saveBuyLike(this.id).then(res => {
          if (res.code === 200) {
            Toast(res.msg)
            this.$store.state.totalMaterial.buyLike = true
            this.IsActive = true
          }
        })
      } else {
        CollectService.deleteBuyLikeOne(this.id).then(res => {
          Toast(res.msg)
          this.$store.state.totalMaterial.buyLike = false
          this.IsActive = false
        })
      }
    },
    addCart () {
      if (this.ids.length !== this.attrs.length) {
        Toast('请先选取规格参数')
      } else {
        this.popwin = false
        Indicator.open({
          text: '正在加入购物车,请稍后...',
          spinnerType: 'fading-circle'
        })
        let attrs = this.ids.join(',') + ','
        let listPartsParam = []
        let param = ''
        for (let i = 0; i < this.materialParts.length; i++) {
          if (this.materialParts[i].qty !== 0) {
            param = {materialId: this.materialParts[i].partsId, qty: this.materialParts[i].qty}
            listPartsParam.push(param)
          }
        }
        CartService.addCart(attrs, this.id, this.number, listPartsParam).then(res => {
          Indicator.close()
          Toast(res.msg)
        })
      }
    },
    goShare: function () {
      this.$router.push({
        name: 'Share',
        query: {
          id: this.id,
          url: window.location.href.toString()
        }
      })
    },
    goCart: function () {
      this.$router.push('MineCart')
    },
    goOrderDo () {
      if (this.ids.length !== this.attrs.length) {
        Toast('请先选取规格参数')
      } else {
        this.popwin = false
        Indicator.open({
          text: '下单中,请稍后...',
          spinnerType: 'fading-circle'
        })
        let attrs = this.ids
        let listPartsParam = []
        let param = ''
        for (let i = 0; i < this.materialParts.length; i++) {
          if (this.materialParts[i].qty !== 0) {
            param = {materialId: this.materialParts[i].partsId, qty: this.materialParts[i].qty}
            listPartsParam.push(param)
          }
        }
        this.$store.state.materialParamter.materialId = this.id
        this.$store.state.materialParamter.qty = this.number
        this.$store.state.materialParamter.attrs = attrs
        this.$store.state.materialParamter.listPartsParam = listPartsParam
        OrderService.placeOrder(attrs, this.id, this.number, listPartsParam).then(res => {
          Indicator.close()
          this.$store.state.orderMessage = res.t
          this.$router.push('OrderDo')
        })
      }
    },
    selectPic: function () {
      this.point = '1'
    },
    selectProdu: function () {
      this.point = '2'
    },
    selectEval: function () {
      this.point = '3'
    },
    selectShop: function () {
      this.point = '4'
    },
    popWindow: function () {
      if (this.remainqty === 0 || this.remainqty === '0') {
        Toast('库存不足')
        return
      }
      this.isgo = 1
      this.popwin = true
    },
    popTrue: function () {
      if (this.remainqty === 0 || this.remainqty === '0') {
        Toast('库存不足')
        return
      }
      this.isgo = 2
      this.popwin = true
    },
    initPop: function () {
      this.names = []
      this.ids = []
      let list = this.attrs
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].length; j++) {
          if (list[i][j].check === true) {
            this.names.push(list[i][j].value)
            this.ids.push(list[i][j].id)
          }
        }
      }
      if (this.ids.length !== this.attrs.length) {
        Toast('请先选取规格参数')
        return
      }
      this.isgo = Number(this.isgo)
      if (this.isgo === 1) {
        this.addCart()
      } else if (this.isgo === 2) {
        this.goOrderDo()
      }
    },
    goIndex () {
      this.$router.push({
        name: 'Index'
      })
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    html_decode: function (str) {
      return helpers.html_decode(str)
    },
    AColorClass: function (items, item) {
      for (var i = 1; i < items.length; i++) {
        items[i].check = false
      }
      item.check = true
    },
    addNum (index) {
      if (this.materialParts[index].qty > this.remainqty) {
        Toast('库存不足')
        return
      }
      this.materialParts[index].qty++
      let sum = 0
      for (let i = 0; i < this.materialParts.length; i++) {
        if (this.materialParts[i].qty > 0) {
          sum = sum + (this.materialParts[i].price * this.materialParts[i].qty)
        }
      }
      this.prices = this.price * this.number + sum
    },
    deepNum (num, index) {
      if (num > 0) {
        this.materialParts[index].qty--
        let sum = 0
        for (let i = 0; i < this.materialParts.length; i++) {
          if (this.materialParts[i].qty > 0) {
            sum = sum + (this.materialParts[i].price * this.materialParts[i].qty)
          }
        }
        this.prices = this.price * this.number + sum
      }
    },
    depressNum (num) {
      if (num > 1) {
        this.number--
        let sum = 0
        for (let i = 0; i < this.materialParts.length; i++) {
          if (this.materialParts[i].qty > 0) {
            sum = sum + (this.materialParts[i].price * this.materialParts[i].qty)
          }
        }
        this.prices = this.price * this.number + sum
      }
    },
    pressNum () {
      this.number++
      let sum = 0
      for (let i = 0; i < this.materialParts.length; i++) {
        if (this.materialParts[i].qty > 0) {
          sum = sum + (this.materialParts[i].price * this.materialParts[i].qty)
        }
      }
      this.prices = this.price * this.number + sum
    }
  }
}
</script>
