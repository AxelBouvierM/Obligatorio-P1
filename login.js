
let users = {
  1: {
    admin: true,
    firstName: "Mabel",
    lastName: "Love",
    userName: "mabellove_admin",
    userEmail: "mabel.love@example.com",
    userPassword: "Love@Admin23",
    userCreditCard: "4111111111111111",
    userCVC: "245",
    creditAmount: 15000,
    milesAmount: 330,
    ID: 1,
  },
  2: {
    admin: true,
    firstName: "Susie",
    lastName: "Rhodes",
    userName: "susierhodes_admin",
    userEmail: "susie.rhodes@example.com",
    userPassword: "AdminRhodes#89",
    userCreditCard: "5500000000000004",
    userCVC: "332",
    creditAmount: 15000,
    milesAmount: 340,
    ID: 2,
  },
  3: {
    admin: false,
    firstName: "Alfred",
    lastName: "Reeves",
    userName: "alfredreeves56",
    userEmail: "alfred.reeves@example.com",
    userPassword: "Reeves*78",
    userCreditCard: "340000000000009",
    userCVC: "113",
    creditAmount: 15000,
    milesAmount: 550,
    ID: 3,
  },
  4: {
    admin: true,
    firstName: "Tom",
    lastName: "Garrett",
    userName: "tomgarrett_admin",
    userEmail: "tom.garrett@example.com",
    userPassword: "Garrett!Admin22",
    userCreditCard: "6011000000000004",
    userCVC: "809",
    creditAmount: 15000,
    milesAmount: 540,
    ID: 4,
  },
  5: {
    admin: false,
    firstName: "Isabella",
    lastName: "Warner",
    userName: "isabellawarner99",
    userEmail: "isabella.warner@example.com",
    userPassword: "Warner!45",
    userCreditCard: "4024007136512380",
    userCVC: "452",
    creditAmount: 15000,
    milesAmount: 230,
    ID: 5,
  },
  6: {
    admin: false,
    firstName: "Isabella",
    lastName: "Curtis",
    userName: "isabellacurtis88",
    userEmail: "isabella.curtis@example.com",
    userPassword: "CurtisIsabella@19",
    userCreditCard: "3530111333300000",
    userCVC: "611",
    creditAmount: 15000,
    milesAmount: 120,
    ID: 6,
  },
  7: {
    admin: true,
    firstName: "Brandon",
    lastName: "Burgess",
    userName: "brandonburgess_admin",
    userEmail: "brandon.burgess@example.com",
    userPassword: "AdminBrandon#76",
    userCreditCard: "6011000990139424",
    userCVC: "700",
    creditAmount: 15000,
    milesAmount: 422,
    ID: 7,
  },
  8: {
    admin: true,
    firstName: "Susie",
    lastName: "Simmons",
    userName: "susiesimmons_admin",
    userEmail: "susie.simmons@example.com",
    userPassword: "Simmons*Admin55",
    userCreditCard: "378282246310005",
    userCVC: "902",
    creditAmount: 15000,
    milesAmount: 452,
    ID: 8,
  },
  9: {
    admin: false,
    firstName: "Douglas",
    lastName: "Cain",
    userName: "douglascain45",
    userEmail: "douglas.cain@example.com",
    userPassword: "Douglas#94",
    userCreditCard: "4012888888881881",
    userCVC: "458",
    creditAmount: 15000,
    milesAmount: 4425,
    ID: 9,
  },
  10: {
    admin: false,
    firstName: "Jerry",
    lastName: "Armstrong",
    userName: "jerryarmstrong56",
    userEmail: "jerry.armstrong@example.com",
    userPassword: "Armstrong@2022",
    userCreditCard: "4111111111111111",
    userCVC: "132",
    creditAmount: 15000,
    milesAmount: 662,
    ID: 10,
  }  
}

localStorage.setItem('usersDatabase',JSON.stringify(users))

let buttonLogin = document.querySelector('#sendLogin')
let buttonRegister = document.querySelector('#sendRegitration')
buttonLogin.addEventListener('click', login)
buttonRegister.addEventListener('click', register)
buttonRegister.addEventListener('click', verifyEmptiness)


function login() {
  console.log(1)
  let loginUser = document.querySelector('#inputUserName').value
  let loginPassword = document.querySelector('#inputPassword').value
  let errorContainerLogin = document.querySelector("#errorContainerLogin")

  Object.keys(users).forEach(key => {
    if (users[key].admin) {
      if (users[key].userName === loginUser && users[key].userPassword === loginPassword) {
        window.location.href = 'admin.html'
      } else {
        errorContainerLogin.innerHTML = `<p>Usuario o contraseña incorrecta</p>`
      }
    } else {
      if (users[key].userName === loginUser && users[key].userPassword === loginPassword) {
        window.location.href = 'index.html'
      } else {
        errorContainerLogin.innerHTML = `<p>Usuario o contraseña incorrecta</p>`
      }
    }
  });
}

function verifyEmptiness(){
  let inputName = document.querySelector('#inputName').value
  let inputLastName = document.querySelector('#inputLastName').value
  let inputUserEmail = document.querySelector('#inputUserEmail').value
  let inputPasswordRegister = document.querySelector('#inputPasswordRegister').value
  let inputCreditCard = document.querySelector('#inputCreditCard').value
  let inputCVC = document.querySelector('#inputCVC').value

  if (!inputName || !inputLastName || !inputUserEmail || !inputPasswordRegister || !inputCreditCard || !inputCVC) {

    let inputs = [
      '#inputName',
      '#inputLastName',
      '#inputUserEmail',
      '#inputPasswordRegister',
      '#inputCreditCard',
      '#inputCVC'
    ];

    inputs.forEach(selection => {
      let input = document.querySelector(selection);
      if (input.value === "") {
        input.style.border = "1px solid red"
      } else {
        input.style.border = ""
      }
    });
  }
}

function register(){
  
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

