import xhr from './xhr/http'
// import xhr from './xhr'

/**
 * 登录相关 API
 */
class LoginService {

  /**
   * 发送验证码接口
   *
   * @return {[type]} [description]
   */
  getValidateCode () {
    return xhr.fetch('/validateCode?width=70&height=26', {
      type: 'POST'
    })
  }
  /**
   * 客户端登录验证
   * @param  {[type]} mobile [description]
   * @param  {[type]} code   [description]
   * @return {[type]}        [description]
   */
  memberLogin (userName, pwd, failCallback, successCallback) {
    return xhr.fetch('/member/login.json', {
      type: 'POST',
      data: {
        userName: userName,
        pwd: pwd
        // validcode: validcode
      }
    }, failCallback, successCallback)
  }
  /**
   * 发送验证码接口
   *
   * @return {[type]} [description]
   */
  sendSms (mobile) {
    return xhr.fetch('/sms/send.json', {
      type: 'POST',
      data: {
        mobile: mobile
      }
    })
  }

   /**
   * 验证用户名是否被注册
   *
   * @return {[type]} [description]
   */
  checkUserName (reuserName) {
    return xhr.fetch('/member/checkUserName', {
      type: 'GET',
      data: {
        userName: reuserName
      }
    })
  }

   /**
   * 验证手机号是否被注册
   *
   * @return {[type]} [description]
   */
  checkMobile (mobile) {
    return xhr.fetch('/member/checkMobile', {
      type: 'GET',
      data: {
        mobile: mobile
      }
    })
  }

     /**
   * 验证验证码是否有效
   *
   * @return {[type]} [description]
   */
  checkMobileCode (mobile, mobileCode) {
    return xhr.fetch('/member/checkMobileCode', {
      type: 'GET',
      data: {
        mobile: mobile,
        mobileCode: mobileCode
      }
    })
  }

   /**
   * 验证邀请码是否有效
   *
   * @return {[type]} [description]
   */
  checkinviteCode (inviteCode) {
    return xhr.fetch('/member/checkInviteCode', {
      type: 'GET',
      data: {
        inviteCode: inviteCode
      }
    })
  }
  /**
   * 注册用户
   *
   * @return {[type]} [description]
   */

  loginRegister (mobile, code, repwd, inviteCode, realName, reuserName, bspwd, idType, IdNo) {
    return xhr.fetch('/member/register.json', {
      type: 'POST',
      data: {
        mobile: mobile,
        mobileCode: code,
        pwd: repwd,
        inviteCode: inviteCode,
        realName: realName,
        userName: reuserName,
        operatePwd: bspwd,
        idType: idType,
        idNo: IdNo
      }
    })
  }

  realName (realName, idType, IdNo) {
    return xhr.fetch('/member/realName.json', {
      type: 'POST',
      needAuth: true,
      data: {
        realName: realName,
        idType: idType,
        idNo: IdNo
      }
    })
  }
    /**
   * 注册商家
   *
   * @return {[type]} [description]
   */
  loginRegisterShang (mobile, pwd, realName, userName, operatePwd, idType, idNo, status) {
    return xhr.fetch('/seller/register.json', {
      type: 'POST',
      data: {
        mobile: mobile,
        pwd: pwd,
        inviteCode: realName,
        userName: userName,
        operatePwd: operatePwd,
        idType: idType,
        idNo: idNo,
        status: status
      }
    })
  }
  /**
   * 微信授权后自动登录
   *
   * @param  {[type]} code [description]
   * @return {[type]}        [description]
   */
  getAccessToken (code) {
    return xhr.fetch('/wechatlogin/getAccessToken.json', {
      type: 'POST',
      data: {
        code: code
      }
    })
  }

  /**
   * 根据openId自动登录
   * @param  {[type]} openId [description]
   * @return {[type]}        [description]
   */
  autoLogin (openId) {
    return xhr.fetch('/wechatlogin/autoLogin.json', {
      type: 'POST',
      data: {
        openId: openId
      }
    })
  }

  /**
   * 手机登录
   * @param  {[type]} mobile [description]
   * @param  {[type]} mobileCode [description]
   * @return {[type]}        [description]
   */
  photoLogin (mobile, mobileCode) {
    return xhr.fetch('/member/phoneRegister', {
      type: 'POST',
      data: {
        mobile: mobile,
        mobileCode: mobileCode
      }
    })
  }
  /**
   * 是否实名认证
   */
  isRealName () {
    return xhr.fetch('/member/isRealName', {
      type: 'POST',
      needAuth: true
    })
  }
}

// 实例化后导出，全局单例
export default new LoginService()
