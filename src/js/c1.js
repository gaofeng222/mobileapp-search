import { getId } from './utils'
window.onload = function () {
  //   console.log(getId)

  let wrap = getId('wrap')
  let scroll = getId('scroll')
  let startPoint = 0
  let startEle = 0
  console.log(wrap.clientHeight, 'wrap.clientHeight')
  console.log(scroll.clientHeight, 'scroll.clientHeight')
  let maxTop = wrap.clientHeight - scroll.clientHeight
  wrap.addEventListener('touchstart', (e) => {
    e.preventDefault()
    var touches = e.changedTouches[0]
    startPoint = touches.pageY
    startEle = scroll.offsetTop
  })
  wrap.addEventListener('touchmove', (e) => {
    // console.log(e, 'touches')
    const touches = e.changedTouches[0]
    const nowPoint = touches.pageY
    let dis = nowPoint - startPoint
    console.log(dis, 'dis')
    let top = startEle + dis
    if (top > 0) {
      top = 0
    } else if (top < maxTop) {
      top = maxTop
    }
    scroll.style.top = top + 'px'
    console.log(top, 'top')
  })
}
