let button = document.querySelector('#buttonLogin')

button.addEventListener('click', login)


function login() {
    let user = document.querySelector('#inputUserName').value
    let pwd = document.querySelector('#inputPassword').value

    if (user == 'admin') {
        window.location.href = 'admin.html'
    } else {
        window.location.href = 'user.html'
    }
}