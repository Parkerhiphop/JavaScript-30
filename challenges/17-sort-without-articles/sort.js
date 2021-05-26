const sortButton = document.querySelector('.sort');

const bands = [
  'The Plot in You',
  'The Devil Wears Prada',
  'Pierce the Veil',
  'Norma Jean',
  'The Bled',
  'Say Anything',
  'The Midway State',
  'We Came as Romans',
  'Counterparts',
  'Oh, Sleeper',
  'A Skylit Drive',
  'Anywhere But Here',
  'An Old Dog',
];

let bandList = bands;

// remove articles
function strip(bandName) {
  return bandName.replace(/^(a |the |an )/i, '').trim();
}

function populateList(list = []) {
  document.querySelector('#bands').innerHTML =
  list
    .map(item => `<li>${item}</li>`)
    .join(''); // array.toString() will join with ',' by default
}

// initialValues
populateList(bandList);

const sortedBands = bands.slice().sort((a, b) => strip(a) > strip(b) ? 1 : -1);

let isSorted = false;

sortButton.addEventListener('click', () => {
  isSorted = !isSorted;

  bandList = isSorted ? sortedBands : bands;

  sortButton.textContent = isSorted ? 'Unsort!' : 'Sort!';

  // update the values
  populateList(bandList);
});
