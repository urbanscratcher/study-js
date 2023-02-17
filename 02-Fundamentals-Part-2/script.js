"use strict";
/* 
// Always activate strict Mode to capture visible errors

// ---32. Activating Strict Mode
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log(`I can drive :D`);

// const interface = `Audio`; //error : reserved words
// const private = 534;
// const if = 23;


// ---33. Functions
function logger() {
  console.log(`My name is Joun`);
}

// invoking / running / calling the function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
console.log(fruitProcessor(5, 0));

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const num = Number(`23`);
console.log(num);

// ---34. FUNCTION DECLARATIONS VS. EXPRESSIONS

// [Function declaration]
function calcAge1(birthYear) {
  return 2037 - birthYear;
}
const age1 = calcAge1(1989); // 먼저 선언하고 그 다음 function 선언 ok
console.log(age1);

// [Function expression]
// a function w/o a name : an anonymous function producing a value
// functions are not type but value in JS
// const age2 = calcAge2(1989);
// 이후에 function expression X
// Uncaught ReferenceError: Cannot access 'calcAge2' before initialization

const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1989);

console.log(age1, age2, age1 === age2);

// ---35. Arrow Functions

// Arrow function
// -you don't need to use {} or return
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1989);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2020 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement}`;
};

console.log(yearsUntilRetirement(1989, `Joun`));
console.log(yearsUntilRetirement(1980, `Bob`));

// ---36. FUNCTIONS CALLING OTHER FUNCTIONS
function cutFruitPieces(fruit) {
  return fruit * 3;
}

function fruitProcessor(apples, oranges) {
  // DRY principle! Don't Repeat Yourself
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges.`;
  return juice;
}

console.log(fruitProcessor(2, 3));

// ---36. REVIEW FUNCTIONS

const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${birthYear}`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    return -1;
  }
};

console.log(yearsUntilRetirement(1989, `Joun`));
console.log(yearsUntilRetirement(1970, `Mike`));

//  ---38. Coding Challenge #1
const calcAverage = function (score1, score2, score3) {
  return (score1 + score2 + score3) / 3;
};

const checkWinner = function (avgDolphines, avgKoalas) {
  if (avgDolphines >= avgKoalas * 2) {
    console.log(`Dolphines win (${avgDolphines} vs. ${avgKoalas})`);
  } else if (avgKoalas >= avgDolphines * 2) {
    console.log(`Koalas win (${avgDolphines} vs. ${avgKoalas})`);
  } else {
    console.log(`No team wins...`);
  }
};

let avgDolphines = calcAverage(44, 23, 71);
let avgKoalas = calcAverage(65, 54, 49);

checkWinner(avgDolphines, avgKoalas);

// test2
avgDolphines = calcAverage(85, 54, 41);
avgKoalas = calcAverage(23, 34, 27);
checkWinner(avgDolphines, avgKoalas);
 
// ---39. ARRAYS
// : data structure
const friend1 = `Michael`;
const friend2 = `Steven`;
const friend3 = `Peter`;

const friends = [`Michael`, `Steven`, `Peter`];
console.log(friends);

const y = new Array(1989, 1984, 2008, 2020);
console.log(y);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

// const 인데 어떻게 바꿀 수 있나?
// only primitive values are immutable
// but array is mmutable
friends[2] = `Jay`;
console.log(friends);

// but... below is illegal
// friends = [`Bob`, `Alice`];

const firstName = `Hyunjung`;
const joun = [firstName, `Joun`, 2037 - 1989, `teacher`, friends];
console.log(joun);
console.log(joun.length);

// Exercise
function calcAge(birthYear) {
  return 2037 - birthYear;
}

const years = [1989, 1967, 2002, 2010, 2018];
// console.log(calcAge(years)); // Not a Number
const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [
  calcAge(years[0]),
  calcAge(years[1]),
  calcAge(years[years.length - 1]),
];
console.log(ages);


// ---40. BASIC ARRAY OPERATIONS (METHODS)
// push: Array 끝에 요소 추가
// unshift: Array 앞에 요소 추가
const friends = [`Michael`, `Steven`, `Peter`];
const newLength = friends.push(`Jay`);
console.log(friends, newLength);

friends.unshift(`John`);
console.log(friends);

// Remove elements
// pop : Array 끝 삭제
// shift : Array 앞 삭제
friends.pop(); // Last
const popped = friends.pop(); // return 삭제된 요소
console.log(friends, popped);

const shift = friends.shift(); //First
console.log(friends, shift);

// indexOf
console.log(friends.indexOf(`Steven`));
console.log(friends.indexOf(`Bob`)); // 존재x: return -1

// includes (strict coercion)
friends.push(23);
console.log(friends.includes(`Steven`));
console.log(friends.includes(`Bob`));
console.log(friends.includes(`23`));
console.log(friends.includes(23));

if (friends.includes(`Steven`)) {
  console.log(`You have a friend called Steven`);
}

// ---41. Coding Challenge #2
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

console.log(calcTip(100));

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills);
console.log(tips);
console.log(total);


// ---42. OBJECTS
// for unstructured data w/o orders
// key(property)-value pairs

// object literal syntax
// orders doesn't matter while it matters in Arrays
const joun = {
  firstName: `Hyunjung`,
  lastName: `Joun`,
  age: 2037 - 1989,
  job: `teacher`,
  friends: [`Michael`, `Peter`, `Steven`],
};


// ---43. DOT VS. BRACKET NOTATION
const joun = {
  firstName: `Hyunjung`,
  lastName: `Joun`,
  age: 2037 - 1989,
  job: `teacher`,
  friends: [`Michael`, `Peter`, `Steven`],
};

console.log(joun);
console.log(joun.lastName); // 1. a real property name
console.log(joun[`lastName`]); // 2. using brackets to use computated results(expressions)

const nameKey = `Name`;
console.log(joun[`first` + nameKey]);
console.log(joun[`last` + nameKey]);

const interestedIn = prompt(
  `What do you want to know about Joun? Choose b/w firstName, lastName, age, job, and friends`
);

console.log(interestedIn);
// console.log(joun.interestedIn); //joun does not have a property called 'interestedIn'. so it shows undefined (a fallcy value).

if (joun[interestedIn]) {
  console.log(joun[interestedIn]);
} else {
  console.log(
    `Wrong request! Choose b/w firstName, lastName, age, job, and friends`
  );
}

joun.location = `Korea`;
joun[`twitter`] = `@urbanscratcher`;
console.log(joun);

// Challenge
console.log(
  `${joun.firstName} has ${joun.friends.length} friends, and his best friend is ${joun.friends[0]}`
);


// ---44. OBJECT METHODS
const joun = {
  firstName: `Hyunjung`,
  lastName: `Joun`,
  birthYear: 1989,
  job: `teacher`,
  friends: [`Michael`, `Peter`, `Steven`],
  hasDriversLicense: true,

  //this property holds a function value
  // calcAge: function (birthYear) {
  //   return 2037 - birthYear;
  // },

  // // this = an object who is calling the method
  // calcAge: function () {
  //   // console.log(this);
  //   return 2037 - this.birthYear;
  // },

  calcAge: function () {
    this.age = 2037 - this.birthYear; // creating a property, age
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.age}-year old ${
      this.job
    }, and he has ${this.hasDriversLicense ? `a` : `no`} driver's license`;
  },
};

console.log(joun.calcAge());
console.log(joun.calcAge());
console.log(joun.calcAge()); // heavier computation
console.log(joun.age);
console.log(joun.age);
console.log(joun.age);

console.log(joun[`calcAge`]());

// Challenge
console.log(joun.getSummary());

// Arrays are also objects
// That's why they can have methods like pop, push...


// ---45. Coding Challenge #3
const mark = {
  firstName: `Mark`,
  lastName: `Miller`,
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

const john = {
  firstName: `John`,
  lastName: `Smith`,
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

mark.calcBMI(); //should be explicitly called to calculate bmi
john.calcBMI();
console.log(mark.bmi);
console.log(john.bmi);

if (mark.bmi > john.bmi) {
  console.log(
    `${mark.firstName}'s BMI (${mark.bmi}) is higher than ${john.firstName}'s (${john.bmi})!`
  );
} else if (mark.bmi < john.bmi) {
  console.log(
    `${john.firstName}'s BMI (${john.bmi}) is higher than ${mark.firstName}'s (${mark.bmi})!`
  );
}


// ---46. ITERATION: THE FOR LOOP
// console.log(`Lifting weights repetition 1 🏋️‍♂️`);
// console.log(`Lifting weights repetition 2 🏋️‍♂️`);
// console.log(`Lifting weights repetition 3 🏋️‍♂️`);
// console.log(`Lifting weights repetition 4 🏋️‍♂️`);
// console.log(`Lifting weights repetition 5 🏋️‍♂️`);
// console.log(`Lifting weights repetition 6 🏋️‍♂️`);
// console.log(`Lifting weights repetition 7 🏋️‍♂️`);
// console.log(`Lifting weights repetition 8 🏋️‍♂️`);
// console.log(`Lifting weights repetition 9 🏋️‍♂️`);
// console.log(`Lifting weights repetition 10 🏋️‍♂️`);

// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♂️`);
}

// ---47. LOOPING ARRAYS, BREAKING AND CONTINUING
const joun = [
  `Hyunjung`,
  `Joun`,
  2037 - 1989,
  `teacher`,
  [`Michael`, `Peter`, `Steven`],
  true,
];

const types = [];
for (let i = 0; i < joun.length; i++) {
  // Reading from joun array
  console.log(joun[i], typeof joun[i]);

  // Filling types array
  // types[i] = typeof joun[i];
  types.push(typeof joun[i]);
}

console.log(types);
const years = [1989, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages);

// continue and break
console.log(`---ONLY STRINGS---`);
for (let i = 0; i < joun.length; i++) {
  if (typeof joun[i] !== `string`) continue;
  console.log(joun[i], typeof joun[i]);
}

console.log(`---BREAK WITH NUMBER---`);
for (let i = 0; i < joun.length; i++) {
  if (typeof joun[i] === `number`) break;
  console.log(joun[i], typeof joun[i]);
}


// 48. LOOPING BACKWARDS AND LOOPS IN LOOP
const joun = [
  `Hyunjung`,
  `Joun`,
  2037 - 1989,
  `teacher`,
  [`Michael`, `Peter`, `Steven`],
  true,
];

// 4, 3, ..., 0
for (let i = joun.length - 1; i >= 0; i--) {
  console.log(i, joun[i]);
}

for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`---STARTING EXERCISE ${exercise}`);

  for (let rep = 1; rep < 6; rep++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋️‍♂️`);
  }
}

// 49. THE WHILE LOOP
for (let rep = 1; rep <= 10; rep++) {
  console.log(`FOR: Lifting weights repetition ${rep} 🏋️‍♂️`);
}

// while only needs a condition : more versatile
let rep = 1;
while (rep <= 10) {
  console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♂️`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

// when you don't know how many times you have to roll the dice...
while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log(`Loop is about to end...`);
}


// 49. Coding Challeng #4
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(tip + bills[i]);
}
console.log(bills, tips, totals);

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};

console.log(calcAverage(totals));
console.log(calcAverage(tips));
*/
