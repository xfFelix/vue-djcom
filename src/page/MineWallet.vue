<template>
  <div>
  <!--container-->
		<div class="m-wallet-box text-center">
			<div class="white">￥<i style="font-size: 30px;">{{balance}}</i></div>
			<div class="white">账户余额</div>
			<div style="margin-top: 30px;" class="white">
			<span @click="goWalletRecord()">交易记录</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
			<span @click="goCashRecord()">提现记录</span>
			</div>
		</div>
		<div class="bottom-btn-box">
			<button class="mint-button mint-button--primary mint-button--large" @click="goApplyCash()">
				<label class="mint-button-text">提现</label>
			</button>
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
    goWalletRecord: function () {
      this.$router.push('MineWalletRecord')
    },
    goCashRecord: function () {
      this.$router.push('CashRecord')
    },
    goApplyCash: function () {
      this.$router.push('ApplyCash')
    }
  }
}
</script>
