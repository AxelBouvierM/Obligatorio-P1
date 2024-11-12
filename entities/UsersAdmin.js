const usersAdmin = [];

class UserAdmin {
  constructor(
    ID,
    firstName,
    lastName,
    userName,
    userEmail,
    userPassword,
    userCreditCard,
    userCVC,
    userBudget,
    milesAmount
  ) {
    this.ID = ID;
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

usersAdmin.push(
    new UserAdmin(
      1,
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
    new UserAdmin(
      2,
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
    new UserAdmin(
      3,
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
    new UserAdmin(
      4,
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
    new UserAdmin(
      5,
      "Chris",
      "Wilson",
      "chrisw",
      "chris.wilson@example.com",
      "chris#2023",
      "374245455400126",
      654,
      15000,
      1200
    )
  );

  console.log(usersAdmin)