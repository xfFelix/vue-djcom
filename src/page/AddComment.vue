<template>
  <div>
  		<!--container-->
		<div class="ac-product-box hhxh-flex">
			<div class="flex-0">
				<img :src="makePhotoUrl(logoimage)" style="height: 60px;width: 60px;">
			</div>
			<div class="flex-1 text-overflow2 m-l-10">{{materialName}}</div>
		</div>
		<div class="ac-container-box1">
			<div>
				<textarea rows="5" placeholder="亲，您对这个商品满意吗？您的评价会帮助我们选择更好地商品哦~" v-model="content"></textarea>
			</div>
			<div class="add-pic clearbox">
				<img v-for="item in photoMax" :src="makePhotoUrl(item)">
				<input v-show='false' multiple="multiple" enctype="multipart" type="file" id="upload" accept="image" @change="upload">  
				<img v-show="status == true" src="../assets/add-pic.png" @click="goImage()">
			</div>
		</div>
		<div class="gray ac-header1">店铺评分</div>
		<div class="ac-container-box2">
			<div class="hhxh-flex">
				<div class="flex-0">描述相符</div>
				<div class="flex-1 text-right">
					<span v-for="(item, index) in 5" class="stare" :class="{active: describeLevel >= index+1}" @click="choiceDesc(index)"></span>
				</div>
			</div>
			<div class="hhxh-flex">
				<div class="flex-0">物流服务</div>
				<div class="flex-1 text-right">
					<span v-for="(item, index) in 5" class="stare" :class="{active: serveLevel >= index+1}" @click="choiceServe(index)"></span>
				</div>
			</div>
			<div class="hhxh-flex">
				<div class="flex-0">服务态度</div>
				<div class="flex-1 text-right">
					<span v-for="(item, index) in 5" class="stare" :class="{active: attitudeLevel >= index+1}" @click="choiceAttitu(index)"></span>
				</div>
			</div>
		</div>

		<div class="bottom-btn-box">
			<button class="mint-button mint-button--primary mint-button--large" @click="saveSqPostlist()">
				<label class="mint-button-text">发表评论</label>
			</button>
		</div>

		<!--container end

		<!--footer-->
		<!--fonter end-->
  </div>
</template>
<script>
import SqPostService from 'services/SqPostService'
import helpers from 'utils/helpers'
import {Toast, MessageBox} from 'mint-ui'
import Exif from 'exif-js'
export default {
  data: () => ({
    title: '',
    orderId: '',
    orderDetailId: '',
    materialId: '',
    materialName: '',
    logoimage: '',
    content: '',
    headerImage: '',
    status: true,
    photoMax: [],
    describeLevel: 1,
    serveLevel: 1,
    attitudeLevel: 1
  }),
  created () {
    if (this.$route.query.orderId !== undefined) {
      this.orderId = this.$route.query.orderId
    }
    if (this.$route.query.orderDetailId !== undefined) {
      this.orderDetailId = this.$route.query.orderDetailId
    }
    if (this.$route.query.materialId !== undefined) {
      this.materialId = this.$route.query.materialId
    }
    if (this.$route.query.materialName !== undefined) {
      this.materialName = this.$route.query.materialName
    }
    if (this.$route.query.logoimage !== undefined) {
      this.logoimage = this.$route.query.logoimage
    }
  },
  mounted () {

  },
  methods: {
    saveSqPostlist () {
      MessageBox.confirm('是否发表评论?').then(action => {
        SqPostService.saveSqPostlist(this.materialId, this.orderId, this.orderDetailId, this.content, this.describeLevel, this.serveLevel, this.attitudeLevel, this.photoMax).then(res => {
          Toast('发表评论成功')
          this.$router.back()
        })
      })
    },
    choiceDesc (index) {
      this.describeLevel = index + 1
    },
    choiceServe (index) {
      this.serveLevel = index + 1
    },
    choiceAttitu (index) {
      this.attitudeLevel = index + 1
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    goImage: function () {
      this.$el.querySelector('#upload').click()
    },
    upload (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      for (let i = 0; i <= files.length - 1; i++) {
        let picValue = files[i]
        this.imgPreview(picValue)
      }
    },
    imgPreview (file) {
      let self = this
      let Orientation
      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          // 判断图片是否小于100K,是就直接上传，反之压缩图片
          if (this.result.length <= (100 * 1024)) {
            self.headerImage = this.result
            self.postImg()
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              self.headerImage = data
              self.postImg()
            }
          }
        }
      }
    },
    postImg () {
      let path = 'commentImg'
      SqPostService.uploadPicBase64(this.headerImage, path).then(res => {
        this.photoMax.push(res.t[0])
        Toast('图片上传成功')
        if (this.photoMax.length === 3) {
          this.status = false
        }
      })
    },
    rotateImg (img, direction, canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方
      if (img == null) return
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step === null) {
        step = 0
      }
      if (direction === 'right') {
        step++
       // 旋转到原位置，即超过最大值
        step > 3 && (step = 0)
      } else {
        step--
        step < 0 && (step = 3)
      }
        // 旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    compress (img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
        // 瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = width * height / 4000000) > 1) {
        console.log('大于400万像素')
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
  //        铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = width * height / 1000000) > 1) {
        console.log('超过100W像素')
        count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
  //            计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation !== '' && Orientation !== 1) {
        switch (Orientation) {
          case 6:// 需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8:// 需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3:// 需要180度旋转
            this.rotateImg(img, 'right', canvas)// 转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      // 进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.3)
      console.log('压缩前：' + initSize)
      console.log('压缩后：' + ndata.length)
      console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    }
  }
}
</script>
