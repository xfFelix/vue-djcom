import xhr from './xhr/http'

/**
 * 购物车 API
 */
class CartService {
  /**
   * 查看购物车列表
   */
  loadCartList (pageNo, pageSize) {
    return xhr.fetch('/buycar/getBuyCarList.json', {
      type: 'POST',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

  /**
   * 加入购物车
   */
  addCart (attrs, materialId, qty, listPartsParam) {
    return xhr.fetch('/buycar/saveBuyCar.json', {
      type: 'POST',
      needAuth: true,
      data: {
        attrs: attrs,
        materialId: materialId,
        qty: qty,
        listPartsParam: listPartsParam
      }
    })
  }

  /**
   * 结算
   */
  checkCartList (buyCarList) {
    return xhr.fetch('/order/settleAccounts', {
      type: 'POST',
      needAuth: true,
      data: {
        buyCarList: buyCarList
      }
    })
  }

  /**
   * 删除购物车
   */
  delCart (ids) {
    return xhr.fetch('/buycar/deleteBuyCar.json', {
      type: 'POST',
      needAuth: true,
      data: {
        ids: ids
      }
    })
  }
}

// 实例化后导出，全局单例
export default new CartService()
