var ENV = {
  baseURL: '/djcom',
  serverRootUrl: '/djcom',
  moduleName: 'djcom',
  version: '1.0',
  environment: process.env.NODE_ENV,
  defaultLocale: 'zh',
  apiNameSpace: 'api',
  hostEndpoint: 'djcom',
  fileUploadUrl: '',
  photoPreviewUrl: 'http://192.168.0.126:8080',
  routeRootPath: null,
  httpUrl: 'http://120.77.170.134/djcom/ecomapp',
  appid: 'wx0e6a3484de6ac151'
}

if (ENV.environment === 'development') {
  // ENV.appid = 'wx8dd6c1c5600699e8'
  ENV.baseURL = `http://192.168.0.126:8080/${ENV.hostEndpoint}/${ENV.apiNameSpace}`
}
if (ENV.environment === 'production') {
  ENV.appid = 'wx8dd6c1c5600699e8'
  ENV.hostEndpoint = 'djcom'
  ENV.httpUrl = `http://wx.iac-sdj.com/djcom/djcomapp` // 分享的链接
  ENV.photoPreviewUrl = `http://wx.iac-sdj.com/`
  ENV.baseURL = `http://wx.iac-sdj.com/${ENV.hostEndpoint}/${ENV.apiNameSpace}`
}

export default ENV
