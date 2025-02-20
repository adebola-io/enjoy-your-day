export type DeferredPromptEvent = Event & {
  prompt: () => Promise<{
    outcome: 'accepted' | 'dismissed' | 'user-dismissed';
    platform: string;
  }>;
};

export const installDetails = {
  deferredPrompt: undefined as DeferredPromptEvent | undefined,
};
export let appIsReadyResolver: (() => void) | null = null;
export const appIsReady = new Promise<void>((resolve) => {
  appIsReadyResolver = resolve;
});

/**
 * Sets the theme color meta tag and notifies the parent window if running in an iframe.
 *
 * @param color - The color to set for the theme meta tag.
 * @returns A Promise that resolves when the operation is complete.
 * @example
 * await setMetaTheme('#ff0000');
 */
export async function setMetaTheme(color: string) {
  await appIsReady;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', color);

  if (isRunningInIFrame()) {
    // Allow changing status bar in mockup.
    window.parent.postMessage({ type: 'setMetaTheme', color }, '*');
  }
}

/**
 * Retrieves the current theme color meta tag value.
 *
 * @returns The content of the `meta[name="theme-color"]` tag, or `#ffffff` if the tag is not found.
 * @example
 * const themeColor = getMetaTheme();
 * console.log(themeColor); // Outputs the current theme color
 */
export function getMetaTheme(): string {
  return (
    document
      .querySelector('meta[name="theme-color"]')
      ?.getAttribute('content') ?? '#ffffff'
  );
}

/**
 * Checks if the current window is running inside an iframe.
 *
 * @returns `true` if the current window is running inside an iframe, `false` otherwise.
 * @example
 * if (isRunningInIFrame()) {
 *   console.log('Running inside an iframe');
 * }
 */
export function isRunningInIFrame() {
  return parent && parent !== window;
}

/**
 * Registers a CSS custom property for the safe area inset bottom on the current page, if running inside an iframe.
 * This allows the page to adjust its layout to accommodate for any device-specific safe area insets.
 * @example
 * defineSafeArea();
 */
export function defineSafeArea() {
  if (!isRunningInIFrame()) return;

  window.CSS.registerProperty({
    name: '--safe-area-inset-bottom',
    syntax: '<length>',
    inherits: true,
    initialValue: '37px',
  });
}

/**
 * Initializes a scroll-based animation timeline for the provided element.
 *
 * This function is a fallback for browsers that do not support the `ScrollTimeline` API.
 * It adds a `scrollTimelineFallback` class to the element and attaches a scroll event listener
 * that updates the current time of the first animation on the element based on the scroll position.
 *
 * @param element - The DOM element to attach the scroll-based animation timeline to.
 * @param axis - The axis to use for the scroll-based animation timeline, either 'inline' or 'block'.
 * @returns `true` if the fallback was successfully applied, `false` if the `ScrollTimeline` API is available.
 * @example
 * const element = document.querySelector('.my-element');
 * initScrollTimeline(element, 'block');
 */
export function initScrollTimeline(
  element: Element,
  axis: 'inline' | 'block' = 'block'
) {
  if ('ScrollTimeline' in window) return false;
  element.classList.add('scrollTimelineFallback');
  element.addEventListener('scroll', () => {
    const animation = element.getAnimations().at(0);
    const newTime =
      axis === 'block'
        ? (element.scrollTop / element.scrollHeight) * 100
        : (element.scrollLeft / element.scrollWidth) * 100;
    if (animation) animation.currentTime = newTime;
  });
  return true;
}

/**
 * Vibrates the device using the provided vibration pattern.
 *
 * @param pattern - The vibration pattern to use, specified as an array of durations (in milliseconds) for the on and off phases of the vibration. If not provided, a default pattern of 3 milliseconds will be used.
 * @example
 * vibrate([200, 100, 200]);
 */
export function vibrate(pattern?: VibratePattern) {
  navigator.vibrate?.(pattern ?? 3);
}

/**
 * A placeholder component that renders an empty fragment.
 * @example
 * <NoOp />
 */
export const NoOp = () => <></>;

/**
 * Overlays a black color on the provided hexadecimal color with a given alpha value.
 *
 * @param hexColor - The hexadecimal color to overlay with black, in the format `#RRGGBB`.
 * @returns The new hexadecimal color with the black overlay applied.
 * @example
 * const newColor = overlayBlack('#ff0000');
 * console.log(newColor); // Outputs the color with black overlay
 */
export function overlayBlack(hexColor: string) {
  // 1. Convert hex to RGB
  let r = Number.parseInt(hexColor.substring(1, 3), 16);
  let g = Number.parseInt(hexColor.substring(3, 5), 16);
  let b = Number.parseInt(hexColor.substring(5, 7), 16);

  // 2. Overlay calculation (using alpha blending)
  const alpha = 0.3; // Alpha of the black overlay
  const blackR = 0;
  const blackG = 0;
  const blackB = 0;

  r = (1 - alpha) * r + alpha * blackR;
  g = (1 - alpha) * g + alpha * blackG;
  b = (1 - alpha) * b + alpha * blackB;

  // 3. Convert back to hex
  const newR = Math.round(r).toString(16).padStart(2, '0');
  const newG = Math.round(g).toString(16).padStart(2, '0');
  const newB = Math.round(b).toString(16).padStart(2, '0');

  return `#${newR}${newG}${newB}`;
}

/**
 * Converts the provided string to kebab-case.
 *
 * @param str - The input string to be converted.
 * @returns The input string converted to kebab-case.
 * @example
 * const kebabCaseString = toKebabCase('Hello World');
 * console.log(kebabCaseString); // Outputs 'hello-world'
 */
export function toKebabCase(str: string) {
  return str.replace(/\s/g, '-').toLowerCase();
}

/**
 * Generates a random time in the morning.
 *
 * @returns An object containing the hours and minutes of the random morning time.
 * @example
 * const randomTime = getRandomMorningTime();
 * console.log(randomTime); // Outputs a random time in the morning
 */
export const getRandomMorningTime = () => {
  const start = new Date();
  start.setHours(5, 30, 0, 0);
  const end = new Date();
  end.setHours(8, 30, 0, 0);
  const randomTime = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return { hours: randomTime.getHours(), minutes: randomTime.getMinutes() };
};

/**
 * Waits for all animations on the provided element to finish.
 *
 * @param element - The element to wait for animations to finish on.
 * @returns A promise that resolves when all animations on the element have finished.
 * @example
 * await elementAnimationsFinished(document.querySelector('.my-element'));
 */
export async function elementAnimationsFinished(element: Element | null) {
  if (!element) return;
  await new Promise((r) => setTimeout(r, 0));
  const animations = element.getAnimations();
  return Promise.allSettled(animations.map((a) => a.finished));
}
