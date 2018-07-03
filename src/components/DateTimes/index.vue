<template>
      <p>{{time}}</p>
</template>

<script>
export default{
  data () {
    return {
      time: '',
      flag: false
    }
  },
  mounted () {
    let time = setInterval(() => {
      if (this.flag === true) {
        clearInterval(time)
      }
      this.timeDown()
    }, 500)
  },
  props: {
    endTime: {
      type: String
    },
    createTime: {
      type: String
    }
  },
  methods: {
    timeDown () {
      const endTime = this.endTime
      const nowTime = new Date()
      let leftTime = parseInt(((endTime - nowTime.getTime()) / 1000) + 86400)
      // let d = parseInt(leftTime / (24 * 60 * 60))
      let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
      let m = this.formate(parseInt(leftTime / 60 % 60))
      let s = this.formate(parseInt(leftTime % 60))
      if (leftTime <= 0) {
        this.flag = true
        this.$emit('time-end')
        this.time = '倒计时已结束'
        return
      }
      this.time = `${h}:${m}:${s}`
    },
    formate (time) {
      if (time >= 10) {
        return time
      } else {
        return `0${time}`
      }
    }
  }
}
</script>
