import xhr from './xhr/http'

/**
 * 我的收藏 API
 */
class CollectService {
  /**
   * 查看我的收藏列表
   */
  loadCollectList (pageNo, pageSize) {
    return xhr.fetch('/buyLike/getBuyLikeList.json', {
      type: 'POST',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

  /**
   * 加入我的收藏
   */
  saveBuyLike (id) {
    return xhr.fetch('/buyLike/saveBuyLike.json', {
      type: 'POST',
      needAuth: true,
      data: {
        materialId: id
      }
    })
  }

  /**
   * 删除我的收藏
   */
  deleteBuyLike (ids) {
    return xhr.fetch('/buyLike/deleteBuyLike.json', {
      type: 'POST',
      needAuth: true,
      data: {
        ids: ids
      }
    })
  }

  /**
   * 删除我的收藏
   */
  deleteBuyLikeOne (id) {
    return xhr.fetch('/buyLike/deletebuyLikeOne.json', {
      type: 'POST',
      needAuth: true,
      data: {
        materialId: id
      }
    })
  }

  /**
   * 商品查询时判断用户是否已经收藏
   */
  selectMaterialId (id) {
    return xhr.fetch('/buyLike/selectMaterialId.json', {
      type: 'POST',
      needAuth: true,
      data: {
        materialId: id
      }
    })
  }
}

// 实例化后导出，全局单例
export default new CollectService()
