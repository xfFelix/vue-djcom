<template>
  <div>
    <!--container-->
    
    <div class="order-pay-do text-center">
      <span class="success-icon"></span>
      <div class="title-1 white m-t-12">订单支付成功！</div>
    </div>
    <div class="bottom-btn-box clearbox">
        <button class="mint-button mint-button--default mint-button--small is-plain hhxh-left" style="background-color: transparent;width:45%;" @click="goIndex()">
          <label class="mint-button-text">返回首页</label>
        </button>
        <button class="mint-button mint-button--default mint-button--small is-plain hhxh-right" style="background-color: transparent;width: 45%;" @click="goMineOrder()">
          <label class="mint-button-text">查看订单</label>
        </button>
      </div>

    <!--container end-->
  </div>
</template>
<script>
export default {
  data: () => ({
    title: ''
  }),
  created () {

  },
  mounted () {

  },
  methods: {
    goIndex () {
      this.$router.push({
        name: 'Index'
      })
    },
    goMineOrder () {
      this.$router.push({
        name: 'MineOrder'
      })
    }
  }
}
</script>
