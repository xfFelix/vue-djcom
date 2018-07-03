import xhr from './xhr/http'

/**
 * 兑换 API
 */
class ExchangeService {
  /**
   * 获取兑换类型
   */
  getExchangeType () {
    return xhr.fetch('/exchange/getExchangeType', {
      type: 'POST',
      needAuth: true
    })
  }

  /**
   * 兑换
   */
  exchange (moneyType, amount, operatePwd) {
    return xhr.fetch('/exchange/profiteExchange.json', {
      type: 'POST',
      needAuth: true,
      data: {
        moneyType: moneyType,
        amount: amount,
        operatePwd: operatePwd
      }
    })
  }

  /**
   * 加载兑换记录
   */
  loadExchangeRecord (pageNo, pageSize) {
    return xhr.fetch('/exchange/getExchangeList.json', {
      type: 'POST',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

}

// 实例化后导出，全局单例
export default new ExchangeService()
