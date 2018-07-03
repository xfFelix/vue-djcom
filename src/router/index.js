import Vue from 'vue'
import Router from 'vue-router'
import hooks from './hooks/'

import Index from '../page/Index'
import TotalMaterial from '../page/TotalMaterial'
import MaterialDetail from '../page/MaterialDetail'
import MineCart from '../page/MineCart'
import Mine from '../page/Mine'
import Share from '../page/Share'
import SharePic from '../page/SharePic'
import MemberUp from '../page/MemberUp'
import MineInfo from '../page/MineInfo'
import MineOrder from '../page/MineOrder'
import MineOrderDetail from '../page/MineOrderDetail'
import RefundApply from '../page/RefundApply'
import RefundDetail from '../page/RefundDetail'
import MineToCash from '../page/MineToCash'
import ApplyCash from '../page/ApplyCash'
import CashRecord from '../page/CashRecord'
import MineWallet from '../page/MineWallet'
import MineWalletRecord from '../page/MineWalletRecord'
import MineAddress from '../page/MineAddress'
import MineAddApply from '../page/MineAddApply'
import MineBonus from '../page/MineBonus'
import MinePoint from '../page/MinePoint'
import MineCollection from '../page/MineCollection'
import MineRecommend from '../page/MineRecommend'
import OrderDo from '../page/OrderDo'
import OrderPay from '../page/OrderPay/index'
import OrderService from '../page/OrderService'
import OtherService from '../page/OtherService'
import OtherDetail from '../page/OtherDetail'
import AddComment from '../page/AddComment'
import PaySuccess from '../page/PaySuccess'
import SwipeInfo from '../page/SwipeInfo'
import QRCode from '../page/QRCode'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/SwipeInfo',
      name: 'SwipeInfo',
      component: SwipeInfo,
      meta: {
        title: '首页轮播富文本'
      }
    },
    {
      path: '/QRCode',
      name: 'QRCode',
      component: QRCode,
      meta: {
        title: '推荐二维码'
      }
    },
    {
      path: '/TotalMaterial',
      name: 'TotalMaterial',
      component: TotalMaterial,
      meta: {
        needAuth: true,
        keepAlive: true,
        title: '商品列表'
      }
    },
    {
      path: '/MaterialDetail',
      name: 'MaterialDetail',
      component: MaterialDetail,
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/MineCart',
      name: 'MineCart',
      component: MineCart,
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: Mine,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/Share',
      name: 'Share',
      component: Share,
      meta: {
        title: '分享'
      }
    },
    {
      path: '/SharePic',
      name: 'SharePic',
      component: SharePic,
      meta: {
        title: '分享图片'
      }
    },
    {
      path: '/MemberUp',
      name: 'MemberUp',
      component: MemberUp,
      meta: {
        title: '会员升级'
      }
    },
    {
      path: '/MineInfo',
      name: 'MineInfo',
      component: MineInfo,
      meta: {
        title: '个人信息'
      }
    },
    {
      path: '/MineOrder',
      name: 'MineOrder',
      component: MineOrder,
      meta: {
        title: '订单列表',
        keepAlive: false
      }
    },
    {
      path: '/MineOrderDetail',
      name: 'MineOrderDetail',
      component: MineOrderDetail,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/RefundApply',
      name: 'RefundApply',
      component: RefundApply,
      meta: {
        title: '退款申请'
      }
    },
    {
      path: '/RefundDetail',
      name: 'RefundDetail',
      component: RefundDetail,
      meta: {
        title: '退款详情'
      }
    },
    {
      path: '/OrderService',
      name: 'OrderService',
      component: OrderService,
      meta: {
        title: '售后服务'
      }
    },
    {
      path: '/MineToCash',
      name: 'MineToCash',
      component: MineToCash,
      meta: {
        title: '提现'
      }
    },
    {
      path: '/ApplyCash',
      name: 'ApplyCash',
      component: ApplyCash,
      meta: {
        title: '申请提现'
      }
    },
    {
      path: '/CashRecord',
      name: 'CashRecord',
      component: CashRecord,
      meta: {
        title: '提现记录'
      }
    },
    {
      path: '/MineWallet',
      name: 'MineWallet',
      component: MineWallet,
      meta: {
        title: '我的账户'
      }
    },
    {
      path: '/MineWalletRecord',
      name: 'MineWalletRecord',
      component: MineWalletRecord,
      meta: {
        title: '交易记录'
      }
    },
    {
      path: '/MineAddress',
      name: 'MineAddress',
      component: MineAddress,
      meta: {
        title: '我的地址'
      }
    },
    {
      path: '/MineAddApply',
      name: 'MineAddApply',
      component: MineAddApply,
      meta: {
        title: '地址添加'
      }
    },
    {
      path: '/MineBonus',
      name: 'MineBonus',
      component: MineBonus,
      meta: {
        title: '我的红利'
      }
    },
    {
      path: '/MinePoint',
      name: 'MinePoint',
      component: MinePoint,
      meta: {
        title: '我的积分'
      }
    },
    {
      path: '/MineCollection',
      name: 'MineCollection',
      component: MineCollection,
      meta: {
        title: '我的收藏'
      }
    },
    {
      path: '/MineRecommend',
      name: 'MineRecommend',
      component: MineRecommend,
      meta: {
        title: '我的推荐'
      }
    },
    {
      path: '/OrderDo',
      name: 'OrderDo',
      component: OrderDo,
      meta: {
        title: '下订单',
        keepAlive: false
      }
    },
    {
      path: '/OrderPay/index',
      name: 'OrderPay',
      component: OrderPay,
      meta: {
        title: '支付'
      }
    },
    {
      path: '/OtherService',
      name: 'OtherService',
      component: OtherService,
      meta: {
        title: '其他咨询'
      }
    },
    {
      path: '/OtherDetail',
      name: 'OtherDetail',
      component: OtherDetail,
      meta: {
        title: '其他咨询详情'
      }
    },
    {
      path: '/AddComment',
      name: 'AddComment',
      component: AddComment,
      meta: {
        title: '发表评论'
      }
    },
    {
      path: '/PaySuccess',
      name: 'PaySuccess',
      component: PaySuccess,
      meta: {
        title: '支付成功'
      }
    }
  ]
})
hooks(router)

export default router
