import xhr from './xhr/http'

/**
 * 首页资源 API
 */
class MaterialService {
  /**
   * 商品详情
   * @return {Array}
   */
  loadMaterialDetail (id, salerType) {
    return xhr.fetch('/material/getMaterialDetail-hxg.json', {
      type: 'POST',
      data: {
        id: id,
        salerType: salerType
      }
    })
  }
  /**
   * 通过一级分录id排序
   * @return {Array}
   */
  loadMaterialList (id, sort, pageNo, pageSize) {
    return xhr.fetch('/material/findListByTypeId', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id,
        sort: sort,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
  /**
   * 配件列表
   * @return {Array}
   */
  getMaterialParts (id) {
    return xhr.fetch('/material/getMaterialParts', {
      type: 'POST',
      needAuth: true,
      data: {
        parentId: id
      }
    })
  }
  /**
   * 提交退款申请
   * @return {Array}
   */
  saveOrderRefund (orderId, refundReason, refundIntegralPay, refundPayAmount, refundWxAmount, applyVoucher, refundType) {
    return xhr.fetch('/material/saveOrderRefund', {
      type: 'POST',
      needAuth: true,
      data: {
        orderId: orderId,
        refundReason: refundReason,
        refundIntegralPay: refundIntegralPay,
        refundPayAmount: refundPayAmount,
        refundWxAmount: refundWxAmount,
        applyVoucher: applyVoucher,
        refundType: refundType
      }
    })
  }
  /**
   * 退款详情
   * @return {Array}
   */
  searchOrderRefund (id) {
    return xhr.fetch('/material/searchOrderRefund', {
      type: 'POST',
      needAuth: true,
      data: {
        orderId: id
      }
    })
  }
  /**
   * 获取店铺信息
   * @return {Array}
   */
  getInviterShopInfo (id) {
    return xhr.fetch('/material/getInviterShopInfo', {
      type: 'GET',
      needAuth: true,
      data: {
        inviter: id
      }
    })
  }
  /**
   * 店铺推荐
   * @return {Array}
   */
  findRecommend (recommend) {
    return xhr.fetch('/material/findRecommend', {
      type: 'POST',
      needAuth: true,
      data: {
        recommend: recommend
      }
    })
  }
  /**
   * 获取推客奖金
   * @return {Array}
   */
  searchRatio (id) {
    return xhr.fetch('/material/searchRatio', {
      type: 'POST',
      needAuth: true,
      data: {
        materialId: id
      }
    })
  }
}

// 实例化后导出，全局单例
export default new MaterialService()
