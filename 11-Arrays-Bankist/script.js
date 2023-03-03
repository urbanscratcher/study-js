'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// demo site: http://bankist.netlify.app

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// Creating DOM Elements
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  // .textContent = 0;

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `;

    // 요소 삽입
    // beforeend를 사용하면 row가 반대로 나타남 -> 차곡히 쌓이는 식으로 insert
    // afterbegin은 내용 전에 insert되므로 최신 것이 위에 옴
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

const calcPrintBalance = movs => {
  const balance = movs.reduce((acc, cur) => acc + cur);
  labelBalance.textContent = `${balance}€`;
};
calcPrintBalance(account1.movements);

const createUsername = accs =>
  // mutate original array
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
createUsername(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/////////////////////////////////////////
// The Maging of Chaining Methods

/*
///////////////////////////////////////
// Coding Challenge #2

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets
// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK 😀

const calcAverageHumanAge = ages => {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + 4 * age));
  const humanAgesAdult = humanAges.filter(v => v >= 18);
  console.log(humanAgesAdult);
  return humanAgesAdult.reduce((acc, cur) => acc + cur) / humanAgesAdult.length;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

/*
///////////////////////////////////////
// Reduce Method
console.log(movements);

// accumulator -> SNOWBALL
// 0 is an initial value of accumulator
// const balance = movements.reduce((accumulator, currentValue, i, arr) => {
//   console.log(`Iteration ${i}: ${accumulator}`);
//   return accumulator + currentValue;
// }, 0);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

// traditional way
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce(
  (acc, cur) => (acc > cur ? acc : cur),
  movements[0]
);
console.log(max);
*/

/*
///////////////////////////////////////
// Filter Method
const deposits = movements.filter((mov, i, arr) => mov > 0);
console.log(movements);
console.log(deposits);

// traditional way. for-loop.
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/

/*
///////////////////////////////////////
// Computing Usernames
const createUsername = accs =>
  // mutate original array
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });

createUsername(accounts);
console.log(accounts);
*/

/*
///////////////////////////////////////
// Map Method

const eurToUsd = 1.1;
// map: functional programming. modern js
const movementUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementUSD);

// traditional way. for-loop.
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'}  ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);
*/

///////////////////////////////////////
// MEMO Data Transformations: Map, Filter, Reduce

// Map returns a new array containing the results of applying an operation on all original array elements

// Filter returns a new array containing the array elements that passed a specified test condition. returns filtered array.

// Reduce boils('reduces') all array elements down to one single value (e.g. adding all elements together). like a snowball. returns reduced value.

/*
///////////////////////////////////////
// Coding Challenge #1

// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets
// HINT: Use tools from all lectures in this section so far 😉
// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// GOOD LUCK 😀

const checkDogs = (dogsJulia, dogsKate) => {
  const correctedDogsJulia = dogsJulia.slice();
  correctedDogsJulia.splice(0, 1);
  correctedDogsJulia.splice(-2);
  //   const correctedDogsJulia = dogsJulia.slice(1, -2);
  const dogsBoth = correctedDogsJulia.concat(dogsKate);

  dogsBoth.forEach((age, i, arr) => {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};

console.log(`---- test set 1 ----`);
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log(`---- test set 2 ----`);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/*
////////////////////////////////////////////////
// forEach with Maps and Sets

// map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${_}: ${value}`);
}); // key = value, _ = conventional name for unneccesary variable
*/

/*
////////////////////////////////////////////////
// Looping Arrays: forEach

// use for-loop: to break out of loop
for (const [i, mov] of movements.entries()) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
}

console.log('------- forEach -------');
// forEach method is a higher-order function that needs a callback function
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// forEach iterates
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

*/

/*
////////////////////////////////////////////////
// The New 'at' Method

const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting the last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1)); // useful + method chaining
console.log(arr.at(-2));

console.log('jonas'.at(0));
console.log('jonas'.at(-1));
*/

/*
// Simple Array Methods

// SLICE : X mutate
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

console.log(arr.slice()); // if you want to chain
console.log([...arr]);

// SPLICE : mutate
// console.log(arr.splice(2)); // extract
arr.splice(-1);
console.log(arr);
arr.splice(1, 2); // arr[1], arr[2] deleted
console.log(arr); // extracted by splice

// REVERSE : mutate
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2); // mutated

// CONCAT : X mutate
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // spread operator

// JOIN
console.log(letters.join(' - '));
*/
