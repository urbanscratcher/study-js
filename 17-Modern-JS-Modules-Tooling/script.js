// module uses strict mode by default

// <script type="module" src="script.js"> -> exporting 가능
// Importing Module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 10);
// console.log(price, tq);

console.log('Importing module');
// console.log(shippingCost);

// class처럼 namespace 만들어줌
// import * as ShoppingCart from './shoppingCart';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// default는 모듈 1개당 1개만 import. function 아무 이름이나 정해서 가져오면 됨
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 2);

console.log(cart); // cart is not empty! Live Connection!

/*
///////////////////////////////////////////////////
// Top-level await (works in only modules, not script)
// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

// Not very clean
// lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

/*
//////////////////////////////////////////////////
// The Module Pattern

// IFFE
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart, (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  // Closure! birthplace of variables. make them public.
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);
*/

//////////////////////////////////////////////
// CommonJS Modules
// Other module systems not using native JS
// 1) AMD 2) CommonJS
// 브라우저에는 없지만 NodeJS에서는 존재하는 기능을 사용
// e.g. export object, require()

// Export
// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart, (shipping cost is ${shippingCost})`
//     );
//   };

// Import
//   const { addToCart } = require('./shoppingCart.js')

//////////////////////////////////////////////
// NPM
// 과거 html에 스크립트 태그를 넣고는 했지만, 프로젝트가 커지면 문제 발생.
// 1) not manageable
// 2) many times it should download libraries like jquery directly in file system
// 3) no single repository

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es'; // lib 주소 자동으로 찾아줌
// import cloneDeep from 'lodash' // ES 버전말고도 CommonJS 버전의 라이브러리도 자동으로 찾아줌

const state = {
  cart: [
    {
      product: 'bread',
      quantity: 5,
    },
    {
      product: 'pizza',
      quantity: 5,
    },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

// html 페이지 maintained
// Hot Module Replacement(HMR) automaticlaly updates modules in the browser at runtime w/o refreshing a whole page.
// cart state 계속 유지돼서 push 데이터 reload 할 때마다 추가됨
if (module.hot) {
  module.hot.accept();
}

// Babel/Polyfilling. to support old versions of browsers
// use @babel/preset-env

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');
console.log('Jonas' ?? null);

// Babel은 ES6 feature는 ES5로 transpile 하지 않음.
// Syntax만 easy to compile... 브라우저가 그냥 ES6를 이해하는 거라 되는 거임.
// -> Polyfilling이 필요함.
console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

// import 'core-js/stable';
// 골라서 polyfill (bundle size 줄이기)
import 'core-js/stable/array/find';
import 'core-js/stable/promise';

// Polyfilling async functions
import 'regenerator-runtime/runtime';

//////////////////////////////////////////
// review: modern and clean code
// Declarative and Functional Programming
// Imperative vs. Declarative
