const loginButton = document.querySelector("button");

loginButton.addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Please enter email and password");
  } else {
    alert("Login button is working");
  }
});