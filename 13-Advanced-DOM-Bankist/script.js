'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

/////////////////////////////////////////////
// Modal window
const openModal = e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////
// Implementing Smooth Scrolling
btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  //   console.log(s1coords);

  //   console.log(e.target.getBoundingClientRect());
  //   console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  //   console.log(
  //     'Current height/width viewport',
  //     document.documentElement.clientHeight,
  //     document.documentElement.clientWidth
  //   );

  // Scrolling
  // s1coords.top 포지션은 veiwport에 따른 수치라 다시 한 번 더 클릭하면 제대로 안 먹힘!
  // -> 현재 스크롤 위치를 더해줘야 함
  //   window.scrollTo(s1coords.left, s1coords.top); // x, y

  // old way
  //   window.scrollTo(
  //     s1coords.left + window.pageXOffset,
  //     s1coords.top + window.pageYOffset
  //   ); // x, y

  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });

  // new way. only works in modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////
// Page Navigation
// Implement Smooth Navigation

// 여러 엘레먼트에 여러 이벤트가 attach. 비효율적 -> Event Delegation 필요.
// .nav__links (상위 요소)에 이벤트를 attach하자
// const nav = document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// MEMO Event Delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////
// Building a tapped component

// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return; // ignore null. more modern way
  // if(clicked) // old way

  // Activate Tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  // console.log(clicked.dataset.tab); // <button data-tab="2">
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////
// Passing Arguments to Event Handlers

const handleHover = function (e) {
  //   console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Menu fade animation
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/*
/////////////////////////////////////////
// Dom Traversing

const h1 = document.querySelector('h1');

// Going Downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); // nodes: text, comment, element, document
console.log(h1.children); // HTMLCollection. live collection. It is updated. direct children
console.log((h1.firstElementChild.style.color = 'white'));
console.log((h1.lastElementChild.style.color = 'orangered'));

// Going Upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement); // direct parent
h1.closest('.header').style.background = `var(--gradient-secondary)`; // querySelector랑 반대로 작동. 부모 중 class를 찾음
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

//  siblings 조작
// 부모를 찾아서 그 아래의 모든 children을 찾음
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

/*
/////////////////////////////////////////
// Event Propagation in Practice
// https://ko.javascript.info/bubbling-and-capturing
// Event Bubbling (Phase 2)

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// 익명함수는 this(.nav__link 오브젝트)를 참조하지 않음 주의!
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // e.target: 이벤트가 어디서 일어났는지 알려줌. attached object X
  // e.currentTarget: object that the event is attached
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  //   e.stopPropagation(); // generally, it is not a good idea.
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(); // bubbling up
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor(); // bubbling up;
    console.log('NAV', e.target, e.currentTarget);
  },
  false // true: NAV가 첫번째로 나타남. 먼저 capture (phase1), false: default. 현재는 사용하지 않는 부분.
);

// Event Capture (Phase 1)
// addEventListener include capturing events by default
*/

/*
/////////////////////////////////////////////
// Types of Events and Event Handlers

const h1 = document.querySelector('h1');

const alertH1 = e => {
  alert('addEventListener: Great! You are reading the heading :D');
  // only want to listen once
  // h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// old way
// h1.onmouseenter = e => {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// old way in html
// <h1 onclick="alert('HTML alert')">
*/

/*
/////////////////////////////////////////////
// Selecting, Creating, and Deleting Elements

// Sececting Elements
console.log(document.documentElement); // html
console.log(document.head);
console.log(document.body);

// 사용 권장. return DOM
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('section'); // 요소를 삭제해도 DOM이라서 바뀌지 않고 남아있음
console.log(allSections);

// 사용 지양하기. return html collections, not DOM
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // html collections. if DOM changes, it immediately changes. It's not DOM.
console.log(allButtons);
console.log(document.getElementsByClassName('btn')); // html collections

// Creating and inserting elements
// .insertAdjacentHTML : easy way. belows are more programmatical way.
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// DOM exists once
// header.prepend(message); // first child
header.append(message); // moved to be last child
// header.append(message.cloneNode(true)); // clone node

// header.before(message);
// header.after(message);

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  //   message.parentElement.removeChild(message); // traditional way
});

/////////////////////////////////////////////
// Styles, Attributes, Classes

// Styles
// style property -> inline
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // nowhere to be found
console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color); // real style
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// .root in CSS like document
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); // 절대경로
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer); // not working.
console.log(logo.getAttribute('designer')); // working
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));
console.log(logo.getAttribute('src')); // 상대경로

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use. Override all the existing classes
logo.className = 'jonas';

*/
