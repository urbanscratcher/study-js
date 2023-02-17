/* 
// ---10. VALUES AND VARIABLES---
let js = "amazing";
if (js === "amazing") alert("JavaScript is FUN!");
console.log("hello world");

// ---12. DATA TYPES---
true;
console.log(true);
console.log(false);

// typeof
console.log("----------typeof---------");
console.log(typeof true); // boolean : good to make a decision
console.log(typeof 123); //number
console.log(typeof "text"); //text
console.log(typeof Joun); //undefined

// Dynamic Typing
console.log("----------dynamic typing---------");
let javascriptIsFun = true;
console.log(typeof javascriptIsFun + " -> boolean");
console.log("javascriptIsFun: " + javascriptIsFun);
javascriptIsFun = "YES!";
console.log("javascriptIsFun: " + javascriptIsFun);

// when you declare an empty variable : undefined
let year;
console.log("year: " + year);
console.log(typeof year);

year = 1989;
console.log(typeof year);
console.log(typeof null); //object (but actually it is not!!!!);

 

// ---13. LET, CONST, VAR
// mutable variable (can be reassigned)
let age = 30;
age = 31;

// immutable variable
// : the value should not be changed
const birthYear = 1989;
// birthYear = 1989; // illegal (immutable)
// const job; // illegal (should be initialized)

// ---[WARNS!]--------------------------------
// 1. USE const BY DEFAULT FOR CLEAN CODE !

// 2. var : legacy, before ES6, don't use this
var job = "programmer";
job = "teacher";

// 3. w/o Declaration : a terrible idea !
//  this doesn't create a variable in the current scope.
//  instead, JS will create a property on the global object.
lastName = "Joun";
console.log(lastName);


// ---14. BASIC OPERATORS---

// 1. Mathemarical, arithmetic operators
const now = 2045;
const ageJoun = now - 1989;
const ageSarah = now - 2020;
console.log(ageJoun, ageSarah);

console.log(ageJoun * 2, ageJoun / 10, 2 ** 3);
// 2 ** 3 = 2^3

const firstName = "Hyunjung";
const lastName = "Joun";

console.log(firstName + " " + lastName);

// 2. Assignment operators
let x = 10 + 5; // 15
console.log(x);
x += 10; // x = x + 10 (+ 먼저, = 그다음)
x *= 4;
x++; // x = x + 1
x--; // x = x - 1
x--;
console.log(x);

// 3. Comparison operators
console.log(ageJoun > ageSarah); // > < >= <=
console.log(ageSarah >= 25);

const isFullAge = ageSarah >= 18;
console.log("isFullAge: " + isFullAge);

console.log(now - 1989 > now - 2020); // same as line 91
// 비교 연산자는 가장 마지막에 계산됨


// ---15. OPERATOR PRECEDENCE---
const now = 2045;
const ageJoun = now - 1989;
const ageSarah = now - 2020;
console.log(now - 1989 > now - 2020); // why this works?

console.log(25 - 10 - 5);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10, y = 10
// +, -가 =보다 우선순위 가짐, left-to-right
console.log(x, y);
const averageAge = (ageJoun + ageSarah) / 2;
console.log("averageAge: " + averageAge);

// ---17. STRINGS AND TEMPLATE LITERALS---
const firstName = "Joun";
const job = "programmer";
const birthYear = 1989;
const now = 2020;

// concat by using +
const joun =
  "I'm " + firstName + ", a " + (now - birthYear) + " years old " + job + "!";
// type coercion (num -> str automatically)
console.log(joun);

// [ES6 feature - template literals by using BACKTICKS(``)]
// use `` backticks to use template literals
const jounNew = `I'm ${firstName}, a ${now - birthYear} years old ${job}!`;
console.log(jounNew);

console.log(`Just a regular string...`);

console.log("String with \n\
multiple \n\
lines");

// use BACKTICKS(``)
console.log(`String
multiple
lines`);

// ---18. TAKING DECISIONS: IF / ELSE / STATEMENTS ---
const age = 15;
const isOldEnough = age >= 18;
if (isOldEnough) {
  console.log("Sarah can start driving license 🚗");
}

// if ~ else : Control Structure
if (age >= 18) {
  console.log("Sarah can start driving license 🚗");
} else {
  const yearLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearLeft} years :)`);
}

const birthYear = 2001;

let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}

console.log(century);

// ---20. TYPE CONVERSION AND COERCION
// Type Conversion
const inputYear = "1989";
console.log(Number(inputYear), inputYear);
console.log(inputYear + 18);
console.log(Number(inputYear) + 18);

console.log(Number("Joun")); // NaN: Invalid Number
console.log(typeof NaN); // number

console.log(String(23), 23);

// Type Coercion
console.log("I am " + 23 + " years old");
console.log("I am " + "23" + " years old"); //same
console.log("I am " + String(23) + " years old"); //same

console.log("23" - "10" - 3); // Str -> number
console.log("23" + "10" + 3); // *** number -> String, concat
console.log("23" / "2"); // Str -> number
console.log("23" > "18"); // Str -> number

let n = "1" + 1; //String 11
n = n - 1; //String 11 is converted into number, 10 - 1
console.log(n); // 10
console.log(2 + 3 + 4 + "5"); // 95
console.log("10" - "4" - "3" - 2 + "5"); // 15


// ---21. TRUTHY AND FALSY VALUES
//  5 fallcy values: 0, '', undefined, null, NaN
//                  -> boolean으로 바꾸려고 할 때 false가 됨

console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(NaN));
console.log(Boolean("joun")); //true
console.log(Boolean({})); //true

const money = 0;
if (money) {
  console.log(`Don't spend it all`);
} else {
  console.log(`You should get a job!`);
}

// 숫자가 define 됐는지 체크하고 싶은데 0일 경우 falcy value이기 때문에 false로 인식
// 원하지 않는 결과를 낳을 수 있음
let height = 0;
if (height) {
  console.log("YAY! Height is defined");
} else {
  console.log("Height is UNDEFINED :(");
}


// ---22. EQUALITY OPERATORS == vs. ===
// 1. === : Strict Equality Operator
// b/c it does not perform Type Coercion
const age = "18";
if (age === 18) console.log(`You just became an adult :D (strict)`);

// 2. == : Loose Equality Operator <---- DON'T USE ! ! !
// it does perform Type Coercion
if (age == 18) console.log(`You just became an adult :D (loose)`);

// const favorite = prompt("What's your favorite number?");
// console.log(favorite);
// console.log(typeof favorite);

// // O working
// if (favorite == 23) {
//   // '23' == 23
//   console.log(`Cool! 23 is an amazing number!`);
// }

const favoriteNum = Number(prompt("What's your favorite number?"));
if (favoriteNum === 23) {
  // 23 == 23
  console.log(`Cool! 23 is an amazing number!`);
} else if (favoriteNum === 7) {
  console.log(`7 is also a cool number!`);
} else if (favoriteNum === 9) {
  console.log(`9 is also a cool number!`);
} else {
  console.log(`Number is not 23 or 7 or 9`);
}

if (favoriteNum !== 23) console.log(`But why not 23?`);


// ---23. BOOLEAN LOGIC

// ---24. LOGICAL OPERATORS
const hasDriversLicense = true; //A
const hasGoodVision = true; //B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

// const shouldDrive = hasDriversLicense && hasGoodVision;
// if (shouldDrive) {
//   console.log(`Sarah is able to drive :)`);
// } else {
//   console.log(`Someone else should drive :(`);
// }

const isTired = true; //C
console.log(hasDriversLicense || hasGoodVision || isTired);
console.log(hasDriversLicense && hasGoodVision && isTired);

const shouldDrive = hasDriversLicense && hasGoodVision && !isTired;
if (shouldDrive) {
  console.log(`Sarah is able to drive :)`);
} else {
  console.log(`Someone else should drive :(`);
}

// ---26. THE SWITCH STATMENT
const day = "monday";

// switch
switch (day) {
  case "monday": // day === 'monday'
    console.log(`Plan my course structure`);
    console.log(`Go to coding meetup`);
    break;
  case "tuesday":
    console.log("Prepare theory videos");
    break;
  case "wednesday":
  case "thursday":
    console.log(`Write code examples`);
    break;
  case "friday":
    console.log(`Record videos`);
    break;
  case "saturday":
  case "sunday":
    console.log(`Enjoy the weekend :D`);
    break;
  default:
    console.log("Not a valid day!");
}

// if ~ else
if (day === "monday") {
  console.log(`Plan my course structure`);
  console.log(`Go to coding meetup`);
} else if (day === "tuesday") {
  console.log("Prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
  console.log(`Write code examples`);
} else if (day === "friday") {
  console.log(`Record videos`);
} else if (day === "saturday" || day === "sunday") {
  console.log(`Enjoy the weekend :D`);
}

// ---27. STATEMENTS AND EXPRESSIONS
if (23 > 10) {
  const str = `12 is bigger`;
}
// expressions produce values
// statements are like full sentences that translate our actions

const me = `Joun`;
console.log(`I'm ${2037 - 1989} years old ${me}`);


// ---28. THE CONDITIONAL (TERNARY) OPERATOR
// 삼항연산자 (expressions -> produces value)
const age = 23;
age >= 18
  ? console.log(`I like to drink wine 🍷`)
  : console.log(`I like to drink milk 🥛`);

const drink = age >= 18 ? `wine 🍷` : `milk 🥛`;
console.log(drink);

let drink2;
if (age >= 18) {
  drink2 = `wine 🍷`;
} else {
  drink2 = `milk 🥛`;
}
console.log(drink);

console.log(`I like to drink ${age >= 18 ? `wine 🍷` : `milk 🥛`}`);
*/
