import ENV from '../services/xhr/config'
// import loginService from '../SERVICES/loginService'

export default {
  randomUrl: function (num, url) {
    return ENV.httpUrl + '/' + num + '?u=' + num + '#/' + url + '?aa=' + num
  },
  makehttpUrl: function (url) {
    return ENV.httpUrl + '/#/' + url
  },
  httpUrl: function () {
    return ENV.httpUrl
  },
  //  获取路径上的参数
  getViewParam: function () {
    var args = {}
    var query = location.search.substring(1)
    var pairs = query.split('&')
    for (var i = 0; i < pairs.length; i += 1) {
      var pos = pairs[i].indexOf('=')
      if (pos === -1) {
        continue
      }
      var argname = pairs[i].substring(0, pos)
      var value = pairs[i].substring(pos + 1)
      args[argname] = unescape(value)
    }
    return args
  },
  getParam: function () {
    var args = {}
    var end = location.hash.indexOf('?') + 1
    var query = location.hash.substring(end)
    var pairs = query.split('&')
    for (var i = 0; i < pairs.length; i += 1) {
      var pos = pairs[i].indexOf('=')
      if (pos === -1) {
        continue
      }
      var argname = pairs[i].substring(0, pos)
      var value = pairs[i].substring(pos + 1)
      args[argname] = unescape(value)
    }
    return args
  },
  // 设置cookies
  setCookie: function (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    console.info(cname + '=' + cvalue + '; ' + expires)
    document.cookie = cname + '=' + cvalue + '; ' + expires
    console.info(document.cookie)
  },
  //  获取cookie
  getCookie: function (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
  },
  //  清除cookie
  clearCookie: function () {
    this.setCookie('username', '', -1)
  },
  makePhotoUrl: function (endpoint) {
    return `${ENV.photoPreviewUrl.replace(/\/$/, '')}${endpoint}`
  },
  validateCodeUrl: function (endpoint) {
    endpoint = `/${ENV.hostEndpoint}` + endpoint
    return this.makePhotoUrl(endpoint)
  },
  // html编码
  html_encode: function (str) {
    var s = ''
    if (str.length === 0) return ''
    s = str.replace(/&/g, '&amp;')
    s = s.replace(/</g, '&lt;')
    s = s.replace(/>/g, '&gt;')
    s = s.replace(/ /g, '&nbsp;')
    s = s.replace(/'/g, '&#39;')
    s = s.replace(/"/g, '&quot;')
    s = s.replace(/\n/g, '<br>')
    return s
  },
  // html解码
  // html_decode: function (str) {
  //   var s = ''
  //   if (str.length === 0) return ''
  //   s = str.replace(/&amp;/g, '&')
  //   s = s.replace(/&lt;/g, '<')
  //   s = s.replace(/&gt;/g, '>')
  //   s = s.replace(/&nbsp;/g, ' ')
  //   s = s.replace(/&#39;/g, '\'')
  //   s = s.replace(/&quot;/g, '"')
  //   s = s.replace(/<br>/g, '\n')
  //   return s
  // },
  html_decode: function (text) {
    // 1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement('div')
    // 2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text
    // 3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
    var output = temp.innerText || temp.textContent
    temp = null
    return output
  },
  /**
   * 废弃 别用
   * 用这个 window.moment(date).format('YYYY-MM-DD HH:mm')
   * @param  {[type]} date [description]
   * @param  {[type]} fmt  [yyyy-MM-dd HH:mm:ss]
   * @return {[type]}      [description]
   */
  dateFormat: function (val, fmt) {
    const date = new Date(val)
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  },
  isLogin: function () {
    const accessToken = localStorage.getItem('accessToken')
    // const accessTokenTime = localStorage.getItem('accessTokenTime')
    // const openId = localStorage.getItem('openId')
    // const isBinding = sessionStorage.getItem('isBinding')
    // const isOut = localStorage.getItem('isOut')
    /* if (isOut === 'true') {
      // 点击过退出登录的情况
      return false
    } else {
      if (!openId) {
        if (accessToken && accessTokenTime) {
          if (Math.floor((new Date().getTime() - accessTokenTime) / 3600000) < 9) {
            return true
          }
          // else { // 这个可能没用
          //   if (typeof isLogin === 'boolean') { // 处理未绑定微信帐号的微信登录情况
          //     return isLogin
          //   }
          // }
        }
      } else { // 获取到openid
        if (isBinding === 'false') { // 处理未绑定微信帐号的微信登录情况
          return false
        } else {
          return true
        }
      }
    } */
    if (accessToken) {
      return true
    }
    return false
  },
  initHead: function (route) {
    let redirectPath = ''
    // const fullPath = this.$router.currentRoute.fullPath
    // console.info('fullPath====>' + fullPath)
    let { redirect } = route.query
    if (redirect) {
      // console.info(decodeURIComponent(redirect))
      redirectPath = decodeURIComponent(redirect)
    }
    return redirectPath
  },
  getJSON: function (url) {
    url = `${ENV.baseURL}` + url
    var promise = new Promise(function (resolve, reject) {
      var client = new XMLHttpRequest()
      client.open('GET', url)
      client.onreadystatechange = handler
      client.responseType = 'json'
      client.setRequestHeader('Accept', 'application/json')
      client.send()

      function handler () {
        if (this.readyState !== 4) {
          return
        }
        if (this.status === 200) {
          resolve(this.response)
        } else {
          reject(new Error(this.statusText))
        }
      }
    })
    return promise
  }
}
