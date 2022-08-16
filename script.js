'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-06-14T23:36:17.929Z',
    '2022-06-16T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2022-05-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Akindele Farouk',
  movements: [5000, 34000, -1500, -790, -2210, -2000, 8500, -3000],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2022-05-26T12:01:20.894Z',
  ],
  currency: 'NGN',
  locale: 'en-US',
};
const accounts = [account1, account2, account3];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const formatCurrency = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
function showDate(date, locale) {
  const calcdaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const dayspassed = calcdaysPassed(new Date(), date);
  if (dayspassed === 0) return 'today';
  if (dayspassed === 1) return 'Yesterday';
  if (dayspassed <= 7) return `${dayspassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
}
const displayMovements = function (accs, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? accs.movements.slice().sort((a, b) => a - b)
    : accs.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(accs.movementsDates[i]);
    const displayDate = showDate(date, accs.locale);
    const formmatedMovement = formatCurrency(mov, accs.locale, accs.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
       <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formmatedMovement}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;
// // Fake  always logged in
// //  Implementing current date
// const currentDate = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric',
//   year: 'numeric',
//
// };
// const locale = navigator.language;
// console.log(locale);
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
//   currentDate
// );
// Implementing the Login Function

function startLogout() {
  // setting time
  let time = 300;

  // calling timer persond
  const tick = () => {
    const min = String(Number.parseInt(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // ineach time print the remaiing time
    labelTimer.textContent = `${min}:${sec}`;

    // print the remain time

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = ` Pls Log again time out expired `;
      containerApp.style.opacity = 0;
    }
    --time;
  };

  timer = setInterval(tick, 1000);
  return timer;
}

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  // Get the current Account
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // start logout Timer
    if (timer) clearInterval(timer);
    timer = startLogout();

    // Update UI
    updateUI(currentAccount);

    // // show correct date
    // const currentDate = new Date();
    // let ImpDate = currentDate.toString().split(' ').slice(0, 5);
    // labelDate.textContent = `${ImpDate[0]} ${ImpDate[1]}  ${ImpDate[2]}  ${
    //   ImpDate[3]
    // } ${ImpDate[4].slice(0, -3)}`;

    // showing  Correct Date
    // Fake  always logged in
    //  Implementing current date
    const currentDate = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    const locale = navigator.language;
    console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(currentDate);
  }
});

// Implementing the Transfer Function
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    // Debit the currentAccount
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    //  Credit the Reciver
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  clearInterval(timer);
  timer = startLogout();
});

// Implementing the Loan Function
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loaNDate
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
  clearInterval(timer);
  timer = startLogout();
});

//  Implementing the CloseAccount Function
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

//  Implemenenting the Sorting Function
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// Adding Color to the even index Movement
btnLogin.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = '#f7f7f7';
    }
    // if (i % 3 === 0) {
    //   row.style.backgroundColor = '#f7f6';
    // }
  });
});

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES
// // NUMBERs
// console.log(23 === 23.0);
// console.log(0.1 + 0.2);
// console.log(Number('23'));
// console.log(+'23');

// // The parseInt Method
// console.log(Number.parseInt('45fascd', 10));
// console.log(parseInt('30.56px', 10));

// // The parseFloat Method
// console.log(Number.parseFloat(' 45.4e5f'));

// // The isNAN
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20'));
// console.log(Number.isNaN(23 / 0));
// console.log(Number.isNaN('Farouk'));

// // isFinite
// console.log(Number.isFinite(23));
// console.log(Number.isFinite('23'));
// console.log(Number.isFinite(+'23'));
// console.log(Number.isFinite(23 / 0));

// // isIntergers
// console.log(Number.isInteger(23));
// console.log(Number.isInteger(20 / 5));

// // Math and Rounding
// // Math.sqrt
// console.log(Math.sqrt(25));
// console.log(8 ** (1 / 3));

// // Math.Max
// console.log(Math.max(23, 4, 5, 7, 6, 78));
// // Math.min
// console.log(Math.min(1.4, 56, 67988789, 68, 789, 7));

// // Mathematical Constant
// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// console.log(Math.floor(Math.random() * 6 + 1));

// const randomInt = (max, min) =>
//   Math.trunc(Math.random() * (max - min) + 1) + min;

// console.log(randomInt(20, 10));

// // Rounding integers
// console.log(Math.trunc(34.54));
// console.log(Math.ceil(23.4));
// console.log(Math.floor(23.4));
// // negative numbers
// console.log(Math.trunc(-34.54));
// console.log(Math.floor(-23.4));
// console.log(Math.round(23.4));

// // Rounding Decimal
// console.log((2456.77457).toFixed(3));
// console.log((2.7757).toFixed(6));
// console.log((2456.457).toFixed(2));
// console.log(+(2456.457).toFixed(2));

// // The remainder operator
// console.log(5 % 2);
// console.log(8 % 3);

// const isEvenOrOdd = num => {
//   if (num % 2 === 0) {
//     console.log('even');
//   } else {
//     console.log('odd');
//   }
// };
// isEvenOrOdd(4);
// isEvenOrOdd(3);
// isEvenOrOdd(334);
// isEvenOrOdd(33 * 4);
// //
// // Numeric Seperators
// const diameter = 234_500_000;
// console.log(diameter);
// console.log(345_99);

// const transferFee = 15_00;

// const PI = 3.142_5;
// console.log(PI);

// console.log(Number('2300_000'));

// // Working with BigInt
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2345678907654325678907654325678965432);
// console.log(3n + 4n);
// // Operations with bigInt
// console.log(10034567896543678960000n * 50045678976543256789654367800000n);
// const huge = 50045678976543256789654367800000n;
// console.log(typeof 23);
// console.log(typeof 46n);

// // exceptions
// //.1 logical operators
// console.log(23n === 23);
// console.log(23n == 23);
// console.log(Number(23n));
// //.2 All Math Operations deosnt work
// console.log(huge + ' Is Really huge ');

// // divisions
// console.log(10n / 3n);

// // Dates
// // Create a Date
// const now = new Date();
// console.log(now);

// // 2
// console.log(new Date('Wed Jun 15 2022 21:21'));
// // 3
// console.log(new Date('may 20,2005'));
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2005, 4, 20));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// // Dates Methods
// const future = new Date(2037, 4, 20, 15, 23);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.toISOString());
// console.log(future.getTime());
// console.log(new Date(2126442180000));
// let currentTime = Date.now();
// console.log(currentTime);
// const dates = new Date(1655325739629);
// console.log(dates);
// // setting future years
// future.setFullYear(2100);
// console.log(future);

// const day = `${currentDate.getDate()}`.padStart(2, '0');
// const month = `${currentDate.getMonth() + 1}`.padStart(2, 0);
// const year = currentDate.getFullYear();
// const hour = currentDate.getHours();
// const min = `${currentDate.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${day}/${month}/${year} ${hour}:${min}`;

// Operations with Date
const future = new Date(2037, 4, 20, 15, 23);
console.log(+future);

const calcdaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

let day1 = calcdaysPassed(new Date(2022, 4, 29), new Date(2022, 5, 17));
console.log(day1);

// Javascript internationalization API
// formating Dates

const num = 3883445434.45;
const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  useGrouping: false,
};
console.log(options);
console.log('Us', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany', new Intl.NumberFormat('de-DE', options).format(num));
console.log('syria', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);
// The setTimeOut and SetInterVal,clearInterval
const ing = ['Olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) =>
    console.log(`here is your Pizza 🍕🍕🍕🍕 with${ing1} and ${ing}`),
  3000,
  ...ing
);
console.log('waiting...');
if (ing.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
const intervalTime = setInterval(() => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const day = now.getDate();
  console.log(`${hour}/${minute} ${day}`);
  // using my function
  const splitingMethod = now.toString().split(' ').splice(0, 5).join(' ');
  console.log(splitingMethod);
  // using the Intl Function
  const improvedDate = new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric',
    day: '2-digit',
    minute: 'numeric',
    month: 'short',
    year: 'numeric',
    second: 'numeric',
  }).format(now);
  console.log(improvedDate);
}, 1000);
clearInterval(intervalTime);
// Implementing a CountDown
