import { Cell, type DerivedCell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';

type AsyncRequestAtoms<T, U> = {
  pending: Cell<boolean>;
  data: Cell<T>;
  error: Cell<U>;
};

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
 * Derives the current state of an asynchronous resource.
 *
 * This function takes an `AsyncRequestAtoms` object, which represents the state of an asynchronous request,
 * and returns a derived value that represents the overall state of the resource. The possible states are:
 *
 * - 'pending': The resource is currently being fetched.
 * - 'error': An error occurred while fetching the resource.
 * - 'success': The resource was fetched successfully.
 * - 'inert': The resource is in an initial or unknown state.
 *
 * @param resource - The `AsyncRequestAtoms` object representing the asynchronous resource.
 * @returns The current state of the resource as a string.
 * @example
 * const resourceState = getResourceState(myResource);
 * console.log(resourceState); // Outputs the current state of the resource
 */
export function getResourceState<T, U>(resource: AsyncRequestAtoms<T, U>) {
  return Cell.derived(() => {
    return resource.pending.value
      ? 'pending'
      : resource.error.value
      ? 'error'
      : resource.data.value
      ? 'success'
      : 'inert';
  });
}

/**
 * Lightens a hexadecimal color by a given amount.
 *
 * @param hex - The hexadecimal color to lighten, in the format `#RRGGBB` or `#RGB`.
 * @param amount - The amount to lighten the color, between 0 and 1. A value of 0 will return the original color, while a value of 1 will return a fully white color.
 * @returns The lightened hexadecimal color in the format `#RRGGBB`.
 * @example
 * const lightenedColor = lightenHexColor('#ff0000', 0.5);
 * console.log(lightenedColor); // Outputs the lightened color
 */
export function lightenHexColor(hexCode: string, amount = 0.5) {
  if (
    typeof hexCode !== 'string' ||
    !/^#([0-9A-Fa-f]{3}){1,2}$/.test(hexCode)
  ) {
    console.error('Invalid hex color format');
    return hexCode; // Return original or handle error as needed
  }
  if (typeof amount !== 'number' || amount < 0 || amount > 1) {
    console.error('Amount must be a number between 0 and 1');
    return hexCode;
  }

  let hex = hexCode.replace('#', '');
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);

  const newR = Math.round(Math.min(255, r + 255 * amount));
  const newG = Math.round(Math.min(255, g + 255 * amount));
  const newB = Math.round(Math.min(255, b + 255 * amount));

  const newHex = `#${newR.toString(16).padStart(2, '0')}${newG
    .toString(16)
    .padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;

  return newHex;
}

/**
 * Defers the execution of the provided callback function to the next available event loop tick.
 *
 * @param callback - The function to be executed.
 * @example
 * defer(() => {
 *   console.log('This will run in the next event loop tick');
 * });
 */
export function defer(callback: () => void) {
  setTimeout(callback, 0);
}

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

const currentRoute = {
  value: null as DerivedCell<{
    name: string | null;
    params: Map<string, string>;
    query: URLSearchParams;
    path: string;
    fullPath: string;
  }> | null,

  get() {
    if (!this.value) {
      this.value = useRouter().getCurrentRoute();
    }
    return this.value;
  },
};

/**
 * Adds a query parameter to the current route.
 *
 * @param query - The query parameter to add.
 * @param value - The value of the query parameter.
 * @example
 * await addRouteQuery('search', 'example');
 */
export async function addRouteQuery(query: string, value?: string) {
  const router = useRouter();
  const route = currentRoute.get();
  const searchParams = new URLSearchParams(route.value.query);
  searchParams.set(query, value ?? '');
  const nextPath = `${route.value.path}?${searchParams}`;
  await router.navigate(nextPath);
}

/**
 * Removes a query parameter from the current route.
 *
 * @param query - The query parameter to remove.
 * @param guard - An optional guard cell that, if provided and evaluates to false, will prevent the query parameter from being removed.
 * @example
 * await removeRouteQuery('search');
 */
export async function removeRouteQuery(query: string, guard?: Cell<boolean>) {
  if (guard && guard.value === false) return;

  const router = useRouter();
  const route = currentRoute.get();
  const searchParams = new URLSearchParams(route.value.query);
  searchParams.delete(query);
  const nextPath = `${route.value.path}?${searchParams}`;
  await router.navigate(nextPath);
}

/**
 * Returns a derived cell indicating the presence or absence of a query parameter
 * in the current route.
 *
 * @param query - The query parameter to use.
 * @param value - The value of the query parameter.
 * @example
 * const isSearchQueryPresent = useRouteQuery('search');
 */
export function useRouteQuery(query: string, value?: string) {
  return Cell.derived(() => {
    const routeSearchParams = currentRoute.get().value.query;
    if (value) {
      return routeSearchParams.get(query) === value;
    }
    return routeSearchParams.has(query);
  });
}

/**
 * Returns a derived cell containing the value of a query parameter.
 * @param query The query parameter to retrieve.
 * @example
 * const id = getRouteQueryValue('goal-id');
 */
export function getRouteQueryValue(query: string) {
  return Cell.derived(() => currentRoute.get().value.query.get(query));
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
 * Selects a random element from an array.
 *
 * @param array - The array to select a random element from.
 * @returns A random element from the array.
 * @example
 * const randomElement = selectAtRandom([1, 2, 3, 4]);
 * console.log(randomElement); // Outputs a random element from the array
 */
export function selectAtRandom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

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
