export function getId(id) {
  return document.getElementById(id)
}

export function cssTransform(el, attr, val) {
  if (!el.transform) {
    el.transform = {}
  }

  if (arguments.length > 2) {
    el.transform[attr] = val
    let sValue = ''
    for (let key in el.transform) {
      switch (key) {
        case 'rotate':
        case 'skewX':
        case 'skewY':
          sValue += `${key}(${el.transform[key]}deg) `
          break
        case 'translateX':
        case 'translateY':
          sValue += `${key}(${el.transform[key]}px) `
          break
        case 'scaleX':
        case 'scaleY':
        case 'scale':
          sValue += `${key}(${el.transform[key]}) `
          break
        default:
          break
      }
      // console.log(sValue, 'sValue')
    }
    el.style.WebkitTransform = el.style.transform = sValue
    // console.log(el.transform, 'el.transform')
  } else {
    val = el.transform[attr]
    // console.log(typeof val === 'undefined', 'val')
    if (typeof val == 'undefined') {
      if (['scale', 'scaleX', 'scaleY'].includes(attr)) {
        val = 1
      } else {
        val = 0
      }
    }
  }

  return val
}
