import xhr from './xhr/http'

/**
 * 商品 API
 */
class GoodsService {
  /**
   * 商品详情(折扣商品，积分商品)
   */
  getGoodsDetail (GoodsId) {
    return xhr.fetch('/material/getMaterialDetail.json', {
      type: 'POST',
      data: {
        id: GoodsId
      }
    })
  }
  getGoodsDetailhxg (GoodsId, GoodType, buyId) {
    return xhr.fetch('/material/getMaterialDetail-hxg.json', {
      type: 'POST',
      data: {
        id: GoodsId,
        salerType: GoodType,
        buyId: buyId
      }
    })
  }
  getGoodsRecommend () {
    return xhr.fetch('/material/getHotMaterial.json', {
      type: 'POST'
    })
  }
  getGoodsTypeList () {
    return xhr.fetch('/material/getAllMaterialType.json', {
      type: 'POST'
    })
  }
  saveOrderHxg (attrs, addressId, goodsId, goodsNumber, goodsColor, goodsSize, goodsType, amount, orderType, purchaseId) {
    return xhr.fetch('/material/saveOrderHxg', {
      type: 'GET',
      needAuth: true,
      data: {
        attrs: attrs,
        addressId: addressId,
        goodsId: goodsId,
        goodsNumber: goodsNumber,
        goodsColor: goodsColor,
        goodsSize: goodsSize,
        goodsType: goodsType,
        amount: amount,
        orderType: orderType,
        purchaseId: purchaseId
      }
    })
  }

  /**
   * 查看我的订单列表
   */
  loadOrderList (pageNo, pageSize, list) {
    return xhr.fetch('/order/findOrderList.json', {
      type: 'POST',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        list: list
      }
    })
  }
  updateFreeNumber (numberID, freeNumber) {
    return xhr.fetch('/material/updateFreeNumber', {
      type: 'GET',
      needAuth: true,
      data: {
        orderId: numberID,
        freeNumber: freeNumber
      }
    })
  }
  saveOrder (goodsId, goodsType, purchaseId, orderType, amount, buyId) {
    return xhr.fetch('/material/saveOrder', {
      type: 'GET',
      needAuth: true,
      data: {
        goodsId: goodsId,
        goodsType: goodsType,
        purchaseId: purchaseId,
        orderType: orderType,
        amount: amount,
        buyId: buyId
      }
    })
  }
  salerRegister (bankNumber, amount, type, pwd, payType, isQRCodePay) {
    return xhr.fetch('/member/saveRecharge', {
      type: 'GET',
      needAuth: true,
      data: {
        bankNumber: bankNumber,
        amount: amount,
        pwd: pwd,
        payType: payType,
        isQRCodePay: isQRCodePay
      }
    })
  }
  getMaterialByBigType (pageNo, pageSize, type) {
    return xhr.fetch('/material/getMaterialByBigType.json', {
      type: 'POST',
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        type: type
      }
    })
  }
  // 获取分类
  getAllBigType () {
    return xhr.fetch('/material/getAllBigType.json', {
      type: 'POST'
    })
  }
  // 获取分类下的子分类
  getMaterialOrderByType (type) {
    return xhr.fetch('/material/getMaterialOrderByType.json', {
      type: 'POST',
      data: {
        type: type
      }
    })
  }
  // 获取所有品牌
  getAllBrand () {
    return xhr.fetch('/material/getAllBrand', {
      type: 'POST'
    })
  }
  // 获取品牌下的所有商品
  getMaterialsByBrand (brandType, pageSize, pageNo) {
    return xhr.fetch('/material/getMaterialsByBrand?brandId=' + brandType + '&pageSize=' + pageSize + '&pageNo=' + pageNo, {
      type: 'POST'
    })
  }
  // 获取大分类
  getAllPMaterialType () {
    return xhr.fetch('/material/getAllPMaterialType', {
      type: 'POST'
    })
  }
  // 获取下级分类
  getAllCMaterialType (parentId, pageNo, pageSize) {
    return xhr.fetch('/material/getAllCMaterialType?parentId=' + parentId + '&pageNo=' + pageNo + '&pageSize=' + pageSize, {
      type: 'POST'
    })
  }
  // 根据分类获取商品信息
  findListByTypeId (typeId, pageSize, pageNo) {
    return xhr.fetch('/material/findListByTypeId?typeId=' + typeId + '&pageSize=' + pageSize + '&pageNo=' + pageNo, {
      type: 'POST'
    })
  }

  // 获取首页资源今天(免费领专区)
  getTimeMaterialActiveTaday () {
    return xhr.fetch('/material/getTimeMaterialActiveTaday', {
      type: 'POST'
    })
  }

  // 获取明日上新
  getTimeMaterialActiveTmday () {
    return xhr.fetch('/material/getTimeMaterialActiveTmday', {
      type: 'POST'
    })
  }
  // 获取首页下的商品信息
  getTimeMaterial (id, pageNo, pageSize) {
    return xhr.fetch('/material/getTimeMaterial?id=' + id + '&pageNo=' + pageNo + '&pageSize=' + pageSize, {
      type: 'POST'
    })
  }
  // 查询明日上新
  gettomorrow () {
    return xhr.fetch('/notice/freeTomorrow', {
      type: 'GET'
    })
  }
  // 获取商品
  adRec () {
    return xhr.fetch('/notice/adRec', {
      type: 'GET'
    })
  }
  // 搜索商品
  search (key) {
    return xhr.fetch('/material/search?key=' + key, {
      type: 'POST'
    })
  }
  // 退款
  saveOrderRefund (orderId, refundReason, refundMoney) {
    return xhr.fetch('/material/saveOrderRefund?orderId=' + orderId + '&refundReason=' + refundReason + '&refundMoney=' + refundMoney, {
      type: 'POST',
      needAuth: true
    })
  }
  // 申请退货
  saveOrderReturnGoods (orderId, refundReason, refundMoney, applyVoucher, applyLogistics, applyLogisticsNumber) {
    return xhr.fetch('/material/saveOrderReturnGoods?orderId=' + orderId + '&refundReason=' + refundReason + '&refundMoney=' + refundMoney + '&applyVoucher=' + applyVoucher + '&applyLogistics=' + applyLogistics + '&applyLogisticsNumber=' + applyLogisticsNumber, {
      type: 'POST',
      needAuth: true
    })
  }
}

// 实例化后导出，全局单例
export default new GoodsService()
