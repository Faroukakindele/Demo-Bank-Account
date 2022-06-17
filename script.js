/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};
const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account5 = {
  owner: "Akindele Farouk",
  movements: [
    4300, 100, -700, 5000, 90000, -25000, 6000, 200, -50, 100, -3000, 5000,
    -4000, -3500, -2000,
  ],
  interestRate: 2.4,
  pin: 5555,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const navLogin = document.querySelector(".login");
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovement = function (accs, sort = false) {
  const movs = sort
    ? accs.movements.slice().sort((a, b) => a - b)
    : accs.movements;
  containerMovements.innerHTML = "";
  movs.forEach(function (mov, val) {
    const movsDate = new Date(accs.movementsDates[val])
      .toString()
      .split(" ")
      .slice(1, 4)
      .join("/ ");

    console.log(movsDate);
    const depOrWith = mov > 0 ? "deposit" : "withdrawal";
    const html = `
  <div class="movements__row">
  <div class="movements__type movements__type--${depOrWith}">${
      val + 1
    } ${depOrWith}</div>
    <div class="movements__date">${movsDate}</div>
  <div class="movements__value">${mov.toFixed(2)}€</div>
</div>   
  `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// ---------COMPUTING USERNAMES ----------
function creatingUsernames(accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((x) => x[0])
      .join("");
  });
}
creatingUsernames(accounts);

// showing the acc balance
function displayAccBalance(acc) {
  acc.balance = acc.movements.reduce((x, y) => x + y);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
}
// displayAccBalance(account1.movements);

// diplaying summmary
function displaySummary(acc) {
  //  calculating Expenses ,Income And Interest

  const totalIncome = acc.movements
    .filter((x) => x > 0)
    .reduce((x, y) => x + y, 0);
  // expensses

  const totalExpenses = acc.movements
    .filter((x) => x < 0)
    .map((x) => Math.abs(x))
    .reduce((x, y) => x + y, 0);
  const interest = acc.movements
    .filter((x) => x > 0)
    .map((x) => (x * acc.interestRate) / 100)
    .filter((x) => x > 1)
    .reduce((x, y) => x + y, 0);
  // showing the income on the UI
  labelSumIn.textContent = `${totalIncome.toFixed(2)}€`;
  labelSumOut.textContent = `${totalExpenses.toFixed(2)}€`;
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
}
const updateUI = (acc) => {
  // diplaying movement
  displayMovement(acc);

  // diplaying summary
  displaySummary(acc);

  // Display acc balance
  displayAccBalance(acc);
};

// IMPLEMENTING THE USER LOGIN

let currentAccount;
let currentDate;
btnLogin.addEventListener("click", (e) => {
  // This prevents form from submiting
  e.preventDefault();
  currentAccount = accounts.find(
    (x) => x.username === inputLoginUsername.value.toLowerCase()
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // diplaying ui and welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    } `;
    containerApp.style.opacity = 1;
    // clear input field
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();

    //  Show currentDate
    currentDate = new Date();
    const impDate = currentDate.toString().split(" ").slice(0, 5);
    labelDate.textContent = ` ${impDate[0]} ${impDate[1]} ${impDate[2]} ${
      impDate[3]
    }  ${impDate[4].slice(0, -3)}`;
    // update UI
    updateUI(currentAccount);
  }
});
//  Implementing transfer
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  let amount = Number(inputTransferAmount.value);
  let reciever = accounts.find(
    (x) => x.username === inputTransferTo.value.toLowerCase()
  );
  if (
    amount > 0 &&
    reciever &&
    currentAccount.balance >= amount &&
    reciever?.username !== currentAccount.username
  ) {
    //  removing amount from the current account and Adding the date
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date());
    //  crediting the reciever account
    reciever.movements.push(amount);
    currentAccount.movementsDates.push(new Date());
    // update UI
    updateUI(currentAccount);
  }
  reciever = amount = "";
  inputTransferTo.blur();
});

// IMPLEMENTING LOANS
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  // Getting loan amount
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    loanAmount < currentAccount.balance &&
    currentAccount.movements.some((x) => x >= loanAmount * 0.1)
  ) {
    // implementing loans
    currentAccount.movements.push(loanAmount);
    //  implementing Dates
    currentAccount.movementsDates.push(new Date());
    //  reUpdate the UI
    updateUI(currentAccount);
  }
  // clear the input field
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

// IMPLEMENTING CLOSE
btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value.toLowerCase() &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (x) => x.username === currentAccount.username
    );
    console.log(index);
    //  deletes the account
    accounts.splice(index, 1);

    //  hides the UI

    containerApp.style.opacity = 0;
    // reupdate the UI
    updateUI(currentAccount);
  }
  // clear input field
  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();
});
let sorted = false;
// btn sort
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovement(currentAccount, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
