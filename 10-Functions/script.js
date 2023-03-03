"use-strict";

/*
/////////////////////////////////////////
// Coding Challenge #2

// This is more of a thinking challenge than a coding challenge 🤓
// Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!
// And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.
// GOOD LUCK 😀

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", () => {
    header.style.color = "blue";
  }); // Due to closures, it can access the header element
})();
*/

/*
////////////////////////////////////////
// More Closure Example

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); //g를 실행시켜야 Closure 작동
console.dir(f);

h(); // f is reassigned by h
f(); // different function from the first f
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3; // closure has priority over scope chain

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(
      `There are 3 groups, each with ${perGroup} passengers`,
      wait * 1000
    );
  }, 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // lower priority
boardPassengers(180, 3);

// use callback function
setTimeout(function () {
  console.log("Timer");
}, 1000);
*/

/*
///////////////////////////////////////
// MEMO Closures
// A function has access to the variable environment(VE) of the execution context in which it was created
// Closure: VE attached to the function, exactly as it was at the time and place the function was created
// closure has priority over scope chain

// A closure is the closed-over variable environment environment of the execution context in which a function was creaed, even after that eecution context is gone
// A closure gives a function access to all the variables of its parent function, even after that parent function has returned. The function keeps a reference to its outer scope, which preserves the scope chan throughout time
// A closure makes sure that a function doesn't loose connection to variables that existed at the function's birth place
// A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were present in the environment where the function was created

// We do NOT have to manually create closures, this is a JS feature that happens automatically. We can't even access closed-over variable sexplicitly. A closure is NOT a tangible JS object

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking(); // EC + passengerCount is added to VE -> Closure

booker(); // thanks to closure, booker() can access passengerCount(VE of secureBooking())
booker();
booker();

console.dir(booker);
*/

/*
///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)

const runOnce = function () {
  console.log("This will never run again");
};
runOnce();

// ()로 감싸면 statement인 것처럼(returning function value) 할 수 있음 -> IIFE
(function () {
  console.log("This will never run again");
  const isPrivate = 23; // encapsulated -> OOP
})();

// console.log(isPrivate); // not working b/o scope

(() => console.log("This will ALSO never run again"))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate); // not working
console.log(notPrivate); // working -> don't use

*/

/*
///////////////////////////////////////
// Coding Challenge #1

// Let's build a simple poll app!
// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.
// Here are your tasks:
// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
//   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//         What is your favourite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++
//         (Write option number)
  
//   1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
// HINT: Use many of the tools you learned about in this and the last section 😉
// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?
// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
// GOOD LUCK 😀


const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    if (
      typeof answer === "number" &&
      answer >= 0 &&
      answer <= this.answers.length
    ) {
      this.answers[answer]++;
    }
    this.displayResults();
    this.displayResults("string");
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, "string");
poll.displayResults.call({ answers: [5, 2, 3] }, "array");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "array");

*/

/*
////////////////////////////////////////
// The Call And Apply Methods

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  // book: function(),
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, "Jonas Schemedtmann");
lufthansa.book(635, "John Smith");
console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;
// book(23, "Sarah Williams"); // TypeError. undefined. a regular function call. b/o this keyword
// to solve this, use apply, bind

book.call(eurowings, 23, "Sarah Williams"); // we called the call method. explicitly point this
console.log(eurowings);

book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 583, "Mary Cooper");
console.log(swiss);

// Apply method. It receive array for arguments
// In Modern JS, it is not used anymore -> use spread grammar
const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
console.log(swiss);
book.call(swiss, ...flightData);

///////////////////////////////////////
// The Bind Method
// book.call(eurowings, 23, 'Sarah Williams);

const bookEw = book.bind(eurowings); // eurowings 전용 함수 만들기
const bookLh = book.bind(lufthansa);
const bookLx = book.bind(swiss);
bookEw(23, "Steven Williams");

// partial application
const bookEw23 = book.bind(eurowings, 23); // EW23 전용 함수 만들기
bookEw23("Jonas Schmedtmann");
bookEw23("Martha Cooper");

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
lufthansa.buyPlane(); // this attached to lufthansa

// this attached to the button. NaN, so use bind.
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// Partial application practice - preset parameters
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVat = addTax.bind(null, 0.23);
// addVat = (value) => value + value * 0.23;
console.log(addVat(100));
console.log(addVat(23));

const addTaxRate = (rate) => (value) => value + value * rate;
const addVat2 = addTaxRate(0.23);
console.log(addVat2(100));
console.log(addVat2(23));
*/

/*
////////////////////////////////////////
// Functions Returning Functions
// returning other functions - functional programming
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet("Hey");
greeterHey("Jonas");
greeterHey("Steven");
greet("Hello")("Jonas");

const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);
*/

/*
////////////////////////////////////////
// Functions Accepting Callback Functions

const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// Higher-order function -> allow abstraction
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);

// JS uses callbacks all the time
// for reusability
// for abstraction
const high5 = function () {
  console.log("👋");
};

// useful built-in functions
document.body.addEventListener("click", high5);
["Jonas", "Martha", "Adam"].forEach(high5);
*/

///////////////////////////////////////
// MEMO First-Class and Higher-Order Functions

// [First-Class Functions]
// JS treats functions as first-class citizens
// This means that functions are simply values
// Functions are just another 'type' of object

// Store functions in variables or properties
// Pass functions as arguments to OTHER functions
// Return functions FROM functions
// Call methods on functions: bind

// [Higher-Order Functions] (just a language's feature/concept)
// A function that receives another function as an argument, that returns a new function, or both
// This is only possible because of first-class functions

// 1. Function that receives another function: addEventListener, callback function
// 2. Function that returns new function

/*
////////////////////////////////////////////////////
// How Passing Arguments Works: Value vs. Reference
// How Passing Arguments Works: Value vs. Reference

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 2323156763423
}

const checkIn = function (flightNum, passenger) {
  // primitive type -> call stack에 저장된 값 부름
  flightNum = 'LH999';

  // reference type -> call stack에는 주소로 저장 -> memory heap에 값 저장돼 있음
  // 주소를 부르기 때문에 메모리 힙의 값이 manipulated 됨
  // they're the same object in memory heap
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 2323156763423) {
    alert('Check in')
  } else {
    alert('Wrong passport!')
  }
}

// checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

//  Is the same as doing ...
const flightNum = flight;
const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000000);
}

newPassport(jonas);
checkIn(flight, jonas);

// passing by value -> JS only has this! (JS only passes value having memory address)
// passing by reference
*/

/*
////////////////////////////////
// Defaualt Parameters

const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price
  }

  console.log(booking);
  bookings.push(booking)
}

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000);
*/
