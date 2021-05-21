const pressedKeys = [];
const secretCode = 'unicorn'; // length = 7

function detector(e) {
  pressedKeys.push(e.key);

  console.log(-secretCode.length - 1);
  console.log(pressedKeys.length - secretCode.length);

  // limit the pressedKeys length to 7
  // splice(i, n, value?) -> 從 index=i 的地方刪掉 n 個值，有的話再插入 value
  // 概念為 if pressedKeys.length === secretCode 時，把值加進來擠掉第一個值

  // -secretCode.length - 1
  // 負數是倒著數過來，且不算 0
  // 用負數的意義在於，唯有 pressedKeys 到達 secretCode 的長度時，splice 才能取得到值，也才能開始刪值
  // 以這邊來說 index -8 = 倒過來數 8個值 的第一個值，而長度限制為 7 時，當有辦法數第 8 個值就該刪東西了

  // 而我們每次都只要刪一個值，這樣寫會在 pressedKeys 的長處 多於 secretCode 時，才會是正數，也就能開始刪值且只會刪一個值
  // pressedKeys 到達 8 個時， pressedKeys - secretCode(7) 才會餘 1
  // 也因此才會刪掉一個值
  pressedKeys.splice(-secretCode.length - 1, pressedKeys.length - secretCode.length);
  console.log(pressedKeys);

  if (pressedKeys.join('').includes(secretCode)) {
    console.log('DING DING!');
    cornify_add();
  }
  console.log(pressedKeys);
}

window.addEventListener('keyup', (e) => detector(e));