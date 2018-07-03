import xhr from './xhr/http'

/**
 * 我的推荐 API
 */
class RecommendService {
  /**
   * 获取钱包详细信息
   */
  loadRecommendList (id, type, pageNo, pageSize) {
    return xhr.fetch('/recommend/findRecommedList.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id,
        type: type,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
}

// 实例化后导出，全局单例
export default new RecommendService()
