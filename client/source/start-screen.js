// @ts-nocheck

async function startApp() {
  navigator.vibrate?.(20);

  let module;
  const loadModule = async () => {
    module = await import('./main');
  };
  const wait = () => new Promise((r) => setTimeout(r, 1000));

  return Promise.all([loadModule(), wait()]).then(async () => {
    if (!module) return;
    const main = module.default;
    if ('startViewTransition' in document) {
      return document.startViewTransition(main).finished;
    }
    return main();
  });
}

async function skipStartScreen() {
  const state = window?.localStorage?.getItem('app-loading-state');
  let isDone = false;
  try {
    isDone = JSON.parse(state) === 'done';
  } catch {}

  const module = await import('./main');
  return module.resumeApp();
}

function start() {
  const html = document.documentElement;

  if (html.getAttribute('data-view') === 'app') {
    skipStartScreen();
    return;
  }

  let domElements = {
    startScreen: document.querySelector('#start-screen'),
    screenSlide: document.querySelector('.start-screen__slides'),
    svg: document.querySelector('.start-screen__illustration'),
    sun: document.querySelector('.illustration__sun'),
    leftStar: document.querySelector('.illustration__left-star'),
    rightStar: document.querySelector('.illustration__right-star'),
    getStartedButton: document.querySelector('.start-screen__start-button'),
    rectangle: document.querySelector('.container-rectangle'),
    rectangleBackdrop: document.querySelector('.rectangle-backdrop'),
    illustrationLine1: document.querySelector('.illustration__line-1'),
    illustrationLine2: document.querySelector('.illustration__line-2'),
  };

  let current = 1;
  const animationOptions = {
    duration: 100,
    easing: 'cubic-bezier(.42, 0, .58, 1)',
  };
  const initial = {};
  let animations = {
    fadeAnimationForFirstSlide:
      domElements.screenSlide.firstElementChild.animate(
        [initial, { opacity: '0', offset: 0.2 }, { opacity: '0', offset: 1 }],
        animationOptions
      ),
    fadeAnimationForSecondSlide: domElements.screenSlide.children[1].animate(
      [{ opacity: '0' }, { opacity: '1' }, { opacity: '0' }],
      animationOptions
    ),
    fadeAnimationForThirdSlide: domElements.screenSlide.children[2].animate(
      [{ opacity: '0' }, { opacity: '0' }, { opacity: '1' }],
      animationOptions
    ),
    containerRectangleAnimation: domElements.rectangle.animate(
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
    ),
    rectangleBackdropAnimation: domElements.rectangleBackdrop.animate(
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
    ),
    todoListTopLineAnimation: domElements.illustrationLine1.animate(
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
    ),
    todoListBottomLineAnimation: domElements.illustrationLine2.animate(
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
    ),
    leftStarEnterAnimation: domElements.leftStar.animate(
      [initial, { translate: '50% 50%' }],
      animationOptions
    ),
    rightStarEnterAnimation: domElements.rightStar.animate(
      [initial, { translate: '-50% -50%' }],
      animationOptions
    ),
    sunRotateAnimation: domElements.sun.animate(
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
    ),
  };

  animations.containerRectangleAnimation.pause();
  animations.rectangleBackdropAnimation.pause();
  animations.leftStarEnterAnimation.pause();
  animations.rightStarEnterAnimation.pause();
  animations.sunRotateAnimation.pause();
  animations.todoListTopLineAnimation.pause();
  animations.todoListBottomLineAnimation.pause();
  animations.fadeAnimationForFirstSlide.pause();
  animations.fadeAnimationForSecondSlide.pause();
  animations.fadeAnimationForThirdSlide.pause();

  function onSliderScroll() {
    const scrollWidth = domElements.screenSlide.scrollWidth;
    const scrollLeft = domElements.screenSlide.scrollLeft;
    const firstSlideBreakpoint = scrollWidth / 3;

    const overallPercent = scrollLeft / scrollWidth;
    const firstSlidePercent = scrollLeft / firstSlideBreakpoint;

    const overallAnimationSetCurrentTime = overallPercent * 150;
    const firstAnimationSetCurrentTime = firstSlidePercent * 100;

    animations.containerRectangleAnimation.currentTime =
      overallAnimationSetCurrentTime;
    animations.rectangleBackdropAnimation.currentTime =
      overallAnimationSetCurrentTime;
    animations.todoListTopLineAnimation.currentTime =
      overallAnimationSetCurrentTime;
    animations.todoListBottomLineAnimation.currentTime =
      overallAnimationSetCurrentTime;
    animations.fadeAnimationForFirstSlide.currentTime =
      overallAnimationSetCurrentTime;
    animations.fadeAnimationForSecondSlide.currentTime =
      overallAnimationSetCurrentTime;
    animations.fadeAnimationForThirdSlide.currentTime =
      overallAnimationSetCurrentTime;

    // First Illustration Animations
    animations.leftStarEnterAnimation.currentTime =
      firstAnimationSetCurrentTime;
    animations.rightStarEnterAnimation.currentTime =
      firstAnimationSetCurrentTime;
    animations.sunRotateAnimation.currentTime = firstAnimationSetCurrentTime;

    const currentSlide = Math.round(overallPercent * 3);

    if (current === currentSlide + 1) return;
    current = currentSlide + 1;
    domElements.startScreen.setAttribute('data-current', current);
  }

  domElements.screenSlide.addEventListener('scroll', onSliderScroll);
  const prepareApp = () => {
    domElements.getStartedButton.classList.add('loading');
    domElements.getStartedButton.childNodes[2].textContent = 'Loading...';
    for (const animation of Object.values(animations)) {
      animation.cancel();
    }
    startApp().then(() => {
      domElements.screenSlide?.removeEventListener('scroll', onSliderScroll);
      domElements.startScreen?.replaceChildren();
      domElements.getStartedButton?.replaceChildren();
      domElements = null;
      animations = null;
    });
  };
  domElements.getStartedButton.addEventListener('click', prepareApp, {
    once: true,
  });
}

window.addEventListener('DOMContentLoaded', start, { once: true });
