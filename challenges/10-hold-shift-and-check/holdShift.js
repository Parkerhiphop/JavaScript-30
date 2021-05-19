const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

// store the last checked checkbox
let lastChecked;

function handleCheck(e) {
  let inBetween = false;
  // shiftKey -> if you hold "shift", shiftKey will be true
  // 確認你有用 shift & 是要 Check 不是 unCheck
  if (e.shiftKey) {
    if (this.checked) {
      checkboxes.forEach(checkbox => {
        // this = current click checkbox
        // and the checkbox is the lastChecked
        // 前者為當前點擊的 Checkbox（Check終點）
        // 後者為上次點擊的 checkbox（Check起點）
        // 兩者都需要 set inBetween -> 當作後面 check 的 Gate
        if (checkbox === this || checkbox === lastChecked) {
          inBetween = !inBetween;
          console.log('Starting To Check Them In Between');
        }
  
        console.log('inBetween', inBetween);
        // LOOP 所有的 Checkbox
        // inBetween 就像是一個 Gate
        // hold shift + click 後，只要沒有到當前 check 的 checkbox，inBetween 就不會被 set False
        // 只要 inBetween 還是 true，中間範圍內的 checkbox 都會被選到
        // 當超出範圍時，inBetween 會變回 false，因此不會繼續 check
        if (inBetween) {
          checkbox.checked = true;
        }
      })
    } else if (!this.checked) {
      checkboxes.forEach(checkbox => {
        if (checkbox === this || checkbox === lastChecked) {
          inBetween = !inBetween;
        }
  
        if (inBetween) {
          lastChecked.checked = false;
          checkbox.checked = false;
        }
      })
    }
  }

  // this = current click checkbox
  lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
