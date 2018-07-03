<template>
  <div v-if="popwin === true">
  <!--购买弹窗开始-->
		<div class="mint-actionsheet product-detail-msg" style="z-index: 2001;display: block;">
			<ul class="mint-actionsheet-list">
				<li class="mint-actionsheet-listitem text-left">
					<div class="hhxh-flex">
						<div class="flex-0 img-box"><img src="makePhotoUrl(logoImage)"></div>
						<div class="flex-1 m-l-10">
							<div class="red"><span>￥<i class="title-4">{{price}}</i>.00</span></div>
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
									<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
									<input class="mui-input-numbox" type="number">
									<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
								</div>
							</div>
							
						</div>
						<div class="m-t-12" style="border-top: #d9d9d9 1px solid;padding-top: 12px;">更多配件</div>
						<div class="product-recommend-box">
							<a class="mint-cell">
								<div class="mint-cell-wrapper" style="padding: 0;">
									<div class="mint-cell-title">
										<div style="width: 100%;" >
											<div class="hhxh-flex">
												<img src="../../assets/banner.png"  class="flex-0 product">
												<div class="flex-1">
													<div class="m-l-10">
														<div class="text-overflow1">实例的会计分录啥东东录啥东东</div>
														<div class="red m-t-8">
															<span>￥<i class="title-3">1800</i>.00</span>&nbsp;&nbsp;
															<span class="gray original-price">￥<i class="title-2">2500</i>.00</span>
														</div>
													</div>
												</div>
												<div class="flex-0 m-l-10">
													<div class="mui-numbox">
														<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
														<input class="mui-input-numbox" type="number">
														<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
													</div>
												</div>
											</div>
											
										</div>
									</div>
								</div>
							</a>
							
							
						</div>
						
					</div>
				</li>
			</ul>
			<a class="mint-actionsheet-button" @click="initPop()">确认</a>
		</div>
		
		<!--购买弹出窗结束-->
  </div>
</template>
<script>
import helpers from 'utils/helpers'
export default {
  data: () => ({
    title: '',
    popwin: false,
    materialDetail: {},
    name: '',  // 产品名称
    attrs: [], // 产品参数
    logoImage: '',
    remainqty: 0, // 库存
    price: 0
  }),
  created () {
    this.popwin = this.$store.state.popWindow.popwin
    alert(this.popwin)
    this.materialDetail = this.$store.state.materialDetail
    this.name = this.materialDetail.name
    this.logoImage = this.materialDetail.logoImage
    this.remainqty = this.materialDetail.remainqty
    this.attrs = this.materialDetail.attrs
    this.price = this.materialDetail.price
  },
  mounted () {

  },
  methods: {
    initPop: function () {
      this.popwin = false
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    AColorClass: function (items, item) {
      for (var i = 1; i < items.length; i++) {
        items[i].check = false
      }
      item.check = true
    }
  }
}
</script>
