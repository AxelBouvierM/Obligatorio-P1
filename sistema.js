class Sistema {
  constructor() {
    this.users = [];
    this.preLoadData();
  }

  preLoadData() {
    this.users.push(
        new User(true, "John", "Doe", "johndoe32", "password123", "4111111111111111", 123, 15000, 1500)
      );
      this.users.push(
        new User(true, "Jane", "Smith", "janesmith22", "securepass456", "5500000000000004", 456, 15000, 2000)
      );
      this.users.push(
        new User(true, "Mike", "Johnson", "mikej12", "mike2023", "340000000000009", 789, 15000, 800)
      );
      this.users.push(
        new User(true, "Emily", "Davis", "emilyd33", "emily!789", "6011000000000004", 321, 15000, 1000)
      );
      this.users.push(
        new User(true, "Chris", "Wilson", "chrisw23", "chris#2023", "374245455400126", 654, 15000, 1200)
      );
      this.users.push(
        new User(false, "Mabel", "Love", "mabellove12", "Love@312", "4111111111111111", 245, 15000, 330)
      );
      this.users.push(
        new User(false, "Susie", "Rhodes", "susierhodes44", "Love@Rhodes#89", "5500000000000004", 332, 15000, 340)
      );
      this.users.push(
        new User(false, "Alfred", "Reeves", "alfredreeves56", "Reeves*78", "340000000000009", 113, 15000, 550)
      );
      this.users.push(
        new User(false, "Isabella", "Warner", "isabellawarner99", "Warner!45", "4024007136512380", 452, 15000, 230)
      );
      this.users.push(
        new User(false, "Douglas", "Cain", "douglascain45", "Douglas#94", "4012888888881881", 458, 15000, 4425)
    );
  }
  /**
   * Funcion para buscar un usuario en el objeto de usuarios.
   * @param {string} username 
   * @param {string} password 
   * @returns booleano - true si el usuario fue encontrado, false si no. Ademas crea un array con los datos del usuario loggeado y lo guarda en el local storage. 
   */
  findingUser(username, password) {
    let wasUserFound = false;
    this.users.forEach(User => {
      if (User.userName === username && User.userPassword === password) {
        this.userLoggedDetails(username);
        wasUserFound = true;
      }
    });
    return wasUserFound;
  }
  
  /**
   * Funcion para buscar si es admin y redirigir acordemenete.
   * @param {string} username 
   * @returns booleano - admin = true, cliente = false.
   */

  isAdmin(username) {
    const user = this.users.find(user => user.userName === username);
    return user ? user.admin === true : false;
  }

  registerUser(firstName, lastName, userName, userPassword, userCreditCard, userCVC) {
    this.users.push(new User(false, firstName, lastName, userName, userPassword, userCreditCard, userCVC, 15000, 0));
    this.userLoggedDetails(userName);
    localStorage.setItem('usersDatabase',JSON.stringify(this.users))
  }

  findUsername (username){
    let isNew = true;
    this.users.forEach(User => {
      if (User.userName === username) {
        isNew = false;
      }
    });
    return isNew;
  }

  userLoggedDetails (username){
    let user = this.users.find(user => user.userName === username);
    let userLogged = {
      logged: true,
      isAdmin: user.admin,
      firstName: user.firstName,
      username: user.userName,
      pwd: user.userPassword,
      userID: user.id,
    }
    localStorage.setItem('userLoggedIn', JSON.stringify(userLogged));
  }
  
}

document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("usersDatabase")) {
    localStorage.setItem("usersDatabase", JSON.stringify(sis.users));
  }
});

const sis = new Sistema();
