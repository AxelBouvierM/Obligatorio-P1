let buttonLogin = document.querySelector("#sendLogin");
let buttonRegister = document.querySelector("#sendRegitration");
buttonLogin.addEventListener("click", login);
buttonRegister.addEventListener("click", register);

function login() {
  let loginUser = document.querySelector("#inputUserName").value;
  let loginPassword = document.querySelector("#inputPassword").value;
  let errorContainerLogin = document.querySelector("#errorContainerLogin");

  Object.keys(users).forEach((key) => {
    if (users[key].admin) {
      if (
        users[key].userName === loginUser &&
        users[key].userPassword === loginPassword
      ) {
        window.location.href = "admin.html";
      } else {
        errorContainerLogin.innerHTML = `<p>Usuario o contraseña incorrecta</p>`;
      }
    } else {
      if (
        users[key].userName === loginUser &&
        users[key].userPassword === loginPassword
      ) {
        window.location.href = "index.html";
      } else {
        errorContainerLogin.innerHTML = `<p>Usuario o contraseña incorrecta</p>`;
      }
    }
  });
}

function verifyEmptiness() {
  let inputName = document.querySelector("#inputName").value;
  let inputLastName = document.querySelector("#inputLastName").value;
  let inputUsername = document.querySelector("#inputUsername").value;
  let inputPasswordRegister = document.querySelector(
    "#inputPasswordRegister"
  ).value;
  let inputCreditCard = document.querySelector("#inputCreditCard").value;
  let inputCVC = document.querySelector("#inputCVC").value;

  if (
    !inputName ||
    !inputLastName ||
    !inputUsername ||
    !inputPasswordRegister ||
    !inputCreditCard ||
    !inputCVC
  ) {
    let inputs = [
      "#inputName",
      "#inputLastName",
      "#inputUsername",
      "#inputPasswordRegister",
      "#inputCreditCard",
      "#inputCVC",
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

function register() {
  let inputName = document.querySelector("#inputName").value;
  let inputLastName = document.querySelector("#inputLastName").value;
  let inputUsername = document.querySelector("#inputUsername").value;
  let inputPasswordRegister = document.querySelector("#inputPasswordRegister").value;
  let inputCreditCard = document.querySelector("#inputCreditCard").value;
  let inputCVC = document.querySelector("#inputCVC").value;
  let errorContainerRegister = document.querySelector("#errorContainerRegister");
   verifyEmptiness(inputName, )
  for (let i = 0; i < users.length; i++) {
    if (inputUsername === users) {
      errorContainerRegister.innerHTML = `Nombre de usuario ya registrado`
    } else {

    }
    
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
