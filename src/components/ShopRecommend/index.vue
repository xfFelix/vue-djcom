<template>
  <div>
      <div class="product-recommend-box">

			<a class="mint-cell" v-for="(item, index) in materialList">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<div style="width: 100%;" @click="goMaterialDetail(item.id)">
							<div class="hhxh-flex">
								<img :src="makePhotoUrl(item.logoImage)" class="flex-0 product">
								<div class="flex-1">
									<div class="m-l-10">
										<div class="text-overflow1">{{item.name}}</div>
										<div class="red m-t-8">
											<span>￥<i class="title-3">{{item.price.toFixed(2)}}</i></span>&nbsp;&nbsp;
											<span class="gray original-price" v-if="item.settleprice != 0">￥<i class="title-2">{{item.settleprice.toFixed(2)}}</i></span>
										</div>
									</div>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</a>
				
		</div>
  </div>
</template>
<script>
import helpers from 'utils/helpers'
import MaterialService from 'services/MaterialService'
// import {Indicator} from 'mint-ui'
export default {
  data: () => ({
    title: '',
    materialList: []
  }),
  created () {
    this.findRecommend()
  },
  mounted () {

  },
  methods: {
    findRecommend () {
      let recommend = 20
      MaterialService.findRecommend(recommend).then(res => {
        this.materialList = res.t
      })
    },
    goMaterialDetail (id) {
      this.$emit('getNewId', id)
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    }
  }
}
</script>
