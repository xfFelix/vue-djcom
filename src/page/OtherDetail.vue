<template>
  <div>
    <!--container-->
    <div class="order-steps-box">
      <div class="hhxh-flex">
        <div class="flex-1 item-box step1 active">
          <div class="img-box"></div>
          <div class="name-box m-top-30">已咨询</div>
        </div>
        <div class="flex-1 item-box step2 active">
          <div class="img-box"></div>
          <div class="name-box m-top-30">处理中</div>
        </div>
        <div class="flex-1 item-box step3" :class="{active: otherDetail.afterStatus == 'replied'}">
          <div class="img-box"></div>
          <div class="name-box m-top-30">已答复</div>
        </div>
      </div>
    </div>
    <div class="hxg-container-box m-t-12">
      <div class="body-box m-t-8">
        <a class="mint-cell">
          <span class="mint-cell-mask"></span>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <div class="title-1">咨询信息</div>
            </div>
            
          </div>
        </a>
        <a class="mint-cell">
          <span class="mint-cell-mask"></span>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <div class="hhxh-flex">
                <div class="flex-0 gray" style="width: 70px;">咨询时间</div>
                <div class="flex-1">{{otherDetail.createDate}}</div>
              </div>
              <div class="hhxh-flex hhxh-vertical-top m-t-8">
                <div class=" flex-0 gray" style="width: 70px;">咨询内容</div>
                <div class="flex-1">
                  <p class="text-overflow3">{{otherDetail.applyExplain}}</p>
                </div>
              </div>
              <div class="hhxh-flex hhxh-vertical-top m-t-8">
                <div class=" flex-0 gray" style="width: 70px;">凭证图片</div>
                <div class="flex-1">
                  <img v-for="(item, index) in otherDetail.applyVouchers" :src="makePhotoUrl(item)" style="width: 80px;height: 80px;margin: 0 5px 5px 0;">
                </div>
              </div>

            </div>
            
          </div>
        </a>
        
      </div>
      <div class="body-box m-t-8" v-if="otherDetail.afterStatus == 'replied'">
        <a class="mint-cell">
          <span class="mint-cell-mask"></span>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <div class="title-1">回复信息</div>
            </div>
            
          </div>
        </a>
        <a class="mint-cell">
          <span class="mint-cell-mask"></span>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <div class="hhxh-flex">
                <div class="flex-0 gray" style="width: 70px;">回复结果</div>
                <div class="flex-1" v-if="otherDetail.afterStatus == 'apply'">申请</div>
                <div class="flex-1" v-if="otherDetail.afterStatus == 'applied'">已申请</div>
                <div class="flex-1" v-if="otherDetail.afterStatus == 'replied'">已回复</div>
              </div>
              <div class="hhxh-flex m-t-8">
                <div class="flex-0 gray" style="width: 70px;">回复时间</div>
                <div class="flex-1">{{otherDetail.dealTime}}</div>
              </div>
              <div class="hhxh-flex m-t-8">
                <div class="flex-0 gray" style="width: 70px;">回复内容</div>
                <div class="flex-1">{{otherDetail.replyInformation}}</div>
              </div>
            </div>
            
          </div>
        </a>
        
      </div>

    </div>

    <!--container end-->
  </div>
</template>
<script>
import helpers from 'utils/helpers'
import OrderService from 'services/OrderService'
export default {
  data: () => ({
    title: '',
    id: '',
    otherDetail: {}
  }),
  created () {
    if (this.$route.query.id !== undefined) {
      this.id = this.$route.query.id
    }
  },
  mounted () {
    this.searchAfterConsult()
  },
  methods: {
    searchAfterConsult () {
      OrderService.searchAfterConsult(this.id).then(res => {
        this.otherDetail = res.t
      })
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    }
  }
}
</script>
