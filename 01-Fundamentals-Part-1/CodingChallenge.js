/* 
// Coding Challenge #1
// Coding Challenge #2

const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

// const massMark = 95;
// const heightMark = 1.88;
// const massJohn = 85;
// const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / heightJohn ** 2;
const markHigherBMI = BMIMark > BMIJohn;

console.log(
  "markBMI: " + BMIMark,
  "johnBMI: " + BMIJohn,
  "markHigherBMI: " + markHigherBMI
);

if (markHigherBMI) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
} else {
  console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
}



// Coding Challenge #3

// const scoreDolphinesFirst = 96;
// const scoreDolphinesSecond = 108;
// const scoreDolphinesThird = 89;

// const scoreKoalasFirst = 88;
// const scoreKoalasSecond = 91;
// const scoreKoalasThird = 110;

// const avgDolphines =
//   (scoreDolphinesFirst + scoreDolphinesSecond + scoreDolphinesThird) / 3;
// const avgKoalas = (scoreKoalasFirst + scoreKoalasSecond + scoreKoalasThird) / 3;

// console.log(avgDolphines, avgKoalas);
// if (avgDolphines > avgKoalas) {
//   console.log(`Dolphines win the trophy!`);
// } else if (avgKoalas > avgDolphines) {
//   console.log(`Koalas win the trophy!`);
// } else {
//   console.log(`Both win the trophy!`);
// }

//----------------------------
// const scoreDolphinesFirst = 97;
// const scoreDolphinesSecond = 112;
// const scoreDolphinesThird = 101;

// const scoreKoalasFirst = 109;
// const scoreKoalasSecond = 95;
// const scoreKoalasThird = 123;

// const avgDolphines =
//   (scoreDolphinesFirst + scoreDolphinesSecond + scoreDolphinesThird) / 3;
// const avgKoalas = (scoreKoalasFirst + scoreKoalasSecond + scoreKoalasThird) / 3;

// const higherMinKoalas = avgKoalas >= 100;

// if (avgDolphines >= 100 && avgDolphines > avgKoalas) {
//   console.log(`Dolphines win the trophy!`);
// } else if (avgKoalas >= 100 && avgKoalas > avgDolphines) {
//   console.log(`Koalas win the trophy!`);
// } else if (avgDolphines === avgKoalas) {
//   console.log(`Both win the trophy!`);
// } else {
//   console.log(`No one wins the trophy :(`);
// }

// ---------------------------
const scoreDolphinesFirst = 97;
const scoreDolphinesSecond = 112;
const scoreDolphinesThird = 101;

const scoreKoalasFirst = 109;
const scoreKoalasSecond = 95;
const scoreKoalasThird = 106;

const avgDolphines =
  (scoreDolphinesFirst + scoreDolphinesSecond + scoreDolphinesThird) / 3;
const avgKoalas = (scoreKoalasFirst + scoreKoalasSecond + scoreKoalasThird) / 3;

const higherMinKoalas = avgKoalas >= 100;

if (avgDolphines >= 100 && avgDolphines > avgKoalas) {
  console.log(`Dolphines win the trophy!`);
} else if (avgKoalas >= 100 && avgKoalas > avgDolphines) {
  console.log(`Koalas win the trophy!`);
} else if (
  avgDolphines >= 100 &&
  avgKoalas >= 100 &&
  avgKoalas === avgDolphines
) {
  console.log(`Both win the trophy!`);
} else {
  console.log(`No one wins the trophy :(`);
}


// Coding Challenge #4

// const bill = 275;
// const bill = 40;
const bill = 430;

const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value is ${
    bill + tip
  }`
);
*/
