<template>
  <div>
        <!--container-->
		<div class="m-tocash-apply">
			<div class="hhxh-flex">
				<div class="flex-1">提现账户</div>
				<div class="flex-0">
					<img src="../assets/wallet.png" style="height: 30px;">
				</div>
			</div>
			<div class="m-t-12">提现金额</div>
			<div class="hhxh-flex m-t-8">
				<div class="flex-0">￥&nbsp;&nbsp;</div>
				<div class="flex-1">
					<input @input="limitAmount()" type="Number" placeholder="请输入金额" style="width: 100%;border: none;outline: none;" v-model="amount">
				</div>
			</div>
			<div style="border-top: 1px solid #d9d9d9;padding-top: 8px;" class="m-t-8 gray">余额：{{amountTotal}}元&nbsp;&nbsp;冻结金额：{{frozenAmount}}元&nbsp;&nbsp;<span class="green" @click="payAllMoney()">全部提取</span></div>
			<div class="bottom-btn-box" style="width: 100%;">
				<button id="btn" class="mint-button mint-button--primary mint-button--large" @click="confirmMoney()">
					<label class="mint-button-text">确认提现</label>
				</button>
			</div>
		</div>
		<!--container end-->
  </div>
</template>
<script>
import WithdrawDepositService from 'services/WithdrawDepositService'
import {Toast, MessageBox} from 'mint-ui'
export default {
  data: () => ({
    title: '',
    todayRecord: 0,
    avail: 0,
    withdrawMinLimit: 0,
    amountTotal: 0,
    frozenAmount: 0,
    amount: ''
  }),
  created () {

  },
  mounted () {
    this.getWithdrawType()
  },
  methods: {
    getWithdrawType () {
      WithdrawDepositService.getWithdrawType().then(res => {
        this.todayRecord = res.t.todayRecord
        this.avail = res.t.avail.toFixed(2)
        this.withdrawMinLimit = res.t.withdrawMinLimit.toFixed(2)
        this.amountTotal = res.t.amountTotal.toFixed(2)
        this.frozenAmount = res.t.frozenAmount.toFixed(2)
      })
    },
    limitAmount () {
      this.amount = Number(this.amount)
      this.withdrawMinLimit = Number(this.withdrawMinLimit)
      this.avail = Number(this.avail)
      if (this.amount >= this.avail) {
        Toast('提现金额大于账户余额')
        this.amount = this.avail
      }
    },
    payAllMoney () {
      this.amount = this.avail
    },
    confirmMoney () {
      if (this.amount === '') {
        Toast('请输入提现金额')
      } else if (this.avail < this.withdrawMinLimit) {
        Toast('可提现金额小于最低提现金额')
      } else {
        document.getElementById('btn').disabled = true
        let moneyType = 1
        MessageBox.confirm('是否提现?').then(action => {
          WithdrawDepositService.withdrawDeposit(moneyType, this.amount).then(res => {
            document.getElementById('btn').disabled = false
            if (res.code === 400) {
              Toast(res.msg)
              return
            }
            Toast('申请提现成功')
            this.$router.push('CashRecord')
          })
        },
        action => {
          document.getElementById('btn').disabled = false
        })
      }
    }
  }
}
</script>
