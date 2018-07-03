import xhr from './xhr/http'

/**
 * 签到 API
 */
class MemberService {
  /**
   * 获取签到列表
   */
  loadSignList () {
    return xhr.fetch('/member/checkSign.json', {
      type: 'POST',
      needAuth: true
    })
  }
  /**
   * 签到
   */
  goSigned () {
    return xhr.fetch('/member/signIn.json', {
      type: 'POST',
      needAuth: true
    })
  }
  /**
   * 每天签到应得的积分
   */
  getSignConfig () {
    return xhr.fetch('/member/getSignConfig.json', {
      type: 'GET',
      needAuth: true
    })
  }
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
   * 微信分享获取签名
   */
  getShareInfo (url) {
    return xhr.fetch('/wxShare/getWxConfig', {
      type: 'GET',
      needAuth: true,
      data: {
        url: url
      }
    })
  }
  /**
   * 分享图片
   */
  sharePicture (id) {
    return xhr.fetch('/wxShare/getShareInfo', {
      type: 'GET',
      needAuth: true,
      data: {
        materialId: id
      }
    })
  }
  /**
   * 分享大图
   */
  genShareImage (id) {
    return xhr.fetch('/wxShare/genShareImage', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }
  /**
   * 获取推荐二维码的信息
   */
  getShopkeeperInfo (id) {
    return xhr.fetch('/wxShare/getShopkeeperInfo', {
      type: 'GET',
      needAuth: true
    })
  }
  /**
   * 获取用户信息
   */
  getMemberInfoSimple (url) {
    return xhr.fetch('/member/getMemberInfoSimple', {
      type: 'GET',
      needAuth: true
    })
  }
  /**
   * 保存用户信息
   */
  saveMemInfo (birthday, mobile) {
    return xhr.fetch('/member/saveMemInfo', {
      type: 'POST',
      needAuth: true,
      data: {
        birthday: birthday,
        mobile: mobile
      }
    })
  }
  /**
   * 我的积分记录
   */
  findIntegralDetail (pageNo, pageSize) {
    return xhr.fetch('/member/findIntegralDetail', {
      type: 'GET',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
  /**
   * 我的钱包
   */
  getMemAmountTotal () {
    return xhr.fetch('/member/getMemAmountTotal', {
      type: 'GET',
      needAuth: true
    })
  }
  /**
   * 会员升级
   */
  getMemLevelInfo () {
    return xhr.fetch('/member/getMemLevelInfo', {
      type: 'GET',
      needAuth: true
    })
  }
  /**
   * 会员升级所需积分接口
   */
  checkUpMemLevel () {
    return xhr.fetch('/member/getNextMemLevelInfo', {
      type: 'GET',
      needAuth: true
    })
  }
  /**
   * 会员等级升级接口
   */
  upMemLevel () {
    return xhr.fetch('/member/upMemLevel', {
      type: 'GET',
      needAuth: true
    })
  }
  /**
   * 我的交易记录
   */
  findTransRecord (pageNo, pageSize) {
    return xhr.fetch('/member/findTransRecord', {
      type: 'GET',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
  /**
   * 我的推荐
   */
  findInvitee (pageNo, pageSize) {
    return xhr.fetch('/member/findInvitee', {
      type: 'GET',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
  /**
   * 我的佣金
   */
  getUserCommission (pageNo, pageSize) {
    return xhr.fetch('/member/getUserCommission.json', {
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
export default new MemberService()
