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
    return xhr.fetch('/material/getHotMaterial.json', {
      type: 'POST'
    })
  }
  /**
   * 通过类型（1、会员专区 2、重销专区 3、积分商城 ）查看更多商品信息
   * @return {Array}
   */
  findMoreMaterialByType (type, pageNo, pageSize) {
    return xhr.fetch('/material/findMoreMaterialByType.json', {
      type: 'POST',
      data: {
        type: type,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

}

// 实例化后导出，全局单例
export default new IndexService()
