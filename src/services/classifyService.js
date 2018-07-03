/**
 * 商品分类 API
 */
class ClassifyService {
  /**
   * 获取所有商品分类
   */
  getAllMaterialType () {
    return xhr.fetch('/material/getAllMaterialType.json', {
      type: 'POST'
    })
  }

  /**
   * 获取所有商品分类
   */
  getAllMaterialType () {
    return xhr.fetch('/material/getAllMaterialType.json', {
      type: 'POST'
    })
  }
}

// 实例化后导出，全局单例
export default new ClassifyService()
