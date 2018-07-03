import xhr from './xhr/http'

/**
 * 转账 API
 */
class TransferService {
  /**
   * 获取钱包数据
   */
  loadMineWallet () {
    return xhr.fetch('/transfer/getUserMoney', {
      type: 'POST',
      needAuth: true
    })
  }

  /**
   * 用户校验
   */
  valicateUser (name) {
    return xhr.fetch('/transfer/valicateUser.json', {
      type: 'POST',
      needAuth: true,
      data: {
        name: name
      }
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
   * 转账
   */
  transfer (name, amount, type, mobileCode, pwd, remarks) {
    return xhr.fetch('/transfer/transfer.json', {
      type: 'POST',
      needAuth: true,
      data: {
        name: name,
        amount: amount,
        type: type,
        mobileCode: mobileCode,
        pwd: pwd,
        remarks: remarks
      }
    })
  }

  /**
   * 加载转账记录
   * type: 转出-1   转入1
   */
  loadTransferRecordList (type, pageNo, pageSize) {
    return xhr.fetch('/transfer/getTransferList.json', {
      type: 'POST',
      needAuth: true,
      data: {
        type: type,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

}

// 实例化后导出，全局单例
export default new TransferService()
