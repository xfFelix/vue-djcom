import xhr from './xhr/http'

/**
 * 我的推荐 API
 */
class MineRecommendService {
  /**
   * 获取我的推荐列表
   */
  getNextOne (userName, pageNo, pageSize) {
    return xhr.fetch('/member/getNextOne.json', {
      type: 'POST',
      needAuth: true,
      data: {
        userName: userName,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
  getNextTwo (id, userName, pageNo, pageSize) {
    return xhr.fetch('/member/getNextTwo.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id,
        userName: userName,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
  getNextThree (id, userName, pageNo, pageSize) {
    return xhr.fetch('/member/getNextThree.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id,
        userName: userName,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }
  getTripleUser (status) {
    return xhr.fetch('/Triple/getTripleUser', {
      type: 'GET',
      needAuth: true,
      data: {
        status: status
      }
    })
  }
}

// 实例化后导出，全局单例
export default new MineRecommendService()
