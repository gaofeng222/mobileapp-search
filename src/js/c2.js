import { getId } from './utils'
window.onload = function () {
  let wrap = getId('wrap')
  let list = getId('list')
  let lis = document.querySelectorAll('#list li')
  let css = document.querySelector('#css')
  // wrap.style.height = lis[0].offsetHeight + 'px'
  // list.style.width = lis.length + '00%'
  let navs = document.querySelectorAll('#nav span')
  let style = `#wrap{height:${lis[0].offsetHeight}px}`
  style += `#list{width:${lis.length}00%} `
  style += `#list li{width: ${(1 / lis.length) * 100}%} `
  css.innerHTML += style

  let startPoint = 0
  let startX = 0
  let maxLeft = wrap.offsetWidth - list.offsetWidth
  console.log(maxLeft, 'maxLeft')
  wrap.addEventListener('touchstart', (e) => {
    e.preventDefault()
    startPoint = e.changedTouches[0].pageX
    startX = list.offsetLeft
  })
  wrap.addEventListener('touchmove', (e) => {
    const touches = e.changedTouches[0]

    let nowPoint = e.changedTouches[0].pageX
    var dis = nowPoint - startPoint

    var left = startX + dis
    if (left > 0) {
      left = 0
    } else if (left < maxLeft) {
      left = maxLeft
    }
    list.style.left = left + 'px'
  })

  wrap.addEventListener('touchend', (e) => {
    let left1 = list.offsetLeft
    var now = Math.round(-left1 / wrap.offsetWidth)
    left1 = -now * wrap.offsetWidth
    console.log(now)
    list.style.left = left1 + 'px'

    for (let i = 0; i < navs.length; i++) {
      navs[i].className = ''
    }
    console.log(now, 'now')
    navs[now].className = 'active'
  })
}
