import $, { data } from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

// User Interface Logic
$(document).ready(function () {
  // Search for gifs by keyword
  $("#searchKeyword").click(function () {
    const keyword = $("#keyword").val();
    $("#keyword").val("");

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${process.env.API_KEY}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();
  });
  // Search for gifs by trending
  $("#searchTrending").click(function () {
    // Trending
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();
  });
  // Search for gifs by random
  $("#searchRandom").click(function () {
    // Random
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();
  });
  // Parses data and selects images to display to HTML
  function getElements(response) {
    let htmlDisplay = "";
    if (response.data.length > 1) {
      for (let i = 0; i < response.data.length; i++) {
        htmlDisplay += `<a href="${response.data[i].images.original.url}"><img src="${response.data[i].images.original.url}" alt="${response.data[i].title}"></a>`;
      }
    } else {
      htmlDisplay += `<a href="${response.data.images.original.url}"><img src="${response.data.images.original.url}" alt="${response.data.title}"></a>`;
    }
    $(".showResults").html(`${htmlDisplay}`);
  }
});
