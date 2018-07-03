import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    page: 1,
    Index: {
      swipeItems: []
    },
    footer: {
      point: '1'
    },
    popWindow: {
      popwin: false
    },
    materialDetail: {},
    orderMessage: {},  // 下单界面信息
    address: {},  // 下单界面地址信息
    materialParamter: {
      materialId: '',
      qty: 1,
      attrs: [],
      listPartsParam: []
    },
    totalMaterial: {
      index: 0,
      buyLike: false
    }
  },
  mutations: {
    savePage (state) {
      alert(state.page)
    }
  }
})

export default store
