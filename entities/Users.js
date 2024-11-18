let IDauto = 0;

class User {
  constructor(
    admin,
    firstName,
    lastName,
    userName,
    userEmail,
    userPassword,
    userCreditCard,
    userCVC,
    userBudget,
    milesAmount,
  ) {
    this.admin = admin;
    IDauto++;
    this.id = IDauto;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.userCreditCard = userCreditCard;
    this.userCVC = userCVC;
    this.userBudget = userBudget;
    this.milesAmount = milesAmount;
    this.reservations = [];
  }
}

users.push(
  new User(
    true,
    "John",
    "Doe",
    "johndoe",
    "john.doe@example.com",
    "password123",
    "4111111111111111",
    123,
    15000,
    1500
  ),
  new User(
    true,
    "Jane",
    "Smith",
    "janesmith",
    "jane.smith@example.com",
    "securepass456",
    "5500000000000004",
    456,
    15000,
    2000
  ),
  new User(
    true,
    "Mike",
    "Johnson",
    "mikej",
    "mike.johnson@example.com",
    "mike2023",
    "340000000000009",
    789,
    15000,
    800
  ),
  new User(
    true,
    "Emily",
    "Davis",
    "emilyd",
    "emily.davis@example.com",
    "emily!789",
    "6011000000000004",
    321,
    15000,
    1000
  ),
  new User(
    true,
    "Chris",
    "Wilson",
    "chrisw",
    "chris.wilson@example.com",
    "chris#2023",
    "374245455400126",
    654,
    15000,
    1200
  ),
  new User(
    false,
    "Mabel",
    "Love",
    "mabellove12",
    "mabel.love@example.com",
    "Love@Love23",
    "4111111111111111",
    "245",
    15000,
    330
  ),
  new User(
    false,
    "Susie",
    "Rhodes",
    "susierhodes44",
    "susie.rhodes@example.com",
    "Love@Rhodes#89",
    "5500000000000004",
    "332",
    15000,
    340
  ),
  new User(
    false,
    "Alfred",
    "Reeves",
    "alfredreeves56",
    "alfred.reeves@example.com",
    "Reeves*78",
    "340000000000009",
    "113",
    15000,
    550
  ),
  new User(
    false,
    "Isabella",
    "Warner",
    "isabellawarner99",
    "isabella.warner@example.com",
    "Warner!45",
    "4024007136512380",
    "452",
    15000,
    230
  ),
  new User(
    false,
    "Douglas",
    "Cain",
    "douglascain45",
    "douglas.cain@example.com",
    "Douglas#94",
    "4012888888881881",
    "458",
    15000,
    4425
  ),
);

document.addEventListener("DOMContentLoaded", function () {
  localStorage.setItem('usersDatabase', JSON.stringify(users))
});


