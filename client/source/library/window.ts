import { Cell, type SourceCell } from '@adbl/cells';
import { useObserver } from '@adbl/unfinished';

export function useMatchMedia(query: string) {
  const mediaQueryList = window.matchMedia(query);
  const matches = Cell.source(mediaQueryList.matches);
  mediaQueryList.addEventListener('change', () => {
    matches.value = mediaQueryList.matches;
  });
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

interface ScrollData {
  scrollWidth: Cell<number>;
  scrollHeight: Cell<number>;
  scrollLeft: Cell<number>;
  scrollTop: Cell<number>;
}

export function useElementScrollData<T extends HTMLElement>(
  elementRef: SourceCell<T | null>
): ScrollData {
  const observer = useObserver();
  const scrollWidth = Cell.source(0);
  const scrollHeight = Cell.source(0);
  const scrollLeft = Cell.source(0);
  const scrollTop = Cell.source(0);

  const update = () => {
    scrollWidth.value = elementRef.value?.scrollWidth ?? 0;
    scrollHeight.value = elementRef.value?.scrollHeight ?? 0;
    scrollLeft.value = elementRef.value?.scrollLeft ?? 0;
    scrollTop.value = elementRef.value?.scrollTop ?? 0;
  };

  observer.onConnected(elementRef, (element) => {
    update();

    element.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(elementRef.deproxy());
    const options = { passive: true } as AddEventListenerOptions;

    return () => {
      element.removeEventListener('scroll', update, options);
      window.removeEventListener('resize', update, options);
      resizeObserver.disconnect();
    };
  });

  return { scrollWidth, scrollHeight, scrollLeft, scrollTop };
}
