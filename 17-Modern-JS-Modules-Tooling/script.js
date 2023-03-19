/*
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
// A brief intro to the command line
