<template>
  <div>
     <!--footer-->
		<div class="djkj-footer-empty"></div>
		<div class="mint-tabbar is-fixed djkj-footer">
			<a class="mint-tab-item" :class="{'is-selected': point === '1'}">
				<div class="mint-tab-item-icon home"></div>
				<div class="mint-tab-item-label" @click="goIndex()">首页</div>
			</a>
			<a class="mint-tab-item" :class="{'is-selected': point === '2'}">
				<div class="mint-tab-item-icon cart"></div>
				<div class="mint-tab-item-label" @click="goCart()">购物车</div>
			</a>
			<a class="mint-tab-item" :class="{'is-selected': point === '3'}">
				<div class="mint-tab-item-icon mine"></div>
				<div class="mint-tab-item-label" @click="goMine()">我的</div>
			</a>
		</div>
	 <!--fonter end-->
  </div>
</template>
<script>
export default {
  data: () => ({
    point: '1'
  }),
  created () {
    this.point = this.$store.state.footer.point
  },
  methods: {
    goCart: function () {
      this.$router.push('MineCart')
    },
    goMine: function () {
      this.$router.push('Mine')
    },
    goIndex: function () {
      this.$router.push({
        name: 'Index'
      })
    }
  }
}
</script>
