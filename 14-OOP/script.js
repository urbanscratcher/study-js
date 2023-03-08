'use strict';

//////////////////////////////////
// MEMO What is Object-Oriented Programming? (OOP)
// * Object-oriented programing(OOP) is a programming paradigm based on the concept of objects. (paradigm; style of code, 'how' we write and organize code)
// * We use objects to model(describe) real-world or abstract features;
// * e.g. user or todo list item (real-world), Html component or data structure (abstract)
// * Objects may contain data(properties) and code(methods). By using objects, we pack data and the corresponding behavior into one block.
// * In OOP, objects are self-contained pieces/blocks of code
// * Objects are building blocks of applications, and interact with one another
// * Interactions happen through a public interface(API): methods that the code outside of the object can access and use to communicate with the object
// * OOP was developed with the goal of organizing code, to make it more flexible anad easier to maintain (avoid 'spaghetti code').

// Classes and Instances (Traditional OOP)
// * Class : like a blueprint from which we can create new objects
// * Instance : New object created from the class. Like a real house created from an abstract blueprint

// The 4 Fundamental OOP Principles
// How do we actually design classes? How do we model real-world data into classes?
// 1. Abstraction : Ignoring or hiding details that don't matter, allowing us to get an overview perspective of the thing we're implementing, instead of messing with details that don't really matter to our implementation.
// 2. Encapsulation : Keeping properties and methods private inside the class, so they are not accessible from outside the class. Some methods can be exposed as a public interface (API). Object interactions happens through interface.
// Why? Prevents external code from accidentally manipulating internal properties/state
// 3. Inheritance : Making all properties and methods of a certain class available to a child class, forming a hierarchical relationship between classes. This allows us to reuse common logic and to model real-world relationships.
// 4. Polymorphism : A child class can overwrite a method it inherited from a parent class.

/////////////////////////////////
// MEMO OOP in JavaScript

// * Classical OOP: Class -> Instance
// Objects (instances) are instantiated from a class, which functions like a blueprint.
// Behavior (methods) is copied from class to al linstances.

// * OOP in JS: Prototype (Contains methods) <- Object (Can access methods)
// Objects are linked to a prototype object
// Prototypal inheritance: The prototype contains methods (behavior) that are accessbile to all objects linked to that prototype.
// Behavior is delegated to the linked prototype object.

// 3 Ways of Implementing Prototypal Inheritance in JS
// How do we actually create prototypes? and how do we link objects to prototypes? How can we create new objects, without having classes?
// 1. Constructor functions
// * Technique to create objects from a function;
// * This is how built-in objects like Arrays, Maps or Sets are actually implemented.
// 2. ES6 Classes
// * Modern alternative to constructor function syntax
// * "Syntactic sugar": behind the scenes, ES6 classes work exactly like constructor functions
// * ES6 classes do NOT behave like classes in "classical OOP"
// 3. Object.create()
// * The easiest and most straightforward way of linking an object to a prototype object.

// The 4 pillars of OOP are stil valid! Abstraction, Encapsulation, Inheritance, Polymorphism

/*
////////////////////////////////
// Cosntructor Functions and the new Operator

// MEMO How new operator works
// 1. New empty object {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype -> sets property __proto__
/// 4. function automatically return {}

// arrow function은 안됨 (this 사용해야 하기 때문)
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // methods
  // bad practice. never create functions inside! -> 성능 저하
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(jonas, matilda, jack);

const jay = 'Jay';
console.log(jonas instanceof Person);
console.log(jay instanceof Person);

/////////////////////////////////////////////////////////
// Prototypes
console.log(Person.prototype); // already defined calcAge

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
jack.calcAge();

console.log(jonas.__proto__); // prototype of jonas object
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); //true
console.log(Person.prototype.isPrototypeOf(Person)); // Person.prototype은 Person의 프로토타입이 아님에 주의. object들의 프로토타입을 가리킴.
console.log(Person.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__ === null); // true

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species); // object directly not own the property
console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

///////////////////////////////////////////////
// Prototypal Inheritance on Built-in Objects

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__); // Object.prototype
console.log(jonas.__proto__.__proto__.__proto__); // null. scope chain의 최상단.

console.dir(Person.prototype.constructor);

const arr = [3, 4, 7, 3, 4, 4, 4]; // new Array === []
console.log(arr.__proto__); // all methods for Array
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__); // Object.prototype
console.log(arr.__proto__.__proto__.__proto__); // null

// it is possible, but don't do this!!
// it could be broken when JS is updated + other developers confused
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
// MEMO prototype chain of h1 > HTMLHeadingElement > Element > Node > EventTarget > f () > Object

console.dir(x => x + 1);

//////////////////////////////////
// Static Methods
// not inherited

// .from은 Array prototype에 attached.  [ ]은 작동안함
// Array.from(document.querySelectorAll('h1')) // work. static function
// [1,2,3].from() // TypeError

Person.hey = function () {
  console.log('Hey there :)');
};

Person.hey();
// jonas.hey(); // not working. not inherited
*/

/*

//////////////////////////////////////////////////
// Coding Challenge #1

// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h
// 2. Implement and 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console.
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console.
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}km/h`);
};

const Bmw = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

Bmw.accelerate();
Bmw.accelerate();
Bmw.accelerate();
Bmw.brake();

Mercedes.brake();
Mercedes.brake();
Mercedes.accelerate();
Mercedes.brake();
Mercedes.brake();
*/

/*
/////////////////////////////////////////////
// ES6 Classes

// class expression
// const PersonCl = class {}; // class is just a special function

// class declaration
// syntatical sugar! 앞서서 한 것과 똑같은 방식으로 동작함
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property. inherited
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' '))
      // validation
      this._fullName = name; // avoid naming conflict, attach _
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there :)');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);
console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// MEMO Class 사용시 주의할 점
// 1. Classes are NOT hoisted (선언 후 사용 가능)
// 2. Class are first-class citizens (function input/output)
// 3. Classes are executed in strict mode
// 4. functional 생성 방식(prototype 이용)은 레거시는 아님. 사용해도 됨. 근데 클래스 방식이 가독성이 좋아서 선호되긴 함.

///////////////////////////////////////////
// Seters and Getters

// const walter = new PersonCl('Walter', 1965); // validation failed
const walter = new PersonCl('Walter White', 1965); // validation failed
console.log(walter);
PersonCl.hey(); // instance에서는 작동하지 않음!!!

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); // property 처럼 사용가능
account.latest = 50;
console.log(account.latest);

////////////////////////////////
// Object.create

// Manually set Prototype
// More straight forward but the least used way
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // like constructor function. but not using new operator
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
console.log(sarah);
*/

/*
///////////////////////////////////////////
// Coding Challenge #2

// 1. Re-create challenge 1, but this time using an ES6 class
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter

// DATA CAR 1: 'Ford' goint at 120 km/h

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed}km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed}km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);

console.log(ford.speedUS);
ford.speedUS = 80;
console.log(ford.speedUS);
console.log(ford.speed);
ford.brake();
*/

/*
///////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
// Student.prototype = Person.prototype; // doesn't work.
Student.prototype = Object.create(Person.prototype);
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.dir(mike.__proto__);
console.dir(mike.__proto__.__proto__);
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);
console.dir(Student.prototype.constructor); // Person -> Student corrected
Student.prototype.constructor = Student;
*/

/*
////////////////////////////////////////////////
// Coding Challenge #3

// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and curent speed, the EV also has the current Battery charge in % ('charge' property);
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'
// 4. Create an electric car object and experiment wiht calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definition of polymorphism.

// DATA CAR 1: 'Tesla' going at 120km/h, with a charge of 23%

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}km/h`);
};

const ElectricCar = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
ElectricCar.prototype = Object.create(Car.prototype);
ElectricCar.prototype.constructor = ElectricCar;

ElectricCar.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// Overrided. Polymorphism
ElectricCar.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new ElectricCar('Tesla', 120, 23);
console.log(tesla);
tesla.chargeBattery(90);
tesla.brake();
tesla.accelerate();
*/

/*
////////////////////////////////////////////////
// Interitance Between "Classes": ES6 Class

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property. inherited
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' '))
      // validation
      this._fullName = name; // avoid naming conflict, attach _
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there :)');
    console.log(this);
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear); // PersonCl.call(this, fullName, birthYear)
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // Overriding
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();
console.log(martha);
*/

/*
//////////////////////////////////////
// Inheritance Between "Classes": Object.create

const PersonProto = {
  calcAge() {
    console.log(2027 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);

jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();
console.dir(jay);
*/

////////////////////////////////////////////////////
// Another class example

// 1) Public fields
// 2) Private fields
// 3) Public Methods
// 4) Private Methods
// (there is also the static version)

class Account {
  // Fields should be defined outside of methods

  // Define Public fields (instances)
  locale = navigator.language;

  // Define Private fields (instances)
  // Only Google Chrome applies this.
  //   #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    //protected property
    this._movements = []; // make private. just a convention
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // API: public interfaces of the object (added to prototype)
  getMovements() {
    // return this.#movements;
    return this._movements;
  }

  deposit(val) {
    // this.#movements.push(val);
    this._movements.push(val);
    return this; // make methods chainable
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  // 4) Private methods
  //   #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }

  static helper() {
    console.log('Helper');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111, []);
console.log(acc1);
// console.log(acc1.#movements); // Syntax Error

// manually
// acc1._movements.push(250);
// acc1._movements.push(-140); // -1: abstracted by 'withdraw'
acc1.deposit(250);
acc1.withdraw(140);

acc1.requestLoan(1000);
// acc1.#approveLoan(1000); // shouldn't be accessible. data privacy
acc1._approveLoan(1000); // shouldn't be accessible. data privacy
console.log(acc1.getMovements());
console.log(acc1);
// console.log(acc1.#pin); // it shouldn't be accessible

Account.helper();

//////////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// _propertyName (just a convention)

///////////////////////////////////////////
// Encapsulation: Private class fields and methods
// Java used 'fields' instead of 'properties'
// #propertyName

/////////////////////////////////////////
// Chaining Methods

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

/////////////////////////////////////////
// ES6 Classes Summary

class Person {
  constructor(fullName, birthYear) {
    (this.fullName = fullName), (this.birthYear = birthYear);
  }
}

class Student extends Person {
  university = 'university of Lisbon';
  #studyHours = 0;
  #course;
  static numSubjects = 10;

  constructor(fullName, birthYear, startYear, course) {
    super(fullName, birthYear);
    this.startYear = startYear;
    this.#course = course;
  }

  introduce() {
    console.log(`I study ${this.#course} at ${this.university}`);
  }

  study(h) {
    this.#makeCoffee();
    this.#studyHours += h;
  }

  #makeCoffee() {
    return 'Here is a coffee for you';
  }

  get testScore() {
    return this._testScore;
  }

  set testScore(score) {
    this._testScore = score <= 20 ? score : 0;
  }

  static printCurriculum() {
    console.log(`There are ${this.numSubjects} subjects`);
  }
}

const student = new Student('Jonas', 2020, 2037, 'Medicine');

///////////////////////////////
// Coding Challenge #4

// 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVC1' child class of the 'CarCl'
// 2. Make the 'charge' property private
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the Car class. They experiment with chaining!

// DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed}km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed}km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);

rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);

//////////////////////////////////////////////
//
