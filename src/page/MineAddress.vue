<template>
  <div>
  <!--container-->
		<div class="m-address-list-box" v-if="addressList.length != 0">
			<div v-for="(item, index) in addressList" class="item-box" :class="{'is-selected': item.isDefault == 1}">
				<a v-if="point == true" class="mint-cell" @click="goOrderDo(index)">
					<span class="mint-cell-mask"></span> 
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div >
								<div><span>{{item.contractPerson}}</span>&nbsp;&nbsp;<span>{{item.contractTel}}</span></div>
								<div class="m-t-5 gray">{{item.proviceName}}{{item.cityName}}{{item.address}}</div>
							</div>
							
						</div>
					</div>
				</a>
        <a v-else="point == false" class="mint-cell">
          <span class="mint-cell-mask"></span> 
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <div >
                <div><span>{{item.contractPerson}}</span>&nbsp;&nbsp;<span>{{item.contractTel}}</span></div>
                <div class="m-t-5 gray">{{item.proviceName}}{{item.cityName}}{{item.address}}</div>
              </div>
              
            </div>
          </div>
        </a>
				<a class="mint-cell">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="hhxh-flex">
								<div class="flex-0">
									<label class="mint-checklist-label line-block">
										<span class="mint-checkbox">
											<input type="checkbox" class="mint-checkbox-input" :checked="item.isDefault == 1" value="默认地址" @click="selectFault(index, item.id)">
											<span class="mint-checkbox-core"></span>
										</span>
										<span class="mint-checkbox-label gray">默认地址</span>
									</label>
								</div>
								<div class="text-right flex-1">
									<span class="gray" @click="delAddress(item.id, index)"><img src="../assets/del-icon.png">&nbsp;删除</span>&nbsp;&nbsp;&nbsp;
									<span class="gray" @click="editAddress(item.id)"><img src="../assets/edit-icon.png">&nbsp;编辑</span>
								</div>
							</div>
							
						</div>
						
					</div>
				</a>
			</div>
			
		</div>
    <no-data v-else-if="addressList.length == 0"></no-data>
    <!--container end-->

    <div class="footer-empty"></div>
		<div class="mint-tabbar is-fixed ecom-footer">
			<button @click="goAddApply()" class="mint-button mint-button--primary mint-button--large" style="height: 50px;border-radius: 0;background-color: #62cc94;">
				<label class="mint-button-text title-1">新增地址</label>
			</button>
		</div>

		

  </div>
</template>
<script>
import AddressService from 'services/AddressService'
import { Indicator, Toast } from 'mint-ui'
import NoData from '../components/NoData'
export default {
  components: {
    NoData
  },
  data: () => ({
    title: '',
    pageNo: 1,
    pageSize: 12,
    addressList: [],
    point: false
  }),
  created () {

  },
  mounted () {
    this.loadAddressList()
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'Mine') {
      next(vm => {
        vm.point = false
      })
    } else {
      next(vm => {
        vm.point = true
      })
    }
  },
  methods: {
    loadAddressList () {
      AddressService.loadAddressList(this.pageNo, this.pageSize).then(res => {
        this.addressList = res.t.list
      })
    },
    selectFault (index, id) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      for (let i = 0; i < this.addressList.length; i++) {
        this.addressList[i].isDefault = 0
      }
      this.addressList[index].isDefault = 1
      AddressService.setDefaultAddress(id).then(res => {
        Indicator.close()
        Toast('更改默认地址成功')
      })
    },
    delAddress (id, index) {
      AddressService.delAddress(id, index).then(res => {
        Toast('删除地址成功')
        this.addressList.splice(index, 1)
      })
    },
    editAddress (id) {
      this.$router.push({
        name: 'MineAddApply',
        query: {
          id: id
        }
      })
    },
    goAddApply () {
      this.$router.push('MineAddApply')
    },
    goOrderDo (index) {
      this.$store.state.address = this.addressList[index]
      this.$router.push('OrderDo')
    }
  }
}
</script>
