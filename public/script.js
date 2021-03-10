function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    window.location.href = "home.html";
}

function handleAddToyClick() {
  window.location.href = "addtoy.html";
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function addToy() {
  var title = document.getElementById("title").value;
  var estimatedValue = document.getElementById("estimated-value").value;
  var brand = document.getElementById("brand").value;
  var ageRange = document.getElementById("age-range").value;
  var description = document.getElementById("description").value;

  console.log("Title: " + title);
  console.log("Estimated value: " + estimatedValue);
  console.log("Brand: " + brand);
  console.log("Age range: " + ageRange);
  console.log("Description: " + description);
}