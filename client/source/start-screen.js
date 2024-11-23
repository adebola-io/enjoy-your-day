// @ts-nocheck

const startScreen = document.querySelector('#start-screen');
const screenSlide = document.querySelector('.start-screen__slides');
const svg = document.querySelector('.start-screen__illustration');
const sun = document.querySelector('.illustration__sun');
const leftStar = document.querySelector('.illustration__left-star');
const rightStar = document.querySelector('.illustration__right-star');
const getStartedButton = document.querySelector('.start-screen__start-button');
const rectangle = document.querySelector('.container-rectangle');
const rectangleBackdrop = document.querySelector('.rectangle-backdrop');
const illustrationLine1 = document.querySelector('.illustration__line-1');
const illustrationLine2 = document.querySelector('.illustration__line-2');

let current = 1;
const animationOptions = {
  duration: 100,
  easing: 'cubic-bezier(.42, 0, .58, 1)',
};
const initial = {};
const fadeAnimationForFirstSlide = screenSlide.firstElementChild.animate(
  [initial, { opacity: '0', offset: 0.2 }, { opacity: '0', offset: 1 }],
  animationOptions
);
const fadeAnimationForSecondSlide = screenSlide.children[1].animate(
  [{ opacity: '0' }, { opacity: '1' }, { opacity: '0' }],
  animationOptions
);
const fadeAnimationForThirdSlide = screenSlide.children[2].animate(
  [{ opacity: '0' }, { opacity: '0' }, { opacity: '1' }],
  animationOptions
);
const containerRectangleAnimation = rectangle.animate(
  [
    // Sun circle
    initial,
    {
      width: '77.6%',
      height: '77.6%',
      strokeWidth: '8',
      rx: '20%',
      x: '12%',
      y: '12%',
      rotate: '0deg',
    },
    {
      width: '75.2%',
      height: '74.3%',
      strokeWidth: '7.59',
      rx: '13.8%',
      x: '10%',
      y: '27%',
      rotate: '-8deg',
    },
  ],
  animationOptions
);
const rectangleBackdropAnimation = rectangleBackdrop.animate(
  [
    initial,
    {
      width: '77.6%',
      height: '77.6%',
      x: '4%',
      y: '20%',
      rx: '20%',
      opacity: '1',
      rotate: '0deg',
    },
    {
      width: '75.2%',
      height: '74.3%',
      strokeWidth: '7.59',
      rx: '13.8%',
      x: '10%',
      y: '27%',
      rotate: '-8deg',
      opacity: '0',
    },
  ],
  animationOptions
);
const todoListTopLineAnimation = illustrationLine1.animate(
  [
    {
      width: '5.65%',
      x: '20.5%',
      opacity: '0',
    },
    {
      width: '26.65%',
      x: '48.5%',
      y: '35.5%',
      height: '6.34%',
      rotate: '0deg',
      opacity: '1',
      rx: '4%',
    },
    {
      width: '6%',
      x: '30%',
      y: '47%',
      height: '12%',
      rotate: '-9deg',
      rx: '3%',
    },
  ],
  animationOptions
);
const todoListBottomLineAnimation = illustrationLine2.animate(
  [
    {
      width: '5.65%',
      x: '20.5%',
      opacity: '0',
    },
    {
      width: '26.65%',
      x: '48.5%',
      y: '62.5%',
      height: '6.34%',
      rotate: '0deg',
      opacity: '1',
      rx: '4%',
    },
    {
      width: '6%',
      x: '56.25%',
      height: '12%',
      y: '47%',
      rotate: '-9deg',
      rx: '3%',
    },
  ],
  animationOptions
);
const leftStarEnterAnimation = leftStar.animate(
  [initial, { translate: '50% 50%' }],
  animationOptions
);
const rightStarEnterAnimation = rightStar.animate(
  [initial, { translate: '-50% -50%' }],
  animationOptions
);
const sunRotateAnimation = sun.animate(
  [
    initial,
    {
      translate: '50%',
      rotate: '45deg',
      scale: '0.5',
      opacity: '0',
    },
  ],
  animationOptions
);

containerRectangleAnimation.pause();
rectangleBackdropAnimation.pause();
leftStarEnterAnimation.pause();
rightStarEnterAnimation.pause();
sunRotateAnimation.pause();
todoListTopLineAnimation.pause();
todoListBottomLineAnimation.pause();
fadeAnimationForFirstSlide.pause();
fadeAnimationForSecondSlide.pause();
fadeAnimationForThirdSlide.pause();

function onSliderScroll() {
  const scrollWidth = screenSlide.scrollWidth;
  const scrollLeft = screenSlide.scrollLeft;
  const firstSlideBreakpoint = scrollWidth / 3;
  const secondSlideBreakpoint = firstSlideBreakpoint * 2;

  const overallPercent = scrollLeft / scrollWidth;
  const firstSlidePercent = scrollLeft / firstSlideBreakpoint;

  const overallAnimationSetCurrentTime = overallPercent * 150;
  const firstAnimationSetCurrentTime = firstSlidePercent * 100;

  containerRectangleAnimation.currentTime = overallAnimationSetCurrentTime;
  rectangleBackdropAnimation.currentTime = overallAnimationSetCurrentTime;
  todoListTopLineAnimation.currentTime = overallAnimationSetCurrentTime;
  todoListBottomLineAnimation.currentTime = overallAnimationSetCurrentTime;
  fadeAnimationForFirstSlide.currentTime = overallAnimationSetCurrentTime;
  fadeAnimationForSecondSlide.currentTime = overallAnimationSetCurrentTime;
  fadeAnimationForThirdSlide.currentTime = overallAnimationSetCurrentTime;

  // First Illustration Animations
  leftStarEnterAnimation.currentTime = firstAnimationSetCurrentTime;
  rightStarEnterAnimation.currentTime = firstAnimationSetCurrentTime;
  sunRotateAnimation.currentTime = firstAnimationSetCurrentTime;

  const currentSlide = Math.round(overallPercent * 3);

  if (current === currentSlide + 1) return;
  current = currentSlide + 1;
  startScreen.setAttribute('data-current', current);
}

// Doesn't work everywhere but anyway
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
});

let isLoading = false;
async function startApp() {
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
  if (!isInstalled) {
    if (!deferredPrompt) {
      window.alert(
        'Please add this site to your home screen to use it offline.'
      );
      return;
    }
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome !== 'accepted') {
      window.alert(
        'Please add this site to your home screen to use it offline.'
      );
    }
    return;
  }

  if ('vibrate' in navigator) {
    navigator.vibrate(35);
  }
  if (isLoading) return;
  isLoading = true;
  getStartedButton.classList.add('loading');
  getStartedButton.childNodes[2].textContent = 'Loading...';

  let module;
  const loadModule = async () => {
    module = await import('./main');
  };

  await Promise.all([
    loadModule(),
    await new Promise((r) => setTimeout(r, 1000)),
  ]).then(async () => {
    if (!module) return;
    const main = module.default;
    if ('startViewTransition' in document) {
      document.startViewTransition(main);
    } else {
      main();
    }
  });
}

screenSlide.addEventListener('scroll', onSliderScroll);
getStartedButton.addEventListener('click', startApp);
