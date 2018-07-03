import xhr from './xhr/http'

/**
 * 认购 API
 */
class BuyService {
  /**
   * 获取账户余额(现金积分)
   */
  loadMineBalance () {
    return xhr.fetch('/transfer/getUserRemainMoney', {
      type: 'POST',
      needAuth: true
    })
  }

  /**
   * 认购
   */
  buy (subscribeMoney, cashMoney, pwd) {
    return xhr.fetch('/subscribe/subscribe.json', {
      type: 'POST',
      needAuth: true,
      data: {
        subscribeMoney: subscribeMoney,
        cashMoney: cashMoney,
        pwd: pwd
      }
    })
  }

  /**
   * 加载认购记录
   */
  loadBuyRecordList (pageNo, pageSize) {
    return xhr.fetch('/subscribe/getSubscribeList.json', {
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
export default new BuyService()
