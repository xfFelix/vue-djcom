import xhr from './xhr/http'
/**
 * 社区列表 API
 */
class SqPostService {

  /**
   * 获取社区列表
   */
  sqPostlist (id, level, logoimage) {
    return xhr.fetch('/sq/sqPostlist_1', {
      type: 'POST',
      needAuth: true,
      data: {
        materialId: id,
        level: level,
        logoimage: logoimage
      }
    })
  }
  /**
   * 获取帖子详情
   */
  sqCommentList (postlistId) {
    return xhr.fetch('/sq/sqComment?postlistId=' + postlistId, {
      type: 'POST'
    })
  }
  /**
   * 评论保存
   */
  saveSqPostlist (materialId, salesorderId, salesorderEntryId, content, describeLevel, serveLevel, attitudeLevel, logoimage) {
    return xhr.fetch('/sq/saveSqPostlist', {
      type: 'POST',
      needAuth: true,
      data: {
        materialId: materialId,
        salesorderId: salesorderId,
        salesorderEntryId: salesorderEntryId,
        content: content,
        describeLevel: describeLevel,
        serveLevel: serveLevel,
        attitudeLevel: attitudeLevel,
        logoimages: logoimage
      }
    })
  }
  /**
   * 评论数量
   */
  sqPostlistCount (id) {
    return xhr.fetch('/sq/sqPostlistCount', {
      type: 'POST',
      needAuth: true,
      data: {
        materialId: id
      }
    })
  }
  /**
   * 删除帖子
   */
  deleteSqPostlist (id) {
    return xhr.fetch('/sq/deleteSqPostlist', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }
  /**
   * 图片上传
   */
  uploadPicBase64 (base64Data, path) {
    return xhr.fetch('/sq/repair/uploadPicBase64', {
      type: 'POST',
      needAuth: true,
      data: {
        base64Data: base64Data,
        path: path
      }
    })
  }
  /**
   * 帖子点赞
   */
  saveSqPostLike (sqpostid) {
    return xhr.fetch('/sq/saveSqPostLike?sq_post_id=' + sqpostid, {
      type: 'POST',
      needAuth: true
    })
  }
  /**
   * 评论帖子
   */
  saveSqComment (postlistId, content) {
    return xhr.fetch('/sq/saveSqComment', {
      type: 'POST',
      needAuth: true,
      data: {
        postlistId: postlistId,
        content: content
      }
    })
  }
  /**
   * 评论回复
   */
  saveSqCommentReply (postlistId, parentId, content, repayId, toPostComMemId) {
    return xhr.fetch('/sq/saveSqComment', {
      type: 'POST',
      needAuth: true,
      data: {
        postlistId: postlistId,
        parentId: parentId,
        content: content,
        repayId: repayId,
        toPostComMemId: toPostComMemId
      }
    })
  }
  /**
   * 我的动态
   */
  sqMyPostlist (pageNo, pageSize) {
    return xhr.fetch('/sq/sqMyPostlist?pageNo=' + pageNo + '&pageSize=' + pageSize, {
      type: 'POST',
      needAuth: true
    })
  }
}

// 实例化后导出，全局单例
export default new SqPostService()
