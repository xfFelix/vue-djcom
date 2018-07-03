<template>
  <div>
  <!--container-->
		<div class="m-address-list-box">
			<div class="item-box">
				<a class="mint-cell mint-field">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">收件人<i class="red">*</i></span>
						</div>
						<div class="mint-cell-value">
							<div class="mint-cell-value">
								<input placeholder="请输入姓名" type="text" class="mint-field-core text-right" v-model="data.userName">
							</div>
						</div>
					</div>
				</a>
				<a class="mint-cell mint-field">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">联系电话<i class="red">*</i></span>
						</div>
						<div class="mint-cell-value">
							<div class="mint-cell-value">
								<input placeholder="请输入联系电话" type="text" class="mint-field-core text-right" v-model="data.mobile">
							</div>
						</div>
					</div>
				</a>
			</div>
			<div class="item-box">
				<a class="mint-cell mint-field" @click="choiceArea()">
					<span class="mint-cell-mask"></span>
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">所在地区<i class="red">*</i></span>
						</div>
						<div class="mint-cell-value">
							<div class="mint-cell-value is-link">
								<input  placeholder="请选择省市" type="text" class="mint-field-core text-right" v-model="data.areaText">
							</div>
						</div>
			
						<i class="mint-cell-allow-right"></i>

					</div>
				</a>
			<mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
              <div class="picker-toolbar">
                <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress()">取消</span>
                <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress()">确定</span>
              </div>
              <mt-picker :slots="citySlots" @change="onCityChange" :visible-item-count="3"></mt-picker>
            </mt-popup>
				<a class="mint-cell mint-field">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<span class="mint-cell-text">详细地址<i class="red">*</i></span>
						</div>
						<div class="mint-cell-value">
							<div class="mint-cell-value">
								<input placeholder="请输入街道、楼牌号等" type="text" class="mint-field-core text-right" v-model="data.address">
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>

		<div class="bottom-btn-box">
			<button @click="checkParamter()" class="mint-button mint-button--primary mint-button--large">
				<label class="mint-button-text">保存</label>
			</button>
		</div>

		<!--container end-->

  </div>
</template>
<script>
import AddressService from 'services/AddressService'
import {Toast} from 'mint-ui'
export default {
  data: () => ({
    title: '',
    popupVisible: false,
    id: '',
    addressProvince: '',
    addressProvinceId: '',
    addressCity: '',
    addressCityId: '',
    areaList: [],
    citySlots: [
      {
        flex: 1,
        values: Object.keys(address),
        className: 'slot1',
        textAlign: 'center'
      }, {
        divider: true,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: Object.values(address)[0],
        className: 'slot3',
        textAlign: 'center'
      }
    ],
    data: {
      photo: '',
      userName: '',
      sex: '',
      sexText: '',
      mobile: '',
      birthday: '',
      privinceName: '',
      provinceId: '',
      cityName: '',
      cityId: '',
      address: '',
      areaText: ''
    }
  }),
  created () {
    this.id = this.$route.query.id
  },
  mounted () {
    this.loadAddress()
    this.loadAreaList()
  },
  methods: {
    loadAddress () {
      if (this.id !== undefined) {
        AddressService.loadAddress(this.id).then(res => {
          this.data.userName = res.t.contractPerson
          this.data.mobile = res.t.contractTel
          this.data.areaText = res.t.proviceName + res.t.cityName
          this.data.provinceId = res.t.proviceID
          this.data.cityId = res.t.cityID
          this.data.address = res.t.address
        })
      } else {
        return
      }
    },
    loadAreaList () {
      AddressService.loadAreaList().then(res => {
        if (res.t) {
          this.areaList = res.t
          address = this.areaList.areaList[0]
          provinceCodeList = this.areaList.provinceCodeList[0]
          cityCodeList = this.areaList.cityCodeList[0]
          this.citySlots[0].values = Object.keys(address)
          this.citySlots[2].values = Object.values(address)[0]
        } else {
          Toast('地区数据异常')
        }
      })
    },
    choiceArea: function () {
      this.popupVisible = true
      // 设置默认选中
      if (this.data.privinceName !== '' && this.data.cityName !== '') {
        this.areaPicker.setSlotValue(0, this.data.privinceName)
        this.areaPicker.setSlotValue(1, this.data.cityName)
        console.log(this.data.privinceName + '-' + this.data.cityName)
      }
    },
    cancleaddress: function () {
      this.popupVisible = false
      this.areaPicker.setSlotValue(0, this.data.privinceName)
      this.areaPicker.setSlotValue(1, this.data.cityName)
    },
    selectaddress: function () {
      this.popupVisible = false
      this.data.privinceName = this.addressProvince
      this.data.cityName = this.addressCity
      this.data.provinceId = this.addressProvinceId
      this.data.cityId = this.addressCityId
      this.data.areaText = this.data.privinceName + this.data.cityName
    },
    onCityChange: function (picker, values) {
      this.areaPicker = picker
      /* 此处不直接使用this.data.privinceName、this.data.cityName、this.data.provinceId、this.data.cityId，由于在加载地区信息之后，我又重新设置了绑定到slots属性的值，此时也会触发@change事件，所以在onCityChange方法里需要用四个变量替代上述四个变量来记录当前选中的值，然后在点击确定之后的方法里将这四个值赋给上述四个变量。如果直接在该方法里使用上述四个变量来获取当前选中的值，可能导致数据错乱 */
      picker.setSlotValues(1, address[values[0]])
      this.addressProvince = values[0]
      this.addressCity = values[1]
      this.addressProvinceId = provinceCodeList[this.addressProvince] + ''
      this.addressCityId = cityCodeList[this.addressCity] + ''
    },
    checkParamter () {
      if (this.data.userName === '') {
        Toast('未输入姓名')
      } else if (this.data.mobile === '') {
        Toast('未输入手机号')
      } else if (this.data.provinceId === '') {
        Toast('未输入省市')
      } else if (this.data.address === '') {
        Toast('未输入地址')
      } else {
        this.saveAddress()
      }
    },
    saveAddress () {
      AddressService.saveAddress(this.id, this.data.userName, this.data.mobile, this.data.provinceId, this.data.cityId, this.data.address).then(res => {
        Toast('保存地址成功')
        this.$router.back()
      })
    }
  }
}
let address = {}
let provinceCodeList = {}
let cityCodeList = {}
</script>
