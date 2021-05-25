const shadowArea = document.querySelector('.shadowArea');
const shadowText = shadowArea.querySelector('.shadowText');

const walk = 500; // 500px

function shadow(e) {
  const { offsetWidth: width, offsetHeight: height } = shadowArea;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
  
  // Offsetting it from (-250, -250) to (250, 250)
  // (mouse point / window width) * width - (width / 2)
  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  // 左上、右上、左下、右上(順時針)
  // 左上、右上、左下、右上(逆時針)
  shadowText.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(200, 0, 0, 0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0, 200, 0, 0.7),
    ${xWalk}px ${yWalk * -1}px 0 rgba(0, 0, 200, 0.7),
    ${xWalk * -1}px ${yWalk * -1}px 0 rgba(200, 200, 0, 0.7),
    ${yWalk}px ${xWalk}px 0 rgba(0, 200, 200, 0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(200, 0, 200, 0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0, 0, 0, 0.7),
    ${yWalk * -1}px ${xWalk * -1}px 0 rgba(200, 200, 200, 0.7)
  `;

}

shadowArea.addEventListener('mousemove', shadow);
