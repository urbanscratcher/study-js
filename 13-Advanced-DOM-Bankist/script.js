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

/*
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

//////////////////////////////////////////
// Stick Navigation
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

// 스크롤할 때마다 event가 촉발돼서 비효율적 -> 특히 모바일 환경
window.addEventListener('scroll', function (e) {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

/////////////////////////////////////////
// MEMO A Better Way: The Intersection Observer API
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// 1) 스크롤링에 따라 이미지, 컨텐츠의 레이지 로딩
// 2) 무한 스크롤
// 3) 광고 요금 계산
// 4) 유저가 결과를 보는 것에 따라 애니메이션 등 수행 여부 결정

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, // 관찰 객체가 intersect하는 기준이 되는 대상. null이면 viewport.
//   // threshold: 0.1, // 뷰포인트에 관찰 객체의 최소 10%가 보이면 invoked
//   // rootMargin: "10px 20px 30px 40px" // 루트의 마진. top, right, bottom, left (px or %)
//   threshold: [0, 0.2], // 루트(뷰포트) 기준임. [top, bottom] or [top, right, bottom, left]
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect();
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  nav.classList.add('sticky');
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threadhold: 0,
  rootMargin: `${-navHeight.height}px`,
});

headerObserver.observe(header);

/////////////////////////////////////////
// Revealing Elements on Scroll

const allSections = document.querySelectorAll('section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  else entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // event 발생 후에는 observe 하지 않도록 for 성능
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });

/////////////////////////////////////////
// Building a Slider Component: Part1

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slides="${i}"></button>`
      );
    });
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slides="${slide}"]`)
      .classList.add(`dots__dot--active`);
  };

  const nextSlide = function () {
    curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slides } = e.target.dataset;
      goToSlide(slides);
      activateDot(slides);
    }
  });

  document.addEventListener('keydown', function (e) {
    e.code === 'ArrowLeft' && prevSlide(); // Short Circuiting
    e.code === 'ArrowRight' && nextSlide();
  });
};

slider();

/*
////////////////////////////////////////
// MEMO Lifecycle DOM Events
// 1. DOMContentLoaded : 브라우저에서 HTML이 완전히 로드되고 DOM tree가 만들어질 때 발생하는 이벤트
// 2. load : 문서의 모든 콘텐츠(imgs, script, css, etc)가 로드된 후 발생하는 이벤트
// 3. beforeunload / unloade : 사용자가 페이지를 벗어날 때 일어나는 이벤트

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// Don't abuse!
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ''; // legacy
// });
*/

////////////////////////////////////////
// MEMO Defer and Async Script Loading
// HTML5 feature

//  1. End of Body
//  -Scripts are fetched and executed after HTML is completely parsed
//  -Use if you ened to support old browsers

//  2. Async in Head
//  -HTML 파싱할 때 script Fetch되고, HTML 파싱후 run.
//  -Scripts are fetched asynchronously and executed immediately
//  -Usually the DOMContentLoaded event waits for all scripts to execute, except for async scripts. So, DOMContentLoaded does not wait for an async script
//  -Scripts not guaranteed to execute in order
//  -Use for 3rd-party scripts where order doesn't matter (e.g. Google Analytics)

//  3. Defer in Head (BEST!)
//  -HTML 파싱할 때 script Fetch되고, fetch 완료 후 run
//  -Scripts are fetched asynchronously and executed after the HTML is completely parsed
//  -DOMContentLoaded event fires after defer script is executed
//  -Scripts are executed in order
//  -This is overall the best solution! Use for your own scripts, and when order matters (e.g. including a library)

//  You can, of course, use different strategies for different scripts. Usually a complete web application includes more than just one script

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
