// import trimQs from 'UTIL/trimQs'
import $ from 'jquery'
/**
 * 不同页面间的跳转，把视图拉回顶部
 */
const scrollToTop = ({ to, from }) => {
  alert($(window).scrollTop())
  if (to.path !== from.path) {
    alert('---')
    $.scrollTo('#navbar', 500)
    alert($(window).scrollTop())
    // document.body.scrollTop = 0
    // document.documentElement.scrollTop = 0
  }
}

export default scrollToTop
