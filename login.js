let buttonLogin = document.querySelector("#sendLogin");
let buttonRegister = document.querySelector("#sendRegitration");
buttonLogin.addEventListener("click", login);
buttonRegister.addEventListener("click", verifyEmptiness);

let usersDatabase = JSON.parse(localStorage.getItem('usersDatabase'))

function login() {
  let inputUsername = document.querySelector("#inputUserName").value;
  let userPassword = document.querySelector("#inputPassword").value;
  let errorContainerLogin = document.querySelector("#errorContainerLogin");

  currentUser = sis.findingUser(inputUsername, userPassword)
  adminUser = sis.isAdmin(inputUsername)

  if (currentUser == false) {
    errorContainerLogin.innerHTML = `<p>Credenciales incorrectas</p>`     
  } else {
    if (adminUser == true) {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  }
}

function verifyEmptiness() {
  let inputSignUpName = qsValue("inputSignUpName")
  let inputSignUpLastName = qsValue("inputSignUpLastName")
  let inputSignUpUsername = qsValue("inputSignUpUsername")
  let inputSignUpPassword = qsValue("inputSignUpPassword")
  let inputSignUpCreditCard = qsValue("inputSignUpCreditCard")
  let inputSignUpCVC = qsValue("inputSignUpCVC")

  if (!inputSignUpName || !inputSignUpLastName || !inputSignUpUsername || !inputSignUpPassword || !inputSignUpCreditCard || !inputSignUpCVC) {
    let inputs = [
      "#inputSignUpName",
      "#inputSignUpLastName",
      "#inputSignUpUsername",
      "#inputSignUpPassword",
      "#inputSignUpCreditCard",
      "#inputSignUpCVC",
    ];

    inputs.forEach((selection) => {
      let input = document.querySelector(selection);
      if (input.value === "") {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginImg = document.getElementById("login-img");
  const registerSlider = document.getElementById("register-slider");
  const loginSlider = document.getElementById("login-slider");

  // Desliza el panel a la izquierda cuando se clickea el boton
  registerSlider.addEventListener("click", function () {
    loginImg.classList.add("move-left");
    loginImg.classList.remove("move-right");
  });

  // Desliza el panel a la derecha cuando se clickea el boton
  loginSlider.addEventListener("click", function () {
    loginImg.classList.add("move-right");
    loginImg.classList.remove("move-left");
  });
});
