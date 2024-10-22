let button = document.querySelector('#sendLogin')

button.addEventListener('click', login)


function login() {
  let user = document.querySelector('#inputUserName').value
  let pwd = document.querySelector('#inputPassword').value

  if (user == 'admin') {
    window.location.href = './admin.html'
  } else {
    window.location.href = './user.html'
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginImg = document.getElementById("login-img");
  const registerSlider = document.getElementById("register-slider");
  const loginSlider = document.getElementById("login-slider");

  // Move the panel to the left when the register button is clicked
  registerSlider.addEventListener("click", function () {
    loginImg.classList.add("move-left");
    loginImg.classList.remove("move-right");
  });

  // Move the panel back to the right when the login button is clicked
  loginSlider.addEventListener("click", function () {
    loginImg.classList.add("move-right");
    loginImg.classList.remove("move-left");
  });
});