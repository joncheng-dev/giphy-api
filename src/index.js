import $, { data } from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import apiService from "./api-service.js";

// User Interface Logic
$(document).ready(function () {
  // Search for gifs by keyword
  $("#searchKeyword").click(function () {
    const keyword = $("#keyword").val();
    $("#keyword").val("");
    const address = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${process.env.API_KEY}`;
    apiCall(address);
  });
  // Search for gifs by trending
  $("#searchTrending").click(function () {
    // Trending
    const address = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}`;
    apiCall(address);
  });
  // Search for gifs by random
  $("#searchRandom").click(function () {
    // Random
    const address = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}`;
    apiCall(address);
  });
  // Makes an API call.
  function apiCall(address) {
    let promise = apiService.getResults(address);

    promise.then(
      function (response) {
        const body = JSON.parse(response);
        getElements(body);
      },
      function (error) {
        $(".showErrors").text(
          `There was an error processing your request: ${error}`
        );
      }
    );
  }
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
