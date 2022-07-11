import $, { data } from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

// User Interface Logic
$(document).ready(function () {
  // Search for gif by keyword
  $("#searchKeyword").click(function () {
    const keyword = $("#keyword").val();
    $("#keyword").val("");

    let request = new XMLHttpRequest();
    // Check for accuracy.
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
  // Search for gif by trending
  $("#").click(function () {
    // Trending
  });

  // Still need spaces in between
  function getElements(response) {
    let htmlDisplay = "";
    for (let i = 0; i < response.data.length; i++) {
      htmlDisplay += `<a href="${response.data[i].images.original.url}"><img src="${response.data[i].images.original.url}" alt="${response.data[i].title}"></a>`;
    }
    $(".showResults").html(`${htmlDisplay}`);
    //  end of html display ---- alt="${response.data[i]}"
  }
});
