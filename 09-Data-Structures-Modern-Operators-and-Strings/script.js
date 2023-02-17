'use-strict';

const restaurant = {
	name: 'Classico Italiano',
	location: 'Via Angelo Tavanti 23, Firenze, Italy',
	categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
	starterMenu: ['Focacia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
	mainMenu: ['Pizza', 'Pasta', 'Risotto'],
	openingHours: {
		thu: {
			open: 12,
			close: 22,
		},
		fri: {
			open: 11,
			close: 23,
		},
		sat: {
			open: 0,
			close: 24,
		},
	},

	order: function (starterIndex, mainIndex) {
		return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
	},

	orderDelivery: function ({
		starterIndex = 1,
		mainIndex = 0,
		time = '20:00',
		address,
	}) {
		console.log(
			`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delievered to ${address} at ${time}`
		);
	},

	orderPasta: function (ing1, ing2, ing3) {
		console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
	},

	orderPizza: function (mainIngredients, ...otherIngredients) {
		console.log(mainIngredients);
		console.log(otherIngredients);
	},
};

// Arguments
restaurant.orderDelivery({
	time: '22:30',
	address: 'Via del Sole, 21',
	mainIndex: 2,
	starterIndex: 2,
});

restaurant.orderDelivery({
	address: 'Via del Sole, 21',
	starterIndex: 2,
});

const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Switching Variables
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested Destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default Values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

// Destruct Variables
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Rename
const {
	name: restaurantName,
	openingHours: hours,
	categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default Values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating Variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); // JS가 코드블럭으로 인식하기 때문에 ()로 감싸줘야 함
console.log(a, b);

// Nested Objects
const {
	fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

// Spread Operator
const array = [7, 8, 9];
const badNewArr = [1, 2, array[0], array[1], array[2]];
console.log(badNewArr);

const newArr = [1, 2, ...array];
console.log(newArr);

console.log(...newArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Shallow Copy of Array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const twoMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(twoMenu);

// Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);
console.log('J', 'o', 'n', 'a', 's');
// console.log(`${...str} template letters not working!!!!`)

// Prompt. Real-world example
// const ingredients = [
// 	prompt("Let's make pasta! Ingredient 1?"),
// 	prompt('Ingredient 2?'),
// 	prompt('Ingredient 3?'),
// ];
// console.log(ingredients);
// restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

// 1) Destructuring
// SPREAD, because on RIGHT side of =
const originArray = [3, 4];
const arr2 = [1, 2, ...originArray];
console.log(arr2);

// REST, because on LEFT side of =
// The element should be the last!!
const [d, e, ...others] = [1, 2, 3, 4, 5];
console.log(d, e, others);

const [pizza, , risotto, ...otherFood] = [
	...restaurant.mainMenu,
	...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// 2) Functions
const add = function (...numbers) {
	let sum = 0;
	for (let i = 0; i < numbers.length; i++) {
		sum += numbers[i];
	}
	console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 4, 6, 7, 4, 3);

const xx = [23, 5, 7];
add(...xx);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

console.log('---- OR ----');
// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || 'Jonas');
console.log('Jonas' || 3);
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 23; // 0이면 작동X!!!
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('---- AND ----');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'jonas');

// Practical example
if (restaurant.orderPizza) {
	restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');


