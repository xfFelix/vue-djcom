import xhr from './xhr/http'

/**
 * 我的钱包 API
 */
class MineWalletService {
  /**
   * 获取钱包详细信息
   */
  loadMineWalletDetail () {
    return xhr.fetch('/transfer/getUserAssets', {
      type: 'POST',
      needAuth: true
    })
  }
   /**
   * 推荐积分转现金积分
   */
  exchange () {
    return xhr.fetch('/member/exchange', {
      type: 'POST',
      needAuth: true
    })
  }
}

// 实例化后导出，全局单例
export default new MineWalletService()
