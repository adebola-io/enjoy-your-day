import { Cell } from '@adbl/cells';

export function useMatchMedia(query: string) {
  const mediaQueryList = window.matchMedia(query);
  const matches = Cell.derived(() => mediaQueryList.matches);
  mediaQueryList.addEventListener('change', () => matches.update());
  Reflect.set(matches, 'mediaQueryList', mediaQueryList); // Prevent GC of mediaQueryList
  return matches;
}

let clickListenerAdded = false;
type ClickCoordinates = { x: Cell<number>; y: Cell<number> };
const internalClickCoord = { x: Cell.source(0), y: Cell.source(0) };

export function useClickCoordinates(): ClickCoordinates {
  if (clickListenerAdded) return internalClickCoord;
  window.addEventListener('click', (event) => {
    const { x, y } = internalClickCoord;
    x.value = event.clientX;
    y.value = event.clientY;
  });
  clickListenerAdded = true;
  return internalClickCoord;
}
