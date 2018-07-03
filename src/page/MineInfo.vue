<template>
  <div>
  <!--container-->
		
		<div class="m-t-12 mine-rows-box">
			<a class="mint-cell">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						我的昵称
					</div>
					<div class="mint-cell-value">
						<div class="text-right gray">{{userName}}</div>
					</div>
				</div>
			</a>
			<a class="mint-cell">
				<span class="mint-cell-mask"></span> 
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						性别
					</div>
					<div class="mint-cell-value">
						<div class="text-right gray">{{sexName}}</div>
					</div>
				</div>
			</a>
			<a class="mint-cell" @click="openPicker()">
				<span class="mint-cell-mask"></span> 
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						生日
					</div>
					<div class="mint-cell-value is-link">
						<div class="text-right gray">{{birthday}}</div>
					</div>
					<i class="mint-cell-allow-right"></i>
					
				</div>
			</a>
			<mt-datetime-picker
                     @confirm="handleChange(pickerVisible)"
                     ref="picker"
                     v-model="pickerVisible"
                     type="date"
                     :startDate="startDate"
                     year-format="{value} 年"
                     month-format="{value} 月"
                     date-format="{value} 日">
                    </mt-datetime-picker>
			
		</div>

		<div class="m-t-12 mine-rows-box">
			<a class="mint-cell mint-field">
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="mint-cell-text">手机号码</span>
					</div>
					<div class="mint-cell-value">
						<div class="mint-cell-value">
							<input placeholder="请输入手机号码" type="number" class="mint-field-core text-right" v-model="mobile">
						</div>
					</div>
				</div>
			</a>
		</div>

		<div class="mine-rows-box" style="margin-top: 50px;">
			<a class="mint-cell" @click="saveMineInfo()">
				<span class="mint-cell-mask"></span> 
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<div class="text-center red">保存</div>
					</div>
				</div>
			</a>
		</div>
        
		<!--container end-->
  </div>
</template>
<script>
import MemberService from 'services/MemberService'
import {Toast} from 'mint-ui'
export default {
  data: () => ({
    title: '',
    userName: '',
    birthday: '',
    sex: 1,
    sexName: '',
    mobile: '',
    pickerVisible: new Date(),
    startDate: new Date('1900-01-01')
  }),
  created () {

  },
  mounted () {
    this.getMemberInfoSimple()
  },
  methods: {
    openPicker () {
      this.$refs.picker.open()
    },
    getMemberInfoSimple () {
      MemberService.getMemberInfoSimple().then(res => {
        this.userName = res.t.userName
        this.birthday = res.t.birthday
        this.sex = res.t.sex
        this.sexName = res.t.sexName
        this.mobile = res.t.mobile
      })
    },
    handleChange: function (value) {
      this.birthday = window.moment(value).format('YYYY-MM-DD')
    },
    saveMineInfo () {
      if (this.userName === '' || this.userName === null) {
        Toast('请输入昵称')
      } else if (this.sex === '' || this.sex === null) {
        Toast('请输入性别')
      } else if (this.birthday === '' || this.birthday === null) {
        Toast('请输入生日')
      } else if (this.mobile === '' || this.mobile === null) {
        Toast('请输入手机号')
      } else {
        MemberService.saveMemInfo(this.birthday, this.mobile).then(res => {
          Toast('个人信息修改成功')
          this.$router.back()
        })
      }
    }
  }
}
</script>
