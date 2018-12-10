

//Clicking a learn more button on a post
$(".button-learn").on("click", function (event) {
  event.preventDefault();
  var id = $(this).val();
  var url = ("/post/" + id)
  window.location = url;
});

//login button
$(".login").on("click", function (event) {
  event.preventDefault();
  window.location = "/login";
})


//Search button
$("#search").submit(function (event) {
  event.preventDefault();
  var zipState = false;
  var cityState = false;
  var searchParam = $("#search_text").val();

  if ($("#zip").is(":checked")) {
    zipState = true;
  };

  if ($("#city").is(":checked")) {
    cityState = true;
  };

  if (searchParam == "") {
    console.log("empty");
    alert("Please insert a City/Zip Code to search.")
    return;
  } else {
    checkSearch(zipState, cityState, searchParam);
  };

});

function checkSearch(zipState, cityState, searchParam) {
  console.log("zipState = " + zipState);
  console.log("cityState = " + cityState);
  console.log("searchParam = " + searchParam);

  if ((zipState === true) && (cityState === true)) {
    alert("Please only search by the Zip Code OR City.");
    console.log("both true");
  } else if ((zipState === false) && (cityState === false)) {
    alert("Please check either Zip Code or City to search.");
    console.log("both false");

  } else if (zipState === true) {
    var url = ("/zip_search/" + searchParam);
    window.location = url;
  } else if (cityState === true) {
    var url = ("/city_search/" + searchParam);
    window.location = url;
  } else {
    console.log("nothing worked");
  }
};



//add button (photo upload sent through /upload api call seperately)

$("#add").submit(function (event) {
  event.preventDefault();
  //determines rating
  var rating = 0;
  if ($("#rate1").is(":checked")) {
    rating = 1;
  };
  if ($("#rate2").is(":checked")) {
    rating = 2;
  };
  if ($("#rate3").is(":checked")) {
    rating = 3;
  };
  if ($("#rate4").is(":checked")) {
    rating = 4;
  };
  if ($("#rate5").is(":checked")) {
    rating = 5;
  };

  var zipNum = Number($("#inputZip").val().trim());

  //set up object ///need to change user id for future!
  var newLocation = {
    UserID: 1,
    LocationName: $("#inputLocation").val().trim(),
    LocAddr: $("#inputAddress").val().trim(),
    City: $("#inputCity").val().trim(),
    State: $("#inputState").val().trim(),
    Zip: zipNum,
    PostText: $("#inputDescription").val().trim(),
    PostRating: rating,
    post_image: "/assets/img/post_img/" + document.getElementById("inputPhoto").files[0].name
  };

  console.log(newLocation);
  // Send the POST request.
  $.ajax("/newlocation", {
    type: "POST",
    data: newLocation
  }).then(
    function () {
      console.log("posted new location");
      // Reload the page 
      location.reload();
    }
  );
});






