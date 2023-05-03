import { getId, cssTransform } from './utils'
// function cssTransform(el, attr, val) {
//   if (!el.transform) {
//     el.transform = {}
//   }

//   if (arguments.length > 2) {
//     el.transform[attr] = val
//     let sValue = ''
//     for (let key in el.transform) {
//       switch (key) {
//         case 'rotate':
//         case 'skewX':
//         case 'skewY':
//           sValue += `${key}(${el.transform[key]}deg) `
//           break
//         case 'translateX':
//         case 'translateY':
//           sValue += `${key}(${el.transform[key]}px) `
//           break
//         case 'scaleX':
//         case 'scaleY':
//         case 'scale':
//           sValue += `${key}(${el.transform[key]}) `
//           break
//         default:
//           break
//       }
//       console.log(sValue, 'sValue')
//     }
//     el.style.WebkitTransform = el.style.transform = sValue
//     console.log(el.transform, 'el.transform')
//   } else {
//     val = el.transform[attr]
//     // console.log(typeof val === 'undefined', 'val')
//     if (typeof val == 'undefined') {
//       if (['scale', 'scaleX', 'scaleY'].includes(attr)) {
//         val = 1
//       } else {
//         val = 0
//       }
//     }
//   }

//   return val
// }

// window.onload = function () {
//   let div = getId('div')
//   cssTransform(div, 'rotate', 45)
//   console.log(cssTransform(div, 'rotate'), '999')
//   cssTransform(div, 'scale', 2)
// }
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
  cssTransform(list, 'translateX', 0)
  console.log(maxLeft, 'maxLeft')
  wrap.addEventListener('touchstart', (e) => {
    e.preventDefault()
    startPoint = e.changedTouches[0].pageX
    startX = cssTransform(list, 'translateX')
  })
  wrap.addEventListener('touchmove', (e) => {
    const touches = e.changedTouches[0]
    let nowPoint = e.changedTouches[0].pageX
    var dis = nowPoint - startPoint
    list.style.transition = 'none'
    cssTransform(list, 'translateX', startX + dis)
    // translateX = startX + dis
    if (cssTransform(list, 'translateX') > 0) {
      //   translateX = 0
      cssTransform(list, 'translateX', 0)
    } else if (cssTransform(list, 'translateX') < maxLeft) {
      //   translateX = maxLeft
      cssTransform(list, 'translateX', maxLeft)
    }
    list.style.WebkitTransform =
      list.style.transform = `translateX(${cssTransform(list, 'translateX')}px)`
  })

  wrap.addEventListener('touchend', (e) => {
    console.log(getComputedStyle(list)['transform'])
    var now = Math.round(-cssTransform(list, 'translateX') / wrap.offsetWidth)
    // translateX = -now * wrap.offsetWidth
    list.style.transition = '.5s'
    cssTransform(list, 'translateX', -now * wrap.offsetWidth)
    // console.log(translateX, 'translateX')
    // list.style.WebkitTransform =
    //   list.style.transform = `translateX(${cssTransform(list, 'translateX')}px)`

    for (let i = 0; i < navs.length; i++) {
      navs[i].className = ''
    }
    console.log(now, 'now')
    navs[now].className = 'active'
  })
}
