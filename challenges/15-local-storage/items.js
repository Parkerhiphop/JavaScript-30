const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.item-list');
const clearButton = document.querySelector('.clear');
const unCheckButton = document.querySelector('.uncheck');
const checkButton = document.querySelector('.check');


// get the store values
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  // To Prevent reload when submit
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  };

  items.push(item);
  populateList(items, itemsList);

  // store it
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;

  // change the checked attr
  items[index].done = !items[index].done;

  // store the changed items
  localStorage.setItem('items', JSON.stringify(items));

  // show the changed items
  populateList(items, itemsList);
}


addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

// show the store Items
populateList(items, itemsList);

clearButton.addEventListener('click', () => {
  // You can't reassign value to constant
  // But you can set the length of array to change the value of array.
  // if length = 1, then items will keep the first value
  items.length = 0;

  // show the cleared items
  populateList(items, itemsList);
  // set the cleared items
  localStorage.setItem('items', JSON.stringify(items));
});

unCheckButton.addEventListener('click', () => {
  items.forEach((item) => (item.done = false)); // uncheck all
  // show the unChecked items
  populateList(items, itemsList);
  // set the unChecked items
  localStorage.setItem('items', JSON.stringify(items));
});

checkButton.addEventListener('click', () => {
  items.forEach((item) => (item.done = true)); // check all
  // show the checked items
  populateList(items, itemsList);
  // set the checked items
  localStorage.setItem('items', JSON.stringify(items));
});
