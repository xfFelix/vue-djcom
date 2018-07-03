import xhr from './xhr/http'

/**
 * 银行卡管理 API
 */
class BankCardService {

  /**
   * 查看个人银行卡
   */
  loadMineBankCardList (pageNo, pageSize) {
    return xhr.fetch('/bankCard/getMineBankCard.json', {
      type: 'POST',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

  /**
   * 查看银行卡选项
   */
  getAllBankCardSelect () {
    return xhr.fetch('/bankCard/getAllBankCardSelect', {
      type: 'POST',
      needAuth: true
    })
  }

  /**
   * 添加银行卡
   */
  addBankCard ({bank, city, bankBranch, userName, bankAccount, operatePwd}) {
    return xhr.fetch('/bankCard/saveBankCard.json', {
      type: 'POST',
      needAuth: true,
      data: {
        bank: bank,
        city: city,
        bankBranch: bankBranch,
        userName: userName,
        bankAccount: bankAccount,
        operatePwd: operatePwd
      }
    })
  }

  /**
   * 解绑银行卡
   */
  unbindBankCard (id, operatePwd) {
    return xhr.fetch('/bankCard/unbindBankCard.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id,
        operatePwd: operatePwd
      }
    })
  }
}

// 实例化后导出，全局单例
export default new BankCardService()
