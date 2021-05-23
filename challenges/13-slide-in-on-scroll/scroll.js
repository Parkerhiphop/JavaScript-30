// Scroll event will trigger frequently
// Collapse them for better performance.
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    // this -> the listener itself
    // argument -> event detail, like scroll here.
    var context = this, args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) { //
        func.apply(context, args);
      }
    };

    // 20 毫秒內，timeout 都會有值，因為還沒被 later set null
    // 所以 20 毫秒內 callNow 會是 false，下方也就不會執行程式了
    var callNow = immediate && !timeout;

    // 清除 setTimeout
    clearTimeout(timeout);

    // 20 毫秒後執行 later();
    timeout = setTimeout(later, wait);

    if (callNow) {
      // 重複使用定義好的 onSlide
      // 同時繼承 window 的值和 scroll event 的參數
      func.apply(context, args);
    }
  }
}

const sliderImages = document.querySelectorAll('.slide-in');

function onSlide() {
  sliderImages.forEach((sliderImage, index) => {
    // half way through the image -> 滑到 1/3 時就讓它顯示
    const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height * 1 / 3);

    // bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    // 滑到一半了沒？
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    // 滑超過了沒？
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(onSlide));
