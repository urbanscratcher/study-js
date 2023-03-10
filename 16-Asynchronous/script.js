'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>
            </div>
            </article> 
            `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Someting went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders;
      if (!neighbor) throw new Error('No neighbor found!');

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor[0]}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} `);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).
TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.
GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    imgsEl.forEach(img => {
      img.classList.add('parallel');
    });
  } catch (e) {
    console.error(e);
  }
};

const loadNPauseImg = async function (imgPath) {
  currentImg = await createImage(imgPath);
  await wait(2);
  currentImg.style.display = 'none';
};

const loadNPause = async function () {
  try {
    await loadNPauseImg('img/img-1.jpg');
    await loadNPauseImg('img/img-2.jpg');
  } catch (e) {
    console.error(e);
  }
};

// loadNPause();
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

/*
///////////////////////////////////////
// Other Promise Combinators: Race, allSettled, any

// 가장 먼저 도착한 리스폰스 리턴
// 1개라도 fulfill 되면 fulfilled
// Promise.race -> disabling cache works
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

// Promise.all -> error
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

// Promise.any (ES2021)
// rejected promise is omitted.
Promise.any([
  Promise.reject('ERROR'),
  Promise.resolve('Success!'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
  */

/*
///////////////////////////////////////
// Running Promises in Parallel

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    // 동시에 실행. 하나라도 reject되면 다 reject
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    // console.log(...data1.capital, ...data2.capital, ...data3.capital);
    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
*/

/*
///////////////////////////////////////
// Consuming Promises with Async/Await

// data fetch(fulfilled) 되기 전까지 해당 함수의 실행을 멈춤
// async await : just syntatic sugar

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error(`Problem getting location data`); // 404,403 일 때 에러 처리. 처리 안해주면 인터넷 커넥션 에러만 잡힘.
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!resGeo.ok) throw new Error(`Problem getting country data`);
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (e) {
    console.error(e);
    renderError(`! ${e.message}`);

    // Reject promise returned from async function (rethrow)
    throw e;
  }
};


// console.log('1. Will get location');
// // const city = whereAmI(); // returns a promise
// // console.log(city);
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(e => console.log(e.message))
//   .finally(() => {
//     console.log('3. Finished getting location');
//   });
  


(async function () {
  console.log('1. Will get location');
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (e) {
    console.log(e.message);
  }
  console.log('3. Finished getting location');
})();
*/

////////////////////////////////////////
// Error handling
// try {
//     let y = 1;
//     const x = 2;
//     x = 3;
//   } catch (e) {
//     alert(e.message);
//   }

/*
///////////////////////////////////////
// Coding Challenge #2

// Build the image loading functionality that I just showed you on the screen.
// Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉
// PART 1
// 1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.
// If this part is too tricky for you, just watch the first part of the solution.
// PART 2
// 2. Comsume the promise using .then and also add an error handler;
// 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
// 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
// 5. After the second image has loaded, pause execution for 2 seconds again;
// 6. After the 2 seconds have passed, hide the current image.

// TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
// GOOD LUCK 😀


const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.setAttribute('src', imgPath);

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Image Loading Failed'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(res => {
    currentImg = res;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/

/*
/////////////////////////////////////
// Promisifying the geolocation API

// promisifying
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition()
  .then(pos => console.log(pos))
  .catch(err => console.error(err));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding (${res.status})`);
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong ${err.message}. Try again!`);
    });
};

btn.addEventListener('click', whereAmI);
*/

/*
/////////////////////////////////////
// Building a Simple Promise

// executer function
// build promises
// Promisifying -> convert asyncronous behavior to promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery drew is happening...');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You Win :D');
    } else {
      reject(new Error('You lost your money :('));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout -> returns a promise
const wait = function (seconds) {
  // no need to specify reject. cuz setTimeout never gonna fail
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// consume
wait(2)
  .then(() => {
    console.log(`I waited for 2 seconds`);
    return wait(1); // chain two sequential promises
  })
  .then(() => {
    console.log(`I waited for 1 second`);
  });

// no need to use this kind of ugly callback hell
// setTimeout(() => {
//   console.log('2 second passed');
//   setTimeout(() => {
//     console.log('1 second passed');
//   }, 1000);
// }, 2000);

// It will resolve immediately
Promise.resolve('abc').then(x => console.log(x));
Promise.resolve(new Error('Problem')).catch(x => console.error(x));
*/

/*
/////////////////////////////////////
// Asynchronous BTS: The Event Loop

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end');
*/

// execution order
// 1. Test start
// 2. Test end
// 3. Resolved promise 1
// 4. Resolved promise 2 // promise has priority! (microtask callback queues)
// 5. 0 sec timer (callback queues)

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
Here are your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
GOOD LUCK 😀


const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(data => {
      if (!data.ok) throw new Error(`Problem with geocoding (${data.status})`);
      return data.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong ${err.message}. Try again!`);
    });
};

whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);


*/

//////////////////////////////////////////////
// MEMO Country 1
// then(filfilledFn, errorFn)
// catch(errorFn) : then 체인들 이후에 나타나는 모든 에러에 대해 처리 (예: 네트워크 커넥션 끊겼을 때)
// then은 fulfilled 일 때 실행, catch는 rejected 일 때 실행됨. finally는 성공/실패와 관계없이 언제나 마지막에 실행
// !!404 에러와 같은 것은 프로미스가 fulfilled 상태, catch가 캐치할 수 없음
// 주의: then method 안에서 promise chain(.then) 사용할 시 다시 콜백헬을 사용하는 꼴이 됨

// to handle fulfilled promis -> use then
// body: ReadableStream -> to read body, we need to call JSON method (resolve)
// json: also return a promise object -> use then
// improve readability!
// return value -> fulfilled value of the promise
// X return -> the promise

/*
////////////////////////////
// Promises and the Fetch API

// const request = new XMLHttpRequest(); // old school way to call AJAX
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

const request = fetch(`https://restcountries.com/v3.1/name/portugal`);
console.log(request);

// What are Promises?
// Promise: An object that is used as a placeholder for the futuere result of an asynchronous operation
// Promise: A container for an asynchronously delivered value
// Promise: A continer for a future value. (e.g. response from AJAX call)

// The Promise Lifecycle
// Pending -AsyncTask-> Settled (fulfilled/rejected) ->
// Pending: Before the future value is available
// Settled: Asynchronous task has finished
// Fulfilled: Success! The value is now availalbe
// Rejected: An error happend
// We are able handle these different states in our code!
// It's impossible to change the states once it is decided.

// Build Promise (e.g. Fetch API returns promise) -> Consume Promise
*/

/*
///////////////////////////////
// Our First AJAX Call: XMLHttpRequest
// AJAX is done in background



const getCountryNeighbor = function (country) {
  // AJAX call country 2
  const request = new XMLHttpRequest(); // old school way to call AJAX
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get Neighbor Country
    const [neighbor] = data.borders;

    if (!neighbor) return;

    // AJAX call country 2 (callback hell!)
    const request2 = new XMLHttpRequest(); // old school way to call AJAX
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);

      // Render country 1
      renderCountry(data, 'neighbour');

      // Get Neighbor Country
      const [neighbor] = data.borders;

      if (!neighbor) return;
    });
  });
};

getCountryNeighbor('portugal');


// callback hell! it makes code very hard to understand. => more bugs
// -> use promises
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
        setTimeout(() => {
          console.log('5 second passed');
        }, 100);
      }, 100);
    }, 100);
  }, 100);
}, 100);
*/

///////////////////////////////
// MEMO How the Web Works: Requests and Responses

// https://restcountries.eu/rest/v2/alpha/PT
// https: protocol
// restcountries: domain name
// 1) DNS Lookup -> real ip 104.27.142.889:443 (Port number)
// 2) Web Server creates TCP/IP socket connection
// TCP/IP? communication protocol defining how data traverse internet. internet's fundmental control system. TCP는 패킷을 이용해서 서버에도착, IP를 이용해 클라에 전달.
// 3) HTTP REQUEST
// HTTP? another communcation protocol b/w client and server
// 4) HTTP RESPONSE
// 5) html is the first to be loaded
// -> Scanned for assets (JS, CSS, image)
// -> Process is repeated for each file

///////////////////////////////
// MEMO Asynchronous JS, AJAX, APIs

// Most code is synchronous;
// Synchronous code is executed line by line;
// Each line of code waits for previous line to finish
// Long running operations block code execution

// Synchronous Code
// Thread of execution
// :Part of execution context that actually executes the code in computer's CPU
// -> all in sequence, line by line. e.g. alert()
// -> it takes time.

// Asynchronous Code
// :Coodinating behavior of a program over a period of time
// e.g. setTimeout -> Asynchronouos function (run in background)
// Asynchronous code is executed after a task that runs in the "background" finishes
// Asynchronous code is non-blocking
// Execution doesn't wait for an asynchronous task to finish its work
// Callback functions alone do NOT make code asynchronous! Only certain functions do.
// addEventListener does NOT automatically make code asynchronous!

// AJAX
// Asynchronous JavaScript And XML: Allow us to communicate with remote web servers in an asynchronous way. with AJAX calls, we can request data from web servers dynamically.

// API
// Application Programming Interface: Piece of software that can be used by another piece of software, in order to allow application to talk to each other.
// There are be many types of APIs in web development: DOM API, Geolocation API, Own Class API, "Online" API
// "Onlien" API: Application running on a server, that receives requests for data, and sends data back as reponse
// We can build our own web APIs (requires back-end development, e.g. with node.js) or use 3rd-party APIs.

// Ajax -> XML (XML data format). now we don't use XML (we use JSON) but use Ajax
