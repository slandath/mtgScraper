const btn = document.querySelector('#btn');
// btn.addEventListener("click", () =>
//   getListings("https://mtgscraper-production.up.railway.app/scrape")
// );

const myForm = document.querySelector("#myForm");
myForm.addEventListener("submit", logFormData)

function logFormData(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const url = "https://mtgscraper-production.up.railway.app/scrape"
  postData(url, formData)
}

async function postData(url, data) {
  const options = {
    method: 'POST',
    body: data
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const responseJson = await response.json();
    console.log("POST request successful:", responseJson);
  } catch (error) {
    console.error("POST request failed:", error);
  }
}

/*
1. Makes a FETCH GET request to the url
2. Stores the data in local storage as 'listings'
3. Triggers renderTable function
*/
async function getListings(url) {
  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error('Failed to Fetch');
    }
    const data = await response.json();
    const stringifiedData = JSON.stringify(data);
    localStorage.setItem('listings', stringifiedData);
    renderTable();
  } catch (error) {
    console.error(error);
    return error;
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

renderTable();
