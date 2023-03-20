// Global Variables
const btn = document.querySelector("#btn");
const gridDisplay = document.getElementById("grid-display");
let logo = document.querySelector(".logo");
let search = document.getElementById("search");

const results = document.querySelector(".results");
const resultsMessage = document.querySelector(".results-text-display");

const nextPageBtns = document.querySelectorAll(".next-page");
const prevPageBtns = document.querySelectorAll(".prev-page");

let data;
let currentPage = 1;

// Variables for nav image items
const imgLink1 = document.getElementById("1");
const imgLink2 = document.getElementById("2");
const imgLink3 = document.getElementById("3");
const imgLink4 = document.getElementById("4");
const imgLink5 = document.getElementById("5");

// Renders the results to the page after the user searches
// or clicks on a valid search link
async function renderResults(value) {
  // check to see if search input is a page number
  currentPage = search.value === Number ? search.value : 1;

  // Display results, and search result text
  results.classList.remove("hidden");
  resultsMessage.textContent = value;

  // Hide prev button if search result is the 1st page
  if (currentPage === 1) {
    prevPageBtns.forEach((btn) => {
      btn.style.display = "none";
    });
    nextPageBtns.forEach((btn) => {
      btn.style.display = "block";
    });
  }

  let html = "";

  // Make a call to the Searchspring API
  const response = await fetch(`http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=${value}&resultsFormat=native&page=${currentPage}`);
  data = await response.json();
  data.results.forEach((result) => {
    // CONDITIONALs
    // If product has msrp and its greater than price,
    // add proper style to msrp and price

    // If product image returns empty/error, display a default image
    if (result.msrp && result.msrp > result.price) {
      html += `
        <div class="card">
          <img class="card-img" src=${result.thumbnailImageUrl} onerror="this.onerror=null;this.src='img/404_page_cover.jpg';" />
          <h3 class="item-name">${result.name}</h3>
          <div class="card-pricing">
            <p style="text-decoration: line-through;">$${result.msrp}.00</p>
            <p style="color: red; font-weight: 700;">$${result.price}.00</p>
            <i class="fa-solid fa-cart-shopping" id="add-to-cart"></i>
          </div>
        </div>
      `;
    } else {
      // If price is greater than or equal to msrp,
      // do not display msrp
      html += `
        <div class="card">
          <img class="card-img" src=${result.thumbnailImageUrl} onerror="this.onerror=null;this.src='img/404_page_cover.jpg';" />
          <h3 class="item-name">${result.name}</h3>
          <div class="card-pricing">
          <p style="font-weight: 700;">$${result.price}.00</p>
            <i class="fa-solid fa-cart-shopping" id="add-to-cart"></i>
          </div>
        </div>
      `;
    }
  });

  // Clear previous grid container results
  gridDisplay.innerHTML = "";
  // Add new result cards to grid container
  gridDisplay.innerHTML += html;
  // If total pages of search results = 1, hide the prev/next button
  if (data.pagination.totalPages === 1) {
    hideButtons();
  }

  // If search result is invalid, display invalid message
  if (gridDisplay.innerHTML === "") {
    resultsMessage.textContent = "No Results Found";
    hideButtons();
  }
  // Scroll to results section
  scroll();
  return data;
}

// Renders the results to the page after the pagination
async function renderPaginationResults(value) {
  let html = "";
  // Checks to see whether prev or next pagination
  // button was clicked, and updates current page
  // accordingly
  let pagination = value.classList.contains("next-page") ? (data.pagination.currentPage += 1) : (data.pagination.currentPage -= 1);
  console.log(pagination);

  const response = await fetch(`http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=${resultsMessage.textContent}&resultsFormat=native&page=${pagination}`);
  data = await response.json();
  data.results.forEach((result) => {
    // CONDITIONALs
    // If product has msrp and its greater than price,
    // add proper style to msrp and price

    // If product image returns empty/error, display a default image
    if (result.msrp && result.msrp > result.price) {
      html += `
          <div class="card">
            <img class="card-img" src=${result.thumbnailImageUrl} onerror="this.onerror=null;this.src='img/404_page_cover.jpg';" />
            <h3 class="item-name">${result.name}</h3>
            <div class="card-pricing">
              <p style="text-decoration: line-through;">$${result.msrp}.00</p>
              <p style="color: red; font-weight: 700;">$${result.price}.00</p>
              <i class="fa-solid fa-cart-shopping" id="add-to-cart"></i>
            </div>
          </div>
        `;
    } else {
      // If price is greater than or equal to msrp,
      // do not display msrp
      html += `
          <div class="card">
            <img class="card-img" src=${result.thumbnailImageUrl} onerror="this.onerror=null;this.src='img/404_page_cover.jpg';" />
            <h3 class="item-name">${result.name}</h3>
            <div class="card-pricing">
            <p style="font-weight: 700;">$${result.price}.00</p>
              <i class="fa-solid fa-cart-shopping" id="add-to-cart"></i>
            </div>
          </div>
        `;
    }
  });
  // Clear previous grid container results
  gridDisplay.innerHTML = "";
  // Add new result cards to grid container
  gridDisplay.innerHTML += html;
  // Scroll to results section
  scroll();
  return data;
}
