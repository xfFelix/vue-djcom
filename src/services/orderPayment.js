import xhr from './xhr/http'

/**
 * 首页资源 API
 */
class OrderPayment {
  toPayAmount (orderId, payAmount) {
    return xhr.fetch('/pay/payAmount', {
      type: 'POST',
      needAuth: true,
      data: {
        orderId: orderId,
        payAmount: payAmount
      }
    })
  }

}

// 实例化后导出，全局单例
export default new OrderPayment()
