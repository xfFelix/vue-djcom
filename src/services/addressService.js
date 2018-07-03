import xhr from './xhr/http'

/**
 * 我的地址 API
 */
class AddressService {
  /**
   * 查看我的地址列表
   */
  loadAddressList (pageNo, pageSize) {
    return xhr.fetch('/address/getMineAddress.json', {
      type: 'POST',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

  /**
   * 保存地址(修改后的地址或新增的地址)
   */
  saveAddress (id, userName, mobile, provinceId, cityId, address) {
    return xhr.fetch('/address/saveAddress.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id,
        contractPerson: userName,
        contractTel: mobile,
        proviceID: provinceId,
        cityID: cityId,
        address: address
      }
    })
  }

  /**
   * 删除地址
   */
  delAddress (ids) {
    return xhr.fetch('/address/deleteAddress.json', {
      type: 'POST',
      needAuth: true,
      data: {
        ids: ids
      }
    })
  }

  /**
   * 编辑地址
   */
  loadAddress (id) {
    return xhr.fetch('/address/getMineAddressDetail', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 设置默认地址
   */
  setDefaultAddress (id) {
    return xhr.fetch('/address/updateDefaultAddress.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  getDefaultAddress () {
    return xhr.fetch('/address/getDefalutAddress', {
      type: 'POST',
      needAuth: true
    })
  }

  /**
   * 地区列表数据
   */
  loadAreaList () {
    return xhr.fetch('/areaData/getAreaData', {
      type: 'POST',
      needAuth: true
    })
  }
}

// 实例化后导出，全局单例
export default new AddressService()
