import helpers from '../../../utils/helpers'
import ENV from '../../../services/xhr/config'
import $ from 'jquery'
import { Toast } from 'mint-ui'
/**
 * 进入页面时进行token验证
 */
const getAccessToken = (to, from) => {
  if (helpers.getParam().token !== undefined) {
    localStorage.accessToken = helpers.getParam().token
  }
  var accessToken = localStorage.accessToken
  if (!accessToken) {
    console.info('判断是否微信环境')
    var ua = navigator.userAgent.toLowerCase()
      // 判断是否微信环境
    if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
      var code = helpers.getViewParam().code
      var inviter = helpers.getParam().inviter
      if (code) {
        if (inviter === undefined || inviter === 'undefined') {
          inviter = ''
        }
        $.ajax({
          url: `${ENV.baseURL}/member/login.json`,
          data: JSON.stringify({code: code, inviter: inviter}),
          type: 'POST',
          contentType: 'application/json',
          async: false,
          success: function (res) {
            let token = res.t
            if (token == null) {
              return
            }
            localStorage.accessToken = token
          },
          error: function () {
            Toast('用户验证失败')
          }
        })
      } else {
        var redirectUri = encodeURIComponent(window.location.href.toString())
        var uri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${ENV.appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=${inviter}#wechat_redirect`
        window.top.location.href = uri
      }
    }
  }
}

export default getAccessToken
