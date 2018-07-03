import xhr from './xhr/http'

/**
 * 银行卡管理 API
 */
class WithdrawDepositService {

  /**
   * 查看提现记录
   */
  loadWithdrawDepositRecord (pageNo, pageSize) {
    return xhr.fetch('/withdraw/getWithDrawList.json', {
      type: 'POST',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

  /**
   * 查看提现详情
   */
  findWithdrawDepositDetail (id) {
    return xhr.fetch('/withdraw/getMineWithDrawRecord.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 查看提现
   */
  getWithdrawType () {
    return xhr.fetch('/withdraw/getWithdrawType', {
      type: 'POST',
      needAuth: true
    })
  }

  /**
   * 发送验证码接口
   */
  sendSms () {
    return xhr.fetch('/transfer/send', {
      type: 'POST',
      needAuth: true
    })
  }

  /**
   * 提现
   */
  withdrawDeposit (moneyType, amount, smsCode, operatePwd) {
    return xhr.fetch('/withdraw/withdraw.json', {
      type: 'POST',
      needAuth: true,
      data: {
        moneyType: moneyType,
        amount: amount,
        smsCode: smsCode,
        operatePwd: operatePwd
      }
    })
  }
}

// 实例化后导出，全局单例
export default new WithdrawDepositService()
