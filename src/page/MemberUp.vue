<template>
  <div>
  <!--container-->
		<div class="member-up-box">
			<div class="white title-5 text-center">{{levelName}}</div>
			<div class="white m-t-5 text-center">我的积分：{{integralTotal}}</div>
			<div class="status-box hhxh-flex">
				<div class="flex-1" :class="{active: levelName == '普通会员' || levelName == '黄金会员' || levelName == '铂金会员' || levelName == '钻石会员'}">
					<div class="circle-icon"></div>
					<div class="m-t-10">普通会员</div>
				</div>
				<div class="flex-1" :class="{active: levelName == '黄金会员' || levelName == '铂金会员' || levelName == '钻石会员'}">
					<div class="circle-icon"></div>
					<div class="m-t-10">黄金会员</div>
				</div>
				<div class="flex-1" :class="{active: levelName == '铂金会员' || levelName == '钻石会员'}">
					<div class="circle-icon"></div>
					<div class="m-t-10">铂金会员</div>
				</div>
				<div class="flex-1" :class="{active: levelName == '钻石会员'}">
					<div class="circle-icon"></div>
					<div class="m-t-10">钻石会员</div>
				</div>
			</div>
			<div>
				<div class="text-center" style="color: #d1aa5a;">当前积分可升级为铂金会员</div>
				<div class="m-t-5 text-center">
					<button v-if="levelName != '钻石会员'" class="mint-button mint-button--danger mint-button--small" style="background-color: #d1aa5a;width: 180px;" @click="checkUpMemLevel()" id="upButton">
						<label class="mint-button-text">立即升级</label>
					</button>
					<button v-if="levelName == '钻石会员'" class="mint-button mint-button--danger mint-button--small" disabled="disabled" style="background-color: #888;width: 180px;">
						<label class="mint-button-text">立即升级</label>
					</button>
				</div>
			</div>
		</div>
		<div style="color: #888;margin: 16px 10px 8px;">等级规则</div>
		<div class="member-rule-box">
			<div class="hhxh-flex hhxh-vertical-top">
				<div class="flex-0">
					<img src="../assets/member-descri.png" style="height: 22px;">
				</div>
				<div class="flex-1 m-l-10">
					<div>会员等级介绍</div>
					<div class="m-t-12 gray">
						会员级别的升降默认由消费金额累计自动处理，无需申请，会员级别也可由积分决定，积分达到一定数额可申请升级会员，积分越高会员等级越高，享受到的会员权益越大。
					</div>
				</div>
			</div>
			<div class="hhxh-flex hhxh-vertical-top">
				<div class="flex-0">
					<img src="../assets/member-jf.png" style="height: 22px;">
				</div>
				<div class="flex-1 m-l-10">
					<div>积分说明</div>
					<div class="m-t-12 gray">
						积分说明的详细内容
					</div>
				</div>
			</div>
			<div class="hhxh-flex hhxh-vertical-top">
				<div class="flex-0">
					<img src="../assets/member-rank.png" style="height: 22px;">
				</div>
				<div class="flex-1 m-l-10">
					<div>会员等级对照</div>
					<div class="m-t-12 gray">
						<table class="title-small" >
							<colgroup>
								<col style="width: 20%">
								<col style="width: 20%">
								<col style="width: 20%">
								<col style="width: 20%">
								<col style="width: 20%">
							</colgroup>
							<thead>
								<th>等级</th>
								<th>达成累计消费范围</th>
								<th>积分兑换</th>
								<th>净化器返佣比例（%）</th>
								<th>精油返佣比例（%）</th>
							</thead>
							<tbody>
								<tr>
									<td>普通会员</td>
									<td>购买任意一款商品</td>
									<td>不能兑换</td>
									<td>2</td>
									<td>4</td>
								</tr>
								<tr>
									<td>黄金会员</td>
									<td>>=4000元</td>
									<td>2w</td>
									<td>3</td>
									<td>6</td>
								</tr>
								<tr>
									<td>铂金会员</td>
									<td>>=1万元</td>
									<td>3w</td>
									<td>4</td>
									<td>8</td>
								</tr>
								<tr>
									<td>钻石会员</td>
									<td>>=2万元</td>
									<td>5w</td>
									<td>5</td>
									<td>10</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<!--container end-->
  </div>
</template>
<script>
import MemberService from 'services/MemberService'
import {Toast, MessageBox} from 'mint-ui'
export default {
  data: () => ({
    title: '',
    levelName: '',
    integralTotal: 0,
    accumulated: 0
  }),
  created () {

  },
  mounted () {
    this.getMemLevelInfo()
  },
  methods: {
    getMemLevelInfo () {
      MemberService.getMemLevelInfo().then(res => {
        this.levelName = res.t.levelName
        this.integralTotal = res.t.integralTotal
        this.accumulated = res.t.accumulated
      })
    },
    upMemLevel () {
      MemberService.upMemLevel().then(res => {
        Toast(res.msg)
        document.getElementById('upButton').disabled = false
        this.getMemLevelInfo()
      })
    },
    checkUpMemLevel () {
      let _this = this
      MemberService.checkUpMemLevel().then(res => {
        let point = res.t
        document.getElementById('upButton').disabled = true
        MessageBox.confirm(`升级所需积分:${point}`).then(action => {
          _this.upMemLevel()
        },
        action => {
          document.getElementById('upButton').disabled = false
        })
      })
    }
  }
}
</script>
