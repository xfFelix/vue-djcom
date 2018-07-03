import xhr from './xhr/http'

/**
 * 账户信息 API
 */
class MineInfoService {
  /**
   * 账户信息加载
   */
  loadMineInfo () {
    return xhr.fetch('/member/getMemberInfo', {
      type: 'GET',
      needAuth: true
    })
  }

  /**
   * 退出
   */
  loginOut () {
    return xhr.fetch('/member/logout', {
      type: 'POST',
      needAuth: true
    })
  }

  /**
   * 保存用户信息
   */
  saveMineInfo (headImage, qq, weiXin, weiBo, wangWang, taoBao, nickname) {
    return xhr.fetch('/member/saveMineInfo', {
      type: 'POST',
      needAuth: true,
      data: {
        headImage: headImage,
        qq: qq,
        weiXin: weiXin,
        weiBo: weiBo,
        wangWang: wangWang,
        taoBao: taoBao,
        nickname: nickname
      }
    })
  }
}

// 实例化后导出，全局单例
export default new MineInfoService()
