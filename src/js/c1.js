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
  style += `#list li{width: ${(1 / lis.length) * 100}%}`
  css.innerHTML += style

  let startPoint = 0
  let startX = 0
  let maxLeft = wrap.offsetWidth - list.offsetWidth
  let translateX = 0
  console.log(maxLeft, 'maxLeft')
  wrap.addEventListener('touchstart', (e) => {
    e.preventDefault()
    startPoint = e.changedTouches[0].pageX
    startX = translateX
  })
  wrap.addEventListener('touchmove', (e) => {
    const touches = e.changedTouches[0]
    let nowPoint = e.changedTouches[0].pageX
    var dis = nowPoint - startPoint
    translateX = startX + dis
    if (translateX > 0) {
      translateX = 0
    } else if (translateX < maxLeft) {
      translateX = maxLeft
    }
    list.style.WebkitTransform =
      list.style.transform = `translateX(${translateX}px)`
  })

  wrap.addEventListener('touchend', (e) => {
    console.log(getComputedStyle(list)['transform'])
    var now = Math.round(-translateX / wrap.offsetWidth)
    translateX = -now * wrap.offsetWidth
    console.log(translateX, 'translateX')
    list.style.WebkitTransform =
      list.style.transform = `translateX(${translateX}px)`

    for (let i = 0; i < navs.length; i++) {
      navs[i].className = ''
    }
    console.log(now, 'now')
    navs[now].className = 'active'
  })
}
