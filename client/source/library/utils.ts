import { Cell } from '@adbl/cells';

type AsyncRequestAtoms<T, U> = {
  pending: Cell<boolean>;
  data: Cell<T>;
  error: Cell<U>;
};

export function setMetaTheme(color: string) {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', color);
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

export function vibrate() {
  navigator.vibrate?.(3);
}

export function getResourceState<T, U>(resource: AsyncRequestAtoms<T, U>) {
  return Cell.derived(() => {
    return resource.pending.value
      ? 'pending'
      : resource.error.value
      ? 'error'
      : 'success';
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
