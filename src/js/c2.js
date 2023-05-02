import { getId } from './utils'
window.onload = function () {
  //   console.log(getId)
  let box = getId('box')
  box.addEventListener('touchstart', (e) => {
    e.preventDefault()
  })
  box.addEventListener('touchmove', (e) => {
    console.log(e, 'touches')
    const touches = e.changedTouches[0]
    box.innerHTML = touches.pageX + ' | ' + touches.pageY
  })
}
