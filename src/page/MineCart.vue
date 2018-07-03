<template>
  <div>
  <!-- <com-header></com-header> -->
  <!--container-->
		<div class="cart-list-box" v-if="cartList.length != 0" style="position: absolute;top: 0;bottom: 96px;left: 0;width: 100%;">
		  <mt-loadmore :bottom-method="loadMoreGoodslist" :bottom-all-loaded="GoodsingallLoaded" ref="loadmore" :auto-fill="false">

  			<a v-for="(item, index) in cartList"  class="mint-cell" @touchstart="touchStart($event)" @touchend="touchEnd($event, index)" @touchmove="touchMove($event)"
  			:style="{transform: 'translate3d('+ item.transformX +'px,0,0)'}" >
  				<div class="mint-cell-wrapper">
  					<div class="mint-cell-title" v-if="item.status == 1">
  						<div class="hhxh-flex">
  							<div class="flex-0">
  								<label class="mint-checklist-label line-block">
  									<span class="mint-checkbox">
  										<input type="checkbox" class="mint-checkbox-input" value="item.id" :checked="item.checked" @click.stop="addChecked(index)">
  										<span class="mint-checkbox-core"></span>
  									</span>
  								</label>
  							</div>
  							<div class="flex-0 m-r-10"><img :src="makePhotoUrl(item.image)"></div>
  							<div class="flex-1" @click="goMaterialDetail(item.materialId)">
  								<div class="text-overflow2">{{item.name}}</div>
  								<div class="m-t-8" style="font-size: small;color: #666666;">{{item.classify}}</div>
  								<div class="m-t-8 gray hhxh-flex">
  									<div class="flex-1" v-if="item.status == 1"><span class="red">￥<i class="title-5">{{item.price}}</i></span></div>
                    <div class="flex-1" v-if="item.status != 1"><span class="red"><i class="title-5">商品已下架</i></span></div>
  									<div class="flex-0">
  										<div class="mui-numbox">
  											<button class="mui-btn mui-btn-numbox-minus" type="button" @click.stop="deepNum(item.number, index)">-</button>
  											<input class="mui-input-numbox" type="number" v-model="item.number">
  											<button class="mui-btn mui-btn-numbox-plus" type="button"@click.stop="addNum(index)">+</button>
  										</div>
  									</div>
  								</div>
  							</div>
  						</div>
  					</div>

            <div class="mint-cell-title" v-if="item.status != 1" style="opacity: 0.5">
              <div class="hhxh-flex">
                <div class="flex-0">
                  <label class="mint-checklist-label line-block">
                    <span class="mint-checkbox">
                      <input type="checkbox" class="mint-checkbox-input" value="item.id" :checked="item.checked">
                      <span class="mint-checkbox-core"></span>
                    </span>
                  </label>
                </div>
                <div class="flex-0 m-r-10"><img :src="makePhotoUrl(item.image)"></div>
                <div class="flex-1">
                  <div class="text-overflow2">{{item.name}}</div>
                  <div class="m-t-8" style="font-size: small;color: #666666;">{{item.classify}}</div>
                  <div class="m-t-8 gray hhxh-flex">
                    <div class="flex-1" v-if="item.status != 1"><span class="red"><i class="title-5">商品已下架</i></span></div>
                    <div class="flex-0">
                      <div class="mui-numbox">
                        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                        <input class="mui-input-numbox" type="number" v-model="item.number">
                        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
  					<div class="del-btn" @click="deleteCart(index)"><span>删除</span></div>
  				</div>

  			</a>
			</mt-loadmore>
			
		</div>
    <no-data v-else-if="cartList.length == 0"></no-data>
		<!--container end-->

		<!--footer-->
		<div class="djkj-footer-empty" style="height: 98px;"></div>
		<div class="mint-tabbar is-fixed" style="bottom:44px;">
			<div class="p-footer-box hhxh-flex" style="width: 100%;">
				<div class="flex-0 gray text-center">
					<label class="mint-checklist-label line-block">
						<span class="mint-checkbox">
							<input type="checkbox" class="mint-checkbox-input" :checked="allpoint"  @click="allChecked()">
							<span class="mint-checkbox-core"></span>
						</span>
						<span class="mint-checkbox-label gray">全选</span>
					</label>
				</div>
				<div class="flex-1 text-center">合计：<span class="red">￥<i class="title-5">{{prices}}</i></span></div>
				<div class="flex-1 text-center buy-box1" style="padding: 0 15px;" @click="checkCartList()">结算</div>
			</div>
		</div>

		<end-header></end-header>
		<!--fonter end-->
		<!--删除购物车产品弹窗-->
		<div v-if="isDete == true">
		  <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2011;display: block;">
			<div class="mint-msgbox">
				<div class="mint-msgbox-header">
					<div class="mint-msgbox-title">系统提示</div>
				</div> 
				<div class="mint-msgbox-content">
					<div class="mint-msgbox-message ">确定要删除该商品吗？</div>
				</div>
				<div class="mint-msgbox-btns">
					<button class="mint-msgbox-btn mint-msgbox-cancel gray" @click="offDete()">取消</button>
					<button class="mint-msgbox-btn mint-msgbox-confirm red" @click="delCart()">确定</button>
				</div>
			</div>
		  </div>
		  <div class="v-modal" style="z-index: 2010;"></div>
		</div>
		<!--删除购物车产品结束-->

  </div>
</template>
<script>
import comHeader from '../components/ComHeader'
import endHeader from '../components/EndHeader'
import NoData from '../components/NoData'
import CartService from 'services/CartService'
import OrderService from 'services/OrderService'
import helpers from 'utils/helpers'
import {Toast, Indicator} from 'mint-ui'
export default {
  components: {
    comHeader,
    endHeader,
    NoData
  },
  data: () => ({
    title: '购物车',
    isDete: false,
    transformX: 0,
    startPosX: 0,
    transformStartX: 0,
    pageNo: 1,
    pageSize: 6,
    cartList: [],
    allpoint: false,
    prices: 0,
    index: 0, // 传递删除下标
    GoodsingallLoaded: false
  }),
  created () {
    this.$store.state.footer.point = '2'
  },
  mounted () {
    this.loadCartList()
  },
  methods: {
    loadCartList () {
      CartService.loadCartList(this.pageNo, this.pageSize).then(res => {
        let list = res.t
        if (list === null) {
          this.GoodsingallLoaded = true
        } else if (list.length > 0 && list.length <= this.pageSize) {
          for (let i = 0; i <= list.length - 1; i++) {
            this.cartList.push(list[i])
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
      this.loadCartList()
      // 在加载数据后需要对组件进行重新定位的操作
      this.$refs.loadmore.onBottomLoaded()
    },
    checkCartList () {
      let buyCarList = []
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].checked === true) {
          buyCarList.push({id: this.cartList[i].id})
        }
      }
      Indicator.open({
        text: '购物车校验中...',
        spinnerType: 'fading-circle'
      })
      CartService.checkCartList(buyCarList).then(res => {
        Indicator.close()
        this.goOrderDo()
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
    goOrderDo () {
      let buyCarList = []
      let ids = []
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].checked === true) {
          buyCarList.push({id: this.cartList[i].id, qty: this.cartList[i].number})
          ids.push(this.cartList[i].id)
        }
      }
      Indicator.open({
        text: '正在进入下单界面...',
        spinnerType: 'fading-circle'
      })
      OrderService.buyCarPlaceOrder(buyCarList).then(res => {
        Indicator.close()
        this.$store.state.orderMessage = res.t
        this.$router.push({
          name: 'OrderDo',
          query: {
            ids: ids
          }
        })
      })
    },
    delCart () {
      let ids = this.cartList[this.index].id + ','
      CartService.delCart(ids).then(res => {
        Toast('删除购物车成功')
        this.isDete = false
        this.cartList.splice(this.index, 1)
      })
    },
    deleteCart: function (index) {
      this.isDete = true
      this.index = index
    },
    offDete () {
      this.isDete = false
    },
    touchStart: function (e) {
      this.startPosX = e.touches[0].clientX
    },
    touchMove: function (e) {
      let x = e.touches[0].clientX
      this.transformStartX = x - this.startPosX
    },
    touchEnd: function (e, index) {
      if (this.transformStartX < 0) {
        this.cartList[index].transformX = -60
      } else if (this.transformStartX > 0) {
        this.cartList[index].transformX = 0
      }
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    addChecked (index) {
      if (this.cartList[index].checked === false) {
        this.cartList[index].checked = true
        let sum = 0
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].checked === true) {
            sum += this.cartList[i].price * this.cartList[i].number
          }
        }
        this.prices = sum
      } else if (this.cartList[index].checked === true) {
        this.cartList[index].checked = false
        let sum = 0
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].checked === true) {
            sum += this.cartList[i].price * this.cartList[i].number
          }
        }
        this.prices = sum
      }
    },
    allChecked () {
      if (this.allpoint === false) {
        let sum = 0
        for (let i = 0; i < this.cartList.length; i++) {
          this.cartList[i].checked = true
          sum += this.cartList[i].price * this.cartList[i].number
        }
        this.prices = sum
        this.allpoint = true
      } else if (this.allpoint === true) {
        for (let i = 0; i < this.cartList.length; i++) {
          this.cartList[i].checked = false
        }
        this.prices = 0
        this.allpoint = false
      }
    },
    deepNum (num, index) {
      if (num > 1) {
        this.cartList[index].number--
        let sum = 0
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].checked === true) {
            sum += this.cartList[i].price * this.cartList[i].number
          }
        }
        this.prices = sum
      }
    },
    addNum (index) {
      this.cartList[index].number++
      let sum = 0
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].checked === true) {
          sum += this.cartList[i].price * this.cartList[i].number
        }
      }
      this.prices = sum
    }
  }
}
</script>
