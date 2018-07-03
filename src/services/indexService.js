import xhr from './xhr/http'

/**
 * 首页资源 API
 */
class IndexService {
  /**
   * 轮播资源
   * @return {Array}
   */
  loadSwipeItems () {
    return xhr.fetch('/notice/turnlist.json')
  }
  /**
   * 一级分类
   * @return {Array}
   */
  loadFirstEntry (model) {
    return xhr.fetch('/material/getAllPMaterialType', {
      type: 'POST',
      data: {
        model: model
      }
    })
  }
  /**
   * 特惠商品
   * @return {Array}
   */
  loadHotMaterial (pageNo, pageSize, type) {
    return xhr.fetch('/material/getHotMaterial.json', {
      type: 'POST',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        type: type
      }
    })
  }
  wxLogin (code, invite) {
    return xhr.fetch('member/login.json', {
      type: 'POST',
      data: {
        code: code,
        invite: invite
      }
    })
  }
  getWxShareIntegral () {
    return xhr.fetch('/wxShare/getWxShareIntegral.json', {
      type: 'GET',
      needAuth: true
    })
  }
  payWeixin (id, payAmount) {
    return xhr.fetch('/pay/payWeixin', {
      type: 'POST',
      needAuth: true,
      data: {
        orderId: id,
        payAmount: payAmount
      }
    })
  }
  /**
   * 轮播图片跳转详情数据
   * @param  {String} id
   * @return {String}
   */
  // loadSwipeInfo (id) {
  //   return xhr.fetch('/page/turnContent.json', {
  //     type: 'POST',
  //     data: {
  //       id: id
  //     }
  //   })
  // }
  /**
   * 获取首页商品
   * @return {Array}
   */
  loadHomeGoods () {
    return xhr.fetch('/goods/getAllGoods', {
      type: 'POST'
    })
  }

  /**
   * 获取广告
   */
  loadAdvertising () {
    return xhr.fetch('/notice/advertising.json', {
      type: 'POST'
    })
  }
}

// 实例化后导出，全局单例
export default new IndexService()
