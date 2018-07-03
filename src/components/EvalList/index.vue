<template>
  <div>
  <!--用户评价-->
				<div class="user-commend-box m-t-12" >
					<div class="user-c-header">
						<div>评价</div>
						<div class="m-t-8 commend-classfy">
							<a :class="{active: isSelected == 1}" @click="allSqPost()">全部({{sqPostCount.count}})</a>
							<a :class="{active: isSelected == 2}" @click="imageSqPost()">有图({{sqPostCount.logoimageYes}})</a>
							<a :class="{active: isSelected == 3}" @click="goodSqPost()">好评({{sqPostCount.levelGood}})</a>
							<a :class="{active: isSelected == 4}" @click="badSqPost()">差评({{sqPostCount.levelBad}})</a>
						</div>
					</div>
					<div class="commend-container">
						<div class="item-box" v-for="item in items">
							<div class="hhxh-flex">
								<div class="flex-0">
									<img :src="makePhotoUrl(item.headImg)" class="user-img">
								</div>
								<div class="flex-1 text-overflow1 m-l-10">{{item.userName}}</div>
								<div class="flex-0 gray m-l-10">{{item.showCreateTime}}</div>
							</div>
							<div class="m-t-12" style="margin-left: 45px;">
								<div >{{item.content}}</div>
								<div class="pics m-t-8">
									<img v-for="it in item.logoimages" :src="makePhotoUrl(it)" >
								</div>
								<div class="gray m-t-8" v-if="item.classify != ''">规格型号：{{item.classify}}</div>
							</div>
						</div>
						
					</div>
				</div>
  </div>
</template>
<script>
import helpers from 'utils/helpers'
import SqPostService from 'services/SqPostService'
export default {
  data: () => ({
    title: '',
    isSelected: 1,
    id: '',
    level: '',
    logoimage: '',
    sqPostCount: {},
    count: 0,
    items: []
  }),
  created () {
    this.id = this.$route.query.id
  },
  mounted () {
    this.sqPostlistCount()
    this.allSqPost()
  },
  methods: {
    sqPostlistCount () {
      SqPostService.sqPostlistCount(this.id).then(res => {
        this.sqPostCount = res.t
      })
    },
    loadSqPostList () {
      SqPostService.sqPostlist(this.id, this.level, this.logoimage).then(res => {
        this.items = res.t.list
      })
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    imageSqPost () {
      this.logoimage = 'yes'
      this.level = ''
      this.isSelected = 2
      this.loadSqPostList()
    },
    goodSqPost () {
      this.logoimage = ''
      this.level = 'good'
      this.isSelected = 3
      this.loadSqPostList()
    },
    badSqPost () {
      this.logoimage = ''
      this.level = 'bad'
      this.isSelected = 4
      this.loadSqPostList()
    },
    allSqPost () {
      this.logoimage = ''
      this.level = ''
      this.isSelected = 1
      this.loadSqPostList()
    }
  }
}
</script>
