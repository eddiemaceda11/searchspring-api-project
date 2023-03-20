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
