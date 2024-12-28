import { Cell } from '@adbl/cells';

type AsyncRequestAtoms<T, U> = {
  pending: Cell<boolean>;
  data: Cell<T>;
  error: Cell<U>;
};

export function setMetaTheme(color: string) {
  setTimeout(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', color);
  }, 0);
}

/**
 * Retrieves the content of the meta tag with the name "theme-color".
 *
 * @returns {string} The content of the meta tag if it exists, otherwise returns '#ffffff'.
 */
export function getMetaTheme(): string {
  return (
    document
      .querySelector('meta[name="theme-color"]')
      ?.getAttribute('content') ?? '#ffffff'
  );
}

export function setAutoSelectStage(stage: number) {
  document
    .querySelector('#autoSelectionView')
    ?.setAttribute('data-stage', stage.toString());
}

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

export function vibrate(pattern?: VibratePattern) {
  navigator.vibrate?.(pattern ?? 3);
}

export const NoOp = () => <></>;

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

export function defer(callback: () => void) {
  setTimeout(callback, 0);
}

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
