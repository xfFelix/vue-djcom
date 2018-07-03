import xhr from './xhr/http'

/**
 * 我的订单 API
 */
class OrderService {
  /**
   * 查看我的订单列表
   */
  loadOrderList (pageNo, pageSize, billStatus, postFlag) {
    return xhr.fetch('/order/findOrderList.json', {
      type: 'POST',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        billStatus: billStatus,
        postFlag: postFlag
      }
    })
  }
  /**
   * 查看我的订单详情
   */
  findOrderDetail (id) {
    return xhr.fetch('/order/findOrderDetail.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 退款申请
   */
  loadOrderDetail (id) {
    return xhr.fetch('/order/refundOrderDetail.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 直接购买时提交订单
   */
  placeOrder (attrs, materialId, qty, listPartsParam) {
    return xhr.fetch('/order/placeOrder', {
      type: 'POST',
      needAuth: true,
      data: {
        materialId: materialId,
        qty: qty,
        attrs: attrs,
        listPartsParam: listPartsParam
      }
    })
  }

  /**
   * 在购物车结算时提交订单
   */
  buyCarPlaceOrder (buyCarList) {
    return xhr.fetch('/order/buyCarPlaceOrder', {
      type: 'POST',
      needAuth: true,
      data: {
        buyCarList: buyCarList
      }
    })
  }

  /**
   * 购物车方式跳转支付
   */
  cartSaveOrder (integralPay, addressId, buyCarList) {
    return xhr.fetch('/order/cartSaveOrder.json', {
      type: 'POST',
      needAuth: true,
      data: {
        integralPay: integralPay,
        addressId: addressId,
        buyCarList: buyCarList
      }
    })
  }

  /**
   * 立即支付方式跳转支付
   */
  saveOrderHxg (integralPay, addressId, materialId, qty, attrs, listPartsParam) {
    return xhr.fetch('/material/saveOrderHxg', {
      type: 'POST',
      needAuth: true,
      data: {
        integralPay: integralPay,
        addressId: addressId,
        materialId: materialId,
        qty: qty,
        attrs: attrs,
        listPartsParam: listPartsParam
      }
    })
  }

  /**
   * 获取订单支付明细
   */
  loadOrderPayDetail (ids) {
    return xhr.fetch('/order/getPayDetail.json', {
      type: 'POST',
      needAuth: true,
      data: {
        ids: ids
      }
    })
  }

  /**
   * 订单支付
   */
  orderPay (ids, password, payType) {
    return xhr.fetch('/pay/payAccountHxg.json', {
      type: 'GET',
      needAuth: true,
      data: {
        orderId: ids,
        password: password,
        payType: payType
      }
    })
  }

  /**
   * 取消订单
   */
  cancelOrder (id) {
    return xhr.fetch('/order/cancelOrder.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 删除订单
   */
  deleteOrder (id) {
    return xhr.fetch('/order/deleteOrder.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }
  /**
   * 确认收货
   */
  ConfirmOrder (id) {
    return xhr.fetch('/order/ConfirmOrder.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }
  /**
   * 申请退货
   */
  ReturnoOrder (id) {
    return xhr.fetch('/order/ReturnoOrder.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }
  /**
   * 申请售后列表
   */
  searchSalesAfter (pageNo, pageSize) {
    return xhr.fetch('/order/searchSalesAfter', {
      type: 'POST',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
  // 查看退货状态
  searchOrderRefund (orderId) {
    return xhr.fetch('/material/searchOrderRefund?orderId=' + orderId, {
      type: 'POST'
    })
  }
  // 其他咨询-提交
  afterConsult (orderId, contents, voucher) {
    return xhr.fetch('/order/afterConsult', {
      type: 'POST',
      needAuth: true,
      data: {
        orderId: orderId,
        contents: contents,
        voucher: voucher
      }
    })
  }
  // 其他咨询-页面
  publicOrdeDetail (id) {
    return xhr.fetch('/order/publicOrdeDetail', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }
  // 其他咨询-详情
  searchAfterConsult (id) {
    return xhr.fetch('/order/searchAfterConsult', {
      type: 'POST',
      needAuth: true,
      data: {
        orderId: id
      }
    })
  }
  checkRecharge (rechargeNo) {
    return xhr.fetch('/member/checkRecharge?rechargeNo=' + rechargeNo, {
      type: 'POST',
      needAuth: true
    })
  }
  statusCount () {
    return xhr.fetch('/order/statusCount', {
      type: 'POST',
      needAuth: true
    })
  }
}
// 实例化后导出，全局单例
export default new OrderService()
