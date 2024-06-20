const myForm = document.querySelector("#myForm");
myForm.addEventListener("submit", logFormData)
/*
1. Prevents the page from reloading
2. Create a new FormData object, which contains the input(s) and value(s) from the form as key/value pairs
3. Calls postData function and passes in the URL and FormData object
*/
function logFormData(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const url = process.env.POSTURL
  postData(url, formData)
}
/*
1. Makes a FETCH POST request to the url
2. Stores the data in local storage as 'listings'
3. Triggers a page reload, which will re-render the HTML table
*/
async function postData(url, data) {
  const options = {
    method: 'POST',
    body: data
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    const stringifiedData = JSON.stringify(data);
    localStorage.clear();
    localStorage.setItem('listings', stringifiedData);
    window.location.reload();
  } catch (error) {
    console.error("POST request failed:", error);
  }
}
/*
1. Checks for 'listings' in local storage.  If not found, it returns.
2. Massages 'listings' data
3. Loops through 'listings' and creates a table row and cells for each item
4. Adds CSS styling
*/
function renderTable() {
  if (localStorage.getItem('listings') === null) {
    console.error('No Data - Please Refetch');
    return;
  }
  const data = localStorage.getItem('listings');
  const listings = JSON.parse(data);
  for (i = 0; i < listings.length; i++) {
    const parent = document.querySelector('#start');
    const row = document.createElement('tr');
    const cellOne = document.createElement('td');
    const cellTwo = document.createElement('td');
    parent.appendChild(row);
    row.appendChild(cellOne);
    row.appendChild(cellTwo);
    cellOne.innerText = listings[i].title;
    cellTwo.innerText = listings[i].price;
    cellOne.className = 'border border-black p-2';
    cellTwo.className = 'border border-black p-2';
  }
}
// Functions called on page load
renderTable();
