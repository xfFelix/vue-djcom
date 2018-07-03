<template>
  <div>
  <!--container-->
		<div class="m-order-list-box">
			<div class="m-t-12">
				<a class="mint-cell" v-for="(item, index) in materialList">
					<span class="mint-cell-mask"></span> 
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div class="hhxh-flex">
								<div class="flex-0 m-r-10"><img :src="makePhotoUrl(item.logoimage)" style="width: 80px;height: 80px;"></div>
								<div class="flex-1">
									<div class="text-overflow2">{{item.name}}</div>
									<div class="m-t-12 hhxh-flex">
										<div class="flex-1 gray">{{item.classify}}
										</div>
										<div class="flex-0 gray"><i class="title-small">Χ</i>&nbsp;&nbsp;<span class="title-0">{{item.qty}}</span></div>
									</div>
									<div class="m-t-8 title-small1 red">￥<span class="title-4">{{item.price.toFixed(2)}}</span></div>
								</div>
							</div>
						</div>
						
					</div>
				</a>
			</div>
			<div class="m-t-12">
				<a class="mint-cell mint-field">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-value">
							<div class="mint-cell-value">
								<textarea placeholder="咨询内容" rows="3" class="mint-field-core" v-model="contents"></textarea>
							</div>
						</div>
					</div>
				</a>
			</div>
			<div class="m-t-12">
				<a class="mint-cell">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title">
							<div>
								<div >上传凭证</div>
								<div class="m-t-12 clearbox refund-add-pic">
									<img v-for="item in photoMax" :src="makePhotoUrl(item)">
									<input v-show='false' multiple="multiple" enctype="multipart" type="file" id="upload" accept="image" @change="upload">
									<img v-show="status == true" src="../assets/add-pic.png" @click="goImage()">
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>

		<!--container end-->

		<!--footer-->
		<div class="djkj-footer-empty" style="height: 48px;"></div>
		<div class="mint-tabbar is-fixed">
			<div class="p-footer-box hhxh-flex" style="width: 100%;">
				<div class="flex-1 text-center buy-box1" style="padding: 0 15px;" @click="afterConsult()">提交申请</div>
			</div>
		</div>
		<!--fonter end-->
  </div>
</template>
<script>
import helpers from 'utils/helpers'
import Exif from 'exif-js'
import SqPostService from 'services/SqPostService'
import OrderService from 'services/OrderService'
import {Toast} from 'mint-ui'
export default {
  data: () => ({
    title: '',
    id: '', // 订单ID
    contents: '',
    status: true,
    photoMax: [],
    materialList: []
  }),
  created () {
    if (this.$route.query.id !== undefined) {
      this.id = this.$route.query.id
    }
  },
  mounted () {
    this.publicOrdeDetail()
  },
  methods: {
    publicOrdeDetail () {
      OrderService.publicOrdeDetail(this.id).then(res => {
        this.materialList = res.t
      })
    },
    afterConsult () {
      OrderService.afterConsult(this.id, this.contents, this.photoMax).then(res => {
        this.$router.push({
          name: 'OtherDetail',
          query: {
            id: this.id
          }
        })
      })
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
      let path = 'consultImg'
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
