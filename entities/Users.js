const users = [];

class User {
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

const user1 = new User(
  1,
  "Mabel",
  "Love",
  "mabellove12",
  "mabel.love@example.com",
  "Love@Love23",
  "4111111111111111",
  "245",
  15000,
  330
);
const user2 = new User(
  2,
  "Susie",
  "Rhodes",
  "susierhodes44",
  "susie.rhodes@example.com",
  "Love@Rhodes#89",
  "5500000000000004",
  "332",
  15000,
  340
);
const user3 = new User(
  3,
  "Alfred",
  "Reeves",
  "alfredreeves56",
  "alfred.reeves@example.com",
  "Reeves*78",
  "340000000000009",
  "113",
  15000,
  550
);
const user4 = new User(
  4,
  "Isabella",
  "Warner",
  "isabellawarner99",
  "isabella.warner@example.com",
  "Warner!45",
  "4024007136512380",
  "452",
  15000,
  230
);
const user5 = new User(
  5,
  "Douglas",
  "Cain",
  "douglascain45",
  "douglas.cain@example.com",
  "Douglas#94",
  "4012888888881881",
  "458",
  15000,
  4425
);

usersAdmin.push(user1, user2, user3, user4, user5);
