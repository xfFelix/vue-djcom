import xhr from './xhr/http'

/**
 * 安全管理 API
 */
class SafetyManageService {
  /**
   * 修改密码
   * type: 必填  10：修改登录密码   20修改交易密码
   * originalPwd: 原始密码
   * pwd: 新密码
   * comfirmPwd: 确认密码
   */
  modifyPwd (type, originalPwd, pwd, comfirmPwd) {
    return xhr.fetch('/member/modifyPwd.json', {
      type: 'POST',
      needAuth: true,
      data: {
        type: type,
        originalPwd: originalPwd,
        pwd: pwd,
        comfirmPwd: comfirmPwd
      }
    })
  }

  /**
   * 修改交易密码
   */
  changeOperatePwd (mobileCode, newPwd, confirmPwd) {
    return xhr.fetch('/member/modifyOperatePwd.json', {
      type: 'POST',
      needAuth: true,
      data: {
        mobileCode: mobileCode,
        newPwd: newPwd,
        confirmPwd: confirmPwd
      }
    })
  }

  /**
   * 发送验证码(根据用户名向对应的手机号发送验证码)
   */
  sendCode (userName) {
    return xhr.fetch('/member/sendCode', {
      type: 'POST',
      data: {
        userName: userName
      }
    })
  }

  /**
   * 忘记密码
   */
  forgetPwd (userName, mobileCode, newPwd, confirmPwd) {
    return xhr.fetch('/member/forgetPwd.json', {
      type: 'POST',
      data: {
        userName: userName,
        mobileCode: mobileCode,
        newPwd: newPwd,
        confirmPwd: confirmPwd
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
   * 绑定邮箱
   */
  bindEmail (email, mobileCode) {
    return xhr.fetch('/member/bindEmail.json', {
      type: 'POST',
      needAuth: true,
      data: {
        email: email,
        code: mobileCode
      }
    })
  }
  /**
   * 修改绑定手机
   */
  bindPhone (mobile, newMobileCode, newMobile, mobileCode) {
    return xhr.fetch('/member/bindPhone', {
      type: 'POST',
      needAuth: true,
      data: {
        mobile: mobile,
        newMobileCode: newMobileCode,
        newMobile: newMobile,
        mobileCode: mobileCode
      }
    })
  }
  /**
   * 绑定手机
  */
  AddPhones (newMobile, newMobileCode) {
    return xhr.fetch('/member/addPhone', {
      type: 'POST',
      needAuth: true,
      data: {
        newMobileCode: newMobileCode,
        newMobile: newMobile
      }
    })
  }
}

// 实例化后导出，全局单例
export default new SafetyManageService()
