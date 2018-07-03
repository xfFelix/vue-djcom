import xhr from './xhr/http'

/**
 * 增值 API
 */
class IncrementService {
  /**
   * 获取用户增值信息
   */
  loadUserIncreaseInfo () {
    return xhr.fetch('/increase/getUserIncreaseInfo', {
      type: 'POST',
      needAuth: true
    })
  }

  /**
   * 增值
   */
  increment (increaseMoney, increaseQty, cashMoney, pwd) {
    return xhr.fetch('/increase/increment.json', {
      type: 'POST',
      needAuth: true,
      data: {
        increaseMoney: increaseMoney,
        increaseQty: increaseQty,
        cashMoney: cashMoney,
        pwd: pwd
      }
    })
  }

  /**
   * 加载增值记录
   */
  loadIncrementRecordList (pageNo, pageSize) {
    return xhr.fetch('/increase/getIncreateList.json', {
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
export default new IncrementService()
