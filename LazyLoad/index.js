function lazyLoad () {
  const elms = document.querySelectorAll('img[lazy-load]')
  Array.prototype.forEach.call(elms, (item, index) => {
    if (!item.dataset.original) return
    const rect = item.getBoundingClientRect() // get elm top,right,bottom,left borders distance to viewport border
    if (rect.bottom >= 0 && rect.top < innerHeight) {
      !function () {
        const img = new Image()
        img.src = item.dataset.original
        img.onload = function () {
          item.src = img.src
        }
        item.removeAttribute('data-original') // remove the data-original attribute, next time we will not iterate
        item.removeAttribute('lazy-load')
      }()
    }
  })
}
lazyLoad() // At the beginning, yet not scrolling the screen, we should trigger the function to initialize images on
// first screen
document.addEventListener('scroll', lazyLoad)
