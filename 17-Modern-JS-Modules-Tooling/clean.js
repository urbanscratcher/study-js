'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// freeze is not deep freezing
// budget[0].value = 1000000; // working
// budget[9] = 'jonas'; // not working

// freeze -> make it immutabe
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

spendingLimits.jay = 200;
console.log(spendingLimits);

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function :D
const addExpense = function pipe(
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();
  // budget.push({ value: -value, description, user: cleanUser });
  return value <= getLimit(spendingLimits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

// real world: need Function Composition
const newBudget1 = addExpense(budget, spendingLimits, 1000, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

console.log(newBudget3);

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

// Impure (b/o console.log())
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Emojis are 2
const logBigExpenses = function (state, bigLimit) {
  // first method
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  console.log(bigExpenses);

  // second method
  const output = state
    .reduce(
      (acc, curr) =>
        curr.value <= -bigLimit
          ? acc + `${curr.description.slice(-2)} / `
          : acc + '',
      ''
    )
    .slice(0, -2);
  console.log(output);
};

logBigExpenses(finalBudget, 500);
