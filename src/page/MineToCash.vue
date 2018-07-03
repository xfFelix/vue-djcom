<template>
  <div>
  <!--container-->
		<div class="m-tocash-box">
			<img src="../assets/money.png">
			<div class="m-t-12 text-center">
				<span >￥<i style="font-size: 30px;">{{balance}}</i></span>
			</div>
			<div class="gray text-center">账户余额</div>
			<div class="bottom-btn-box">
				<button class="mint-button mint-button--primary mint-button--large" @click="goApplyCash()">
					<label class="mint-button-text">提现</label>
				</button>
			</div>
			<div style="margin-top: 20px;padding: 10px;color: #62cc94;" class="text-center" @click="goCashRecord()">提现记录 ></div>
		</div>

		<!--container end-->
  </div>
</template>
<script>
import MemberService from 'services/MemberService'
export default {
  data: () => ({
    title: '',
    balance: 0
  }),
  created () {

  },
  mounted () {
    this.getMemAmountTotal()
  },
  methods: {
    getMemAmountTotal () {
      MemberService.getMemAmountTotal().then(res => {
        this.balance = res.t
      })
    },
    goApplyCash: function () {
      this.$router.push('ApplyCash')
    },
    goCashRecord: function () {
      this.$router.push('CashRecord')
    }
  }
}
</script>
