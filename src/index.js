import $ from "jquery";
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

  function getElements(response) {
    for (let i = 0; i <= 50; i++) {
      $(".showResults").text(`${response.data[i].id}`);
    }
  }
});
