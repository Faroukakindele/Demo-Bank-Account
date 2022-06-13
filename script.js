/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};
const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: "Akindele Farouk",
  movements: [
    4300, 100, -700, 5000, 90000, -25000, 6000, 200, -50, 100, -3000, 5000,
    -4000, -3500, -2000,
  ],
  interestRate: 2.4,
  pin: 5555,
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

const displayMovement = function (movements, sort = false) {
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = "";
  movs.forEach(function (mov, val) {
    const depOrWith = mov > 0 ? "deposit" : "withdrawal";
    const html = `
  <div class="movements__row">
  <div class="movements__type movements__type--${depOrWith}">${
      val + 1
    } ${depOrWith}</div>
  <div class="movements__value">${mov}€</div>
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
  labelBalance.textContent = `${acc.balance}€`;
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
  labelSumIn.textContent = `${totalIncome}€`;
  labelSumOut.textContent = `${totalExpenses}€`;
  labelSumInterest.textContent = `${interest}€`;
}
const updateUI = (acc) => {
  // diplaying movement
  displayMovement(acc.movements);

  // diplaying summary
  displaySummary(acc);

  // Display acc balance
  displayAccBalance(acc);
};

// IMPLEMENTING THE USER LOGIN

let currentAccount;
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
    // diplaying the UI And hiding the login
    // navLogin.classList.add('hidden');
    containerApp.style.opacity = 1;
    // clear input field
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();

    // update UI
    // this feature shows the account balance
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
    //  removing amount from the current account
    currentAccount.movements.push(-amount);
    //  crediting the reciever account
    reciever.movements.push(amount);
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
    currentAccount.movements.push(loanAmount);
    //  reUpdate the UI
    console.log(currentAccount.movements);
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
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
